import app, { appWidth, appHeight, appPause } from "./app";
import Keyboard from "./keyboard";
import NPCPlayer from "./npcplayer";
import Player from "./player";
import Ball from "./ball";
import intersects from "./intersects";
import { ObservablePoint } from "pixi.js";
import Vector2 from "./vector";
import { random } from "./utils";
import { Score } from "./score";

let isGameOver = false;

const dificultCoef = 0.25;

export const score = new Score(0);

export function gameover() {
  isGameOver = true;
}

appPause.subscribe('enable', () => {
  if (isGameOver) {
    isGameOver = false;
  }
});

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

function observeBalls() {
  balls.forEach(ball =>  {
    ball.position = new ObservablePoint(() => handler(ball), 'position', ball.x, ball.y)
  });
}

observeBalls();

function handler(ball) {

  let collider = null;

  players.forEach((player) => {
    const isCollide = intersects(ball, player)

    if (isCollide && player.id === 'player' && collider?.id !== 'player') {
      ball.speed.y = -speed.y;
      ball.speed.x = random(-speed.x, speed.x);

      score.increment(ball.value);
      speed.x += dificultCoef;
      speed.y += dificultCoef;
      player.speed.x += dificultCoef;
      player.speed.y += dificultCoef;
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

    gameover();
    appPause.from(player).enable();

    ball.x = appWidth / 2;
    ball.y = appHeight/ 2;

    ball.speed.y = speed.y;
    ball.speed.x = 0;

    speed.x = 3.0;
    speed.y = 4.0;

    player.speed.x = 3.5;
    player.x = appWidth / 2;

    score.from(player).reset();
    collider = null;

  }

  if (ball.x + player2.width / 2 <= appWidth && ball.x - player2.width / 2 >= 0) {
    player2.x = ball.x;
  }

}


app.ticker.add(function (delta) {

  Keyboard.update();

  balls.forEach((b) => {
    if (!appPause.value) {
      b.update(delta);
    }
    b.render();
  });

  players.forEach((p) => {
    if (!appPause.value) {
      p.update(delta);
    }
    p.render();
  });

});
