const fs = require('fs')
const path = require('path')
const gulp = require('gulp')
const tps = require('gulp-texturepacker')

// For each spritesheet, create a new folder in the graphics directory
// along with a .tps file of the same name. This gulp task will watch
// for changes during development and repack the sprites accordingly.
gulp.task('watch', () => {
  const dirs = fs.readdirSync(path.join(__dirname, 'graphics'))
  const tasks = dirs.map((dir) => ({
    tps: `${dir}.tps`,
    path: path.join(__dirname, dir),
  }))
  tasks.forEach((task) => {
    gulp.watch([task.path], () => {
      return gulp.src(path.join(task.path, task.tps)).pipe(tps())
    })
  })
})
