// To load
window.addEventListener('load', function(){
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext('2d');
    canvas.width = 500;
    canvas.height = 500;

    class Game {
        constructor(width, height){
            this.width = width;
            this.height = height;
            this.bird = new Bird(this);
            this.floor1 = new Floor(this, 0);
            this.floor2 = new Floor(this, canvas.width);
            this.spike1= new Spike(this, false, this.width, (this.height-50)/2);
            this.spike2= new Spike(this, true, this.width + 250, -150);
            this.egg = new Egg(this);
            this.input = new InputHandler();
            this.gameActive = true;
        }

        checkCollision(){
            const bird = this.bird;

            // Bird vs spikes
            if (this.intersects(bird, this.spike1) || this.intersects(bird, this.spike2)) {
                this.gameActive = false;
            }

            // Bird vs floor and roof
            if (bird.y + bird.height - 35 > this.height - 100 || bird.y + 50 < 0) {
                this.gameActive = false;
            }
        }

        // For bird and spike intersection
        // This function was made with the help of AI
        intersects(bird, spike) {
            // Use the ACTUAL drawn dimensions (scaled by 2)
            const spikeWidth = spike.width * 2;
            const spikeHeight = spike.height * 2;
            const half = spikeWidth / 2; // Center of the triangle base
            const slope = spikeHeight / half; // How steep the triangle is

            // Get the spike's actual position accounting for rotation
            let spikeLeft, spikeTop;
            
            if (spike.rotate) {
                // Rotated spike: after translate and rotate, position shifts
                spikeLeft = spike.x - spike.width;
                spikeTop = spike.y - spike.height;
            } else {
                spikeLeft = spike.x;
                spikeTop = spike.y;
            }

            // Check if bird is horizontally within spike range
            const birdRight = bird.x + bird.width;
            const spikeRight = spikeLeft + spikeWidth;
            
            if (birdRight < spikeLeft || bird.x > spikeRight) {
                return false; // No horizontal overlap, can't collide
            }

            // Check both left and right edges of the bird AND some middle points
            const checkPoints = [
                bird.x + 5,                          // Left edge
                bird.x + bird.width / 2,         // Middle
                bird.x + bird.width - 5             // Right edge
            ];

            for (const bx of checkPoints) {
                const localX = bx - spikeLeft;
                if (localX < 0 || localX > spikeWidth) continue;

                // Distance from center of the triangle base
                const distFromCenter = Math.abs(localX - half);
                
                // Calculate how tall the triangle is at this X position
                // At the center (distFromCenter = 0), height = spikeHeight (the peak)
                // At the edges (distFromCenter = half), height = 0 (the base)
                const triangleHeightAtX = spikeHeight - (slope * distFromCenter);

                if (!spike.rotate) {
                    // UPWARD pointing spike
                    // Base is at bottom (spikeTop + spikeHeight), peak is at top (spikeTop)
                    const spikePointY = spikeTop + spikeHeight - triangleHeightAtX;
                    
                    // Check if bird's bottom overlaps with the spike
                    if (bird.y + bird.height - 40 > spikePointY) {
                        return true;
                    }
                } else {
                    // DOWNWARD pointing spike
                    // Base is at top (spikeTop), peak points down
                    const spikePointY = spikeTop + triangleHeightAtX;
                    
                    // Check if bird's top overlaps with the spike
                    if (bird.y + 30< spikePointY ) {
                        return true;
                    }
                }
            }
            return false;
        }

        update(){
            if(this.gameActive == true){
                this.bird.update(this.input);
                this.floor1.update();
                this.floor2.update();
                this.spike1.update();
                this.spike2.update();
                this.egg.update();
                this.checkCollision();
            }
        }

        draw(context){
            this.bird.draw(context);
            this.floor1.draw(context);
            this.floor2.draw(context);
            this.spike1.draw(context);
            this.spike2.draw(context);
            this.egg.draw(context);
        }
    }

    const game = new Game(canvas.width, canvas.height);

    function animate(){
        context.clearRect(0, 0, canvas.width, canvas.height);
        game.update();
        game.draw(context);
        requestAnimationFrame(animate);
    }

    animate();
});

class Bird{
    constructor(game){
        this.game = game;
        this.width = 100;
        this.height = 100;
        this.x = this.game.width/4;
        this.y = this.game.height/2 - 160;
        this.image = [bird1, bird2, bird3, bird4, bird5, bird6, bird7, bird8];
        this.animationFrame = 0;
        this.animationRate = 5;
        this.currentTime = 0
        this.gravity = 0.05;
        this.gravitySpeed = 0;
    }

    update(input){
        this.gravitySpeed += this.gravity;
        this.y += this.gravitySpeed;
        this.currentTime++;
        if(this.currentTime == this.animationRate){
            this.currentTime = 0;
            this.animationFrame++;
            if(this.animationFrame == 8){
                this.animationFrame = 0;
            }
        }

        // Jump
        if(input.space == true){
            this.gravitySpeed = -3;
            input.space = false;
        }
    }

    draw(context){
        context.drawImage(this.image[this.animationFrame], 0, 0, 320, 320, this.x, this.y, this.width, this.height);
    }
}

class Floor{
    constructor(game, x){
        this.game = game;
        this.width = game.width;
        this.height = 100;
        this.x = x;
        this.y = game.height - this.height;
        this.image = floor;
    }

    update(){
        this.x -= 5; // Has to a be multiple of 500
        if(this.x == -this.width){
            this.x = this.width;
        }
    }

    draw(context){
        context.drawImage(this.image, 0, 0, this.width, this.height,  this.x, this.y, this.width, this.height);
    }
}

class Spike{
    constructor(game, rotate, x, y){
        this.game = game;
        this.width = 50;
        this.height = 300;
        this.x = x;
        this.y = y;
        this.image = spike;
        this.rotate = rotate;
    }

    update(){
        this.x -= 2;
        if(this.x == -this.game.width){
            this.x = 600;
        }
    }

    draw(context){
        if(this.rotate){
            context.save();
            context.translate(this.x + this.width, this.y + this.height);
            context.rotate(Math.PI);
            context.drawImage(this.image, 0, 0, this.width, this.height, 0, 0, this.width * 2, this.height * 2);
            context.restore();
        } else {
            context.drawImage(this.image, 0, 0, this.width, this.height, this.x, this.y, this.width * 2, this.height * 2);
        }
    }
}

class Egg{
    constructor(game){
        this.game = game;
        this.width = 30;
        this.height = 41;
        this.x = game.width*1.5;
        this.y = (game.height-100)/2;
        this.image = egg;
    }

    update(){
        this.x -= 2;
        if(this.x == -this.width){
            this.x = 750;
        }
    }

    draw(context){
        context.drawImage(this.image, 0, 0, this.width, this.height = 100,  this.x, this.y, this.width * 1.2, this.height * 1.2);
    }
}

class InputHandler{
    constructor(){
        this.space = false;
        window.addEventListener('keydown', e => {
            if (e.key === " "){
                this.space = true;
            }
        });
    }
}