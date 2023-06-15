class StatusBarCoins extends DrawableObject {
    IMAGES = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png'
    ];

    coinsAmount = 0;

    constructor() {
        super();
        this.loadImage('img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png');
        this.loadImages(this.IMAGES);
        this.x = 10;
        this.y = 80;
        this.width = 170;
        this.height = 50;
        this.setCoinsAmount(0);
    }


    /**
     * This function will call from outside and will set a new value for the coinsAmount variable 
     * 
     * @param {*} coinsAmount - Amount of the colledcted coins
     */
    setCoinsAmount(coinsAmount) {
        this.coinsAmount = coinsAmount; 
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }


    /**
     * Set a new number which will used to set a new img 
     * 
     * @returns - Return the number which will use to show the right img
     */
    resolveImageIndex() {
        if (this.coinsAmount == 8) {
            return 5;
        } else if (this.coinsAmount >= 6) {
            return 4;
        } else if (this.coinsAmount >= 4) {
            return 3;
        } else if (this.coinsAmount >= 2) {
            return 2;
        } else if (this.coinsAmount == 1) {
            return 1;
        } else {
            return 0;
        }
    }
}