class StatusBarEndboss extends DrawableObject {
    IMAGES = [
        'img/7_statusbars/1_statusbar/4_statusbar_endboss/0.png',
        'img/7_statusbars/1_statusbar/4_statusbar_endboss/20.png',
        'img/7_statusbars/1_statusbar/4_statusbar_endboss/40.png',
        'img/7_statusbars/1_statusbar/4_statusbar_endboss/60.png',
        'img/7_statusbars/1_statusbar/4_statusbar_endboss/80.png',
        'img/7_statusbars/1_statusbar/4_statusbar_endboss/100.png'
    ];

    constructor() {
        super();
        this.loadImage('img/7_statusbars/1_statusbar/4_statusbar_endboss/100.png');
        this.loadImages(this.IMAGES);
        this.x = 540;
        this.y = 10;
        this.width = 170;
        this.height = 40;
        this.setPercentage(2);
    }


    /**
     * This function will call from outside and will set a new value for the percentage variable (energy of the endboss)
     * 
     * @param {number} percentage - Energy of the endboss 
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }


    /**
     * Set a new number which will used to set a new img 
     * 
     * @returns - Return the number which will use to show the right img
     */
    resolveImageIndex() {
        if (this.percentage == 2) {
            return 5;
        } else if (this.percentage > 1.4) {
            return 4;
        } else if (this.percentage > 1) {
            return 3;
        } else if (this.percentage > 0.5) {
            return 2;
        } else if (this.percentage > 0.4) {
            return 1;
        } else {
            return 0;
        }
    }
}