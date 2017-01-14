module.exports = {
    entry: __dirname + '/lib/index.js',
    output: {
         path: __dirname + '/build',
         filename: 'mecu-utils.js',
         libraryTarget: 'umd',
         library: 'MecuUtils'
    }
 };