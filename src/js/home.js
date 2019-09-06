/**
 * 首页 脚本
 * */

$.extend(true, window.Page || (window.Page = {}), {
  supportIEVersion: 10, // 兼容的最低IE版本
  ua: navigator.userAgent.toLowerCase(), // 获取浏览器信息
  isIE: function() {
    return this.ua.indexOf('msie') > -1; // 判断是否为IE浏览器
  },
  isNotSupportIE: function() {
    return this.ua.match(/msie ([\d.]+)/) && this.ua.match(/msie ([\d.]+)/)[1] < this.supportIEVersion;
  }
});

/********************************************* 以上声明，以下调用 *********************************************/

if (Page.isIE() && Page.isNotSupportIE()) {
  alert('系统检测到您正在使用IE' + Page.supportIEVersion + '以下内核的浏览器，不能实现完美体验，请更换或升级浏览器访问！');
}
