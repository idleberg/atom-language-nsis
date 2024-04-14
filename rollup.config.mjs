import { nodeResolve } from '@rollup/plugin-node-resolve';
import alias from '@rollup/plugin-alias';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';

const isProduction = !process.env.ROLLUP_WATCH;

const plugins = [
  // Pulsar is still based on Node 14 :(
  alias({
    entries: {
      'node:child_process': 'child_process',
      'node:os': 'os',
    }
  }),
  commonjs(),
  json(),
  nodeResolve({
    preferBuiltins: true
  }),
  isProduction && terser(),
  typescript()
];

export default [
  {
    input: 'src/main.ts',
    output: {
      dir: 'lib',
      exports: 'default',
      format: 'cjs',
      sourcemap: !isProduction
    },
    external: [
      // Atom
      'atom',
      'electron',
    ],
    plugins: plugins
  }
];
