const gulp = require('gulp'),
  postcss = require('gulp-postcss'),
  autoprefixer = require('autoprefixer'),
  cssnano = require('cssnano'),
  uglify = require('gulp-uglify'),
  changed = require('gulp-changed'),
  imagemin = require('gulp-imagemin'),
  htmlreplace = require('gulp-html-replace'),
  htmlmin = require('gulp-htmlmin'),
  jshint = require('gulp-jshint'),
  connect = require('gulp-connect'),
  imageResize = require('gulp-image-resize'),
  rename = require('gulp-rename');

const cssBeforeSrc = 'src/css/*.css',
  cssAfterSrc = 'build/lango19/css/',
  jsBeforeSrc = 'src/js/*.js',
  jsAfterSrc = 'build/lango19/js/',
  imagesBeforeSrc = 'src/images/*.+(jpeg|jpg|png)',
  imagesAfterSrc = 'build/lango19/images/',
  imagesThumbAfterSrc = 'build/lango19/images/thumb/',
  htmlBeforeSrc = 'src/html/*.html',
  htmlAfterSrc = 'build/',
  jsonBeforeSrc = 'src/json/*.json',
  jsonAfterSrc = 'build/lango19/data/',
  indexHrefList = ['./index.html', '//www.abbb.com', '//lango-tech.com'],
  campusHrefList = ['./campus.html', '//www.cddd.com', '//campus.lango-tech.com'],
  hrefPrefixList = ['.', '//www.abbb.com/xbh', '//lango-tech.com/xbh'],
  hrefSuffixList = ['.html', '', ''],
  campusHrefPrefixList = ['.', '//www.cddd.com', '//campus.lango-tech.com'],
  campusHrefSuffixList = ['.html', '', ''],
  hrefIndex = 0;

gulp.task('html', () => {
  return gulp.src(htmlBeforeSrc)
    .pipe(changed(htmlAfterSrc))
    .pipe(htmlreplace({
      version: {
        src: null,
        tpl: Date.now() + ''
      },
      indexHref: {
        src: null,
        tpl: indexHrefList[hrefIndex]
      },
      campusHref: {
        src: null,
        tpl: campusHrefList[hrefIndex]
      },
      hrefPrefix: {
        src: null,
        tpl: hrefPrefixList[hrefIndex]
      },
      hrefSuffix: {
        src: null,
        tpl: hrefSuffixList[hrefIndex]
      },
      campusHrefPrefix: {
        src: null,
        tpl: campusHrefPrefixList[hrefIndex]
      },
      campusHrefSuffix: {
        src: null,
        tpl: campusHrefSuffixList[hrefIndex]
      },
    }))
    .pipe(htmlmin({
      removeComments: true,
      collapseWhitespace: true,
      removeEmptyAttributes: true,
      minifyJS: true,
      minifyCSS: true,
      ignoreCustomFragments: [/<!--\[if.+\]>/, /<!\[endif\]-->/]
    }))
    .pipe(gulp.dest(htmlAfterSrc))
    .pipe(connect.reload())
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
    autoprefixer({
      browsers: ['last 4 version', '> 1%', 'not ie < 8', 'ios >= 7.0', 'android >= 4.0']
    }),
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
      quality: .5,
      cover: true
    }))
    .pipe(rename((path) => {
      path.basename += '_thumb'
    }))
    .pipe(gulp.dest(imagesThumbAfterSrc))
})

gulp.task('json', () => {
  return gulp.src([jsonBeforeSrc])
    .pipe(changed(jsonAfterSrc))
    .pipe(gulp.dest(jsonAfterSrc))
})

gulp.task('watchs', () => {
  gulp.watch(htmlBeforeSrc, gulp.series('html'))
  gulp.watch(jsBeforeSrc, gulp.series('js'))
  gulp.watch(cssBeforeSrc, gulp.series('css'))
  gulp.watch(imagesBeforeSrc, gulp.series(gulp.parallel('images', 'image-resize')))
  gulp.watch(jsonBeforeSrc, gulp.series('json'))
})

gulp.task('connect', () => {
  connect.server({
    ip: '127.0.0.1',
    livereload: true,
    port: 8126
  })
})

gulp.task('default', gulp.series(gulp.parallel('html', 'js', 'css', 'images', 'image-resize', 'json', 'watchs', 'connect')))
