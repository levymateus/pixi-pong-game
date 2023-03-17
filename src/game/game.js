import app, { appWidth, appHeight, paused, pause, menu } from "./app";
import Keyboard from "./keyboard";
import NPCPlayer from "./npcplayer";
import Player from "./player";
import Ball from "./ball";
import intersects from "./intersects";
import { ObservablePoint } from "pixi.js";
import Vector2 from "./vector";
import { random } from "./utils";

let collider = null;
let isGameOver = false;

export function gameover() {
  isGameOver = true;
}

export function resume() {
  isGameOver = false;
}

const dificult = 0.01;
const speed = new Vector2(3.0, 4.0);

const player = new Player(appWidth / 2, appHeight - 30);

player.name = 'dev'

const player2 = new NPCPlayer(appWidth / 2, 60);

const ball = new Ball({
  x: appWidth / 2,
  y: appHeight / 2,
  radius: 10,
  color: '#ebe834'
});

ball.speed.y = speed.y;

const balls = [ball];
const players = [player, player2];

function handler(ball) {

  players.forEach((player) => {
    const isCollide = intersects(ball, player)

    if (isCollide && player.id === 'player' && collider?.id !== 'player') {
      ball.speed.y = -speed.y;
      ball.speed.x = random(-speed.x, speed.x);

      player.score.add(ball.value);
      player.score.render();

      speed.x += player.score.count * dificult;
      speed.y += player.score.count * dificult;

      player.speed.x += player.score.count * dificult;
    }

    if (isCollide && player.id === 'npcplayer' && collider?.id !== 'npcplayer') {
      ball.speed.y = speed.y;
      ball.speed.x = random(-speed.x, speed.x);
    }

    if (isCollide) {
      collider = player;
    }

  })

  if (ball.x >= appWidth) {
    ball.speed.x = speed.x * -1;
  }

  if (ball.x <= 0) {
    ball.speed.x = speed.x * 1;
  }

  if (!isGameOver && (ball.y >= appHeight || ball.y <= 0)) {

    menu.open();
    gameover();
    pause();
    player.score.save();

    ball.x = appWidth / 2;
    ball.y = appHeight/ 2;

    ball.speed.y = speed.y;
    ball.speed.x = 0;


    speed.x = 3.0;
    speed.y = 4.0;

    player.speed.x = 3.5;
    player.x = appWidth / 2;

    player.score.reset();
    player.score.render();
    collider = null;

  }

  if (ball.x + player2.width / 2 <= appWidth && ball.x - player2.width / 2 >= 0) {
    player2.x = ball.x;
  }

}

balls.forEach(ball =>  {
  ball.position = new ObservablePoint(() => handler(ball), 'position', ball.x, ball.y)
})

app.ticker.add(function (delta) {

  Keyboard.update();

  balls.forEach((b) => {
    if (!paused) {
      b.update(delta);
    }
    b.render();
  });

  players.forEach((p) => {
    if (!paused) {
      p.update(delta);
    }
    p.render();
  });

});
