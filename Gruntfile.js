module.exports = function(grunt) {

    grunt.initConfig({
        jshint: {
            files: ['mecu.js'],
        },
        uglify: {
            my_target: {
                files: {
                    'mecu.min.js': ['mecu.js']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['jshint', 'uglify']);

};