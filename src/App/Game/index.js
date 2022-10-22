
import React, { useState } from 'react';
import './index.scss';
import Detection from './Detection';
import Emulator from './Emulator';

const keyEvent = (key) => {
    const event = new KeyboardEvent('keydown', { key });
    document.dispatchEvent(event);
};

//TODO
const TETRIS_GESTURE_KEY_MAP = {
    'moveDown': 'ArrowDown',
    'moveUp': 'ArrowUp',
}

const Game = () => {
    const [gesture, setGesture] = useState('waiting for gesture');
    const [romData, setRomData] = useState('');
    const [paused, setPaused] = useState(false);

    useEffect(() => {
        let reader = new FileReader();
        console.log("hi");
        
        url = "http://localhost:3000/roms/tetris/tetris.nes";
        loadBinary(
            url,
            (err, data) => {
                if (err) {
                   console.log("error");
                } else {
                    setRomData(data);
                }
            }
        );
    })

    return (
        <div className="Game">
            <div className="game-container">
                <h1>HI HELO</h1>
                {/* <Emulator>
                    romData={""}
                     paused={false}
                </Emulator> */}
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