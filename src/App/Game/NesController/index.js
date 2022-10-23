import * as React from 'react';
import "./index.scss"

function NesController({ gestureMode }) {
    console.log("gesture is ", gestureMode);
    return (
        <div className="align">
            <div className="joystick">
                <div className="joystick__body">

                    <div className="joystick-arrows joystick__col">
                        {
                            gestureMode == "left" &&
                            <div className="joystick-arrows__arrow_lightBlue"></div>
                        }
                        <div className="joystick-arrows__arrow"></div>
                        <div className="joystick-arrows__center"></div>
                        <div className="joystick-arrows__arrow"></div>
                    </div>

                    <div className="joystick-options joystick__col">
                        <div className="joystick-options__bar"></div>
                        <div className="joystick-options__bar"></div>
                        <div className="joystick-options__bar"></div>
                        <div className="joystick-options__bar joystick-options__bar--large">
                            <div className="joystick-options__inner">
                                <div className="joystick-options__option"></div>
                                <div className="joystick-options__option"></div>
                            </div>
                        </div>
                        <div className="joystick-options__bar"></div>
                    </div>
                    <div className="joystick__buttons joystick__col">
                        <div className="joystick-button">
                            <div className="joystick-button__input"></div>
                        </div>
                        <div className="joystick-button">
                            <div className="joystick-button__input"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NesController;