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
            // console.log(fighter);
            if (selectedCheckboxes.includes(fighter.name)) {
                fighter.changeState(selectedDropdown.value); 
            }
        });
    }

    handleKeyEvent(event) {
        // console.log(event.keyCode);
            switch(event.keyCode) {
            case 87: // W DONE
                if(this.fighters[0].currentState == "walkForwards") {
                    this.fighters[0].changeState("jumpForward");
                }
                if(this.fighters[0].currentState == "walkBackwards") {
                    this.fighters[0].changeState("jumpBackward");
                }
                this.fighters[0].changeState("jumpUp");
                break;
            case 65: // A DONE
                if(this.fighters[0].currentState == "idle" || "walkForwards") {
                    this.fighters[0].changeState("walkBackwards");
                }
                break;
            case 83: // S DONE
                if(this.fighters[0].currentState == "idle") {
                    this.fighters[0].changeState("idle");
                    this.fighters[0].changeState("crouchDown");
                }
                
                break;
            case 68: // D DONE

                if(this.fighters[0].currentState == "idle" || "walkBackwards") {
                    this.fighters[0].changeState("walkForwards");
                }
               
                break;

            }
        
      }

    handleKeyUpEvent(event) {
        switch(event.keyCode) {
            case 65: // A DONE
                if(this.fighters[0].currentState == "walkBackwards") {
                    this.fighters[0].changeState("idle");
                }
                break;
            case 83: // S DONE
                if(this.fighters[0].currentState != "crouchDown") {
                    this.fighters[0].changeState("crouchUp");
                }
                break;
            case 68: // D DONE
            
                if(this.fighters[0].currentState == "walkForwards") {
                    this.fighters[0].changeState("idle");
                }
                break;
        }
    }

      
    start() {
        document.addEventListener('submit', this.handleFormSubmit.bind(this));
        document.addEventListener('keydown', this.handleKeyEvent.bind(this));
        document.addEventListener('keyup', this.handleKeyUpEvent.bind(this));
        window.requestAnimationFrame(this.frame.bind(this));
    }
    
}