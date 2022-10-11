import Phaser from "phaser";
import SceneKeys from "~/consts/scnenKeys";

export default class PreloaderScene extends Phaser.Scene{
    constructor(){
        super('preloader')
    }
    preload(){
        this.load.spritesheet('player', './sprites/Pepper.png', { frameWidth: 24, frameHeight: 32});
        this.load.spritesheet('slash', './sprites/slash.png', { frameWidth: 125, frameHeight: 150});
        this.load.image('tiles', 'tiles/town.png')
        this.load.tilemapTiledJSON('town', 'tiles/town.json')
    }
    create(){
        this.initPlayerMoveAnim(8)
        this.initSlashAnim(20)
        this.scene.start(SceneKeys.Game)
    }
    // init player move Animation
    initPlayerMoveAnim(framerate: number){
        const configWalkRight = {
            key: 'walk-right',
            frames: this.anims.generateFrameNumbers('player', { start: 3, end: 5, first: 4 }),
            frameRate: framerate
        };
        const configWalkLeft = {
            key: 'walk-left',
            frames: this.anims.generateFrameNumbers('player', { start: 9, end: 11, first: 10 }),
            frameRate: framerate
        };
        const configWalkUp = {
            key: 'walk-up',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 2, first: 1 }),
            frameRate: framerate
        };
        const configWalkDown = {
            key: 'walk-down',
            frames: this.anims.generateFrameNumbers('player', { start: 6, end: 8, first: 7 }),
            frameRate: framerate
        };
    
        this.anims.create(configWalkRight);
        this.anims.create(configWalkLeft)
        this.anims.create(configWalkUp)
        this.anims.create(configWalkDown)
    }
    // init slash Animation
    initSlashAnim(framerate: number){
        const configSlash = {
            key: 'slash-hit',
            frames: this.anims.generateFrameNumbers('slash', { start: 18, end: 23, first: 18 }),
            frameRate: framerate,
            hideOnComplete: true
        };
        this.anims.create(configSlash)
    }
}