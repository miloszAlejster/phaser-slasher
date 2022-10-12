import Phaser from "phaser";

export default class Slash extends Phaser.GameObjects.Sprite{
    damageText: Phaser.GameObjects.Text
    isDoneSlash: boolean | boolean = false
    damage: number
    isFirst: boolean = false
    isHit: boolean = false
    constructor(config){
        super(config.scene, config.x, config.y, config.key)
        this.scene.physics.world.enable(this)
        this.scene.add.existing(this)
    }
    // update 'slash' and return time of last 'slash'
    update(time: number, delta: number, damage: number, enemy): boolean{
        this.damage = damage
        this.handleSlashAnimation()
        this.handleDamage(enemy)
        return this.isDoneSlash
    }
    handleDamage(enemy){
        if(this.isHit) return
        if(enemy && enemy.hp > 0){
            let x: number, y: number;
            x = Phaser.Math.Between(this.x - this.width/10 + 6, this.x + this.width/10 - 6)
            y = Phaser.Math.Between(this.y - this.width/10 + 6, this.y + this.height/10 - 6)
            this.showDamage(x, y, this.damage)
            // deal damage
            enemy.isHit = true
            enemy.damageTaken = this.damage
            // reset
            this.isHit = true
        }
    }
    // slash animation
    handleSlashAnimation(){
        if(this.isFirst) return
        this.setXY(20)
        this.play("slash-hit", true)
            .on('animationcomplete', () => {
                this.isDoneSlash = true
            })
        // reset
        this.isFirst = true
    }
    setXY(pos: number){
        let x: number = 0, y: number = 0
        switch(window.lastDir){
            case "l":
                x = window.recording.x - pos
                y = window.recording.y
                break;
            case "r":
                x = window.recording.x + pos
                y = window.recording.y
                break;
            case "u":
                x = window.recording.x
                y = window.recording.y - pos
                break;
            case "d":
                x = window.recording.x
                y = window.recording.y + pos
                break;
        }
        this.x = x
        this.y = y  
    }
    showDamage(x: number, y: number, damage: number){
        this.damageText = this.scene.add.text(x, y, damage.toString(), {fontSize: '10px'})
        this.scene.time.addEvent({delay:700, callback: this.handleTextDissapear, callbackScope: this} )
    }
    handleTextDissapear(){
        this.damageText.destroy()
        this.damageText.setVisible(false)
    }
}