class Cloud extends MovableObject {
    y = 0;
    width = 550;
    height = 300;
    speed = 0.1;
    selector = Math.random() * 2;


    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');

        this.x = Math.random() * 500; //Zahl zwischen 200 und 700
        this.animate();
        this.chooseImg();
    }


    /**
     * Animate the clouds, clouds should move to the left
     * 
     */
    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 50);
        
    }


    /**
     * Choose the first or the second image of the clouds, everytime when the game starts it is different 
     * 
     */
    chooseImg() {
        if (this.selector < 1) {
            this.loadImage('img/5_background/layers/4_clouds/1.png'); 
        } else {
            this.loadImage('img/5_background/layers/4_clouds/2.png'); 
        }
    }
}