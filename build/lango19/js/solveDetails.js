var sd={id:"",dataList:[{title:"全球智能电视",url:"lango19/images/solveDetails_p1.png",content:"朗国致力于打造打造全球智能电视的专业化设计平台，给全球电视品牌提供一体化的软硬件设计与开发服务。"},{title:"智能交互一体机",url:"lango19/images/solveDetails_p2.png",content:"朗国专注于全球教育及会议领域的智能交互一体机的解决方案研究，致力于提供从智能终端、运营管理平台到云端服务对接的一体化软硬件产品设计与开发服务。"},{title:"智慧商显",url:"lango19/images/solveDetails_p3.png",content:"朗国深耕全球商业显示的各细分领域，致力于提供行业化的智慧商显软硬件综合解决方案。"}],getUrlParam:function(t){var i=new RegExp("(^|&)"+t+"=([^&]*)(&|$)"),a=window.location.search.substr(1).match(i);return null!=a?unescape(a[2]):null},pageInit:function(){try{this.id=this.getUrlParam("id");var t=this.dataList[this.id].title,i=this.dataList[this.id].url,a=this.dataList[this.id].content;$("#title").html(t),$("#banner").attr("src",i).attr("alt",t),$("#content").html(a),$("#more_"+this.id).removeClass("hidden")}catch(t){console.log(t)}}};$(function(){sd.pageInit()});