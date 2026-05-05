import { describe, expect, it } from 'vitest';

import { helper } from './helper';

describe('integration: main', () => {
  it('runs a server and matches the game tick', async () => {
    for (let i = 1; i < 10; i += 1) {
      // eslint-disable-next-line no-await-in-loop -- assertions on each tick
      expect(await helper.server.world.gameTime).toBe(i);
      // eslint-disable-next-line no-await-in-loop -- step the simulator
      await helper.server.tick();
    }
  });

  it('writes and reads to memory', async () => {
    await helper.player.console("Memory.foo = 'bar'");
    await helper.server.tick();
    const memory = JSON.parse(await helper.player.memory);
    expect(memory.foo).toBe('bar');
  });
});
