import React, { useRef, useEffect } from 'react';
import * as jsnes from 'jsnes';

// Canvas + framebuffer
// ====================

const NES = () => {

    const canvasRef = useRef();

    var ctx;

    React.useEffect(() => {
        ctx = canvasRef.current.getContext('2d');
      });
    var imageData = ctx.getImageData(0, 0, 256, 240);
    var frameBuffer = new ArrayBuffer(imageData.data.length);
    var frameBuffer8 = new Uint8ClampedArray(frameBuffer);
    var frameBuffer32 = new Uint32Array(frameBuffer);

    // AudioContext + audio buffers + samples lists
    // =============================================

    var audio = new AudioContext();
    var audioprocessor = audio.createScriptProcessor(512, 0, 2);
    audioprocessor.connect(audio.destination);

    // When the Audio processor requests new samples to play
    audioprocessor.onaudioprocess = audioEvent => {

        // Ensure that we've buffered enough samples
        if (leftSamples.length > currentSample + 512) {
            for (var i = 0; i < 512; i++) {

                // Output (play) the buffers
                audioEvent.outputBuffer.getChannelData(0)[i] = leftSamples[currentSample];
                audioEvent.outputBuffer.getChannelData(1)[i] = rightSamples[currentSample];
                currentSample++;
            }
        }
    }
    var leftSamples = [];
    var rightSamples = [];
    var currentSample = 0;


    // Load ROM + Start emulator
    // =========================
    var file = new XMLHttpRequest();
    file.onchange = () => {
        var fileReader = new FileReader();
        fileReader.readAsBinaryString(file.files[0]);
        fileReader.onload = () => {

            file.remove();

            var nes = new jsnes.NES({

                // Display each new frame on the canvas
                onFrame: function (frameBuffer) {
                    var i = 0;
                    for (var y = 0; y < 256; ++y) {
                        for (var x = 0; x < 240; ++x) {
                            i = y * 256 + x;
                            frameBuffer32[i] = 0xff000000 | frameBuffer[i];
                        }
                    }
                    imageData.data.set(frameBuffer8);
                    ctx.putImageData(imageData, 0, 0);
                },

                // Add new audio samples to the Audio buffers
                onAudioSample: function (left, right) {
                    //console.log(left, right);
                    leftSamples.push(left);
                    rightSamples.push(right);
                },

                // Pass the browser's sample rate to the emulator
                sampleRate: 44100,
            });

            // Send ROM to emulator
            nes.loadROM(fileReader.result);

            // 60 fps loop
            setInterval(nes.frame, 16);

            // Controller #1 keys listeners
            onkeydown = onkeyup = e => {
                nes[e.type === "keyup" ? "buttonUp" : "buttonDown"](
                    1,
                    jsnes.Controller["BUTTON_" +
                    {
                        37: "LEFT",
                        38: "UP",
                        39: "RIGHT",
                        40: "DOWN",
                        88: "A", // X
                        67: "B", // C
                        27: "SELECT",
                        13: "START"
                    }
                    ]
                )
            }


            // Or: load ROM from disk
            /*
            filename = "roms/smb.nes";
            file = new XMLHttpRequest;
            file.open('GET', filename);
            file.overrideMimeType("text/plain; charset=x-user-defined");
            file.send();
            file.onload = function(){
            nes.loadROM(file.responseText);
            setInterval(nes.frame, 16);
            }
            */
        }
    }
    return (
        <canvas ref={canvasRef} />
    )
}

export default NES;