// We will use `strict mode`, which helps us by having the browser catch many common JS mistakes
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
"use strict";
const app = new PIXI.Application();

let sceneWidth, sceneHeight;

// aliases
let stage;
let assets;

// game variables
let startScene;
let gameScene, ship, scoreLabel, lifeLabel, shootSound, hitSound, fireballSound;
let gameOverScene;

let circles = [];
let bullets = [];
let aliens = [];
let explosions = [];
let explosionTextures;
let score = 0;
let life = 100;
let levelNum = 1;
let paused = true;

// Load all assets
loadImages();

async function loadImages() {
  // https://pixijs.com/8.x/guides/components/assets#loading-multiple-assets
  PIXI.Assets.addBundle("sprites", {
    spaceship: "images/spaceship.png",
    explosions: "images/explosions.png",
    move: "images/move.png",
  });

  // The second argument is a callback function that is called whenever the loader makes progress.
  assets = await PIXI.Assets.loadBundle("sprites", (progress) => {
    console.log(`progress=${(progress * 100).toFixed(2)}%`); // 0.4288 => 42.88%
  });

  setup();
}

async function setup() {
    await app.init({ width: 600, height: 600 });

    document.body.appendChild(app.canvas);

    stage = app.stage;
    sceneWidth = app.renderer.width;
    sceneHeight = app.renderer.height;

    // #1 - Create the `start` scene
    startScene = new PIXI.Container();
    stage.addChild(startScene);

    // #2 - Create the main `game` scene and make it invisible
    gameScene = new PIXI.Container();
    gameScene.visible = false;
    stage.addChild(gameScene);

    // #3 - Create the `gameOver` scene and make it invisible
    gameOverScene = new PIXI.Container();
    gameOverScene.visible = false;
    stage.addChild(gameOverScene);    

    // #4 - Create labels for all 3 scenes
    createLabelsAndButtons();


    // #5 - Create ship

    // #6 - Load Sounds

    // #7 - Load sprite sheet

    // #8 - Start update loop

    // #9 - Start listening for click events on the canvas

    // Now our `startScene` is visible
    // Clicking the button calls startGame()
}

function createLabelsAndButtons(){
    let buttonStyle = {
        fill: 0xff0000,
        fontSize: 48,
        fontFamily: "Verdana",
    };

    let startLabel1 = new PIXI.Text({
        text: "Circle Blast!",
        style: {
            fill: 0xffffff,
            fontSize: 96,
            fontFamily: "Verdana",
            stroke: {color: 0xff0000, width: 6},
        },
    });

    startLabel1.x = 50;
    startLabel1.y = 120;
    startScene.addChild(startLabel1);

    let startLabel2 = new PIXI.Text({
        text: "R U Worthy..?",
        style: {
            fill: 0xffffff,
            fontSize: 32,
            fontFamily: "Verdana",
            stroke:{color: 0xff0000, width: 6},
        },  
    });

    startLabel2.x = 185;
    startLabel2.y = 300;
    startScene.addChild(startLabel2);

    let startButton = new PIXI.Text({text: "Enter, if you dare!", style: buttonStyle});
    startButton.x = sceneWidth / 2 - startButton.width /2;
    startButton.y = sceneHeight- 100;

    startButton.eventMode = "static";
    startButton.cursor = "pointer";

    startButton.on("pointerup", startGame);
    startButton.on("pointerover", (e) => (e.target.alpha = 0.7));
    startButton.on("pointerout", (e) => (e.currentTarget.alpha = 1.0));

    startScene.addChild(startButton)
}

function startGame(){
    startScene.visible = false;
    gameOverScene.visible = false;
    gameScene.visible = true;
}