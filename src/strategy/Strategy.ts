import { cleanup } from '../colony/cleanup';

export class Strategy {
  static execute() {
    console.log('executing', Game.time);
    Colony.cleanup();
  }
}
