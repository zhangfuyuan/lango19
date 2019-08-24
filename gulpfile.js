const gulp         = require('gulp')
const postcss      = require('gulp-postcss')
const autoprefixer = require('autoprefixer')
const cssnano      = require('cssnano')
const uglify       = require('gulp-uglify')

gulp.task('css', () => {
  const plugins = [
        autoprefixer({browsers: ['last 4 version', '> 1%', 'not ie < 8', 'ios >= 7.0', 'android >= 4.0']}),
        cssnano()
    ]

  return gulp.src('dev/css/**/*.css')
    .pipe( postcss(plugins) )
    .pipe( gulp.dest('lango19/css/') )
})

gulp.task('js', () => {
  return gulp.src(['dev/js/**/*.js'])
    .pipe( uglify() )
    .pipe( gulp.dest('lango19/js/') )
})
