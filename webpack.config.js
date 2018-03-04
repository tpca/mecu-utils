module.exports = {
    entry: __dirname + '/lib/index.js',
    output: {
        path: __dirname + '/build',
        filename: 'mecu-utils.js',
        libraryTarget: 'umd',
        library: 'MecuUtils',
        // Follow https://github.com/webpack/webpack/issues/6522
        globalObject: 'this'
    }
};