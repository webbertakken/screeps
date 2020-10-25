import { IRoomTactic } from './IRoomTactic';
import { Tactics } from './Tactics';
import { Strategies } from '../../colony/strategy';

export class RoomTactician {
  public static getInstructions(): IRoomTactic | undefined {
    const { strategy, stage } = Colony;
    let tactic = Tactics[strategy][stage];

    if (!tactic) {
      tactic = Tactics[Strategies.None][stage];
    }

    return tactic;
  }
}
