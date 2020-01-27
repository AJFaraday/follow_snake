if (typeof Enemies === 'undefined') {
  Enemies = {}
}

Enemies.Chaser = class Chaser extends mix(Concerns.Follower, Concerns.Catchable, Concerns.TailBiter) {
  constructor(x, y) {
    super();
    this.target = Player.head;

    this.x = x;
    this.y = y;
    this.size = 20;
    this.colour = 'rgba(255,0,0,0.6)';

    this.turn_speed = 10; // up to 100
    this.speed = 20;
    this.angle = Utils.angleBetweenPoints(this, Player.head);
    this.history = [];
    Game.updatables.push(this);
    Game.drawables.push(this);
  }

  update() {
    this.move();
    this.bite_tail();
    if (this.caught()) {
      Player.health.decrement(5);
      this.remove();
    }
  };

  get_speed() {
    return this.speed;
  };

  draw() {
    Game.canvas.draw_circle(this);
  };

};
