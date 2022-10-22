import { Finger, FingerCurl, FingerDirection, GestureDescription } from "fingerpose";

export const moveUp = new GestureDescription('up');
export const moveDown = new GestureDescription('down');
export const moveLeft = new GestureDescription('left');
export const moveRight = new GestureDescription('right');
export const rotateLeft = new GestureDescription('rotate-left');
export const rotateRight = new GestureDescription('rotate-right');

let fingers = [Finger.Thumb, Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky];


//rotate-left
for (let i = 1; i < fingers.length; i++) {
    rotateLeft.addDirection(fingers[i], FingerDirection.VerticalDown, 0.9);
    rotateLeft.addCurl(fingers[i], FingerCurl.FullCurl, 0.8);
}
rotateLeft.addDirection(Finger.Thumb, FingerDirection.HorizontalLeft, 1);

//rotate-right
for (let i = 1; i < fingers.length; i++) {
    rotateLeft.addCurl(fingers[i], FingerCurl.FullCurl, 0.8);
}
rotateLeft.addDirection(Finger.Thumb, FingerDirection.HorizontalRight, 1);

//up
for (let i = 0; i < fingers.length; i++) {
    moveUp.addDirection(fingers[i], FingerDirection.VerticalUp, 0.9);
    moveUp.addCurl(fingers[i], FingerCurl.NoCurl, 0.8);
}

// down
for (let i = 1; i < fingers.length; i++) {
    moveDown.addDirection(fingers[i], FingerDirection.VerticalDown, 0.9);
    moveDown.addCurl(fingers[i], FingerCurl.HalfCurl, 0.8);
}

moveDown.addCurl(Finger.Thumb, FingerCurl.NoCurl, 0.7);

//left
for (let i = 1; i < fingers.length; i++) {
    moveLeft.addDirection(fingers[i], FingerDirection.HorizontalLeft, 0.9);
    moveLeft.addCurl(fingers[i], FingerCurl.NoCurl, 0.8);
}
moveLeft.addCurl(Finger.Thumb, FingerCurl.NoCurl, 0.7);
moveLeft.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 0.7);

//right 
for (let i = 1; i < fingers.length; i++) {
    moveRight.addDirection(fingers[i], FingerDirection.HorizontalRight, 0.9);
    moveRight.addCurl(fingers[i], FingerCurl.NoCurl, 0.8);
}
moveRight.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 0.7);