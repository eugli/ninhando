# Ninhando
Play arcade classic using just your hand gestures! Load up your favorite retro arcade game, move your hands for the webcam, and enjoy!
## About
tracks your hand gestures and converts those movements into playable actions for your favorite NES (Nintendo Entertainment System) games. You can also emulate and upload your favorite NES games to played as well. The project uses the React framework and is mainly built on javascript. 
### Tools Used
[`Tensorflow.js`](https://www.tensorflow.org/js) is a ML model that was built on the data of specific hand gestures and then used to help convert those hand gestures into actions in the emulated game.

[`JNES`](https://github.com/bfirsh/jsnes) is a JavaScript NES emulator where when the user starts the app. It opens up a new browser where the user can play NES games.

The rest of the project used the react framework and was written in javascript.

### Challenges Encountered

1) Running the app to run in the browser without significant input delay.

2) Creating a generic solution for all nes games and for all hand gestures.

3) Trying to create flexible and custom solution for hand gestures.


## Installation

Clone repository in your IDE and run the following command.

```shell
$ npm start
```

If your local machine doesn't have npm installed follow the doc to install npm [`here`](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm). 

## Video Example

The link below demonstrates what hand gesture correlates to what command and showcases how it works with the emulator.

Link: https://youtu.be/dDTieCGlgBY

### Future Plans

We are currently working on expanding the project to include a LAN multiplayer setting and expanding on the motion sensor to a full body motion sensor that can capture games like Mortal Kombat.

## Contributors

 * Euegene Li
 * Benny Cortese
 * Leon Kwan
 * Tianwei Xie




