import Phaser from "phaser";

export default class Slash extends Phaser.GameObjects.Sprite{
    damageText: Phaser.GameObjects.Text
    isDoneSlash: boolean | boolean = false
    damage: number
    isHit: boolean = false
    constructor(config){
        super(config.scene, config.x, config.y, config.key)
        this.scene.physics.world.enable(this)
        this.scene.add.existing(this)
    }
    // update 'slash' and return time of last 'slash'
    update(time: number, delta: number, damage: number): boolean{
        this.damage = damage
        this.handleSlashAnimation()
        return this.isDoneSlash
    }
    // slash animation
    handleSlashAnimation(){
        if(this.isHit) return
        this.isHit = true
        this.setXY(20)
        this.play("slash-hit", true)
            .on('animationcomplete', () => {
                this.isDoneSlash = true
            })
        let x: number, y: number;
        //@ts-ignore
        if(this.checkOverlap(this, this.scene.dummy)){
            x = Phaser.Math.Between(this.x - this.width/10 + 6, this.x + this.width/10 - 6)
            y = Phaser.Math.Between(this.y - this.width/10 + 6, this.y + this.height/10 - 6)
            this.showDamage(x, y, this.damage)
        }
        //@ts-ignore
        if(this.checkOverlap(this, this.scene.dummy2)){
            x = Phaser.Math.Between(this.x - this.width/10 + 6, this.x + this.width/10 - 6)
            y = Phaser.Math.Between(this.y - this.width/10 + 6, this.y + this.height/10 - 6)
            this.showDamage(x, y, this.damage)
        }
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
    checkOverlap(
        spriteA: Phaser.GameObjects.Sprite | Phaser.GameObjects.Rectangle, 
        spriteB: Phaser.GameObjects.Sprite | Phaser.GameObjects.Rectangle
    ): boolean {
	    const boundsA = spriteA.getBounds(), boundsB = spriteB.getBounds();
        const isColliding = Phaser.Geom.Intersects.RectangleToRectangle(boundsA, boundsB);
	    return isColliding
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