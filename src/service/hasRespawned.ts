/**
 * Original: https://github.com/screepers/screeps-snippets/blob/79f67be88954639c9a6e7f6df85ba6683ffc06d6/src/globals/JavaScript/hasRespawned.js
 */

export const hasRespawned = () => {
  // check for multiple calls on same tick
  if (Memory?.colony?.meta?.startTick === Game.time) {
    return true;
  }

  if (Game.time === 0) {
    return true;
  }

  if (Creeps.length >= 1) {
    return false;
  }

  if (Rooms.length >= 2) {
    return false;
  }

  if (Spawns.length >= 2) {
    return false;
  }

  // check for controller, progress and safe mode
  const room = Rooms[0];
  return !(
    !room.controller ||
    !room.controller.my ||
    room.controller.level !== 1 ||
    room.controller.progress ||
    !room.controller.safeMode ||
    room.controller.safeMode <= SAFE_MODE_DURATION - 1
  );
};
