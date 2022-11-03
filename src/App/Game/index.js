
import React, { useState, useEffect, useRef } from 'react';
import Detection from './Detection';
import Emulator from './Emulator';
import NesController from './NesController';
import Controller from 'jsnes/src/controller';
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

    const keyPress = (key, isKeyDown) => {
        isKeyDown?console.log("dispatching keydown", key):console.log("dispatching keyup", key)
        setGesture("loading...")
        if (isKeyDown) {
            document.dispatchEvent(new KeyboardEvent('keydown', { "key":"Enter", "keyCode":key, "which":key, "charCode": key, bubbles:true }))
            return setTimeout(() => {
                keyPress(key, false);
            }, 100);
        } else {
            document.dispatchEvent(new KeyboardEvent('keyup', { "key":"Enter", "keyCode":key, "which":key, "charCode": key, bubbles:true }));
        }
        //document.dispatchEvent(new CustomEvent('k', {detail:key}))
        //document.dispatchEvent(new CustomEvent('notk', {detail:key}))
    };

    // const keyEvent = (gesture) => {
    //     setGesture(gesture);
    //     keyPress(TETRIS_GESTURE_KEY_MAP[gesture]);
    //     console.log("pressed", gesture);
    //     if (game === 'tetris') {
    //         keyPress(TETRIS_GESTURE_KEY_MAP[gesture]);
    //     }
    // }

    useEffect(()=>{
        const keyEvent = (gesture) => {
            console.log("pressed", gesture);
            // if (game === 'tetris') {
            //     keyPress(TETRIS_GESTURE_KEY_MAP[gesture], true);
            // }
            return keyPress(TETRIS_GESTURE_KEY_MAP[gesture], true);
        }
        keyEvent(gesture);
    }, [gesture])


    return (
        <div className="Game">
            <div className="game-container">
                {
                    <Emulator/>
                }
                {
                    //<iframe width="512" height="480" title="game" src="https://xem.github.io/jsnes-web/"></iframe>
                }
            </div>
            <div className='controller-container'>
                <div className="controller">
                    <h3>Gesture: {gesture}</h3>
                    <NesController gestureMode={gesture} />

                </div>
                <Detection
                    setGesture={setGesture}
                    keyEvent={setGesture}
                />
            </div>
        </div>
    );
}

export default Game;