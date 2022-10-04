import Phaser from "phaser";

export default class Player extends Phaser.GameObjects.Sprite{
    constructor(config){
        super(config.scene, config.x, config.y, config.key)
        this.scene.physics.world.enable(this)
        this.scene.add.existing(this)
    }
    create(){

    }
    update(time: number, delta: number): void {
        this.handlePlayerMovement()
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
            //idle
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