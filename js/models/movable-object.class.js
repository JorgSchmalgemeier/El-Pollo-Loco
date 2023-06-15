class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;

    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    };

    /**
     * This function brings the character to fall down if he jumps and is in the air above the ground
     * 
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            } else {
                this.speedY = 0;
            }
        }, 1000 / 25);
    }


    /**
     * This function returns if the character is above the ground
     * 
     * @returns - Return true, if the character is above the ground
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 180;
        }
    }


    /**
     * This function checks is the character collids with an enemy
     * 
     * @param {object} mo - Movable Object 
     * @returns - Collision
     */
    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }


    /**
     * If an enemy hits the character, this function will be executed and the character lose energy
     * 
     */
    hit() {
        this.energy -= 0.5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }


    /**
     * This function returns the time of the last hit to now in seconds
     * 
     * @returns - Last hit to now in seconds
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; // Differenz in ms
        timepassed = timepassed / 1000; // Differnez in s
        return timepassed < 1;
    }


    /**
     * This function set the energy of the character to 0
     * 
     * @returns - Energy of the character
     */
    isDead() {
        return this.energy == 0;
    }


    /**
     * This function plays the animation of the img's, which are given into the function
     * 
     * @param {*} images - The img's which are used for the animation
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }


    /**
     * Increase the x value that the movable object will move to the right
     * 
     */
    moveRight() {
        this.x += this.speed;
    }


    /**
     * Decrease the x value that the movable object will move to the right
     * 
     */
    moveLeft() {
        this.x -= this.speed;
    }


    /**
     * Set the speedY value to 30 that the character will jump
     * 
     */
    jump() {
        this.speedY = 30;
    }
}