import { Creeps } from '../creep/model/Creeps';
import { StatsBuilder } from './StatsBuilder';
import { ColonyMemory } from '../colony/model/ColonyMemory';

export const showStats = () => {
  const tick = Game.time;
  if (tick % 20 === 0) {
    const stats = new StatsBuilder();

    // Ticks played
    const startTick = ColonyMemory.startTick;
    if (startTick) {
      const ticksPlayed = tick - startTick;
      stats.add(`Played for ${ticksPlayed} ticks`);
    }

    stats.add(`Creeps: ${Creeps.count}`);
    console.log(stats.build());
  }
};
