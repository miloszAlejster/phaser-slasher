import Phaser from "phaser";
import SceneKeys from "~/consts/scnenKeys";

export default class BootScene extends Phaser.Scene{
    constructor(){
        super('boot')
    }
    // ToDo: co ma ta scena robic?
    create(){
        this.scene.start(SceneKeys.PreloaderScene)
    }
}