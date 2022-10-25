
import React, { useState, useEffect, useRef } from 'react';
import Detection from './Detection';
import Emulator from './Emulator';
import NesController from './NesController';
import './index.scss';
//import Emulator from './Emulator';

//TODO
const TETRIS_GESTURE_KEY_MAP = {
    'down': 40,
    'up': 38,
    'right': 39,
    'left': 37,
    'rotate-left': 88,
    'rotate-right': 67,
    'start-game': 13
}

const Game = ({ game }) => {
    const [gesture, setGesture] = useState('loading gesture...');

    const keyPress = (key) => {
        // const frame = document.getElementById("emulatorIframe").contentWindow;
        // console.log("frame is", frame.contentWindow);
        // var event = new KeyboardEvent('keydown', {"keyCode":key, /* "bubbles":true,*/ "view":frame });
        // document.body.dispatchEvent(event);
        // console.log("event1", event);
        // event = new KeyboardEvent('keyup', {"keyCode":key, /*"bubbles":true,*/ "view":frame });
        // document.body.dispatchEvent(event);
        // console.log("event2", event)

        var frame = document.getElementById("emulatorIframe");
        console.log("frame", frame);
        console.log("frame contentWindow", frame.contentWindow);
        var event = new KeyboardEvent('keydown', {"keyCode":key, "bubbles":true, /*"isTrusted":true, "view":frame.contentWindow*/ });
        frame.contentWindow.dispatchEvent(event);
        console.log("event1", event);
        event = new KeyboardEvent('keyup', {"keyCode":key, "bubbles":true,/* "isTrusted":true,  "view":frame.contentWindow*/});
        frame.contentWindow.dispatchEvent(event);
        console.log("event2", event)

        // var event = new KeyboardEvent('keydown', { "key":"Enter", "keyCode":key, "bubbles":true });
        // window.dispatchEvent(event);
        // console.log("event1", event);
        // event = new KeyboardEvent('keyup', { "key":"Enter", "keyCode":key, "bubbles":true });
        // window.dispatchEvent(event);
        // console.log("event2", event);
    };

    const keyEvent = (gesture) => {
        setGesture(gesture);
        keyPress(TETRIS_GESTURE_KEY_MAP[gesture]);
        console.log("pressed", gesture);
        if (game === 'tetris') {
            keyPress(TETRIS_GESTURE_KEY_MAP[gesture]);
        }
    }


    return (
        <div className="Game">
            <div className="game-container">
                {/* {
                    <Emulator/>
                } */}
                {
                    <iframe id="emulatorIframe" width="512" height="480" title="game" src="emulator_original.html"></iframe>
                }
            </div>
            <div className='controller-container'>
                <div className="controller">
                    <h3>Gesture: {gesture}</h3>
                    <NesController gestureMode={gesture} />

                </div>
                <Detection
                    keyEvent={keyEvent}
                />
            </div>
        </div>
    );
}

export default Game;