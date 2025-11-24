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
            this.input = new InputHandler();
        }

        update(){
            this.bird.update();
            this.floor1.update();
            this.floor2.update();
        }

        draw(context){
            this.bird.draw(context);
            this.floor1.draw(context);
            this.floor2.draw(context);
        }
    }

    const game = new Game(canvas.width, canvas.height);
    console.log(game);

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
    }

    update(){
        this.currentTime++;
        if(this.currentTime == this.animationRate){
            this.currentTime = 0;
            this.animationFrame++;
            if(this.animationFrame == 8){
                this.animationFrame = 0;
            }
        }
    }

    draw(context){
        context.drawImage(this.image[this.animationFrame], 0, 0, 320, 320,  this.x, this.y, this.width, this.height);
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
        this.animationRate = 2;
        this.currentTime = 0
    }

    update(){
        this.currentTime++;
        this.x -= 2;
        if(this.currentTime == this.animationRate){
            this.currentTime = 0;
        }
        if(this.x == -this.width){
            this.x = this.width
        }
    }

    draw(context){
        context.drawImage(this.image, 0, 0, this.width, this.height = 100,  this.x, this.y, this.width, this.height);
    }
}


class InputHandler{
    constructor(){
        this.keys = [];
        window.addEventListener('keydown', e => {
            console.log(e.key);
        });
    }
}