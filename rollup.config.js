// Rollup plugins
import babel from 'rollup-plugin-babel';
// import { eslint } from 'rollup-plugin-eslint'
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import alias from 'rollup-plugin-alias';
import path from 'path';

// import memory from 'rollup-plugin-memory'

const pkgName = 'hotspot-widget'
const pkg = {
  all: `dist/${pkgName}.js`,
  main: `dist/${pkgName}.cjs.js`,
  module: `dist/${pkgName}.esm.js`,
  browser: `dist/${pkgName}.umd.js`,
}

export default [
  {
    input: `src/lib/${pkgName}.js`,
    output: {
      name: 'Hotspot',
      // file: pkg.browser,
      file: pkg.all,
      sourcemap: true,
      strict: true,
      format: 'umd'
    },
    plugins: [
      // memory({
      // 	path: 'src/lib/main.js',
      // 	contents: `
      // 		console.log('Hello')
      // 	`
      // }),
      resolve({
        mainFields: [
          'module',
          'main',
          'jsnext'
        ],
        browser: true,
      }),
      commonjs(),
      // eslint(),
      babel({
        sourceMap: true,
        // exclude: 'node_modules/**',
        babelrc: false,
        "presets": [
          [
            "@babel/preset-env", 
            {
              "targets": {
                "browsers": ["last 2 versions", "ie >= 7"],
                "node": "current",
                // "esmodules": true
              },
              // "modules": "umd",
              // "useBuiltIns": "entry",
              // "corejs": 3,
              // "debug": true
            }
          ]
        ],
        "plugins": [
          // ["import", {
          //   "libraryName": "watType",
          // }]
        ]
      }),
      replace({
        exclude: 'node_modules/**',
        ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
      }),
      alias({
        // resolve: ['.js'],
        resolve: [],
        entries: [
          {
            find: '@',
            replacement: path.join(__dirname, 'src/lib')
          }
        ]
      }),
      // (process.env.NODE_ENV && uglify())
    ]
  },
  // {
	// 	input: 'src/lib/wat-type.js',
	// 	// external: [],
	// 	output: [
	// 		{ file: pkg.main, format: 'cjs' },
	// 		{ file: pkg.module, format: 'es' }
  //   ],
  //   plugins: [
  //     replace({
  //       exclude: 'node_modules/**',
  //       ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
  //     }),
  //   ],
	// }
]
