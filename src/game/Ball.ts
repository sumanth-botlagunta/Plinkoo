import { gravity, horizontalFriction, verticalFriction } from "../constants";
import { Obstacle, Sink } from "../objects";
import { pad, unPad } from "../padding";

export class Ball {
  private x : number;
  private y : number;
  private radius : number;
  private color : string;
  private vx : number;
  private vy : number;
  private ctx : CanvasRenderingContext2D;
  private obstacles : Obstacle[];
  private sinks : Sink[];
  private onFinish: (index : number) => void;

  constructor(
    x: number,
    y: number,
    radius: number,
    color: string,
    vx: number,
    vy: number,
    ctx: CanvasRenderingContext2D,
    obstacles: Obstacle[],
    sinks: Sink[],
    onFinish: (index: number) => void
  ) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.vx = vx;
    this.vy = vy;
    this.ctx = ctx;
    this.obstacles = obstacles;
    this.sinks = sinks;
    this.onFinish = onFinish;
  }

  draw (){
    this.ctx.beginPath();
    this.ctx.arc(unPad(this.x), unPad(this.y), this.radius, 0, Math.PI*2);
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
    this.ctx.closePath();
  }

  update () {
    this.vy += gravity;
    this.x += this.vx;
    this.y += this.vy;
    this.obstacles.forEach(obstacle => {
      const dist = Math.hypot(this.x - obstacle.x, this.y - obstacle.y);
      if(dist < pad(this.radius + obstacle.radius)){
        const angle = Math.atan2(this.y - obstacle.y, this.x - obstacle.x);
        const speed = Math.sqrt(this.vx*this.vx + this.vy*this.vy);
        this.vx = Math.cos(angle)*horizontalFriction*speed;
        this.vy = Math.sin(angle)*verticalFriction*speed;
        const overlap = this.radius + obstacle.radius - unPad(dist);
        this.x = pad(Math.cos(angle) * overlap);
        this.y = pad(Math.sin(angle) * overlap);
      }
    })

    for(let i = 0; i < this.sinks.length; i++){
      const sink = this.sinks[i];
      if(unPad(this.x) > sink.x - sink.width/2 && unPad(this.x) < sink.x + sink.width/2 && (unPad(this.y) + this.radius) > (sink.y - sink.height/2)){
        this.vx = 0;
        this.vy = 0;
        this.onFinish(i);
        break;
      }
    }
  }
}
