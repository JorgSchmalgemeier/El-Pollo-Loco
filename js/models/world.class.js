class World {
    character = new Character();
    level = level1;
    endboss = new Endboss();
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBarHealth = new StatusBarHealth();
    statusBarBottles = new StatusBarBottles();
    statusBarCoins = new StatusBarCoins();
    statusBarEndboss = new StatusBarEndboss();
    throwableObjects = [];
    soundOff = false;

    chicken_sound = new Audio('audio/chicken.mp3');
    small_chicken_sound = new Audio('audio/small_chicken.mp3');
    bottle_sound = new Audio('audio/bottle.mp3');
    coin_sound = new Audio('audio/coin.mp3');
    angry_endboss_sound = new Audio('audio/angry_endboss.mp3');
    bottle_splash_sound = new Audio('audio/bottle_splash.mp3');
    bottle_rotate_sound = new Audio('audio/bottle_rotate.mp3');


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
        this.putCloudsInPlace();
        this.putEnemiesInPlace();
        this.putBottlesInPlace();
        this.increaseEnemieSpeed();
        this.putCoinsInPlace();
    }


    /**
     * Set the world object to the character class
     * 
     */
    setWorld() {
        this.character.world = this;
    }


    /**
     * Run different functions as a interval which are important for the game
     * 
     */
    run() {
        setInterval(() => {
            this.checkAirCollisions();
            this.checkCollisions();
            this.checkCollisionEndboss();
            this.checkBottleCollisions();
            this.checkBottleCollisionEndboss();
            this.checkCollectingBottle();
            this.checkCollectingCoins();
            this.endbossStart();
            this.checkGameOver();
            this.checkWinGame();
            this.checkGameMusic();
            this.createStatusBarEndboss();
            this.changeStatusBarEndboss();
        }, 1000 / 50);
        this.checkThrowing();
    }


    /**
     * Check the conditions for throwing a bottle to both sides
     * 
     */
    checkThrowing() {
        setInterval(() => {
            this.checkThrowObjects();
            this.checkThrowObjectsOtherDirection();
        }, 200);
    }


    /**
     * Change the position of the statusbar from endboss if the user has a smaller device
     * 
     */
    changeStatusBarEndboss() {
        if (fullScreen && window.innerWidth < 1260 && window.innerWidth > 865) {
            this.statusBarEndboss.x = 240;
        }
        if (window.innerWidth < 865) {
            this.statusBarEndboss.y = 50;
        }
    }


    /**
     * Create the statusbar endboss
     * 
     */
    createStatusBarEndboss() {
        if (!this.endboss.startWalking) {
            this.statusBarEndboss.height = 0;
            this.statusBarEndboss.width = 0;
        } else {
            this.statusBarEndboss.height = 40;
            this.statusBarEndboss.width = 170;
        }
    }


    /**
     * Check if the game music should play or not
     * 
     */
    checkGameMusic() {
        if (!this.endboss.startWalking && game_music.currentTime == 73.586939) {
            game_music.currentTime = 0;
            game_music.play();
        }
        if (this.endboss.startWalking && this.soundOff) {
            this.endboss.endboss_music.pause();
        }
    }


    /**
     * Check if the endboss is dead and the game was won
     * 
     */
    checkWinGame() {
        if (this.endboss.endbossGameOver) {
            this.endboss.endboss_music.pause();
            this.character.walking_sound.pause();
            winGame();
        }
    }


    /**
     * Check if the character is game over and the game ends
     * 
     */
    checkGameOver() {
        if (this.character.gameOver) {
            this.endboss.endboss_music.pause();
            this.character.walking_sound.pause();
            gameOver();
        }
    }


    /**
     * If the character is close to the endboss, the endboss start walking
     * 
     */
    endbossStart() {
        if (this.character.x > 2100) {
            this.endboss.startWalking = true;
            clearInterval(this.endboss.endbossFirstContactIntervall);
        }
    }


    /**
     * Check if the character collects a bottle
     * 
     */
    checkCollectingBottle() {
        this.level.bottles.forEach((bottle) => {
            if (this.character.isColliding(bottle)) {
                this.character.bottleAmount++;
                this.statusBarBottles.setBottleAmount(this.character.bottleAmount);
                this.deleteCollectableBottle(bottle);
                if (!soundMute) {
                    this.bottle_sound.play();
                }
            }
        })
    }


    /**
     * Check if the character collects a coin
     * 
     */
    checkCollectingCoins() {
        this.level.coins.forEach((coin) => {
            if (this.character.isColliding(coin)) {
                this.character.coinsAmount++;
                this.statusBarCoins.setCoinsAmount(this.character.coinsAmount);
                this.deleteCollectableCoin(coin);
                if (!soundMute) {
                    this.coin_sound.play();
                }
            }
        })
    }


    /**
     * Check if the character is able to throw, if yes --> the character throw a bottle
     * 
     */
    checkThrowObjects() {
        if (this.canThrow()) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(bottle);
            bottle.throw();
            bottle.startThrow = true;
            this.character.bottleAmount--;
            this.statusBarBottles.setBottleAmount(this.character.bottleAmount);
            if (!soundMute) {
                this.bottle_rotate_sound.play();
            }
        }
    }


    /**
     * 
     * @returns This is the condition for a throw
     * 
     */
    canThrow() {
        return this.keyboard.D && this.character.bottleAmount > 0 && this.character.otherDirection == false;
    }


    /**
     * Check if the character is able to throw to the other direction, if yes --> the character throw a bottle to the left side
     * 
     */
    checkThrowObjectsOtherDirection() {
        if (this.canThrowOtherDirection()) {
            let bottle = new ThrowableObject(this.character.x, this.character.y + 100);
            bottle.otherDirection = true;
            this.throwableObjects.push(bottle);
            bottle.throwOtherDirection();
            bottle.startThrow = true;
            this.character.bottleAmount--;
            this.statusBarBottles.setBottleAmount(this.character.bottleAmount);
        }
    }


    /**
     * 
     * @returns This is the condition for a throw to the other direction (left side)
     * 
     */
    canThrowOtherDirection() {
        return this.keyboard.D && this.character.bottleAmount > 0 && this.character.otherDirection;
    }


    /**
     * Check if a thrown bottle collids with an enemie
     * 
     */
    checkBottleCollisions() {
        for (let i = 0; i < this.level.enemies.length; i++) {
            let enemy = this.level.enemies[i];
            this.throwableObjects.forEach((bottle) => {
                if (bottle.isColliding(enemy)) {
                    this.hitEnemy(enemy, bottle);
                }
            });
        }
    }


    /**
     * Hit the enemy, play the splash animation and delete the enemy
     * 
     * @param {*} enemy - For this enemy the function checks a collision with a bottle
     * @param {*} bottle - For this bottle the function checks a collision with an enemie
     */
    hitEnemy(enemy, bottle) {
        this.hitEnemySounds(enemy);
        bottle.bottleHit = true;
        bottle.y = enemy.y;
        bottle.speedY = -5;
        enemy.speed = 0;
        this.deleteEnemy(enemy);
    }



    /**
     * Check if the sound is on and play the hit sounds or not
     * 
     * @param {object} enemy - The enemy who is hitted
     */
    hitEnemySounds(enemy) {
        if (!soundMute) {
            this.bottle_splash_sound.play();
            if (enemy.smallChicken) {
                this.small_chicken_sound.play();
            } else {
                this.chicken_sound.play();
            }
        }
    }


    /**
     * Check if a thrown bottle collids with the endboss
     * 
     */
    checkBottleCollisionEndboss() {
        this.throwableObjects.forEach((bottle) => {
            if (bottle.isColliding(this.endboss)) {
                bottle.bottleHit = true;
                bottle.speedY = -5;
                this.endboss.hit();
                this.endboss.speed = 0;
                this.statusBarEndboss.setPercentage(this.endboss.energy);
                setTimeout(() => {
                    this.endboss.speed = 4.5;
                }, 1000);
                this.deleteBottle(bottle);
                if (!soundMute) {
                    this.angry_endboss_sound.play();
                }
            }
        });
    }


    /**
     * Check if the character collids with an enemy
     * 
     */
    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && this.character.speedY >= 0 && enemy.energy != 10) {
                this.character.hit();
                this.statusBarHealth.setPercentage(this.character.energy);
            }
        })
    }


    /**
     * Check if the character collids with the endboss
     * 
     */
    checkCollisionEndboss() {
        if (this.character.isColliding(this.endboss)) {
            this.character.energy = 0;
            this.character.hit();
            this.statusBarHealth.setPercentage(this.character.energy);
        }
    }


    /**
     * Check if the character jump from obove on an enemie
     * 
     */
    checkAirCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.isAirCollision(enemy)) {
                this.airCollisionSounds(enemy);
                enemy.energy = 10;
                enemy.speed = 0;
                this.changeX(enemy);
                setTimeout(() => {
                    this.deleteEnemy(enemy);
                }, 600);
            }
        })
    }


    /**
     * This function check if the sound is one and play the colliding sounds or not
     * 
     * @param {object} enemy - The colliding enemy
     */
    airCollisionSounds(enemy) {
        if (!soundMute) {
            if (enemy.smallChicken) {
                this.small_chicken_sound.play();
            } else {
                this.chicken_sound.play();
            }
        }
    }


    /**
     * This function change the y values from the died enemy
     * 
     * @param {object} enemy - This enemy the character jump on (collids with) 
     */
    changeX(enemy) {
        if (enemy.smallChicken) {
            enemy.y = 380;
        } else {
            enemy.y = 365;
        }
    }


    /**
     * This is the condition that the character can hit the enemy from obove
     * 
     * @param {object} enemy - For this enemy the function checks a collision 
     * @returns 
     */
    isAirCollision(enemy) {
        return this.character.isColliding(enemy) && this.character.speedY < 0 && enemy.energy != 10;
    }


    /**
     * Delete the enemy
     * 
     * @param {object} enemy - The enemy who should be delete 
     */
    deleteEnemy(enemy) {
        this.level.enemies.splice(this.level.enemies.indexOf(enemy), 1);
    }


    /**
     * Delete the enemy
     * 
     * @param {object} bottle - The bottle which should be delete 
     */
    deleteBottle(bottle) {
        this.throwableObjects.splice(this.throwableObjects.indexOf(bottle), 1);
    }


    /**
     * Delete the collectable bottle
     * 
     * @param {object} enemy - The collectable bottle which should be delete 
     */
    deleteCollectableBottle(bottle) {
        this.level.bottles.splice(this.level.bottles.indexOf(bottle), 1);
    }


    /**
     * Delete the collectable coin
     * 
     * @param {object} coin - The collectable coin which should be delete 
     */
    deleteCollectableCoin(coin) {
        this.level.coins.splice(this.level.coins.indexOf(coin), 1);
    }


    /**
     * This function draws all objects which are visible in the canvas
     * 
     */
    draw() {
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);

        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);

        this.drawFixedObjects();
        this.drawObjects();

        this.ctx.translate(-this.camera_x, 0);
        this.runDrawing();
    }


    /**
     * This function draws all statusbars
     * 
     */
    drawStatusBars() {
        this.addToMap(this.statusBarHealth);
        this.addToMap(this.statusBarBottles);
        this.addToMap(this.statusBarCoins);
        this.addToMap(this.statusBarEndboss);
    }


    /**
     * This function draws all fixed objects
     * 
     */
    drawFixedObjects() {
        this.ctx.translate(-this.camera_x, 0);
        // Space for fixed objects ---------
        this.drawStatusBars();
        this.ctx.translate(this.camera_x, 0);
    }


    /**
    * This function draws all objects (character, enemies, bottles and coins)
    * 
    */
    drawObjects() {
        this.addToMap(this.character);
        this.addToMap(this.endboss);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.throwableObjects);
    }


    /**
     * This function runs so often in a second how the grafic card is able to
     * 
     */
    runDrawing() {
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        })
    }


    /**
     * Put every enemie in place and give different x values
     * 
     */
    putEnemiesInPlace() {
        this.level.enemies[0].x = 500;
        this.level.enemies[1].x = 550;
        this.level.enemies[2].x = 750;
        this.level.enemies[3].x = 1100;
        this.level.enemies[4].x = 1200;
        this.level.enemies[5].x = 1500;
        this.level.enemies[6].x = 1550;
        this.level.enemies[7].x = 1600;
        this.level.enemies[8].x = 1800;
        this.level.enemies[9].x = 2450;
        this.level.enemies[10].x = 2500;
        this.level.enemies[11].x = 2550;
        this.level.enemies[12].x = 2950;
        this.level.enemies[13].x = 3200;
        this.level.enemies[14].x = 3400;
        this.level.enemies[15].x = 3600;
    }


    /**
     * Increase the speed of some enemies
     * 
     */
    increaseEnemieSpeed() {
        this.level.enemies[5].speed = 2.5;
        this.level.enemies[7].speed = 2;
        this.level.enemies[10].speed = 2.5;
        this.level.enemies[11].speed = 1.5;
    }


    /**
     * Put the clouds in place and give them different x values
     * 
     */
    putCloudsInPlace() {
        this.level.clouds[0].x = Math.random() * 500;
        this.level.clouds[1].x = Math.random() * 500 + 1000;
        this.level.clouds[2].x = Math.random() * 500 + 2000;
    }


    /**
     * Put all bottles in place and give them different x- and y values
     * 
     */
    putBottlesInPlace() {
        this.level.bottles[0].x = 400;
        this.level.bottles[1].x = 500;
        this.level.bottles[2].x = 840;
        this.level.bottles[2].y = 140;
        this.level.bottles[3].x = 900;
        this.level.bottles[3].y = 110;
        this.level.bottles[4].x = 960;
        this.level.bottles[4].y = 140;
        this.level.bottles[5].x = 1400;
        this.level.bottles[6].x = 1670;
        this.level.bottles[6].y = 190;
        this.level.bottles[7].x = 1700;
        this.level.bottles[7].y = 110;
        this.level.bottles[8].x = 1900;
        this.level.bottles[9].x = 1950;

    }


    /**
     * Put all coins in place and give them different x- and y values 
     * 
     */
    putCoinsInPlace() {
        this.level.coins[0].x = 650;
        this.level.coins[1].x = 720;
        this.level.coins[2].x = 1100;
        this.level.coins[3].x = 1300;
        this.level.coins[3].y = 200;
        this.level.coins[4].x = 1300;
        this.level.coins[4].y = 100;
        this.level.coins[5].x = 1750;
        this.level.coins[5].y = 105;
        this.level.coins[6].x = 2000;
        this.level.coins[7].x = 2200;
    }


    /**
     * This function adds different objects to the map
     * 
     * @param {array} objects - Different objects they should add to the map (for example chickens) 
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }


    /**
     * This function adds an object to the map 
     * 
     * @param {object} mo - Movable object which should add to the map  
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }

        mo.draw(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }


    /**
     * This function is used when the character move that the view move also and the character can run through the map
     * 
     * @param {object} mo - Movable object (character) 
     */
    flipImage(mo) {
        this.ctx.save(); //alle Eigenschaften von ctx werden gespeichert
        this.ctx.translate(mo.width, 0); //der x-Wert des ctx wird um die Breite des characters erhöht
        this.ctx.scale(-1, 1); //diese Zeile spiegelt das Bild um 180 Grad, die x-Achse des ctx wird verändert 
        mo.x = mo.x * -1; //x-Achse vom character wird gespiegelt, character wird dann von rechts nach links gezeichnet
    }


    /**
     * This function is used when the character move that the view move also and the character can run through the map
     * 
     * @param {object} mo - Movable object (character) 
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1; //x-Achse wird wieder zurück gespiegelt auf den ursprünglichen Wert
        this.ctx.restore(); // gespeicherte Eigenschaften werden wieder abgerufen
    }
}