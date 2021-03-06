class Game {

  static init() {
    this.width = 1024;
    this.height = 768;

    this.canvas = new Canvas();

    window.onmousemove = Game.follow_mouse;
    window.ontouchstart = Game.follow_touch;
    window.ontouchmove = Game.follow_touch;

    Player.init();

    Game.drawables = [Player.head, Player.score, Player.health];
    Game.updatables = [Player.head];

    Game.goals = [];
    Game.add_goals();

    Game.draw_loop = setInterval(
      function () {
        requestAnimationFrame(Game.draw)
      },
      10
    );
    Game.update_loop = setInterval(Game.update, 10);

    this.tick = 0;
  }

  static update() {
    Game.updatables.forEach(
      function (updatable) {
        updatable.update();
      }
    );
    Game.tick++;
  }

  static draw() {
    Game.canvas.clear();
    Game.drawables.forEach(
      function (drawable) {
        drawable.draw();
      }
    );
    Game.do_script_actions();
  }

  static follow_mouse(e) {
    e.preventDefault();
    Player.set_target(e.clientX, e.clientY);
  }

  static follow_touch(e) {
    e.preventDefault();
    Player.set_target(e.targetTouches[0].pageX, e.targetTouches[0].pageY);
  }

  static add_goals() {
    if (Game.goals.length == 0) {
      var no_to_add = Math.floor(Player.score.value / 10) + 1;
      for (var x = no_to_add; x > 0; x--) {
        new Static.Goal();
      }
    }
  }

  static add_obstacles() {
    if (Game.goals.length == 1) {
      var no_to_add = Math.floor(Player.score.value / 10);
      for (var x = no_to_add; x > 0; x--) {
        new Static.Obstacle();
      }
    }
  }

  static do_script_actions() {
    Script.Actions.run_without_type(Player.score.value);
  }

  static end() {
    clearInterval(Game.draw_loop);
    clearInterval(Game.update_loop);

    setTimeout(
      function () {
        Game.draw();
        Player.health.draw();
        Game.canvas.draw_text(
          "GAME OVER!",
          512,
          200,
          "#ff0000",
          "center",
          100
        );
        Game.canvas.draw_text(
          "FINAL SCORE: " + Player.score.value,
          512,
          300,
          "#ff0000",
          "center",
          100
        );
      },
      500
    )
  }

}