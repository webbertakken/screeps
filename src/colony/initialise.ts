export const initialise = (): void => {
  const spawns = Object.values(Game.spawns);

  // Before the game
  if (spawns.length === 0) {
    console.log('waiting for first spawn to be built');
    return;
  }

  // The absolute beginning
  if (!_.has(Memory, 'colony')) {
    if (spawns.length >= 2) {
      throw new Error('did not account for reinitialisation from multiple spawns');
    }

    Memory.colony = {
      name: 'Webber',
      home: spawns[0].name,
    };

    Memory.creeps.creep = {
      name: 'someName',
      role: 'harvester',
    };

    console.log(`Detected first spawn ${Memory.colony.home}.`);
    console.log(`You're witnessing the beginnings of the ${Memory.colony.name} colony. May it flourish!`);

    return;
  }
};
