var gulp = require('gulp')
var server = require('electron-connect').server.create()

gulp.task('live', function() {
  server.start()
  gulp.watch('main.js', server.restart)
  gulp.watch(['script.js', 'index.html'], server.reload)
})

gulp.task('default', ['live'])
