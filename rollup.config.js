'use strict';

import clear from 'rollup-plugin-clear';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import screeps from 'rollup-plugin-screeps';
import typescript from 'rollup-plugin-typescript2';

const destination = process.env.DEST;
if (!destination) {
  console.log('No destination specified - code will be compiled but not uploaded');
}

// eslint-disable-next-line
const cfg = require('./screeps.json')[destination];
if (cfg === null) {
  throw new Error('Invalid upload destination');
}

export default {
  input: 'src/main.ts',
  output: {
    file: 'dist/main.js',
    format: 'cjs',
    sourcemap: true,
  },

  plugins: [
    clear({ targets: ['dist'] }),
    resolve(),
    commonjs(),
    typescript({ tsconfig: './tsconfig.json' }),
    screeps({ config: cfg, dryRun: cfg == null }),
  ],
};
