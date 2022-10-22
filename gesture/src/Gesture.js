import React, { useRef, useState, useEffect } from "react";

import * as handpose from "@tensorflow-models/handpose";
import Webcam from "react-webcam";
import * as tf from "@tensorflow/tfjs";

import * as fp from "fingerpose";
import {moveUp, moveDown, moveLeft, moveRight} from './Movement';

function Gesture() {
  const webcamRef = useRef(null);

  const runHandpose = async () => {
    const net = await handpose.load();
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

      console.log(webcamRef);
      
      // Make Detections
      const hand = await net.estimateHands(video);
      console.log(hand);

      if (hand.length > 0) {
        const GE = new fp.GestureEstimator([
          moveDown,
          moveUp,
          moveLeft, 
          moveRight,
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
          console.log(finalGesture);
        }
      }
    }
  };

  useEffect(()=>{runHandpose()},[]);

  return (
    <div className="App">
      <header className="App-header">
        <Webcam mirrored={true}
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

      </header>
    </div>
  );
}

export default Gesture;