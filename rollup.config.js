import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from "rollup-plugin-terser";
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import typescript from '@rollup/plugin-typescript';

const plugins = [
  commonjs(),
  json(),
  nodeResolve({
    preferBuiltins: true
  }),
  (
    process.env.NODE_ENV === 'development'
      ? undefined
      : terser()
  ),
  typescript({
    allowSyntheticDefaultImports: true
  })
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
      'assert',
      'atom',
      'buffer',
      'child_process',
      'electron',
      'events',
      'fs',
      'os',
      'path',
      'stream',
      'util',
      'yaml-js'
    ],
    plugins: plugins
  },

];
