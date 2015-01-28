module.exports = function(grunt)
{
    config = grunt.file.readJSON("config.json");
    grunt.initConfig({
        connect: {
            dev: {
                options: {
                    hostname: 'localhost',
                    base: config.srcDir,
                    debug: true,
                    keepalive: true,
                }
            },
            prod: {
                options: {
                    hostname: 'localhost',
                    base: config.buildDir,
                    keepalive: true,
                }
            }
        },
        clean: ["build/*"],
        concat: {
            dist: {
                src: [config.srcDir + '*.js'],
                dest: config.buildDir + config.gameFile
            }
        },
        uglify: {
            build: {
                files: {
                    expand: true,
                    'build/game.js': ['src/game.js']
                }
            }
        },
        htmlmin: {
            options: {
                removeComments: true,
                collapseWhitespace: true
            },
            build: {
                files: [{
                    expand: true,
                    cwd: config.srcDir, 
                    src: ['*.html'],
                    dest: config.buildDir,
                }]
            }
        },
        imagemin: {
            build: {
                files: [{
                    expand: true,
                    cwd: config.srcDir + config.assetsDir, 
                    src:['*.{png,jpg,gif}'],
                    dest: config.buildDir + config.assetsDir,
                }],
            },
        },
        copy: {
            build: {
                files: [{
                    expand: true,
                    cwd: config.srcDir,
                    src: ['**/*'],
                    dest: config.buildDir
                }]
            }
        },
        compress: {
            build: {
                options: {
                    archive: './game.zip',
                    mode: 'zip'
                },
                files: [{
                    expand: true,
                    cwd: config.buildDir,
                    src: '**/*',
                }]
            }
        },
    });
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.registerTask('serve','connect:dev');
    grunt.registerTask('production','connect:prod');
    grunt.registerTask('build',['clean','copy','concat','uglify','htmlmin','imagemin','compress']);
    grunt.registerTask('default','');
};
