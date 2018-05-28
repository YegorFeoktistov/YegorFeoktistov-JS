export class Bullet {
  public id: number;
  public x: number;
  public y: number;
  public direction: number;

  public constructor(id: number, x: number, y: number, direction: number) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.direction = direction;
  }
}