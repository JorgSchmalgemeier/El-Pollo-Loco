class StatusBarHealth extends DrawableObject {
    IMAGES = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png'
    ];

    percentage = 100;

    constructor() {
        super();
        this.loadImage('img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png');
        this.loadImages(this.IMAGES);
        this.x = 10;
        this.y = 0;
        this.width = 170;
        this.height = 50;
        this.setPercentage(100);
    }


     /**
     * This function will call from outside and will set a new value for the percentage variable (energy of the character)
     * 
     * @param {number} percentage - Energy of the character
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
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 20) {
            return 1;
        } else {
            return 0;
        }
    }
}