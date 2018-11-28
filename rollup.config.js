import typescript from 'rollup-plugin-typescript2';
import resolve from 'rollup-plugin-node-resolve';

const build = {
    input: [
        './main.ts'
    ],
    output: {
        dir: './dist/',
        format: 'es',
        sourcemap: false,
        entryFileNames: '[name].js'
    },

    experimentalCodeSplitting: true,

    plugins: [
        typescript(),
        resolve()
    ]
};

export default [build];