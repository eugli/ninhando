
import React, { useState } from 'react';
import './index.scss';
import Detection from './Detection';

const Game = () => {

    const [gesture, setGesture] = useState('waiting for gesture');

    return (
        <div className="Game">
            <Detection
                setGesture={setGesture}
            />
            <h1>{gesture}</h1>
        </div>
    );
}

export default Game;