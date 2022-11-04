import React, { useRef, useState, useEffect } from 'react';
import * as jsnes from 'jsnes';

// Canvas + framebuffer
// ====================

const Emulator = ({
    romPath,
}) => {

    const SCREEN_HEIGHT = 240;
    const SCREEN_WIDTH = 256;

    const canvasRef = useRef(null);

    useEffect(() => {
        console.log("Emulator")
        canvasRef.current.width = 512;
        canvasRef.current.height = 480;
        var ctx = canvasRef.current.getContext('2d', { willReadFrequently: true });
        var imageData = ctx.getImageData(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
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
        var filename = romPath;
        var file = new XMLHttpRequest();
        file.open('GET', filename);
        file.overrideMimeType("text/plain; charset=x-user-defined");
        file.send();
        file.onload = () => {
            var nes = new jsnes.NES({

                // Display each new frame on the canvas
                onFrame: function (frameBuffer) {
                    var i = 0;
                    for (var y = 0; y < SCREEN_WIDTH; ++y) {
                        for (var x = 0; x < SCREEN_HEIGHT; ++x) {
                            i = y * SCREEN_WIDTH + x;
                            frameBuffer32[i] = 0xff000000 | frameBuffer[i];
                        }
                    }
                    imageData.data.set(frameBuffer8);
                    ctx.putImageData(imageData, 0, 0);

                    ctx.globalCompositeOperation = 'copy';
                    // now we can draw ourself over ourself.
                    ctx.drawImage(canvasRef.current,
                    0,0, imageData.width, imageData.height, // grab the ImageData part
                    0,0, canvasRef.current.width, canvasRef.current.height // scale it
                    );
                },

                // Add new audio samples to the Audio buffers
                // onAudioSample: function (left, right) {
                //     //console.log(left, right);
                //     leftSamples.push(left);
                //     rightSamples.push(right);
                // },

                // Pass the browser's sample rate to the emulator
                sampleRate: 44100,
            });



            // Send ROM to emulator
            nes.loadROM(file.responseText);

            // 60 fps loop
            setInterval(nes.frame, 16);

            // Controller #1 keys listeners
            const keyEvent = (e) => {
                console.log(e.type + " listened", e.keyCode);
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
                    }[e.keyCode]
                    ]
                )
            }

            document.addEventListener("keydown", keyEvent);
            document.addEventListener("keyup", keyEvent);
            //document.addEventListener("k", keyEvent);
            //document.addEventListener("notk", keyEvent);

            // Or: load ROM from disk
        }
    }, []);

    return (
        <canvas ref={canvasRef} width={512} height={480} />
    )
}

export default Emulator;