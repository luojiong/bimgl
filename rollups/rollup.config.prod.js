import path from 'path'
import {babel} from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import {terser} from 'rollup-plugin-terser'
import nodePolyfills from 'rollup-plugin-node-polyfills';
import json from "@rollup/plugin-json";
import commonjs from "@rollup/plugin-commonjs";
const babelrc = {
    presets: [
        [
            '@babel/preset-env',
            {
                modules: false,
                targets: '>0.3%, not dead',
                loose: true,
                bugfixes: true,
            },
        ],
    ],
    plugins: [
        [
            '@babel/plugin-proposal-class-properties',
            {
                loose: true
            }
        ]
    ]
};
const configProd =   {
    input:"src/BIMGL.js",
    output: [
        {
            file: path.resolve(__dirname,'build/bimgl.js'),
            format: 'umd',
            name:"BIMGL"
        },
        {
            file: path.resolve(__dirname,'build/bimgl.min.js'),
            format: 'umd',
            name:"BIMGL",
            plugins:[terser()]
        }
    ],
    plugins:[
        nodePolyfills(),
        nodeResolve({
            moduleDirectories:['node_modules']
        }),
        commonjs({
            dynamicRequireTargets: [
                'node_modules/logform/*.js',
            ]
        }),
        json(),
        babel({
            babelHelpers: 'bundled',
            compact: false,
            babelrc: false,
            ...babelrc,
            exclude:["'node_modules/*.js',"]
        })
    ],
}
export default configProd;
