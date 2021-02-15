namespace Final_Firework {
    export class Circle extends Particle {
        private radius: number;

        constructor(x: number, y: number, color: string, velocity: Vector, radius: number) {
            super(x, y, color, velocity);
            this.radius = radius;
        }

        public draw(): void {
            // circle
            crc.save(); 
            crc.globalAlpha = 1;
            crc.beginPath();
            crc.arc(this.x, this.y, this.radius, 0 * Math.PI, 2 * Math.PI);
            crc.fillStyle = this.color;
            crc.fill();
            crc.closePath();
            crc.restore();
        }
    }
}