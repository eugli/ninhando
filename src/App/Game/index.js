
import React, { useState } from 'react';
import './index.scss';
import Detection from './Detection';
//import Emulator from './Emulator';


//TODO
const TETRIS_GESTURE_KEY_MAP = {
    'down': 'ArrowDown',
    'up': 'ArrowUp',
    'right': 'ArrowRight',
    'left': 'ArrowLeft',
    'rotate-left': 'x',
    'rotate-right': 'c',
    'start-game': 'Enter'
}

const Game = ({game}) => {
    const [gesture, setGesture] = useState('loading gesture...');

    const keyPress = (key) => {
        let frame = document.getElementById('emulator').contentDocument;
        var event = new KeyboardEvent('keydown', { key });
        document.dispatchEvent(event);
        console.log("event1", event);
        event = new KeyboardEvent('keyup', { key });
        document.dispatchEvent(event);
        console.log("event2", event)
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
                {
                    //<Emulator/>
                }
                {
                    <iframe id="emulator" width="512" height="480" title="game" src="https://xem.github.io/jsnes-web/"></iframe>
                }
            </div>
            <div className='controller-container'>
                <div className="controller">
                    <h1>Gesture: {gesture}</h1>
                </div>
                <Detection
                    keyEvent={keyEvent}
                />
            </div>
        </div>
    );
}

export default Game;