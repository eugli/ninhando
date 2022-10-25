import * as React from 'react';
import "./index.scss"

function NesController({ gestureMode }) {
    console.log("gesture is ", gestureMode);
    return (
        <div className="controller">
            <div className="base">
                <div className="front">
                    <div className="decoration">
                        <div className="stickers">
                            <div className="st-a">A</div>
                            <div className="st-b">B</div>
                            <div className="st-select">SELECT</div>
                            <div className="st-start">START</div>
                        </div>
                        <div className="decoration-central">
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>

                    </div>
                    <div className="cross">
                        <div className="circle"></div>
                        {
                            gestureMode === "right" && <div className="overlay-right">
                            </div>
                        } {
                            gestureMode === "left" && <div className="overlay-left">
                            </div>
                        } {
                            gestureMode === "up" && <div className="overlay-up">
                            </div>
                        } {
                            gestureMode === "down" && <div className="overlay-down">
                            </div>
                        }

                        <div className="horizontal">
                            <div className="arrowlf"></div>
                            <div className="arrowrh"></div>
                        </div>

                        <div className="vertical">
                            {
                                gestureMode === "left" && <div className="arrowrh-l"></div>
                            }
                            {
                                gestureMode !== "left" && <div className="arrowrh"></div>
                            }
                            <div className="arrowlf"></div>
                            <div className="arrowrh"></div>
                        </div>
                        <div className="back-cross">
                            <div className="horiz"></div>
                            <div className="vert"></div>
                        </div>
                    </div>
                    <div className="buttons-a-b">
                        <div className="btn-border">
                            {
                                gestureMode === 'rotate-right' && <div className="btn-round a"></div>
                            }{
                                gestureMode !== 'rotate-right' && <div className="btn-round-a a"></div>
                            }
                        </div>

                        <div className="btn-border">
                            {
                                gestureMode === 'rotate-left' && <div className="btn-round b"></div>
                            }{
                                gestureMode !== 'rotate-left' && <div className="btn-round-a a"></div>
                            }
                        </div>
                    </div>
                    <div className="buttons-select">
                        <div className="btn-central-a select"></div>
                        {
                            gestureMode !== 'start-game' && <div className="btn-central-a start"></div>
                        } {
                            gestureMode === 'start-game' && <div className="btn-central start"></div>
                        }

                    </div>
                </div>
            </div>
        </div>
    );
};

export default NesController;