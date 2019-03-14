import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

const plugins = [
  resolve(),
  commonjs(),
];

export default {
  plugins,
  input: './random-walks.js',
  output: [
    // UMD Build
    {
      name: 'randomWalks',
      file: 'index.js',
      format: 'umd',
      interop: false,
    },
  ],
};
