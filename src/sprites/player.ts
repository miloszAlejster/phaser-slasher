import Phaser from "phaser";
import Slash from "./slash";

export default class Player extends Phaser.GameObjects.Sprite{
    constructor(config){
        super(config.scene, config.x, config.y, config.key)
        this.scene.physics.world.enable(this)
        this.scene.add.existing(this)
    }
    // var-attacks
    damage: number = 10
    slash: Slash
    lastTimeSlash: number = 0
    slashCooldown: number = 500// ms
    isDoneSlash: boolean | undefined = undefined
    update(time: number, delta: number): void {
        this.handlePlayerMovement()
        this.handleSlashAttack(time, delta)
    }
    handleSlashAttack(time: number, delta: number){
        const damage = this.damage
        const cooldown = time - this.lastTimeSlash < this.slashCooldown
        //init slash attack
        if((!this.slash || !this.slash.scene) && window.recording.keys.slash && !cooldown){
            this.createSlash()
            this.isDoneSlash = false
            this.lastTimeSlash = time
        }
        // update slash attack
        if(this.isDoneSlash === false){
            this.isDoneSlash = this.slash.update(time, delta, damage);
        } 
        // destroy slash attack
        if(this.isDoneSlash === true){
            this.slash.destroy()
            this.isDoneSlash = undefined
        }
    }
    // create slash attack
    createSlash(){
        // TODO: change x and y bug
        this.slash = new Slash({
            scene: this.scene, 
            x: -1000,
            y: -1000, 
            key: 'slash'
        }).setScale(0.16).setDepth(1)
    }
    // player movement
    handlePlayerMovement(){
        if (window.recording.keys.left === true)
        {
            this.x -= 1.5;
            this.play('walk-left', true)
            window.lastDir = "l"
        } else if (window.recording.keys.right === true)
        {
            this.x += 1.5;
            this.play('walk-right', true)
            window.lastDir = "r"
        } else  if (window.recording.keys.up === true)
        {
            this.y -= 1.5;
            this.play('walk-up', true)
            window.lastDir = "u"
        } else if (window.recording.keys.down === true)
        {
            this.y += 1.5;
            this.play('walk-down', true)
            window.lastDir = "d"
        } else 
        {
            // idle
            switch(window.lastDir){
                case "l":
                    this.setFrame(10)
                    break;
                case "r":
                    this.setFrame(4)
                    break;
                case "u":
                    this.setFrame(1)
                    break;
                case "d":
                    this.setFrame(7)
                    break;
            }
        }
    }
}