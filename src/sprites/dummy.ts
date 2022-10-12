import Phaser from "phaser";

export default class Dummy extends Phaser.GameObjects.Rectangle{
    constructor(config){
        super(config.scene, config.x, config.y, config.width, config.height, config.fillColor)
        this.scene.physics.world.enable(this)
        this.scene.add.existing(this)
    }
    hp: number = 100
    isHit: boolean = false
    damageTaken: number = 0
    update(time: number, delta: number): void {
        this.controlTakenDamage()
        if(this.hp <= 0) {
            // TODO: change it
            //@ts-ignore
            this.scene.isDummy = false
            this.destroy()
        }
    }
    controlTakenDamage(){        
        if(this.isHit){
           if(this.hp > 0) this.hp -= this.damageTaken
            // reset
            this.isHit = false
            this.damageTaken = 0
        }
    }
}