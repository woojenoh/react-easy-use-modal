import cleaner from 'rollup-plugin-cleaner';
import progress from 'rollup-plugin-progress';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import babel from '@rollup/plugin-babel';
import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';
import generatePackageJson from 'rollup-plugin-generate-package-json';
import copy from 'rollup-plugin-copy';

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
    cleaner({
      targets: ['build'],
    }),
    progress(),
    commonjs(),
    resolve(),
    peerDepsExternal(),
    babel({ exclude: 'node_modules/**', babelHelpers: 'bundled' }),
    typescript(),
    terser(),
    generatePackageJson({
      outputFolder: 'build',
      baseContents: (pkg) => ({
        name: pkg.name,
        version: pkg.version,
        description: pkg.description,
        main: 'cjs/src/index.js',
        module: 'esm/src/index.js',
        types: 'esm/index.d.ts',
        repository: pkg.repository,
        keywords: pkg.keywords,
        author: pkg.author,
        license: pkg.license,
        bugs: pkg.bugs,
        homepage: pkg.homepage,
        peerDependencies: pkg.peerDependencies,
      }),
    }),
    copy({
      targets: [{ src: 'README.md', dest: 'build' }],
    }),
  ],
};
