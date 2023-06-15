class SmallChicken extends MovableObject {
    y = 370;
    height = 50;
    width = 60;
    smallChicken = true;

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    offset = {
        top: 5,
        left: 5,
        right: 5,
        bottom: 5
    };


    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);

        this.x = 500 + Math.random() * 1300; //Zahl zwischen 200 und 700
        this.speed = 0.15 + Math.random() * 0.7;

        this.animate();
    }


    /**
     * Animate the small chicken if its walk or if its die
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
                this.loadImage('img/3_enemies_chicken/chicken_small/2_dead/dead.png');
            } else {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 1000 / 10);
    }
}