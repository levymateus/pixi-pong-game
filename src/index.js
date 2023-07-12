import "./ui"
import "./assets"
import Game from "./main"

window.onload = function() {
  Game.play();
}

window.onblur = function() {
  Game.pause();
}
