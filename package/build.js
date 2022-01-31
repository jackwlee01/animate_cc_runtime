const { build } = require('esbuild')
const { dependencies, peerDependencies } = require('./package.json')
const { Generator } = require('npm-dts')


build({
  entryPoints: ['src/index.ts'],
  outdir: 'dist',
  bundle: true,
  external: Object.keys(dependencies||{}).concat(Object.keys(peerDependencies||{})),
})


new Generator({
  entry: 'src/index.ts',
  output: 'dist/index.d.ts',
}).generate()