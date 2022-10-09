import Phaser from "phaser";
import Player from "../sprites/player"
import Dummy from "../sprites/dummy"
import * as Types from "../types/index"

export default class Game extends Phaser.Scene{
    player: Phaser.GameObjects.Sprite
    dummy: Phaser.GameObjects.Rectangle
    keys: Types.keysTypes
    recordedKeys: Types.keyBool
    isDummy: boolean = false
    dummySpawnCooldown: number = 0
    constructor(){
        super('game')
    }
    create(){
        this.player = new Player({
            scene: this,
            x: this.game.scale.width/2, 
            y: this.game.scale.height/2,
            key: 'player'
        })
        this.physics.add.existing(this.player)

        this.keys = {
            slash: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z),
            left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT),
            right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT),
            up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP),
            down: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN),
            spawnD: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        };
        window.lastDir = 'd'
    }
    update(time: number, delta: number): void {
        // record input
        this.record(delta)
        // player loop
        this.player.update(time, delta)
        // dummy loop
        this.testSpawnDummy(time, delta)
    }
    // function for testing - spawning dummies
    testSpawnDummy(time: number, delta: number){
        // update
        if(this.isDummy){
            this.dummy.update(time, delta)
        }
        // create
        if(!this.isDummy && window.recording.keys.spawnD === true){
            this.isDummy = true
            this.testAddDummyRandom(time)
        }
        // destroy old, create new
        if(this.isDummy && window.recording.keys.spawnD === true
            && time - this.dummySpawnCooldown > 1000){
            this.dummy.destroy()
            this.testAddDummyRandom(time)
        }
    }
    testAddDummyRandom(time : number){
        this.dummy = new Dummy({
            scene: this,
            x: Phaser.Math.Between(this.player.width, this.scale.width - this.player.width), 
            y: Phaser.Math.Between(this.player.height, this.scale.height - this.player.height), 
            width: 30, 
            height: 30,
            fillColor: 0xfff000
        })
        this.physics.add.existing(this.dummy)
        this.dummySpawnCooldown = time
    }
    // record input
    record(delta: number){
        let update: boolean = false
        let keys: Types.keyBool = {
            slash: this.keys.slash.isDown,
            left: this.keys.left.isDown,
            right: this.keys.right.isDown,
            up: this.keys.up.isDown,
            down: this.keys.down.isDown,
            spawnD: this.keys.spawnD.isDown
        };
        if(typeof window.recording === 'undefined'){
            // init
            window.time = 0
            update = true
        } else {
            // update at least 5 times per second
            update = (window.time - window.recording.time) > 200;
        }
        window.time += delta
        if(!update){
            ['slash', 'left', 'right', 'up', 'down', 'spawnD'].forEach(dir => {
                if (keys[dir] !== this.recordedKeys[dir]) {
                    update = true;
                    return
                }
            });
        }
        if (update) {
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