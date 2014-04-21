module.exports = function(grunt) {
    var skinDir = 'theme/skin/frontend/<%= designPackage %>/default/';
    var appDir = 'theme/app/design/frontend/<%= designPackage %>/default/';
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        compass: {
            dist: {
                options: {
                    sassDir: skinDir + 'scss',
                    cssDir: skinDir + 'css',
                    environment: 'development',
                    outputStyle: 'nested'
                }
            }
        },
        watch: {
            livereload: {
                 options: {
                    livereload: true
                },
                files: [
                    appDir + '**/*.{phtml,xml}',
                    skinDir + 'scss/{,*/}*.scss',
                    skinDir + 'images-src/{,*/}*.{png,jpg,gif}',
                    [skinDir + 'js/*.js', '!' + skinDir + 'js/*.min.js']
                ],
                tasks: [
                    'compass',
                    'clean:images',
                    'imagemin',
                    'jshint',
                    'uglify'
                ]
            }
        },
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: skinDir + 'images-src/',
                    src: '**/*.{png,jpg,gif}',
                    dest: skinDir + 'images/'
                }]
            }
        },
         clean: {
            images: {
                src: [skinDir + 'images']
            }
        },
       jshint: {
            all: [
                'Gruntfile.js',
                skinDir + ['js/{,*/}*.js', '!js/{,*/}*.min.js']
            ]
        },
        uglify: {
            dist: {
                options: {
                    mangle: false
                },
                files: {
                    'theme/skin/frontend/<%= designPackage %>/default/js/scripts.min.js': [skinDir + 'js/scripts.js']
                }
            }
        },
    });
require('load-grunt-tasks')(grunt);


    grunt.registerTask('default', [
        'compass',
        'clean:images',
        'imagemin',
        'jshint',
        'uglify'
    ]);
};