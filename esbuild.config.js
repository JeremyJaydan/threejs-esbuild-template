
import esbuild from 'esbuild';
import chokidar from 'chokidar';

const IS_DEV = process.argv.includes('--dev');
const ENTRYPOINTS = [
  './src/main.ts'
];

if(IS_DEV){
  chokidar.watch(['src']).on('change', build);
  build();
}else{
  build();
}

async function build(){
  await esbuild.build({
    entryPoints: ENTRYPOINTS,
    outdir: 'out/',
    platform: 'browser',
    format: 'esm',
    bundle: true,
    minify: IS_DEV ? false : true,
  }).catch(console.error);
}