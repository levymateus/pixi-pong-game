import "./ui"
import "./assets"
import Main from "./main"

window.onload = function() {
  Main.play();
}

window.onblur = function() {
  Main.pause();
}
