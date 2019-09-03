# 官网与校招网

基于 Bootstrap3 开发的适配桌面端、移动端的兼容全系列浏览器（IE8及以上）的公司 [官网](http://lango-tech.com/) 与 [校招网](http://campus.lango-tech.com/)

* [Bootstrap3](https://v3.bootcss.com/)

## 一、功能要求

### 1、兼容IE（8及以上）/火狐/谷歌/Safari/Opera/腾讯X5等桌面端或移动端浏览器

* 参考 Bootstrap3 的 [浏览器和设备的支持情况](https://v3.bootcss.com/getting-started/#support) 进行兼容性开发

* [Autoprefixer](https://github.com/postcss/autoprefixer) & [gulp-postcss](https://github.com/postcss/gulp-postcss) | [《PostCSS及其常用插件介绍》](https://blog.csdn.net/u010881899/article/details/85005106)

* [《谷歌的ie9.js ie8.js ie7.js 解决IE5、IE6、IE7、IE8与W3C标准的冲突》](https://blog.csdn.net/roc1010/article/details/8601173)


### 2、适配桌面端和移动端

* 参考 Bootstrap3 的 [响应式工具](https://v3.bootcss.com/css/#responsive-utilities) 媒体查询方案进行适配

* 实例参考：[腾讯广告官网](https://e.qq.com/ads/)

### 3、解决开发、部署时浏览器缓存静态文件的问题

* 利用 jfinal 工程给每个文件添加后台渲染的版本参数

```
// 官网19年改版 start ===============================================
	
public static final String path19 = "/lango19/";
public static final String version19 = "201908232232";

@Before(PageViewInterceptor.class)
public void index() {  //首页
	setAttr("version", version19);
	render(path19 + "index.html");
}

// 官网19年改版 end   ===============================================
```

### 4、在线上传简历附件并支持在线查看


### 5、简历模板优化，文本框支持复制、粘贴


### 6、web前端性能及SEO优化

* 参考：[《web前端性能&SEO优化》](https://blog.csdn.net/xustart7720/article/details/79960591)

* [《HTML5—新语义元素header、nav、section、article、aside、footer等使用及兼容》](https://blog.csdn.net/nongweiyilady/article/details/53885433) | [《HTML \<main\> 标签》](https://www.w3school.com.cn/tags/tag_main.asp) | [《HTML5 \<nav\>》](http://know.webhek.com/html5/html5-nav.html)

### 7、用到的插件、工具库

（1）

<br>

## 二、开发流程

### 1、初始化项目工程

```
npm init

npm install --save-dev gulp gulp-postcss gulp-sourcemaps

npm install --save-dev autoprefixer cssnano
```

### 2、配置 `gulpfile.js`

```
const gulp         = require('gulp')
const postcss      = require('gulp-postcss')
const sourcemaps   = require('gulp-sourcemaps')
const autoprefixer = require('autoprefixer')
const cssnano      = require('cssnano')

gulp.task('css', () => {
  const plugins = [
        autoprefixer({browsers: ['last 4 version', '> 1%', 'not ie < 8', 'ios >= 7.0', 'android >= 4.0']}),
        cssnano()
    ]

  return gulp.src('dev/css/**/*.css')
    .pipe( sourcemaps.init() )
    .pipe( postcss(plugins) )
    .pipe( sourcemaps.write('.') )
    .pipe( gulp.dest('lango19/css/') )
})
```

* 运行 `gulp css`

### 3、html 页面基本模板

```
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge, chrome=1" />
    <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no" />
    <meta name="format-detection" content="telephone=no" />
    <meta name="format-detection" content="email=no" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black" />
    <meta name="copyright" content="Lango" />
    <meta name="renderer" content="webkit" />
    <meta name="keywords" content="广州朗国电子科技有限公司,朗国,电子,朗国电子技术,有限公司,   登录,   招聘,  校招,   板卡,  智能电视 , 板卡方案,  板卡" />
    <meta name="description" content="广州朗国电子科技有限公司" />
    <title>广州朗国电子科技有限公司</title>
    <link href="lango19/favicon.ico" rel="shortcut icon" type="image/x-icon" />
    <link href="lango19/public/css/bootstrap.min.css?${version}" rel="stylesheet" type="text/css" />
    <link href="lango19/public/css/ie10-viewport-bug-workaround.css?${version}" rel="stylesheet" type="text/css" />
    <link href="lango19/css/base.css?${version}" rel="stylesheet" type="text/css" />
    <link href="lango19/css/home.css?${version}" rel="stylesheet" type="text/css" />
    
    <!--[if lt IE 9]>
      <script src="https://cdn.jsdelivr.net/npm/html5shiv@3.7.3/dist/html5shiv.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/respond.js@1.4.2/dest/respond.min.js"></script>
    <![endif]-->
  </head>
  <body ontouchstart="" οnmοuseοver="">
    
    <header>
      <nav>
        <ul>
          <!-- <li><a href="http://lango-tech.com">首页</a></li> -->
          <!-- <li><a href="http://campus.lango-tech.com">校招</a></li> -->
          <li><a href="http://www.abbb.com">首页</a></li>
          <li><a href="http://www.cddd.com">校招</a></li>
        </ul>
      </nav>
    </header>
    
    <main class="home"></main>
    
    <footer></footer>

    <script src="lango19/public/js/jquery.min.js?${version}" type="text/javascript"></script>
    <script src="lango19/public/js/bootstrap.min.js?${version}" type="text/javascript"></script>
    <script src="lango19/public/js/ie10-viewport-bug-workaround.js?${version}" type="text/javascript"></script>
    <script src="lango19/js/common.js?${version}" type="text/javascript"></script>
    <script src="lango19/js/home.js?${version}" type="text/javascript"></script>
  </body>
</html>

```

* 根据实际部署情况，改造一下 `bootstrap.min.css`：
```
# 将字体文件从 相对路径（../fonts） 改成 绝对路径（lango19/public/fonts） 引入
@font-face{font-family:'Glyphicons Halflings';src:url(lango19/public/fonts/glyphicons-halflings-regular.eot);src:url(lango19/public/fonts/glyphicons-halflings-regular.eot?#iefix) format('embedded-opentype'),url(lango19/public/fonts/glyphicons-halflings-regular.woff2) format('woff2'),url(lango19/public/fonts/glyphicons-halflings-regular.woff) format('woff'),url(lango19/public/fonts/glyphicons-halflings-regular.ttf) format('truetype'),url(lango19/public/fonts/glyphicons-halflings-regular.svg#glyphicons_halflingsregular) format('svg')}
```

### 4、目录说明

`cms_lango\src\main\webapp\lango19` 目录为19年朗国官网改版页面资源目录

* 官网页面路径配置由 `cms_lango\src\main\java\com\jflyfox\XBH\controller` 目录下的 `CommonController.java` 后台文件控制

* 校招网页面路径配置由 `cms_lango\src\main\java\com\jflyfox\xiaozhao\controller` 目录下的 `CommonController.java` 后台文件控制

* 其它（如管理后台页面）路由配置由 `cms_lango\src\main\java\com\jflyfox\modules\CommonController.java` 和 `cms_lango\src\main\java\com\jflyfox\XBH\controller\AdminAboutController.java` 后台文件控制

### 5、部署说明

（1）运行 `gulp js`

（2）运行 `gulp css`

（3）将 `lango19` 目录下的静态资源按以下路径存放
```
# 官网（含校招网）静态资源（如html、js、css、icon）存放路径
cms_lango\src\main\webapp\lango19

# 校招网静态资源（如js、css、icon）存放路径
cms_lango\src\main\webapp\lango\describe\lango19
cms_lango\src\main\webapp\template\lango\describe

# 图片资源单独存放路径
D:\upload\jfinal_cms\lango19
```

<br>

## 三、遇到问题

### 1、file://访问与http://访问的区别，以确定开发环境

除了 IE8 外，没啥区别，file://访问即可

### 2、确认autoprefix配置 "> 1%" 是否有效

Autoprefixer 配置 `"> 1%"` 有效，但兼容性不够，建议 `{browsers: ['last 4 version', '> 1%', 'not ie < 8', 'ios >= 7.0', 'android >= 4.0']}`

### 3、控制路由的后台 java 文件在 tomcat 运行机制

均生成 class 文件，路径分别为：

* 公共路径： `apache-tomcat-8.0.36-windows-x64\apache-tomcat-8.0.36\wtpwebapps\cms_lango\WEB-INF\classes\com\jflyfox\modules\CommonController.class`

* 官网路径： `apache-tomcat-8.0.36-windows-x64\apache-tomcat-8.0.36\wtpwebapps\cms_lango\WEB-INF\classes\com\jflyfox\XBH\controller\CommonController.class`

* 校招网路径：`apache-tomcat-8.0.36-windows-x64\apache-tomcat-8.0.36\wtpwebapps\cms_lango\WEB-INF\classes\com\jflyfox\xiaozhao\controller\CommonController.class`

* 管理后台路径：`apache-tomcat-8.0.36-windows-x64\apache-tomcat-8.0.36\wtpwebapps\cms_lango\WEB-INF\classes\com\jflyfox\XBH\controller\AdminAboutController.class`

### 4、使用 `gulp-uglify` 批量压缩 js 文件

安装依赖：

```
npm i gulp-uglify --save-dev
```

配置 `gulpfile.js`：

```
...
const uglify       = require('gulp-uglify')

gulp.task('js', () => {
  return gulp.src(['dev/js/**/*.js'])
    .pipe( uglify() )
    .pipe( gulp.dest('lango19/js/') )
})
```

* 运行 `gulp js`

### 5、跨域名的路由跳转

通过绝对路径跳转
```
<li><a href="http://www.abbb.com">首页</a></li>
<li><a href="http://www.cddd.com">校招</a></li>
```

### 6、国际化

* 使用 [jquery.i18n.js](https://github.com/T-baby/jquery.i18n/blob/master/README-CN.md)

### 7、利用 gulp 实现监听单文件（html、js、css、images）变化后自动压缩

依赖：

```
npm install --save-dev gulp-changed

npm install --save-dev gulp-imagemin

npm install --save-dev gulp-html-replace

npm install --save-dev gulp-minify-html

npm install --save-dev jshint gulp-jshint

npm install --save-dev gulp-connect

npm install --save-dev gulp-image-resize

npm install --save-dev gulp-rename

npm install --save-dev gulp-htmlmin
```

`gulpfile.js`：

```
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
                 version: { // <link href="lango19/public/css/bootstrap.min.css?<!--build:version--><!--endbuild-->" rel="stylesheet" type="text/css" />
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
                 quality: .5,
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

```

* 全局安装 live-server `npm i live-server -g` 运行服务 `live-server --port=8126`

* 注意 Gulp3 和 Gulp4 语法的区别，更多参考：[《走进gulp4的世界》](https://www.jianshu.com/p/00983f69b0f5) | [《做一个合格的前端，gulp自动化构建工具入门教程》](https://blog.51cto.com/11640228/2062940) | [《Windows系统安装及初步使用ImageMagick》](https://blog.csdn.net/qq_37674858/article/details/80361860) | [《玩转 live-server -- 热加载利器》](https://blog.csdn.net/zhengzhuang95/article/details/81216125) | [《nodejs利用GraphicsMagick进行图形处理》](https://www.jianshu.com/p/1d656c52b788) | [《gulp-image-resize, 根据imagemagick调整图像大小很容易》](https://www.helplib.com/GitHub/article_98855) | [《Gulp-useref IE条件语句导致页面build:js不能替换的解决办法》](https://blog.csdn.net/weixin_34056162/article/details/91749529) | [《gulp-connect 实现页面自动刷新》](https://www.jianshu.com/p/f3dee1002b79)

### 8、当用户使用不支持的浏览器浏览时出现提示

IE8判断：

```
var g_supportIEVersion = 8.0; // 兼容的最低IE版本
var g_ua = navigator.userAgent.toLowerCase(); // 获取浏览器信息
var g_isIE = g_ua.indexOf('msie') > -1; // 判断是否为IE浏览器

if(g_isIE && g_ua.match(/msie ([\d.]+)/) && g_ua.match(/msie ([\d.]+)/)[1]<g_supportIEVersion){  
  alert('系统检测到您正在使用ie8以下内核的浏览器，不能实现完美体验，请更换或升级浏览器访问！');
}
```

禁用JS提示：

```
<noscript>
  <p class="noscript">网站的正常使用需要Javascript，请开启浏览器的Javascript脚本支持</p>
</noscript>
```


* 复习：[《条件注释判断浏览器版本<!--[if lt IE 9]>》](https://www.cnblogs.com/lmsblogs/p/5854949.html)

<br>
<br>
<br>
