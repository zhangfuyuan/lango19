# 官网与校招网

基于 Bootstrap3 开发的适配桌面端、移动端的兼容全系列浏览器（IE8及以上）的公司 [官网](http://lango-tech.com/) 与 [校招网](http://campus.lango-tech.com/)

* [Bootstrap3](https://v3.bootcss.com/)

## 一、功能要求

### 1、兼容IE（8及以上）/火狐/谷歌/Safari/Opera/腾讯X5等桌面端或移动端浏览器

* 参考 Bootstrap3 的 [浏览器和设备的支持情况](https://v3.bootcss.com/getting-started/#support) 进行兼容性开发

* [Autoprefixer](https://github.com/postcss/autoprefixer) & [gulp-postcss](https://github.com/postcss/gulp-postcss) | [《PostCSS及其常用插件介绍》](https://blog.csdn.net/u010881899/article/details/85005106)

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


<br>
<br>
<br>
