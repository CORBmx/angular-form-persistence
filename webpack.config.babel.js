import webpack from 'webpack';
import path from 'path';
import yargs from 'yargs';

const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const env = yargs.argv.mode;

const module_name = 'angular-form-persistence';

let output_file;
let plugins = [];

if (env === 'build') {
  plugins.push(new UglifyJsPlugin({minimize: true}));
  output_file = `${module_name}.min.js`;
} else {
  output_file = `${module_name}.js`;
}

var config = {
    entry: [
        './src/formPersistence.js',
        './src/formPersistence.provider.js',
        './src/formPersistence.directive.js'
    ],
    devtool: 'source-map',
    output: {
        path: __dirname + '/dist',
        filename: output_file,
        library: module_name,
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    module: {
        loaders: [
            {
                test: /(\.js)$/,
                exclude: /(node_modules|bower_components)/,
                loaders: ["ng-annotate", "babel"]
            }
        ]
    },
    resolve: {
        root: path.resolve('./src'),
        extensions: ['', '.js']
    },
    plugins: plugins
};

module.exports = config;
