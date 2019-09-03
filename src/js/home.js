/**
 * 首页 脚本
 * */

var g_supportIEVersion = 10; // 兼容的最低IE版本
var g_ua = navigator.userAgent.toLowerCase(); // 获取浏览器信息
var g_isIE = g_ua.indexOf('msie') > -1; // 判断是否为IE浏览器

/********************************************* 以上声明，以下调用 *********************************************/

if(g_isIE && g_ua.match(/msie ([\d.]+)/) && g_ua.match(/msie ([\d.]+)/)[1]<g_supportIEVersion){  
  alert('系统检测到您正在使用IE' + g_supportIEVersion + '以下内核的浏览器（实际IE' + g_ua.match(/msie ([\d.]+)/)[1] + '），不能实现完美体验，请更换或升级浏览器访问！');
}
