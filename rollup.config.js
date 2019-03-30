import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
  
  const rollupConfig = [{
      input: 'src/scripts/modules/zooduck-self-sorting-gallery/index.js',
      output: {
          file: 'dist/zoogal.js',
          format: 'iife'
      },
      plugins: [
          resolve(),
          babel({
              exclude: 'node_modules/**'
          })
      ]
  }];

  export default rollupConfig;
  