class StatusBarBottles extends DrawableObject {
    IMAGES = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png'
    ];

    bottleAmount = 0;

    constructor() {
        super();
        this.loadImage('img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png');
        this.loadImages(this.IMAGES);
        this.x = 10;
        this.y = 40;
        this.width = 170;
        this.height = 50;
        this.setBottleAmount(0);
    }


    /**
     * This function will call from outside and will set a new value for the bottleAmount variable 
     * 
     * @param {*} coinsAmount - Amount of the colledcted bottles
     */
    setBottleAmount(bottleAmount) {
        this.bottleAmount = bottleAmount; 
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }


    /**
     * Set a new number which will used to set a new img 
     * 
     * @returns - Return the number which will use to show the right img
     */
    resolveImageIndex() {
        if (this.bottleAmount == 10) {
            return 5;
        } else if (this.bottleAmount > 8) {
            return 4;
        } else if (this.bottleAmount > 6) {
            return 3;
        } else if (this.bottleAmount > 4) {
            return 2;
        } else if (this.bottleAmount >= 2) {
            return 1;
        } else {
            return 0;
        }
    }
}