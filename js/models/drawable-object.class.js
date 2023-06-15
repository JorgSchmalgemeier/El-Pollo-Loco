class DrawableObject {
    x = 120;
    y = 280;
    height = 150;
    width = 100;
    img;
    imageCache = {};
    currentImage = 0;


    /**
     * This function set the path of the img which sould be used
     * 
     * @param {string} path - The path of the used img 
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }


    /**
     * This function set the path of all img's of the array, which sould be used
     * 
     * @param {array} arr - Array with the img's, they should be used 
     */
    loadImages(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }


    /**
     * Draw the object
     * 
     * @param {*} ctx - Object which should be draw
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
}