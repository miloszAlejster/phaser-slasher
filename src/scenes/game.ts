import Phaser from "phaser";
import Player from "../sprites/player"
import Slash from "../sprites/slash"

export default class Game extends Phaser.Scene{
    player: Phaser.GameObjects.Sprite
    slash: Phaser.GameObjects.Sprite
    dummy: Phaser.GameObjects.Rectangle
    dummy2: Phaser.GameObjects.Rectangle
    damage: number = 10
    damageText: Phaser.GameObjects.Text
    keys: keysTypes
    recordedKeys: keyBool
    constructor(){
        super('game')
    }
    create(){
        this.slash = new Slash(
            this, 
            this.game.scale.width/2, 
            this.game.scale.height/2, 
            'slash'
        ).setVisible(false).setScale(0.2).setDepth(1)
        this.player = new Player({
            scene: this,
            x: this.game.scale.width/2, 
            y: this.game.scale.height/2,
            key: 'player'
        })
        this.dummy = this.add.rectangle
        (
            this.game.scale.width/2 + 60, 
            this.game.scale.height/2 + 20, 
            30, 30, 
            0xff0000, 1
        )
        this.dummy2 = this.add.rectangle
        (
            this.game.scale.width/2 - 60, 
            this.game.scale.height/2 - 20, 
            30, 30, 
            0xfff000, 1
        )
        this.damageText = this.add.text(0, 0, ' ', {fontSize: '10px'}).setVisible(false)
        this.physics.add.existing(this.player)
        this.physics.add.existing(this.dummy)
        this.physics.add.existing(this.dummy2)
        this.physics.add.collider(this.player, this.dummy)
        this.physics.add.collider(this.player, this.dummy2)

        this.keys = {
            slash: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z),
            left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT),
            right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT),
            up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP),
            down: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN)
        };
        window.lastDir = 'd'
    }
    update(time: number, delta: number): void {
        // record input
        this.record(delta)
        // player loop
        this.player.update(time, delta)
        // slash loop
        this.slash.update(time, delta)
    }
    // record input
    record(delta: number){
        let update: boolean = false
        let keys: keyBool = {
            slash: this.keys.slash.isDown,
            left: this.keys.left.isDown,
            right: this.keys.right.isDown,
            up: this.keys.up.isDown,
            down: this.keys.down.isDown
        };
        // TODO: change it
        // @ts-ignore
        if(typeof recording === 'undefined'){
            // open only 'once'
            window.recording;
            window.time = 0
            update = true
        } else {
            // update at least 5 times per second
            update = (window.time - window.recording.time) > 200;
        }
        window.time += delta
        if(!update){
            // update if keys changed
            ['slash', 'left', 'right', 'up', 'down'].forEach(dir => {
                if (keys[dir] !== this.recordedKeys[dir]) {
                    update = true;
                }
            });
        }
        if (update) {
            // TODO: fix stacking up array
            window.recording = {
                time: window.time,
                keys: keys,
                x: this.player.x,
                y: this.player.y,
                vx: this.player.body.velocity.x,
                vy: this.player.body.velocity.y
            };
        }
        this.recordedKeys = keys;
    }
}