import React, { useRef, useEffect } from 'react';
import * as jsnes from 'jsnes';

// Canvas + framebuffer
// ====================

const Emulator = () => {

    const canvasRef = useRef(null);

    useEffect(() => {
        console.log("Emulator");
        canvasRef.current.width = 256;
        canvasRef.current.height = 240;
        var ctx = canvasRef.current.getContext('2d', { willReadFrequently: true });
        var imageData = ctx.getImageData(0, 0, 256, 240);
        var frameBuffer = new ArrayBuffer(imageData.data.length);
        var frameBuffer8 = new Uint8ClampedArray(frameBuffer);
        var frameBuffer32 = new Uint32Array(frameBuffer);

        // Load ROM + Start emulator
        // =========================
        var filename = "Tetris.nes";
        var file = new XMLHttpRequest();
        file.open('GET', filename);
        file.overrideMimeType("text/plain; charset=x-user-defined");
        file.send();
        file.onload = () => {
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

            });

            // Send ROM to emulator
            nes.loadROM(file.responseText);

            // 60 fps loop
            setInterval(nes.frame, 16);

            // Controller #1 keys listeners
            onkeydown = onkeyup = e => {
                console.log("key!!!", e)
                const etype = e.type;
                const eCode = e.keyCode;
                nes[etype === "keyup" ? "buttonUp" : "buttonDown"](
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
                    }[eCode]
                    ]
                )
            }
        }
    }, []);



    return (
        <canvas ref={canvasRef} width="512" height="480" style={{ zIndex: 10 }} />
    )
}

export default Emulator;