import React, { useRef, useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import * as handPoseDetection from "@tensorflow-models/hand-pose-detection";
import Webcam from "react-webcam";
import { drawHand } from "./utilities";
import * as fp from "fingerpose";
import { loveYouGesture } from "./LoveYou";

const Gesture = () => {
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);


    const runHandpose = async () => {
        const model = handPoseDetection.SupportedModels.MediaPipeHands;
        const detectorConfig = {
            runtime: 'tfjs',
            modelType: 'full',
            solutionPath: "https://cdn.jsdelivr.net/npm/@mediapipe/hands/",
        }
        const net = await handPoseDetection.createDetector(model, detectorConfig);
        console.log("Handpose model loaded.");
        //  Loop and detect hands
        setInterval(() => {
            detect(net);
        }, 10);
    };

    const detect = async (net) => {
        // Check data is available
        if (
            typeof webcamRef.current !== "undefined" &&
            webcamRef.current !== null &&
            webcamRef.current.video.readyState === 4
        ) {
            // Get Video Properties
            const video = webcamRef.current.video;
            const videoWidth = webcamRef.current.video.videoWidth;
            const videoHeight = webcamRef.current.video.videoHeight;

            // Set video width
            webcamRef.current.video.width = videoWidth;
            webcamRef.current.video.height = videoHeight;

            // Set canvas height and width
            canvasRef.current.width = videoWidth;
            canvasRef.current.height = videoHeight;

            // Make Detections
            const hand = await net.estimateHands(video);
            // console.log(hand);

            ///////// NEW STUFF ADDED GESTURE HANDLING

            if (hand.length > 0) {
                console.log(hand.length)
                console.log(hand)
                const GE = new fp.GestureEstimator([
                    fp.Gestures.VictoryGesture,
                    fp.Gestures.ThumbsUpGesture,
                    loveYouGesture
                ]);
                const scaledKeypoints3D = hand[0].keypoints3D.map((point)=>{point.x*=videoWidth*10; point.y*=videoHeight*10; point.z*=videoWidth*10; return [point.x, point.y, point.z]})
                const gesture = await GE.estimate(scaledKeypoints3D, 4);
                if (gesture.gestures !== undefined && gesture.gestures.length > 0) {
                    console.log(gesture.gestures);

                    const confidence = gesture.gestures.map(
                        (prediction) => prediction.score
                    );
                    //console.log(confidence);
                    const maxConfidence = confidence.indexOf(
                        Math.max.apply(null, confidence)
                    );
                    //console.log("maxConfidence", maxConfidence);
                    //console.log(gesture.gestures[maxConfidence].name);
                }
            }

            ///////// NEW STUFF ADDED GESTURE HANDLING

            // Draw mesh
            const ctx = canvasRef.current.getContext("2d");
            //drawHand(hand, ctx);
        }
    };

    useEffect(() => { runHandpose() }, []);

    return (
        <div className="App">
            <header className="App-header">
                <Webcam
                    ref={webcamRef}
                    style={{
                        position: "absolute",
                        marginLeft: "auto",
                        marginRight: "auto",
                        left: 0,
                        right: 0,
                        textAlign: "center",
                        zindex: 9,
                        width: 640,
                        height: 480,
                    }}
                />

                <canvas
                    ref={canvasRef}
                    style={{
                        position: "absolute",
                        marginLeft: "auto",
                        marginRight: "auto",
                        left: 0,
                        right: 0,
                        textAlign: "center",
                        zindex: 9,
                        width: 640,
                        height: 480,
                    }}
                />
            </header>
        </div>
    );
};

export default Gesture;