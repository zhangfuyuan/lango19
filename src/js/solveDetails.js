/**
 * 解决方案详情
 */

var sd = {
  // 详情id
  id: '',

  // 详情内容
  dataList: [{
    title: '全球智能电视',
    url: 'lango19/images/solveDetails_p1.png',
    content: "朗国致力于打造打造全球智能电视的专业化设计平台，给全球电视品牌提供一体化的软硬件设计与开发服务。"
  }, {
    title: '智能交互一体机',
    url: 'lango19/images/solveDetails_p2.png',
    content: "朗国专注于全球教育及会议领域的智能交互一体机的解决方案研究，致力于提供从智能终端、运营管理平台到云端服务对接的一体化软硬件产品设计与开发服务。"
  }, {
    title: '智慧商显',
    url: 'lango19/images/solveDetails_p3.png',
    content: "朗国深耕全球商业显示的各细分领域，致力于提供行业化的智慧商显软硬件综合解决方案。"
  }],

  // 获取 URL 参数
  getUrlParam: function(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg); //匹配目标参数
    if (r != null) return unescape(r[2]);
    return null; //返回参数值
  },

  // 页面初始化
  pageInit: function() {
    try {
      this.id = this.getUrlParam('id');

      var _title = this.dataList[this.id]['title'];
      var _src = this.dataList[this.id]['url'];
      var _content = this.dataList[this.id]['content'];

      $('#title').html(_title);
      $('#banner').attr('src', _src).attr('alt', _title);
      $('#content').html(_content);
      $('#more_' + this.id).removeClass('hidden');
    } catch (e) {
      console.log(e);
    }
  }
};

/********************************************* 以上声明，以下调用 *********************************************/

sd.pageInit();

// 初始化滚动展示动画
new WOW().init();
