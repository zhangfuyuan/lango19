/**
 * 公用 脚本
 * */

var g_indexHrefList        = ['/build/', '//www.abbb.com', '//lango-tech.com'],
    g_campusHrefList       = ['/build/campus.html', '//www.cddd.com', '//campus.lango-tech.com'],
    g_hrefPrefixList       = ['.', '//www.abbb.com/xbh', '//lango-tech.com/xbh'],
    g_hrefSuffixList       = ['.html', '', ''],
    g_campusHrefPrefixList = ['.', '//www.cddd.com', '//campus.lango-tech.com'],
    g_campusHrefSuffixList = ['.html', '', ''],
    g_hrefIndex            = 0;
var g_dataList = [
      // header
      {
        content: '了解我们',
        des: '页头菜单',
        group_id: 1,
        id: 0, // 顺序不按此id排列
        lenth: 250,
        state: 0,
        url: g_indexHrefList[g_hrefIndex]
      },
      {
        content: '产品中心',
        des: '页头菜单',
        group_id: 1,
        id: 1,
        lenth: 250,
        state: 0,
        url: g_hrefPrefixList[g_hrefIndex] + '/product' + g_hrefSuffixList[g_hrefIndex]
      },
      {
        content: '解决方案',
        des: '页头菜单',
        group_id: 1,
        id: 2,
        lenth: 250,
        state: 0,
        url: g_hrefPrefixList[g_hrefIndex] + '/solve' + g_hrefSuffixList[g_hrefIndex]
      },
      {
        content: '服务支持',
        des: '页头菜单',
        group_id: 1,
        id: 3,
        lenth: 250,
        state: 0,
        url: g_hrefPrefixList[g_hrefIndex] + '/service' + g_hrefSuffixList[g_hrefIndex]
      },
      {
        content: '新闻中心',
        des: '页头菜单',
        group_id: 1,
        id: 4,
        lenth: 250,
        state: 0,
        url: g_hrefPrefixList[g_hrefIndex] + '/news' + g_hrefSuffixList[g_hrefIndex]
      },
      {
        content: '加入我们',
        des: '页头菜单',
        group_id: 1,
        id: 5,
        lenth: 250,
        state: 0,
        url: g_hrefPrefixList[g_hrefIndex] + '/join' + g_hrefSuffixList[g_hrefIndex]
      },
      // footer
      {
        content: 'Copyright  ©lango-tech.com.  All Rights Reserved.',
        des: '页脚Copyright',
        group_id: 1,
        id: 6,
        lenth: 250,
        state: 0,
        url: 'javascript:void(0);'
      },
      {
        content: '粤ICP备14024048号-1',
        des: '页脚备案',
        group_id: 1,
        id: 7,
        lenth: 250,
        state: 0,
        url: '//www.beian.miit.gov.cn'
      },
      {
        content: '朗国电子科技有限公司',
        des: '页脚公司名称',
        group_id: 1,
        id: 8,
        lenth: 250,
        state: 0,
        url: g_indexHrefList[g_hrefIndex]
      }
    ];
var g_dataMap = {
      // 人为筛选数据集合索引值字符串集
      header: '0,1,2,3,4,5',
      footer: '6,7,8'
    }

/**
 * 页面初始化
 * */
var g_pageInit = function() {
  try {
    // 初始化页头
    var headerList = g_dataMap.header.split(',');
    var headerLen = headerList.length;
    for (var hIndex=0; hIndex<headerLen; hIndex++) {
      $('#header_' + hIndex).html(g_dataList[headerList[hIndex]]['content'])
                            .attr('href', g_dataList[headerList[hIndex]]['url']);
    }
    
    // 初始化页脚
    var footerList = g_dataMap['footer'].split(',');
    var footerLen = footerList.length;
    for (var fIndex=0; fIndex<footerLen; fIndex++) {
      $('#footer_' + fIndex).html(g_dataList[footerList[fIndex]]['content'])
                            .attr('href', g_dataList[footerList[fIndex]]['url']);
    }
  } catch(e) {
    console.log(e);
  }
};

/********************************************* 以上声明，以下调用 *********************************************/

$(function(){
  g_pageInit();
  
  // 显示滚回顶部图标
  var scrollTimer = null;
  $(window).scroll(function() {
    if (!scrollTimer){
      scrollTimer = setTimeout(function () {
        if ($(window).scrollTop() > 0) {
          $('#toTop').addClass('to-top-show');
        } else {
          $('#toTop').removeClass('to-top-show');
        }
        
        clearTimeout(scrollTimer);
        scrollTimer = null;
      }, 250);
    }
  }); 
  
});
