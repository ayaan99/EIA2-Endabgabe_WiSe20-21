"use strict";
var Final_Firework;
(function (Final_Firework) {
    class Rectangle extends Final_Firework.Particle {
        constructor(x, y, color, velocity, width, height) {
            super(x, y, color, velocity);
            this.width = width;
            this.height = height;
        }
        draw() {
            //rectangle
            Final_Firework.crc.save();
            Final_Firework.crc.beginPath();
            Final_Firework.crc.fillStyle = this.color;
            Final_Firework.crc.fillRect(this.x, this.y, this.width, this.height);
            Final_Firework.crc.closePath();
            Final_Firework.crc.restore();
        }
    }
    Final_Firework.Rectangle = Rectangle;
})(Final_Firework || (Final_Firework = {}));
//# sourceMappingURL=Rectangle.js.map