export {};

declare global {
  interface keysTypes{
    slash: Phaser.Input.Keyboard.Key
    left: Phaser.Input.Keyboard.Key
    right:Phaser.Input.Keyboard.Key
    up: Phaser.Input.Keyboard.Key
    down: Phaser.Input.Keyboard.Key
  }

  interface updateSlash {
    lastTimeSlash: number
    isDoneSlash: boolean | undefined
  }
  interface keyBool{
    slash: boolean
    left: boolean
    right: boolean
    up: boolean
    down: boolean
  }
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