
import React, { useState } from 'react';
import './index.scss';
import Detection from './Detection';

const Game = () => {

    const [keyInput, setKeyInput] = useState('');

    return (
        <div className="Game">
            <Detection
                setKeyInput={setKeyInput}
            />    
        </div>
    );
}

export default Game;