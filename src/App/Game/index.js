
import React, { useState, useEffect, useRef } from 'react';
import './index.scss';
import Detection from './Detection';
import NesController from './NesController';

const keyEvent = (key) => {
    const event = new KeyboardEvent('keydown', { key });
    document.dispatchEvent(event);
};

//TODO
const TETRIS_GESTURE_KEY_MAP = {
    'moveDown': '',
    'moveUp': 'w',
    'moveLeft': 'a',
    "moveRight": 'd',
    "rotateLeft": 'A',
    "rotateright": "B",
};

const Game = () => {
    const ref = useRef();
    const [gesture, setGesture] = useState('waiting for gesture');

    return (
        <div className="Game">
            <div className="game-container">
                <h1>Game</h1>
                <iframe title="game" src="https://xem.github.io/jsnes-web/"></iframe>
            </div>
            <div className='controller-container'>
                <div className="controller">
                    <h1>Gesture: {gesture}</h1>
                    <NesController gestureMode={gesture} />

                </div>
                <Detection
                    setGesture={setGesture}
                />
            </div>
        </div>
    );
}

export default Game;