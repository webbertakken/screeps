import { Strategy } from '../colony/strategy';
import { showStats } from '../service/showStats';

export class Kernel {
  public runMainThread() {
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
