export {};

interface keysTypes{
    slash: boolean
    left: boolean
    right:boolean
    up: boolean
    down: boolean
}

declare global {
  interface Window {
    recording: {
        time: number
        keys: keysTypes
        x: number
        y: number
        vx: number
        vy: number
    };
    time: number;
    lastDir: string
  }
}