"use strict";
var Final_Firework;
(function (Final_Firework) {
    class Circle extends Final_Firework.Particle {
        constructor(x, y, color, velocity, radius) {
            super(x, y, color, velocity);
            this.radius = radius;
        }
        draw() {
            // circle
            Final_Firework.crc.save();
            Final_Firework.crc.globalAlpha = 1;
            Final_Firework.crc.beginPath();
            Final_Firework.crc.arc(this.x, this.y, this.radius, 0 * Math.PI, 2 * Math.PI);
            Final_Firework.crc.fillStyle = this.color;
            Final_Firework.crc.fill();
            Final_Firework.crc.closePath();
            Final_Firework.crc.restore();
        }
    }
    Final_Firework.Circle = Circle;
})(Final_Firework || (Final_Firework = {}));
//# sourceMappingURL=Circle.js.map