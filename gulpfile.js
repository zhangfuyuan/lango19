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
  cssAfterSrcList = ['build/lango19/css/', 'release/lango19/css/'],
  jsBeforeSrc = 'src/js/*.js',
  jsAfterSrcList = ['build/lango19/js/', 'release/lango19/js/'],
  imagesBeforeSrc = 'src/images/*.+(jpeg|jpg|png)',
  imagesAfterSrcList = ['build/lango19/images/', 'release/lango19/images/'],
  imagesThumbAfterSrcList = ['build/lango19/images/thumb/', 'release/lango19/images/thumb/'],
  htmlBeforeSrc = 'src/html/*.html',
  htmlAfterSrcList = ['build/', 'release/'],
  jsonBeforeSrc = 'src/json/*.json',
  jsonAfterSrcList = ['build/lango19/data/', 'release/lango19/data/'],
  indexHrefList = ['./index.html', '//lango-tech.com'],
  campusHrefList = ['./campus.html', '//campus.lango-tech.com'],
  hrefPrefixList = ['.', '/xbh'],
  hrefSuffixList = ['.html', ''],
  baseHrefList = ['', `<base href="/XBH/"><script>document.write('<base href="http://'+window.location.host+'/XBH/" /> ')</script>`];

let hrefIndex = 0;

gulp.task('html', () => {
  return gulp.src(htmlBeforeSrc)
    .pipe(changed(htmlAfterSrcList[hrefIndex]))
    .pipe(htmlreplace({
      version: {
        src: null,
        tpl: Date.now() + ''
      },
      baseHref: {
        src: null,
        tpl: baseHrefList[hrefIndex]
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
      hrefIndex: {
        src: null,
        tpl: hrefIndex
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
    .pipe(gulp.dest(htmlAfterSrcList[hrefIndex]))
    .pipe(connect.reload())
})

gulp.task('js', () => {
  return gulp.src([jsBeforeSrc])
    .pipe(changed(jsAfterSrcList[hrefIndex]))
    .pipe(jshint())
    .pipe(uglify())
    .pipe(gulp.dest(jsAfterSrcList[hrefIndex]))
})

gulp.task('css', () => {
  const plugins = [
    autoprefixer({
      browsers: ['last 4 version', '> 1%', 'not ie < 8', 'ios >= 7.0', 'android >= 4.0']
    }),
    cssnano()
  ];

  return gulp.src(cssBeforeSrc)
    .pipe(changed(cssAfterSrcList[hrefIndex]))
    .pipe(postcss(plugins))
    .pipe(gulp.dest(cssAfterSrcList[hrefIndex]))
})

gulp.task('images', () => {
  return gulp.src(imagesBeforeSrc)
    .pipe(changed(imagesAfterSrcList[hrefIndex]))
    .pipe(imagemin({
      progressive: true
    }))
    .pipe(gulp.dest(imagesAfterSrcList[hrefIndex]))
})

gulp.task('image-resize', () => {
  return gulp.src(imagesBeforeSrc)
    .pipe(changed(imagesThumbAfterSrcList[hrefIndex]))
    .pipe(imageResize({
      width: 100,
      quality: .5,
      cover: true
    }))
    .pipe(rename((path) => {
      path.basename += '_thumb'
    }))
    .pipe(gulp.dest(imagesThumbAfterSrcList[hrefIndex]))
})

gulp.task('json', () => {
  return gulp.src([jsonBeforeSrc])
    .pipe(changed(jsonAfterSrcList[hrefIndex]))
    .pipe(gulp.dest(jsonAfterSrcList[hrefIndex]))
})

gulp.task('watchs', () => {
  gulp.watch(htmlBeforeSrc, gulp.series('html'))
  gulp.watch(jsBeforeSrc, gulp.series('js'))
  gulp.watch(cssBeforeSrc, gulp.series('css'))
  gulp.watch(imagesBeforeSrc, gulp.series(gulp.parallel('images', 'image-resize')))
  return gulp.watch(jsonBeforeSrc, gulp.series('json'))
})

gulp.task('connect', () => {
  return connect.server({
    ip: '127.0.0.1',
    livereload: true,
    port: 8126
  })
})

gulp.task('release', () => {
  hrefIndex = 1;

  return new Promise((resolve, reject) => {
    console.log('【正式发布】');
    resolve();
  })
})

gulp.task('default', gulp.series(gulp.parallel('html', 'js', 'css', 'images', 'image-resize', 'json', 'watchs',
  'connect')))

gulp.task('ok', gulp.series('release', 'html', 'js', 'css', 'images', 'image-resize', 'json'))
