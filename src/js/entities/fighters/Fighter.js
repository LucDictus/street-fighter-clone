import { FighterState } from "../../constants/fighter.js";

export class Fighter {
    constructor(name, x, y, direction) {
        this.name = name;
        this.position = { x, y };
        this.velocity = { x: 0, y: 0 };
        this.initialVelocity = {};
        this.direction = direction;
        this.gravity = 0;

        this.frames = new Map();
        this.animationFrame = 0;
        this.animationTimer = 0;
        this.animations = {};

        this.image = new Image();

        this.states = {
            [FighterState.IDLE]: {
                init: this.handleWalkIdleInit.bind(this),
                update: this.handleWalkIdleState.bind(this),
            },
            [FighterState.WALK_FORWARD]: {
                init: this.handleWalkForwardInit.bind(this),
                update: this.handleWalkForwardState.bind(this),
            },
            [FighterState.WALK_BACKWARD]: {
                init: this.handleWalkBackwardInit.bind(this),
                update: this.handleWalkBackwardState.bind(this),
            },
            [FighterState.JUMP_UP]: {
                init: this.handleJumpUpInit.bind(this),
                update: this.handleJumpUpState.bind(this),
            },
        }

        this.changeState(FighterState.IDLE);
    }

    changeState(newState) {
        this.currentState = newState;
        this.animationFrame = 0;

        this.states[this.currentState].init();
    }

    handleWalkIdleInit() {
        this.velocity.x = 0;
    }
    handleWalkIdleState() {

    }

    handleWalkForwardInit() {
        this.velocity.x = 150 * this.direction;
    }
    handleWalkForwardState() {

    }

    handleWalkBackwardInit() {
        this.velocity.x = -150 * this.direction;
    }
    handleWalkBackwardState() {
        
    }

    handleJumpUpInit() {
        
    }
    handleJumpUpState() {
        
    }

    updateStageConstraints(context) {
        const WIDTH = 32;
        const HEIGHT = 90; 
    
        let newX = this.position.x;
        if (newX > context.canvas.width - WIDTH) {
            newX = context.canvas.width - WIDTH;
        }
        if (newX < WIDTH) {
            newX = WIDTH;
        }
    
        let newY = this.position.y;
        if (newY > context.canvas.height - HEIGHT) {
            newY = context.canvas.height - HEIGHT;
        }
    
        this.position.x = newX;
        this.position.y = newY;
    }
    
    
    

    update(time, context) {
        if (time.previous > this.animationTimer + 60) {
            this.animationTimer = time.previous;
    
            this.animationFrame++;
            if (this.animationFrame > 5) this.animationFrame = 0;
        }
    
        this.position.x += this.velocity.x * time.secondsPassed;
        this.position.y += this.velocity.y * time.secondsPassed;
    
        this.states[this.currentState].update(time, context);
        this.updateStageConstraints(context);
    }    

    draw(context) {
        const [
            [x, y, width, height],
            [originX, originY],
        ] = this.frames.get(this.animations[this.currentState][this.animationFrame]);

        context.scale(this.direction, 1);
        context.drawImage(
            this.image,
            x, y,
            width, height,
            Math.floor(this.position.x * this.direction) - originX, Math.floor(this.position.y) - originY ,
            width, height
        );           
        context.setTransform(1, 0, 0, 1, 0, 0);
        
    }
}
