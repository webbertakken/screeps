export class Strategy {
  static execute() {
    console.log('executing', Game.time);
    Colony.cleanup();
  }
}
