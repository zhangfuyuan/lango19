const gulp         = require('gulp'),
      postcss      = require('gulp-postcss'),
      autoprefixer = require('autoprefixer'),
      cssnano      = require('cssnano'),
      uglify       = require('gulp-uglify'),
      changed      = require('gulp-changed'),
      imagemin     = require('gulp-imagemin'),
      htmlreplace  = require('gulp-html-replace'),
      htmlmin      = require('gulp-htmlmin'),
      jshint       = require('gulp-jshint'),
      connect      = require('gulp-connect'),
      imageResize  = require('gulp-image-resize'),
      rename       = require('gulp-rename');

const cssBeforeSrc        = 'src/css/*.css',
      cssAfterSrc         = 'build/lango19/css/',
      jsBeforeSrc         = 'src/js/*.js',
      jsAfterSrc          = 'build/lango19/js/',
      imagesBeforeSrc     = 'src/images/*.+(jpeg|jpg|png)',
      imagesAfterSrc      = 'build/lango19/images/',
      imagesThumbAfterSrc = 'build/lango19/images/thumb/',
      htmlBeforeSrc       = 'src/html/*.html',
      htmlAfterSrc        = 'build/';

gulp.task('html', () => {
  return gulp.src(htmlBeforeSrc)
             .pipe(changed(htmlAfterSrc))
             .pipe(htmlreplace({
                 version: {
                   src: null, 
                   tpl: Date.now() + ''
                 }
             }))
             .pipe(htmlmin({
               removeComments: true,
               collapseWhitespace: true,
               removeEmptyAttributes: true,
               minifyJS: true,
               minifyCSS: true,
               ignoreCustomFragments: [/<!--\[if.+\]>/,/<!\[endif\]-->/]
             }))
             .pipe(gulp.dest(htmlAfterSrc))
})

gulp.task('js', () => {
  return gulp.src([jsBeforeSrc])
             .pipe(changed(jsAfterSrc))
             .pipe(jshint())
             .pipe(uglify())
             .pipe(gulp.dest(jsAfterSrc))
})

gulp.task('css', () => {
  const plugins = [
        autoprefixer({browsers: ['last 4 version', '> 1%', 'not ie < 8', 'ios >= 7.0', 'android >= 4.0']}),
        cssnano()
    ];

  return gulp.src(cssBeforeSrc)
             .pipe(changed(cssAfterSrc))
             .pipe(postcss(plugins))
             .pipe(gulp.dest(cssAfterSrc))
})

gulp.task('images', () => {
  return gulp.src(imagesBeforeSrc)
             .pipe(changed(imagesAfterSrc))
             .pipe(imagemin({
                 progressive: true
             }))
             .pipe(gulp.dest(imagesAfterSrc))
})

gulp.task('image-resize', () => {
  return gulp.src(imagesBeforeSrc)
             .pipe(changed(imagesThumbAfterSrc))
             .pipe(imageResize({
                 width: 100,
                 quality: .8,
                 cover: true
             }))
             .pipe(rename((path) => { path.basename += '_thumb' }))
             .pipe(gulp.dest(imagesThumbAfterSrc))
})

gulp.task('watchs', () => {
  gulp.watch(htmlBeforeSrc, gulp.series('html'))
  gulp.watch(jsBeforeSrc, gulp.series('js'))
  gulp.watch(cssBeforeSrc, gulp.series('css'))
  gulp.watch(imagesBeforeSrc, gulp.series(gulp.parallel('images', 'image-resize')))
})

gulp.task('connect', () => {
    connect.server({
        ip: '127.0.0.1',
        livereload: true,
        port: 8126
    })
})

gulp.task('default', gulp.series(gulp.parallel('html', 'js', 'css', 'images', 'image-resize', 'watchs', 'connect')))
