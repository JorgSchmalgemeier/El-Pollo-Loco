class Endboss extends MovableObject {
    height = 400;
    width = 250;
    y = 55;
    startWalking = false;
    energy = 2;
    firstContact = false;
    endbossGameOver = false;

    endboss_music = new Audio('audio/endboss_music.mp3');

    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png',
    ];

    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png',
    ];

    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png',
    ];

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png',
    ];


    offset = {
        top: 20,
        left: 20,
        right: 20,
        bottom: 0
    };


    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 2500;
        this.speed = 5;
        this.animateFirstContact();
        this.animate();
        this.animateHit();
    }


    /**
     * This function animats the endboss if he start running, if he hurt or if he is dead
     * 
     */
    animate() {
        this.intervallEnbossAnimation = setInterval(() => {
            if (this.endbossCanStart()) {
                this.playAnimation(this.IMAGES_WALKING);
                if (!soundMute) {
                    game_music.pause();
                    this.endboss_music.play();
                }
            } else if (this.endbossHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            } else if (this.endbossIsDead()) {
                this.speed = 0;
                this.endboss_music.pause();
                this.playAnimation(this.IMAGES_DEAD);
                this.endbossGameOver = true;
            }
        }, 200);
        this.checkDistance();
    }


    /**
     * 
     * @returns - This is the condition, that the endboss can start running
     * 
     */
    endbossCanStart() {
        return this.startWalking && !this.isHurt() && !this.isDead();
    }


    /**
     * 
     * @returns - This is the condition, that the endboss hurts
     * 
     */
    endbossHurt() {
        return this.startWalking && this.isHurt() && !this.isDead();
    }


    /**
    * 
    * @returns - This is the condition, that the endboss can die
    * 
    */
    endbossIsDead() {
        return this.startWalking && this.isDead();
    }


    /**
     * This function animats the endboss if the character meet the endboss for the first time
     * 
     */
    animateFirstContact() {
        let i = 0;
        clearInterval(this.intervallEnbossAnimation);
        this.endbossFirstContactIntervall = setInterval(() => {
            if (i < 10) {
                this.playAnimation(this.IMAGES_ALERT);
            } else {
                this.playAnimation(this.IMAGES_ATTACK);
            }
            i++;
            if (world.character.x > 1900 && !this.firstContact) {
                i = 0;
                this.firstContact = true;
            }
        }, 150);
    }


    /**
     * Animate a hit from the character to the endboss
     * 
     */
    animateHit() {
        setInterval(() => {
            if (this.endbossHit) {
                this.playAnimation(this.IMAGES_HURT);
            }
        }, 200);
    }


    /**
     * Check the distance if the endboss can start running or no
     * 
     */
    checkDistance() {
        setInterval(() => {
            if (this.startWalking) {
                this.moveLeft();
            }
        }, 1000 / 60);

    }
}