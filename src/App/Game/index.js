
import React, { useState } from 'react';
import './index.scss';
import Detection from './Detection';

const Game = () => {

    const [gesture, setGesture] = useState('');

    return (
        <div className="Game">
            <Detection
                setGesture={setGesture}
            />    
        </div>
    );
}

export default Game;