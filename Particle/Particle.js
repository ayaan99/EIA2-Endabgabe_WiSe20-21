"use strict";
var Final_Firework;
(function (Final_Firework) {
    class Particle {
        constructor(x, y, color, velocity) {
            this.x = x;
            this.y = y;
            this.color = color;
            this.velocity = velocity;
            this.opacity = 1;
        }
        draw() {
            //different shape defined in sub classes
        }
        move() {
            this.draw();
            this.velocity.x *= Final_Firework.friction;
            this.velocity.y *= Final_Firework.friction;
            this.velocity.y += Final_Firework.gravity;
            this.x += this.velocity.x;
            this.y += this.velocity.y;
            this.opacity -= 0.009;
        }
    }
    Final_Firework.Particle = Particle;
})(Final_Firework || (Final_Firework = {}));
//# sourceMappingURL=Particle.js.map