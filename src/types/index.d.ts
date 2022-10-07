export interface keysTypes{
  slash: Phaser.Input.Keyboard.Key
  left: Phaser.Input.Keyboard.Key
  right:Phaser.Input.Keyboard.Key
  up: Phaser.Input.Keyboard.Key
  down: Phaser.Input.Keyboard.Key
}
export interface updateSlash {
  lastTimeSlash: number
  isDoneSlash: boolean | undefined
}
export interface keyBool{
  slash: boolean
  left: boolean
  right: boolean
  up: boolean
  down: boolean
}
declare global {
  interface Window {
    recording: {
        time: number
        keys: keyBool
        x: number
        y: number
        vx: number
        vy: number
    };
    time: number;
    lastDir: string
  }
}
