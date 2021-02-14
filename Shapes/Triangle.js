"use strict";
var Final_Firework;
(function (Final_Firework) {
    class Triangle extends Final_Firework.Particle {
        constructor(x, y, color, velocity, size) {
            super(x, y, color, velocity);
            this.size = size;
        }
        draw() {
            //triangle
            Final_Firework.crc.save();
            Final_Firework.crc.beginPath();
            Final_Firework.crc.moveTo(this.x, this.y);
            Final_Firework.crc.lineTo(this.x + this.size, this.y + this.size);
            Final_Firework.crc.lineTo(this.x + this.size, this.y - this.size);
            Final_Firework.crc.fillStyle = this.color;
            Final_Firework.crc.fill();
            Final_Firework.crc.closePath();
            Final_Firework.crc.restore();
        }
    }
    Final_Firework.Triangle = Triangle;
})(Final_Firework || (Final_Firework = {}));
//# sourceMappingURL=Triangle.js.map