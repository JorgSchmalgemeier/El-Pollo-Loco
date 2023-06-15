class Coin extends CollectableObject {
    coinVar = false;

    constructor() {
        super().loadImage('img/8_coin/coin_2.png');
        this.height = 100;
        this.width = 100;
        this.y = 350;
        this.switchImg();
    }


    /**
     * Switch between the first and second img two times in a second
     * 
     */
    switchImg() {
        let i;
        setInterval(() => {
            if (!this.coinVar) {
                i = 0;
            }
            if (i == 0) {
                this.loadImage('img/8_coin/coin_1.png');
                i++;
                this.coinVar = true;
            } else {
                this.loadImage('img/8_coin/coin_2.png');
                this.coinVar = false;
            }
        }, 500);
    }
}