import Phaser from "phaser";

export default class Slash extends Phaser.GameObjects.Sprite{
    lastTimeSlash: number = 0
    slashCooldown: number = 500// ms
    constructor(scene: Phaser.Scene, x: number, y: number, key: string){
        super(scene, x, y, key)
        this.scene.physics.world.enable(this)
        this.scene.add.existing(this)
    }
    create(){

    }
    update(time: number, delta: number): void {
        this.handleSlashAnimation(time)
    }
    // slash animation
    handleSlashAnimation(time: number){
        if(window.recording.keys.slash && time - this.lastTimeSlash > this.slashCooldown){
            let x: number = 0
            let y: number = 0
            this.lastTimeSlash = time
            this.visible = true
            switch(window.lastDir){
                case "l":
                    x = window.recording.x - 20
                    y = window.recording.y
                    break;
                case "r":
                    x = window.recording.x + 20
                    y = window.recording.y
                    break;
                case "u":
                    x = window.recording.x
                    y = window.recording.y - 20
                    break;
                case "d":
                    x = window.recording.x
                    y = window.recording.y + 20
                    break;
            }
            this.x = x
            this.y = y
            this.play("slash-hit", true)
            //@ts-ignore
            if(this.checkOverlap(this, this.scene.dummy)){
                x = Phaser.Math.Between(x - this.width/10 + 6, x + this.width/10 - 6)
                y = Phaser.Math.Between(y - this.width/10 + 6, y + this.height/10 - 6)
                //@ts-ignore
                this.showDamage(x, y, this.scene.damage)
            }
            //@ts-ignore
            if(this.checkOverlap(this, this.scene.dummy2)){
                x = Phaser.Math.Between(x - this.width/10 + 6, x + this.width/10 - 6)
                y = Phaser.Math.Between(y - this.width/10 + 6, y + this.height/10 - 6)
                //@ts-ignore
                this.showDamage(x, y, this.scene.damage)
            }
        }
    }
    checkOverlap(
        spriteA: Phaser.GameObjects.Sprite | Phaser.GameObjects.Rectangle, 
        spriteB: Phaser.GameObjects.Sprite | Phaser.GameObjects.Rectangle
        ): boolean {
	    const boundsA = spriteA.getBounds();
	    const boundsB = spriteB.getBounds();
        const isColliding = Phaser.Geom.Intersects.RectangleToRectangle(boundsA, boundsB);
	    return isColliding
	}
    showDamage(x: number, y: number, damage: number){
        //@ts-ignore
        this.scene.damageText.x = x
        //@ts-ignore
        this.scene.damageText.y = y
        //@ts-ignore
        this.scene.damageText.text = damage.toString()
        //@ts-ignore
        this.scene.damageText.visible = true
        this.scene.time.addEvent({delay:500, callback: this.handleTextDissapear, callbackScope: this} )
    }
    handleTextDissapear(){
        //@ts-ignore
        this.scene.damageText.setVisible(false)
    }
}