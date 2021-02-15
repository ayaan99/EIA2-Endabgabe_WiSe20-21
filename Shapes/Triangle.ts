namespace Final_Firework {
    export class Triangle extends Particle {
        private size: number;

        constructor(x: number, y: number, color: string, velocity: Vector, size: number) {
            super(x, y, color, velocity);
            this.size = size;
        }

        draw(): void {
            //triangle
            crc.save();
            crc.beginPath();
            crc.moveTo(this.x, this.y);
            crc.lineTo(this.x + this.size, this.y + this.size);
            crc.lineTo(this.x + this.size, this.y - this.size);
            crc.fillStyle = this.color;
            crc.fill();
            crc.closePath();
            crc.restore();
        }
    }
}