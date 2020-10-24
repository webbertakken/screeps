import { Strategy } from '../strategy';
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
    Strategy.execute();
  }

  private after() {
    showStats();
  }
}
