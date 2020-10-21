import { ErrorMapper } from 'utils/ErrorMapper';
import { initialise } from 'colony/initialise';
import { cleanup } from './colony/cleanup';
import { progress } from './colony/progress';

export const loop = ErrorMapper.wrapLoop(() => {
  initialise();
  cleanup();

  // Log the tick number every 20 ticks
  const tick = Game.time;
  if (tick % 20 === 0) {
    console.log(tick);
  }

  progress();
});
