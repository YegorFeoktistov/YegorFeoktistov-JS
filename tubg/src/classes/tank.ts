export class Tank {
  public id: number;
  public x: number;
  public y: number;
  public health: number;
  public direction: number;

  public constructor(id: number, x: number, y: number, health: number, direction: number) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.health = health;
    this.direction = direction;
  }
}