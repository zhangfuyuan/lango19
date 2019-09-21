/**
 * 申请须知 脚本
 * */

$.extend(true, window.Page || (window.Page = {}), {

});

/********************************************* 以上声明，以下调用 *********************************************/

if (Page.isIE() && Page.isNotSupportIE()) {
	
} else {
	// 初始化滚动展示动画
	new WOW().init();
}
