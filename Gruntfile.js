/*global module:true*/
var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;
var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};


module.exports = function (grunt) {

  'use strict';

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({

    open: {
      server: {
        url: 'http://localhost:<%= connect.livereload.options.port %>'
      }
    },

    // default watch configuration
    watch: {
      livereload: {
        files: [
          'app/*.html',
          '{.tmp,app}/styles/*.css',
          '{.tmp,app}/scripts/*.js',
          'app/images/*.{png,jpg,jpeg}'
        ],
        tasks: ['livereload']
      }
    },

    jshint: {
      all: [
        'app/aura_components/**/*.js'
      ]
    },

    connect: {
      livereload: {
        options: {
          port: 9000,
          middleware: function (connect) {
            return [
              lrSnippet,
              mountFolder(connect, 'app')
            ];
          }
        }
      }
    },

    clean: {
      dist: ['.tmp', 'dist/*'],
      server: '.tmp'
    },
    uglify: {
      dist: {
        files: {
          'dist/application.js': [
            'app/scripts/*.js'
          ]
        }
      }
    },
    useminPrepare: {
      html: 'index.html'
    },
    usemin: {
      html: ['dist/*.html'],
      css: ['dist/styles/*.css']
    },
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: 'app/images',
          src: '*.{png,jpg,jpeg}',
          dest: 'dist/images'
        }]
      }
    },
    cssmin: {
      dist: {
        files: {
          'dist/application.css': [
            'app/styles/*.css'
          ]
        }
      }
    },

    copy: {
      dist: {
        files: [
          { dest: 'dist/index.php', src: 'dist/index.html' },
          { cwd: 'app/', dest: 'dist/', src: ['.htaccess', 'robots.txt'], expand: true }
        ]
      }
    },

    htmlmin: {
      dist: {
        options: {
          removeComments: false,
          removeCommentsFromCDATA: true,
          collapseWhitespace: false,
          collapseBooleanAttributes: true,
          removeAttributeQuotes: false,
          removeRedundantAttributes: false,
          useShortDoctype: true,
          removeEmptyAttributes: false,
          removeOptionalTags: false
        },
        files: [{
          expand: true,
          cwd: 'app',
          src: '*.html',
          dest: 'dist'
        }]
      }
    },

    concat: {
      options: {
        separator: "\n\n\n\n//--------\n\n\n"
      },
      dist: {
        src: ['app/aura_components/**/*.js'],
        dest: 'app/scripts/aura_components.js'
      }
    }

  });

  grunt.renameTask('regarde', 'watch');

  grunt.renameTask('mincss', 'cssmin');

  grunt.registerTask('server', [
    'clean:server',
    'livereload-start',
    'connect:livereload',
    'open',
    'watch'
  ]);

  grunt.registerTask('test', [
    'clean:server',
    'connect:livereload',
    'watch'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'concat',
    'jshint',
    'useminPrepare',

    'uglify',
    'imagemin',
    'htmlmin',
    'cssmin',
    'usemin',
    'copy'
  ]);

  grunt.registerTask('default', ['build']);

};