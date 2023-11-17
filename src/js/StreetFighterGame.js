import { Ken } from "./entities/fighters/Ken.js";
import { Ryu } from "./entities/fighters/Ryu.js";
import { Stage } from "./entities/Stage.js";
import { FpsCounter } from "./entities/FpsCounter.js";
import { STAGE_FLOOR } from "./constants/stage.js";
import { FighterDirection } from "./constants/fighter.js";

export class StreetFighterGame {
    constructor() {
        this.context = this.getContext();
        this.fighters = [
            new Ryu(104, STAGE_FLOOR, FighterDirection.RIGHT),
            new Ken(280, STAGE_FLOOR, FighterDirection.LEFT),
        ];   
    
        this.entities = [
            new Stage(),
            ...this.fighters,
            new FpsCounter(),
        ];
    
        this.frameTime = {
            previous: 0,
            secondsPassed: 0,
        }
    }

    getContext() {
        const canvasEl = document.querySelector("canvas");
        const context = canvasEl.getContext("2d");

        context.imageSmoothingEnabled = false;

        return context;
    }

    update() {
        for (const entity of this.entities) {
            entity.update(this.frameTime, this.context);
        }
    }

    draw() {
        for (const entity of this.entities) {
            entity.draw(this.context);
        }
    }

    frame(time) {
        window.requestAnimationFrame(this.frame.bind(this));

        this.frameTime = {
            secondsPassed: (time - this.frameTime.previous) / 1000,
            previous: time,
        }

        this.update();
        this.draw();
    }

    handleFormSubmit(event, fighters) {
        event.preventDefault();

        const selectedCheckboxes = Array
            .from(event.target.querySelectorAll('input[type="checkbox"]:checked'))
            .map(checkbox => checkbox.value);

        const selectedDropdown = event.target.querySelector('#state-dropdown');

        this.fighters.forEach(fighter => {
            if (selectedCheckboxes.includes(fighter.name)) {
                fighter.changeState(selectedDropdown.value); 
            }
        });
    }

    start() {
        document.addEventListener('submit', this.handleFormSubmit.bind(this));

        window.requestAnimationFrame(this.frame.bind(this));
    }
    
}