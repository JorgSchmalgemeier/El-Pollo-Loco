class Bottle extends CollectableObject {
    selector = Math.random() * 2;

    constructor() {
        super();
        if (this.selector < 1) {
            this.loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png'); 
        } else {
            this.loadImage('img/6_salsa_bottle/2_salsa_bottle_on_ground.png'); 
        }
        this.height = 80;
        this.width = 70;
        this.y = 345;
    }
}