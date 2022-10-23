import * as React from 'react';
import "./index.scss"

function NesController({ gestureMode }) {
    console.log("gesture is ", gestureMode);
    return (
        <div class="controller">
            <div class="base">
                <div class="front">
                    <div class="decoration">
                        <div class="stickers">
                            <div class="st-a">A</div>
                            <div class="st-b">B</div>
                            <div class="st-select">SELECT</div>
                            <div class="st-start">START</div>
                        </div>
                        <div class="decoration-central">
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>

                    </div>
                    <div class="cross">
                        <div class="circle"></div>
                        <div class="horizontal">
                            <div class="arrowlf"></div>
                            <div class="arrowrh"></div>
                        </div>
                        <div class="vertical">
                            {
                                gestureMode == "left" && <div class="arrowrh-l"></div>
                            }
                            {
                                gestureMode != "left" && <div class="arrowrh"></div>
                            }
                            <div class="arrowlf"></div>
                            <div class="arrowrh"></div>
                        </div>
                        <div class="back-cross">
                            <div class="horiz"></div>
                            <div class="vert"></div>
                        </div>
                    </div>
                    <div class="buttons-a-b">
                        <div class="btn-border">
                            {
                                gestureMode == 'rotate-right' && <div class="btn-round a"></div>
                            }{
                                gestureMode != 'rotate-right' && <div class="btn-round-a a"></div>
                            }
                        </div>

                        <div class="btn-border">
                            {
                                gestureMode == 'rotate-left' && <div class="btn-round b"></div>
                            }{
                                gestureMode != 'rotate-left' && <div class="btn-round-a a"></div>
                            }
                        </div>
                    </div>
                    <div class="buttons-select">
                        <div class="btn-central-a select"></div>
                        {
                            gestureMode != 'start-game' && <div class="btn-central-a start"></div>
                        } {
                            gestureMode == 'start-game' && <div class="btn-central start"></div>
                        }

                    </div>
                </div>
            </div>
        </div>
    );
};

export default NesController;