import Vector2 from "./vector";

export default function intersects(circle, rect) {
  const circleDistance = new Vector2(
    Math.abs(circle.x - rect.x),
    Math.abs(circle.y - rect.y),
  );

  if (circleDistance.x > (rect.width / 2 + circle.radius)) {
    return false;
  }

  if (circleDistance.y > (rect.height / 2 + circle.radius)) {
    return false;
  }

  if (circleDistance.x <= (rect.width / 2)) {
    return true;
  }

  if (circleDistance.y <= (rect.height / 2)) {
    return true;
  }

  const cornerDistance = Math.pow((circleDistance.x - rect.width / 2), 2) + Math.pow((circleDistance.y - rect.height / 2), 2);

  return (cornerDistance <= Math.pow(circle.radius, 2))

}