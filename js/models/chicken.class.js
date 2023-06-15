class Chicken extends MovableObject {
    y = 350;
    height = 70;
    width = 80;
    smallChicken = false;

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    };


    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);

        this.x = 1000 + Math.random() * 1300; //number between 200 and 700
        this.speed = 0.15 + Math.random() * 1.6;

        this.animate();
    }


    /**
     * Animate the chicken if its walk or if its die
     * 
     */
    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
        this.animateDead();
    }


    /**
     * Animate the chicke if its die
     * 
     */
    animateDead() {
        setInterval(() => {
            if (this.energy == 10) {
                this.loadImage('img/3_enemies_chicken/chicken_normal/2_dead/dead.png');
            } else {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 200);
    }
}