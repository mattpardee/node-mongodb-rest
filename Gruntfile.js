module.exports = function(grunt) {
    grunt.initConfig({
        browserify: {
            options: {
                debug: true,
                aliasMappings: [{
                    cwd: './',
                    src: ['**/*.js'],
                    dest: './'
                }]
            },
            app: {
                src: [
                    'client/client.js',
                ],
                dest: 'build/client.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-browserify');

    grunt.registerTask('compile', ['browserify']);
};