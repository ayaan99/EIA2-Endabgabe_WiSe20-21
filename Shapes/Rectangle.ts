namespace Final_Firework {
    export class Rectangle extends Particle {
        private width: number;
        private height: number;

        constructor(x: number, y: number, color: string, velocity: Vector, width: number, height: number) {
            super(x, y, color, velocity);
            this.width = width;
            this.height = height;
        }

        draw(): void {
             //rectangle
            crc.save();
            crc.beginPath();
            crc.fillStyle = this.color;
            crc.fillRect(this.x, this.y, this.width, this.height);
            crc.closePath();
            crc.restore();
        }
    }
}