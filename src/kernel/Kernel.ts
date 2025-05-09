import { Strategy } from '../colony/strategy';
import { showStats } from '../service/showStats';

export class Kernel {
  public runMainThread() {
    console.log('Kernel is running');
    this.before();
    this.logic();
    this.after();
  }

  private before() {
    Colony.update();
  }

  private logic() {
    Strategy.update();
    Colony.venture();
  }

  private after() {
    showStats();
  }
}
