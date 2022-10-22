
import React, { useState } from 'react';
import './index.scss';
import Detection from './Detection';

const Game = () => {

    const [gesture, setGesture] = useState('waiting for gesture');

    return (
        <div className="Game">
            <div className="game-container">
                <h1>Game</h1>
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