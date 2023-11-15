// Stage.js
export class Stage {
    constructor() {
        this.image = document.querySelector('img[alt="background"]');
    }

    update(secondsPassed, context) {
        // No specific update logic for the stage
        // You can leave this method empty
    }

    draw(context) {
        context.drawImage(this.image, 0, 0);
    }
}
