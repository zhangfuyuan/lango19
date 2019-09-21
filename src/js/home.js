/**
 * 首页 脚本
 * */

$.extend(true, window.Page || (window.Page = {}), {
  // 判断是否移动端
  isMobile: /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
    .test(navigator.userAgent),

  // 初始化正文内容
  initMain: function() {
    var _self = this;

    $.getJSON('lango19/data/home.json?' + Date.now(), function(response) {
      var _dataList = response['home']['dataList'];


      // 公司简介
      var _p1 = _dataList[0];
      var _html1 = '';
      $.each(_p1['contentList'], function(i, item) {
        _html1 += '<h3>' + item.subTitle + '</h3>' + '<p>' + item.subContent + '</p>';
      });
      $('#home_p1_title').html(_p1['title']);
      $('#home_p1_cont').empty().append(_html1);

      // 我们的愿景
      var _p2 = _dataList[1];
      $('#home_p2_title').html(_p2['title']);
      $('#home_p2_cont').html(_p2['content']);

      // 我们的使命
      var _p3 = _dataList[2];
      $('#home_p3_title').html(_p3['title']);
      $('#home_p3_cont').html(_p3['content']);

      // 价值观
      var _p4 = _dataList[3];
      var _html4 = '';
      $.each(_p4['contentList'], function(i, item) {
        _html4 += '<div class="home-p4-cont">' +
          '<h3>' + item.subTitle + '</h3>' +
          '<p>' + item.subContent + '</p>' +
          '</div>';
      });
      $('#home_p4_title').html(_p4['title']);
      $('#home_p4_contbox').empty().append(_html4);

      // 经营理念
      var _p5 = _dataList[4];
      var _html5 = '';
      $.each(_p5['contentList'], function(i, item) {
        _html5 += '<h3>' + item.subTitle + '</h3>' + '<p>' + item.subContent + '</p>';
      });
      $('#home_p5_title').html(_p5['title']);
      $('#home_p5_cont').empty().append(_html5);
    });
  }
});

/********************************************* 以上声明，以下调用 *********************************************/

$('#homeBanner').slick({
  infinite: true,
  dots: true,
  autoplay: true,
  arrows: false,
  autoplaySpeed: 4000,
  touchThreshold: 100,
  pauseOnHover: false
});

Page.initMain();

if (Page.isIE() && Page.isNotSupportIE()) {
  alert('系统检测到您正在使用IE' + Page.supportIEVersion + '以下内核的浏览器，不能实现完美体验，请更换或升级浏览器访问！');
} else {
	// 初始化滚动展示动画
	new WOW({
	  offset: 100
	}).init();
}

// 广州塔背景图滚动时视差效果
$(window).scroll(function() {
  $('#home_p4_bg').css({
    'background-position-y': ($('#home_p4_bg').offset().top - $(window).scrollTop() - 1000) / (Page.isMobile ? 4 : 7)
  });
});
