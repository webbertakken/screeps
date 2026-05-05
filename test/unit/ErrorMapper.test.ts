import { afterEach, describe, expect, it, vi } from 'vitest';

import { ErrorMapper } from '../../src/utils/ErrorMapper';

// `Game` is declared globally by `@types/screeps` as a fully-typed Game
// object. In tests we only use a tiny subset (`rooms`), so cast through
// `unknown` rather than constructing a full `Game` fixture.
const setMockGame = (rooms: Record<string, unknown>): void => {
  // @ts-ignore -- test fixture cast
  globalThis.Game = { rooms } as unknown as Game;
};

const clearMockGame = (): void => {
  // @ts-ignore -- test cleanup
  delete (globalThis as { Game?: unknown }).Game;
};

describe('ErrorMapper.wrapLoop', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    clearMockGame();
  });

  it('returns a callable function', () => {
    const wrapped = ErrorMapper.wrapLoop(() => {});
    expect(typeof wrapped).toBe('function');
  });

  it('invokes the inner loop on the happy path', () => {
    const inner = vi.fn();
    const wrapped = ErrorMapper.wrapLoop(inner);
    wrapped();
    expect(inner).toHaveBeenCalledTimes(1);
  });

  it('catches non-Error throws and logs them, then rethrows', () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    const wrapped = ErrorMapper.wrapLoop(() => {
      throw 'plain string';
    });
    expect(() => wrapped()).toThrow('plain string');
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('ErrorMapper caught an error that was not an Error object'),
    );
  });

  it('catches Error throws in simulator mode and logs the original stack', () => {
    setMockGame({ sim: {} });
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    const wrapped = ErrorMapper.wrapLoop(() => {
      throw new Error('boom');
    });
    expect(() => wrapped()).not.toThrow();
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining("Source maps don't work in the simulator"));
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('boom'));
  });

  it('catches Error throws outside the simulator and uses the source map fallback', () => {
    setMockGame({});
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    // Stub `sourceMappedStackTrace` so we don't depend on the (unavailable)
    // `main.js.map` source-map file.
    const sourceMapSpy = vi
      .spyOn(ErrorMapper, 'sourceMappedStackTrace')
      .mockReturnValue('Error: boom\n    at <mapped>');

    const wrapped = ErrorMapper.wrapLoop(() => {
      throw new Error('boom');
    });
    expect(() => wrapped()).not.toThrow();
    expect(sourceMapSpy).toHaveBeenCalledTimes(1);
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('<mapped>'));
  });
});
