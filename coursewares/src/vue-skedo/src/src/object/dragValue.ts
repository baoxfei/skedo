

type Vec = [number, number]

export class DragValue {

  private startX : number = 0
  private startY : number = 0
  private diffX : number = 0
  private diffY : number = 0

  start([x, y]: Vec) {
    this.startX = x;
    this.startY = y;
    this.diffX = 0
    this.diffY = 0
  }

  update([x, y]: Vec) {
    this.diffX = x - this.startX;
    this.diffY = y - this.startY;
  }
  
  getDiffX() {
    return this.diffX
  }

  getDiffY() {
    return this.diffY
  }
}