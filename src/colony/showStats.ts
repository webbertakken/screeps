import { Creeps } from '../creep/model/Creeps';
import { StatsBuilder } from '../service/StatsBuilder';
import { ColonyMemory } from './model/ColonyMemory';

export const showStats = () => {
  const tick = Game.time;
  if (tick % 20 === 0) {
    const stats = new StatsBuilder()
      .add(`Tick: ${tick}`)
      .add(`Started at: ${ColonyMemory.startTick}`)
      .add(`Creeps: ${Creeps.count}`)
      .build();

    console.log(stats);
  }
};
