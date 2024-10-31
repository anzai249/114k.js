import { terser } from 'rollup-plugin-terser';
import json from '@rollup/plugin-json';

const fileBaseName = 'format114k';

const formatsExport = {
    cjs: {
        file: `dist/${fileBaseName}.cjs.js`,
        format: 'cjs',
    },
    esm: {
        file: `dist/${fileBaseName}.esm.js`,
        format: 'es',
    },
    'esm-bundler': {
        file: `dist/${fileBaseName}.esm-bundler.js`,
        format: 'es',
    },
    'esm-browser': {
        file: `dist/${fileBaseName}.esm-browser.js`,
        format: 'es',
    },
    global: {
        file: `dist/${fileBaseName}.global.js`,
        format: 'iife',
        name: 'format114k',
    },
};

const outputs = Object.values(formatsExport).map(({ file, format, name }) => ({
    file,
    format,
    name,
}));

export default {
    input: 'src/main.js',
    output: outputs,
    plugins: [terser(), json()],
};
