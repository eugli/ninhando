
import React, { useState } from 'react';
import './index.scss';
import Detection from './Detection';
//import Emulator from './Emulator';

const keyEvent = (key) => {
    const event = new KeyboardEvent('keydown', { key });
    document.dispatchEvent(event);
};

//TODO
const TETRIS_GESTURE_KEY_MAP = {
    'moveDown': 'ArrowDown',
    'moveUp': 'ArrowUp',
}

const Game = ({game}) => {

    const [gesture, setGesture] = useState('waiting for gesture');    

    return (
        <div className="Game">
            <div className="game-container">
                {
                    //<Emulator/>
                }
                {
                    <iframe width="512" height="480" title="game" src="https://xem.github.io/jsnes-web/"></iframe>
                }
            </div>
            <div className='controller-container'>
                <div className="controller">
                    <h1>Gesture: {gesture}</h1>
                </div>
                <Detection
                    setGesture={setGesture}
                />
            </div>
        </div>
    );
}

export default Game;