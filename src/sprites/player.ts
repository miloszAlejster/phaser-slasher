import Phaser from "phaser";
import Slash from "./slash";

export default class Player extends Phaser.GameObjects.Sprite{
    constructor(config){
        super(config.scene, config.x, config.y, config.key)
        // nwm jak to dział dokładnie
        // TODO: fix it I guess?
        this.scene.physics.world.enable(this)
        this.scene.add.existing(this)
        this.scene.physics.add.existing(this)
    }
    damage: number = 50
    slash: Slash
    lastTimeSlash: number = 0
    slashCooldown: number = 500// ms
    isDoneSlash: boolean | undefined = undefined
    MovementSpeed: number = 80
    update(time: number, delta: number): void {
        // player movement
        this.handlePlayerMovement()
        // slash
        this.handleSlashAttack(time, delta)
    }
    // create and perform slash animation
    handleSlashAttack(time: number, delta: number){
        const damage = this.damage
        const cooldown = time - this.lastTimeSlash < this.slashCooldown
        // init slash attack
        if((!this.slash || !this.slash.scene) && window.recording.keys.slash && !cooldown){
            this.createSlash()
            this.isDoneSlash = false
            this.lastTimeSlash = time
        }
        // update slash attack
        if(this.isDoneSlash === false){
            // TODO: add type of enemy(interface?)
            const enemy = this.findEnemyHit(this.slash)
            this.isDoneSlash = this.slash.update(time, delta, damage, enemy);
        } 
        // destroy slash attack
        if(this.isDoneSlash === true){
            this.slash.destroy()
            this.isDoneSlash = undefined
        }
    }
    // find enemy that was hit
    findEnemyHit(attack){
        let enemy = undefined
        // TODO: remove ts ignore
        //@ts-ignore
        this.scene.enemies.children.entries.every((c) => {
            if(this.checkOverlap(attack, c)){
                enemy = c
                return
            } 
        })
        return enemy
    }
    // create slash attack
    createSlash(){
        this.slash = new Slash({
            scene: this.scene, 
            x: -1000,
            y: -1000, 
            key: 'slash'
        }).setScale(0.16).setDepth(2)
    }
    // player movement
    handlePlayerMovement(){
        // reset
        this.body.velocity.x = 0;
        this.body.velocity.y = 0;
        // handle movement
        if (window.recording.keys.left === true)
        {
            this.body.velocity.x = -this.MovementSpeed
            this.play('walk-left', true)
            window.lastDir = "l"
        } else if (window.recording.keys.right === true)
        {
            this.body.velocity.x = this.MovementSpeed
            this.play('walk-right', true)
            window.lastDir = "r"
        } else  if (window.recording.keys.up === true)
        {
            this.body.velocity.y = -this.MovementSpeed
            this.play('walk-up', true)
            window.lastDir = "u"
        } else if (window.recording.keys.down === true)
        {
            this.body.velocity.y = this.MovementSpeed
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
    checkOverlap(
        spriteA: Phaser.GameObjects.Sprite | Phaser.GameObjects.Rectangle, 
        spriteB: Phaser.GameObjects.Sprite | Phaser.GameObjects.Rectangle
    ): boolean {
	    const boundsA = spriteA.getBounds(), boundsB = spriteB.getBounds();
        const isColliding = Phaser.Geom.Intersects.RectangleToRectangle(boundsA, boundsB);
	    return isColliding
	}
}
