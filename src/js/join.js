/**
 * 加入我们 脚本
 * */

$.extend(true, window.Page || (window.Page = {}), {
	
});

/********************************************* 以上声明，以下调用 *********************************************/

if (Page.isIE() && Page.isNotSupportIE()) {
  alert('系统检测到您正在使用IE' + Page.supportIEVersion + '以下内核的浏览器，不能实现完美体验，请更换或升级浏览器访问！');
} else {
	// 初始化滚动展示动画
	new WOW().init();
}
