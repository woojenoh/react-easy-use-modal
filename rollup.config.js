import progress from 'rollup-plugin-progress';
import cleaner from 'rollup-plugin-cleaner';
import copy from 'rollup-plugin-copy';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import babel from '@rollup/plugin-babel';
import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/index.ts',
  preserveModules: true,
  output: [
    {
      dir: 'build/cjs',
      format: 'cjs',
      exports: 'named',
    },
    {
      dir: 'build/esm',
      format: 'esm',
      exports: 'named',
    },
  ],
  plugins: [
    progress(),
    cleaner({
      targets: ['build'],
    }),
    copy({
      targets: [
        { src: 'package.json', dest: 'build' },
      ],
    }),
    commonjs(),
    resolve(),
    peerDepsExternal(),
    babel({ exclude: 'node_modules/**', babelHelpers: 'bundled' }),
    typescript(),
    terser(),
  ],
};
