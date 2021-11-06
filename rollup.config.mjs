import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from "rollup-plugin-terser";
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import typescript from '@rollup/plugin-typescript';

const production = !process.env.ROLLUP_WATCH;

const plugins = [
  commonjs(),
  json(),
  nodeResolve({
    preferBuiltins: true
  }),
  production && terser(),
  typescript()
];

export default [
  {
    input: 'src/main.ts',
    output: {
      dir: 'lib',
      exports: 'default',
      format: 'cjs',
      sourcemap: true
    },
    external: [
      // Atom
      'atom',
      'electron',

      // Node
      'assert',
      'buffer',
      'child_process',
      'events',
      'fs',
      'os',
      'path',
      'stream',
      'util'
    ],
    plugins: plugins
  }
];
