'use strict';

import clear from 'rollup-plugin-clear';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import screeps from 'rollup-plugin-screeps';
import typescript from 'rollup-plugin-typescript2';
import configFile from './screeps.js';

const destination = process.env.DEST;
if (!destination) console.log('No destination specified - code will be compiled but not uploaded');

const config = configFile[destination];
if (config === null) throw new Error('Invalid upload destination');

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
    screeps({ config, dryRun: config == null }),
  ],
};
