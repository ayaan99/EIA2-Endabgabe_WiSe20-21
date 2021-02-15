namespace Final_Firework {

    export class Particle {
        public x: number;
        public y: number;
        public velocity: Vector;
        public color: string;
        public opacity: number;

        constructor(x: number, y: number, color: string, velocity: Vector) {
            this.x = x;
            this.y = y;
            this.color = color;
            this.velocity = velocity;
            this.opacity = 1;
        }

        draw(): void {
            //different shape defined in sub classes
        }

        public move(): void {
            this.draw();
            this.velocity.x *= friction;
            this.velocity.y *= friction;
            this.velocity.y += gravity;
            this.x += this.velocity.x;
            this.y += this.velocity.y;
            this.opacity -= 0.009;
        }
    }
}