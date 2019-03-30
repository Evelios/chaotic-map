import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

const plugins = [
  resolve(),
  commonjs(),
];

export default {
  plugins,
  input: './chaotic-map.js',
  output: [
    // UMD Build
    {
      name: 'chaoticMap',
      file: 'index.js',
      format: 'umd',
      interop: false,
    },
  ],
};
