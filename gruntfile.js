module.exports = function(grunt) {

    //Need this to use angular routing
    var rewrite = require('connect-modrewrite');

    "use strict";
    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        watch: {
            options: {
                livereload: true
            },
            css: {
                files: [
                    'build/components/**/*.scss',
                    'build/scss/**/*.scss',
                ],
                tasks: ['concat:sass', 'sass', 'autoprefixer'],
            },
            html: {
                files: [
                    'build/components/**/*.html',
                    //'build/html/**/*.html',
                ],
                tasks: ['ngtemplates'],
            },
            js: {
                files: [
                    'build/components/**/*.js',
                    //'build/js/**/*.js'
                ],
                tasks: ['concat'],
            },
            bower: {
                files: [
                    'app/bower.json',
                ],
                tasks: ['wiredep']
            },
        },

        connect: {
            app: {
                options: {
                    port: 8080,
                    base: 'app',
                    livereload: true,
                    //keepalive: true,
                    middleware: function(connect, options, middlewares) {
                        // 1. mod-rewrite behavior
                        var rules = [
                            '!\\.html|\\.woff|\\.ttf|\\.eot|\\.js|\\.css|\\.svg|\\.jp(e?)g|\\.png|\\.gif$ /index.html'
                        ];
                        middlewares.unshift(rewrite(rules));
                        return middlewares;
                    }
                }
            }
        },

        open: {
            dev: {
                path: 'http://localhost:8080',
                //app: 'Google Chrome'
            },
        },

        ngtemplates: {
            fluro: {
                cwd: './build/components',
                src: '**/*.html',
                dest: 'app/js/templates.js',
                options: {
                    //usemin:'/js/templates.min.js',
                    htmlmin: {
                        collapseBooleanAttributes: true,
                        collapseWhitespace: true,
                        removeAttributeQuotes: true,
                        removeComments: true, // Only if you don't use comment directives! 
                        removeEmptyAttributes: true,
                        removeRedundantAttributes: true,
                        removeScriptTypeAttributes: true,
                        removeStyleLinkTypeAttributes: true
                    }
                }
            }
        },



        sass: {
            build: {
                files: {
                    //'app/css/style.css': 'build/components/**/*.scss'
                    'app/css/style.css': 'build/scss/compiled.scss'
                }
            }
        },

        wiredep: {
            task: {
                src: [
                    'app/index.html', // .html support...
                ],
                options: {
                    cwd: './app',
                },
                fileTypes: {
                    html: {
                        block: /(([\s\t]*)<!--\s*bower:*(\S*)\s*-->)(\n|\r|.)*?(<!--\s*endbower\s*-->)/gi,
                        detect: {
                            js: /<script.*src=['"](.+)['"]>/gi,
                            css: /<link.*href=['"](.+)['"]/gi
                        },
                        replace: {
                            js: '<script src="/{{filePath}}"></script>',
                            css: '<link rel="stylesheet" href="/{{filePath}}" />'
                        }
                    }
                }

            }
        },
        //Build Stuff
        cssmin: {
            build: {
                files: {
                    'dist/www/css/style.min.css': ['app/css/style.css']
                }
            }
        },
        copy: {
            build: {
                files: [{
                    expand: true,
                    cwd: 'app',
                    src: [
                        '*.{ico,txt}',
                        '.htaccess',
                        'images/**',
                    ],
                    dest: 'dist/www'
                }, {
                    expand: true,
                    cwd: 'app/bower_components/font-awesome/fonts',
                    src: ['*.*'],
                    dest: 'dist/www/fonts'
                }],
            },
        },

        htmlmin: {
            finish: {
                files: [{
                    expand: true,
                    cwd: 'app',
                    src: [
                        'index.html',
                    ],
                    dest: 'dist/www'
                }]
            },

        },

        //Concatenate all the build js files
        concat: {
            js: {
                src: ['build/components/**/*.js'],
                dest: 'app/js/app.js',
            },
            sass: {
                src: ['build/scss/style.scss', 'build/components/**/*.scss', 'build/components/**/*.css'],
                dest: 'build/scss/compiled.scss',
            }
        },

        useminPrepare: {
            html: 'app/index.html',
            options: {
                dest: 'dist/www'
            }
        },


        usemin: {
            html: ['dist/www/{,*/}*.html', 'dist/{,*/}*.ejs'],
            css: ['dist/www/css/{,*/}*.css'],
            js: ['dist/www/js/{,*/}*.js'],
            options: {
                dirs: ['dist/www']
            }
        },

        autoprefixer: {
            single_file: {
                src: 'app/css/style.css',
                dest: 'app/css/style.css'
            }
        },
        uglify: {
            options: {
                mangle: false
            },
            build: {
                src: 'app/js/app.js',
                dest: 'dist/www/js/app.min.js'
            },
            templates: {
                src: 'app/js/templates.js',
                dest: 'dist/www/js/templates.min.js'
            }
        }
    });

    grunt.registerTask('default', ['connect', 'open:dev', 'watch']);
    //grunt.registerTask('build', ['copy:build', 'htmlmin:build', 'uglify:build', 'cssmin:build']);
    grunt.registerTask('build', ['useminPrepare', 'concat', 'copy', 'cssmin', 'htmlmin', 'uglify', 'usemin']);

    //'autoprefixer', 'cssmin'


};