/**
 * 公用 脚本
 * */

window.Page = {
	// 滚动延时器
  scrollTimer: null,
	
	// 页头、页脚初始化
  init: function() {
    $.getJSON('lango19/data/common.json?' + Date.now(), function(response) {
      var _json = response['common'];
      var _hrefIndex = _json['hrefIndex'];
      var _indexHrefList = _json['indexHrefList'];
      var _campusHrefList = _json['campusHrefList'];
      var _hrefPrefixList = _json['hrefPrefixList'];
      var _hrefSuffixList = _json['hrefSuffixList'];
      var _campusHrefPrefixList = _json['campusHrefPrefixList'];
      var _campusHrefSuffixList = _json['campusHrefSuffixList'];
      var _data = _json['dataList'];

      // 初始化页头
      var _headerItem = null;

      for (var _hIndex = 0; _hIndex < 6; _hIndex++) {
				// 0 ~ 5 为页头内容
        _headerItem = _data[_hIndex];

        $('#header_' + _hIndex).html(_headerItem['content'])
          .attr('href', _headerItem['url'] ?
            (_hrefPrefixList[_hrefIndex] + _headerItem['url'] + _hrefSuffixList[_hrefIndex]) :
            _indexHrefList[_hrefIndex]);
        $('#logo').parent('.header-logo').attr('href', _indexHrefList[_hrefIndex]);
      }

      // 初始化页脚
      var _footerItem = null;

      for (var _fIndex = 0; _fIndex < 3; _fIndex++) {
				// 6 ~ 8 为页脚内容
        _footerItem = _data[6 + _fIndex];

        $('#footer_' + _fIndex).html(_footerItem['content'])
          .attr('href', _footerItem['url'] || _indexHrefList[_hrefIndex]);
      }
    });
  }
};

/********************************************* 以上声明，以下调用 *********************************************/

Page.init();

// 显示滚回顶部图标
$(window).scroll(function() {
  if (!Page.scrollTimer) {
    Page.scrollTimer = setTimeout(function() {
      if ($(window).scrollTop() > 0) {
        $('#toTop').addClass('to-top-show');
      } else {
        $('#toTop').removeClass('to-top-show');
      }

      clearTimeout(Page.scrollTimer);
      Page.scrollTimer = null;
    }, 250);
  }
});
