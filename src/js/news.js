/**
 * 新闻中心详情
 */

var news = {
  // 详情内容
  dataList: [{
    title: '大赢世界，智控未来| 2018梦派硬科技创新大会取得圆满成功',
    des: '2018年8月23日下午13点30分，梦派集团以“创新，赋能，共赢”为主题的《2018梦派硬科技创新大会》在登喜路国际大酒店国际厅隆重举行。没有去到现场的朋友不必遗憾，下面数字音视工程网记者将为您带来现场报道。',
    hot: 1,
    id: 0,
    state: 0,
    time: '2015-07-18',
    type: 1,
    url: 'lango19/images/news_0.png'
  }, {
    title: '第九届中国（国际）商用显示系统产业领袖峰会昨日盛大召开',
    des: '2017年11月17日，在国家工信部电子信息司、深圳市经济和信息化委员会、深圳市科技创新委员会的指导下，由中国商用显示系统产业联盟、深圳市商用显示系统产业促进会主办，深圳市商用显示系统产业促进会承办的商用显示行业年度盛会——第九届中国（国际）商用显示系统产业领袖峰会，在深圳市凯宾斯基酒店盛大召开。',
    hot: 1,
    id: 1,
    state: 0,
    time: '2018-08-23',
    type: 1,
    url: 'lango19/images/news_1.png'
  }, {
    title: '广州朗国电子科技有限公司2019年中集体活动——带着"主板”去旅行',
    des: '广州朗国电子科技有限公司2019年中集体活动正式开启 朗小国期待已久的活动终于来啦~~~~ 活动从7月12日6:35开始，到7月13日17:00结束',
    hot: 1,
    id: 2,
    state: 0,
    time: '2018-08-23',
    type: 1,
    url: 'lango19/images/news_2.png'
  }, {
    title: '梦派集团发布2017年新品 领航商显蓝海',
    des: '2月27日，超越竞争•共赢蓝海——梦派2017春季新品发布会在深圳登喜路国际大酒店隆重举行，大会吸引了来自全国各地的300多名代理商参与。',
    hot: 1,
    id: 3,
    state: 0,
    time: '2018-08-23',
    type: 1,
    url: 'lango19/images/news_3.png'
  }, {
    title: '梦派刘丹：商显电视的“合众模式”怎么玩？',
    des: '去年，前康佳总裁刘丹离职后自创“梦牌”品牌电视，并发布了“R”、“S”、“T”三大系列互联网电视，开启了互联网“家”电视的新视界。',
    hot: 1,
    id: 4,
    state: 0,
    time: '2018-08-23',
    type: 1,
    url: 'lango19/images/news_4.png'
  }, {
    title: '新屏 新世界！newline新品发布会北京隆重举行，吹响2019商显市场冲锋号',
    des: '皎皎珠玉，在水一方，翩翩湖畔，日出东方。坐落于雁栖湖畔的北京日出东方凯宾斯基酒店，外观宛如一轮冉冉升起的太阳，因“一带一路”国际峰会和APEC峰会成为世界级地标建筑;4月11日，这里又见证了一个历史时刻，全球领先的会议平板品牌newline正式进入中国市场，宣告了中国商显市场新时代拉开帷幕。',
    hot: 1,
    id: 5,
    state: 0,
    time: '2018-08-23',
    type: 1,
    url: 'lango19/images/news_5.png'
  }, {
    title: '云计算联合实验室揭牌仪式在广州朗国电子举行',
    des: '2018年8月8号，在这个极具特别意义的日子里，广州朗国电子与华南理工大学软件学院，共同创办的云计算联合实验室的揭牌仪式在广州朗国电子科技有限公司举行。',
    hot: 1,
    id: 6,
    state: 0,
    time: '2018-08-23',
    type: 1,
    url: 'lango19/images/news_6.png'
  }],

  // 页面初始化
  pageInit: function() {
    try {
      var len = this.dataList.length;

      for (var i = 0; i < len; i++) {
        $('#news_img_' + i).attr('src', this.dataList[i]['url']).attr('alt', this.dataList[i]['title'])
          .parent('.news-imgbox').attr('href', $('#news_img_' + i).parent('.news-imgbox').attr('href') + this.dataList[i][
            'id'
          ]);
        $('#news_title_' + i).html(this.dataList[i]['title']);
        $('#news_des_' + i).html(this.dataList[i]['des']);
      }
    } catch (e) {
      console.log(e);
    }
  }
};

/********************************************* 以上声明，以下调用 *********************************************/

// css hack 360安全浏览器
if ($('#testLi').width() > 382) {
  $(document.body).append('<style type="text/css">.news-items li {margin-right: 1.7%;}</style>');
}

$(function() {
  news.pageInit();
});
