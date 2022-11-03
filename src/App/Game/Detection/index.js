import React, { useRef, useEffect } from "react";

import * as handpose from "@tensorflow-models/handpose";
import Webcam from "react-webcam";
import * as tf from "@tensorflow/tfjs";

import * as fp from "fingerpose";
import { moveUp, moveDown, moveLeft, moveRight, rotateLeft, rotateRight, startGame } from './Movement';
import { drawHand } from "./utilities";

const Gesture = ({
  keyEvent,
  hidden=false,
  sampleTime=300
}) => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const runHandpose = async () => {
    const net = await handpose.load();

    return setInterval(() => {
      detect(net);
    }, sampleTime);
  };

  const detect = async (net) => {
    // Check data is available
    //console.log("running pose model...");

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
      webcamRef.current.video.width = hidden ? 0 : videoWidth;
      webcamRef.current.video.height = hidden ? 0 : videoHeight;

      // Set canvas height and width
      canvasRef.current.width = hidden ? 0 : videoWidth;
      canvasRef.current.height = hidden ? 0 : videoHeight;

      // Make Detections
      const hand = await net.estimateHands(video, true);

      if (hand.length > 0) {
        const GE = new fp.GestureEstimator([
          moveDown,
          moveUp,
          moveLeft,
          moveRight,
          rotateLeft,
          rotateRight,
          startGame,
        ]);
        const gesture = await GE.estimate(hand[0].landmarks, 4);

        if (gesture.gestures !== undefined && gesture.gestures.length > 0) {

          const confidence = gesture.gestures.map(
            (prediction) => prediction.score
          );
          const maxConfidence = confidence.indexOf(
            Math.max.apply(null, confidence)
          );

          const finalGesture = gesture.gestures[maxConfidence].name;
          keyEvent(finalGesture);

          // Draw mesh
          if (!hidden) {
            const ctx = canvasRef.current.getContext("2d");
            drawHand(hand, ctx); 
          }
        }
      }
    }
  };

  useEffect(() => { 
    const interval = runHandpose();

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="detection-container">
      <div className="bottom-layer">
        <Webcam
          className="detection"
          mirrored={true}
          height={0}
          width={0}
          ref={webcamRef}
          style={{
            borderRadius: "5%",
          }}
        />
      </div>

      <div className="top-layer"
           style={{
            display: hidden ? "none" : "block",
      }}> 
        <canvas
          className="detection"
          ref={canvasRef}
        />
      </div>
    </div>
  );
}

export default Gesture;