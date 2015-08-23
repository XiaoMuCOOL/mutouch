module.exports = function(grunt) {
  // 配置
  var global = grunt.initConfig({
    pkg : grunt.file.readJSON('package.json'),
    meta: {
      basePath: './'
    },
    uglify : {
      options : {
        banner : '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd HH:MM:ss") %> \n * 作者：<%= pkg.author.name %> \n * 版本：<%= pkg.version %> \n * QQ群：<%= pkg.author.QQGroup %> \n * 官网：<%= pkg.homepage %> \n */'
      },
      dist: {
        files: {
          'dist/jquery.<%= pkg.name %>.min.js': ['js/jquery.<%= pkg.name %>.js']
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', ['uglify']);
};