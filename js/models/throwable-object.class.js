class ThrowableObject extends MovableObject {
    BOTTLE_ROTATION = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    BOTTLE_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

    bottleHit = false;
    startThrow = false;
    stopThrow = false;
    otherDirection = false;

    offset = {
        top: 10,
        left: 20,
        right: 20,
        bottom: 10
    };

    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.BOTTLE_ROTATION);
        this.loadImages(this.BOTTLE_SPLASH);
        this.x = x;
        this.y = y;
        this.height = 80;
        this.width = 70;
        this.animateRotation();
        this.animateBottleHit();
    }


    /**
     * This function set the speedY of the throwable object (bottle) to 25 and make it possible, that the character can throw a bottle
     * 
     */
    throw() {
        if (this.otherDirection == false) {
            this.speedY = 25;
            this.applyGravity();

            setInterval(() => {
                this.x += 7;
            }, 25);
        }
    }


    /**
     * This function work like above, but the bottle will be throw to the other direction
     * 
     */
    throwOtherDirection() {
        if (this.otherDirection) {
            this.speedY = 25;
            this.applyGravity();

            setInterval(() => {
                this.x -= 7;
            }, 25);
        }

    }


    /**
     * Play the animation for the bottle rotation
     * 
     */
    animateRotation() {
        setInterval(() => {
            if (this.startThrow) {
                this.playAnimation(this.BOTTLE_ROTATION);
            }
        }, 1000 / 20);
    }


    /**
     * Play the animation for the bottle splash
     * 
     */
    animateBottleHit() {
        setInterval(() => {
            if (this.bottleHit) {
                this.playAnimation(this.BOTTLE_SPLASH);
            }
        }, 1000 / 50);
    }
}