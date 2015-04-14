module.exports = function (grunt) {

  // load all grunt tasks matching the `grunt-*` pattern
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({


    "watch": {
      "options": {}

    , "jst": {
        "files": [ "assets/templates/**/*.tpl" ]
      , "tasks": [ "jst" ]
      }

    , "javascripts": {
        "files": [ "assets/**/*.js" ]
      , "tasks": [ "concat" ]
      }

    , "livereload": {
        "files": [ 
          "dist/*"
        , "assets/**/*.css"
        ]
      , "options": {
          "livereload": true
        }
      }

    }

  , "jst": {
      "options": {
        "prettify": true
      , "templateSettings": require('./assets/config.js').templateSettings
      , processContent: function(src) {
          return src.replace(/(^\s+|\s+$)/gm, '');
        }
      , processName: function(filename) {
          var p = filename.replace(/^assets\/templates\//, '').split('.tpl')[0].split('/');
          p[p.length-1] = p[p.length-1].substr(0,1).toUpperCase() + p[p.length-1].substr(1);
          return p.join('.');
        }
      }
    , "dist": {
        "files": {
          "dist/templates.js": ["assets/templates/**/*.tpl"]
        }
      }
    }

  , "concat": {
      "options": {
        "stripBanners": true
      , "banner": '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */\n\n'
      , process: function(src, filepath) {
          return '\n\n// -------------------------------------------------------------- ' + filepath + '\n' + src;
        }
      }
    , "dist": {
        "files": {
          "dist/app.js": ["assets/config.js", "assets/views/**/*.js", "assets/app.js"]
        }
      }
    }

  , "concurrent": {
      "dev": {
        "tasks": [ 
          "server"
        , "watch"
        ]
      , "options": {
          "logConcurrentOutput": true
        }
      }
    }

  });

  grunt.config.set('pkg', grunt.file.readJSON('package.json'));

  ////////////////////////////////////////////////////////////////////////////////

  grunt.registerTask('server', 'same as `npm start`', function() {
    grunt.util.spawn({
          cmd: 'npm'
        , args: ['start']
        , opts: {
            stdio: 'inherit'
          }
        }
      , this.async()
    );
  });
  

  grunt.registerTask('test', 'same as `npm test`', function(){
    grunt.util.spawn({
          cmd: 'npm'
        , args: ['test']
        , opts: {
            stdio: 'inherit'
          }
        }
      , this.async()
    );
  });

  grunt.registerTask('dev', [ "jst", "concat", "concurrent:dev"]);
  grunt.registerTask('default', [ "jst", "concat", "test" ]);

}
