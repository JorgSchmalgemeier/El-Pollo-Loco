class Character extends MovableObject {
    y = 185;
    height = 245;
    width = 130;
    speed = 10;
    bottleAmount = 0;
    coinsAmount = 0;
    world;
    sleeping = false;
    timeoutSleep = false;
    sleepingTimeout;
    gameOver = false;


    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png',
    ];

    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];

    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png',
    ];

    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png',
    ];

    IMAGES_SLEEP = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];


    offset = {
        top: 120,
        left: 30,
        right: 40,
        bottom: 30
    };


    walking_sound = new Audio('audio/running.mp3');
    hurt_sound = new Audio('audio/character_hurt.mp3');
    jump_sound = new Audio('audio/character_jump.mp3');


    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_SLEEP);
        this.applyGravity();
        this.animate();
    }

    
    /**
     * This function moves the character and play different animations in different game situations
     * 
     */
    animate() {
        setInterval(() => this.moveCharacter(), 1000 / 60);
        setInterval(() => this.playCharacter(), 100);
    }


    /**
     * Move the character if a key is pressed which is used for the game
     * 
     */
    moveCharacter() {
        this.walking_sound.pause();
        if (this.canMoveRight())
            this.moveRight();
        if (this.canMoveLeft())
            this.moveLeft();
        if (this.canJump()) {
            this.jump();
            if (!soundMute) {
                this.jump_sound.play(); 
            }
            
        }
        this.world.camera_x = -this.x + 100;
    }


    /**
     * 
     * @returns This is the condition to move right 
     * 
     */
    canMoveRight() {
        return this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x;
    }


    /**
     * The character move right
     * 
     */
    moveRight() {
        super.moveRight();
        this.otherDirection = false;
        if (!soundMute) {
            this.walking_sound.play();
        }
    }


    /**
     * 
     * @returns This is the condition to move left
     * 
     */
    canMoveLeft() {
        return this.world.keyboard.LEFT && this.x > 0;
    }


    /**
     * The character move left
     */
    moveLeft() {
        super.moveLeft();
        this.otherDirection = true;
        if (!soundMute) {
            this.walking_sound.play();
        }
    }


    /**
     * 
     * @returns This is the condition for a jump
     * 
     */
    canJump() {
        return this.world.keyboard.SPACE && !this.isAboveGround();
    }


    /**
     * This function plays the different animations for the character
     * 
     */
    playCharacter() {
        if (this.isDead()) 
            this.characterDead();
        else if (this.isHurt()) 
            this.characterHurts();
        else if (this.isAboveGround()) 
            this.characterIsAboveGround();
        else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) 
            this.characterWalk();
        else if (this.sleeping)
            this.playAnimation(this.IMAGES_SLEEP);
        else 
            this.characterIdle();
    }


    /**
     * Play animation for dead character
     * 
     */
    characterDead() {
        this.sleeping = false;
        this.timeoutSleep = false;
        clearTimeout(this.sleepingTimeout);
        this.gameOver = true;
        this.playAnimation(this.IMAGES_DEAD);
    }


    /**
     * Play animation if an enemie hurts the character
     * 
     */
    characterHurts() {
        this.sleeping = false;
        this.timeoutSleep = false;
        clearTimeout(this.sleepingTimeout);
        this.playAnimation(this.IMAGES_HURT);
    }


    /**
     * If the chacater is above the ground, this function will play the jump animation
     * 
     */
    characterIsAboveGround() {
        this.sleeping = false;
        this.timeoutSleep = false;
        clearTimeout(this.sleepingTimeout);
        this.playAnimation(this.IMAGES_JUMPING);
    }


    /**
     * If the character walkt, this function will play the walk animation
     * 
     */
    characterWalk() {
        this.sleeping = false;
        this.timeoutSleep = false;
        clearTimeout(this.sleepingTimeout);
        this.playAnimation(this.IMAGES_WALKING);
    }


    /**
     * If the character do nothing, this function will play the idl animation. After 4 sec the function plays the sleep animation.
     * 
     */
    characterIdle() {
        this.sleeping = false;
        this.playAnimation(this.IMAGES_IDLE);
        if (!this.timeoutSleep) {
            this.sleepingTimeout = setTimeout(() => {
                this.sleeping = true;
            }, 4000);
            this.timeoutSleep = true;
        }
    }


    /**
     * This function set the speedY up to 30 and this bring the character to jump
     * 
     */
    jump() {
        this.speedY = 30;
    }


    /**
     * If an enemie hits the character, the character lose energy
     * 
     */
    hit() {
        this.energy -= 0.5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
        if (!soundMute) {
            this.hurt_sound.play();
        }
    }
}