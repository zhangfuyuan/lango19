/**
 * 校招
 */

$.extend(true, window.Page || (window.Page = {}), {
  // 兼容的最低IE版本
  supportIEVersion: 10,
  
  // 获取浏览器信息
  ua: navigator.userAgent.toLowerCase(),
  
  // 判断是否为IE浏览器
  isIE: function() {
    return this.ua.indexOf('msie') > -1;
  },
  
  // 判断当前浏览器是否为不受支持的浏览器
  isNotSupportIE: function() {
    return this.ua.match(/msie ([\d.]+)/) && this.ua.match(/msie ([\d.]+)/)[1] < this.supportIEVersion;
  },
  
  // 校招岗位数据图
  jobMap: {},

  // 判断是否移动端
  isMobile: /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
    .test(navigator.userAgent),

  // 根据 sort 关键字从小到大排列对象数组 （数据默认已排好顺序，故不执行）
  sortArray: function(a, b) {
    return a['sort'] - b['sort'];
  },

  // 初始化正文内容
  initMain: function() {
    var _self = this;

    $.getJSON('lango19/data/joinCampus.json?' + Date.now(), function(response) {
      var _json = response['joinCampus'];
      var _typeList = _json['typeList'];
      var _dataList = _json['dataList'];

      // 初始化岗位分类
      var _typeHtml = '';
      var _firstTypeId = 0;
      $.each(_typeList, function(index, item) {
        // state 为 0 则显示
        if (item['state'] == 0) {
          _typeHtml += '<li class="' + (index == 0 ? 'active' : '') + '" onclick="Page.switchType(' + item['id'] +
            ', ' + index + ')">' + item['title'] + '</li>';

          _self.jobMap[item['id']] = {
            typeId: item['id'],
            typeTitle: item['title'],
            jobs: {}
          };

          if (index == 0) {
            _firstTypeId = item['id'];
          }
        }
      });
      $('#typeBox').empty().append(_typeHtml);


      // 初始化岗位详情
      var _jobHtml = '';
      $.each(_dataList, function(index, item) {
        var __jobId = item['job']['id'];
        var __jobPid = item['job']['pid'];
        var __jobTitle = item['job']['title'];
        var __jobWorkplace = item['job']['workplace'];
        var __jobPay = item['job']['pay'];
        var __jobLi = '';
        var __jobDuty = '';

        // state 为 0 则显示
        if (item['job']['state'] == 0) {
          __jobLi = (function(list) {
            var str = '';

            $.each(list, function(ind, ite) {
              str += ite['des'] + '<br>';
            });

            return str;
          })(item['li']);
          __jobDuty = (function(list) {
            var str = '';

            $.each(list, function(ind, ite) {
              str += ite['des'] + '<br>';
            });

            return str;
          })(item['duty']);

          if (__jobPid == _firstTypeId) {
            _jobHtml += '<li>' +
              '<h2 class="job-title">' + __jobTitle + '</h2>' +
              '<div class="job-box">' +
              '  <h3 class="job-pay">入职薪资：<span class="job-pay-cont">' + __jobPay + '</span></h3>' +
              '  <h3 class="job-workplace">工作地点：<span class="job-workplace-cont">' + __jobWorkplace + '</span></h3>' +
              '	 <h3 class="job-li">任职要求：</h3>' +
              '	 <p class="job-li-cont">' +
              __jobLi +
              '  </p>' +
              '</div>' +
              '<div class="job-btns flex-hc-vc">' +
              '	 <a class="submit-resume" href="' + (_self.isMobile ? 'javascript:void(0);' : '//campus.lango-tech.com/front/resume') +
              '" onclick="' + (_self.isMobile ? 'Page.showPopup()' : '') + '" target="_blank">投递简历</a>' +
              '	 <a class="see-more" href="javascript:void(0);" onclick="Page.showPopup(' + __jobId + ', ' + __jobPid +
              ')">查看更多>></a>' +
              '</div>' +
              '</li>';
          }

          _self.jobMap[__jobPid].jobs[__jobId] = {
            jobId: __jobId,
            jobPid: __jobPid,
            jobTitle: __jobTitle,
            jobWorkplace: __jobWorkplace,
            jobPay: __jobPay,
            jobLi: __jobLi,
            jobDuty: __jobDuty
          };
        }
      });
      $('#jobBox').empty().append(_jobHtml);
    });
  },

  // 切换岗位分类
  switchType: function(typeId, index) {
    this.hidePopup();
    var html = '';
    var _self = this;

    $.each(this.jobMap[typeId].jobs, function(i, item) {
      html += '<li>' +
        '<h2 class="job-title">' + item.jobTitle + '</h2>' +
        '<div class="job-box">' +
        '  <h3 class="job-pay">入职薪资：<span class="job-pay-cont">' + item.jobPay + '</span></h3>' +
        '  <h3 class="job-workplace">工作地点：<span class="job-workplace-cont">' + item.jobWorkplace + '</span></h3>' +
        '	 <h3 class="job-li">任职要求：</h3>' +
        '	 <p class="job-li-cont">' +
        item.jobLi +
        '  </p>' +
        '</div>' +
        '<div class="job-btns flex-hc-vc">' +
        '	 <a class="submit-resume" href="' + (_self.isMobile ? 'javascript:void(0);' : '//campus.lango-tech.com/front/resume') +
        '" onclick="' + (_self.isMobile ? 'Page.showPopup()' : '') + '" target="_blank">投递简历</a>' +
        '	 <a class="see-more" href="javascript:void(0);" onclick="Page.showPopup(' + item.jobId + ', ' + item.jobPid +
        ')">查看更多>></a>' +
        '</div>' +
        '</li>';
    });
    $('#typeBox').find('li').removeClass('active').eq(index).addClass('active');
    $('#jobBox').empty().append(html);
  },

  // 查看岗位详细弹窗
  showPopup: function(id, pid) {
    if (typeof id != 'undefined' && typeof pid != 'undefined') {
      var _job = this.jobMap[pid].jobs[id];
      var _html = '<h2 class="popup-title">' + _job.jobTitle + '</h2>' +
        '<h3 class="popup-pay">入职薪资：<span class="popup-pay-cont">' + _job.jobPay + '</span></h3>' +
        '<h3 class="popup-workplace">工作地点：<span class="popup-workplace-cont">' + _job.jobWorkplace + '</span></h3>' +
        '<h3 class="popup-duty">岗位职责：</h3>' +
        '<p class="popup-duty-cont">' +
        _job.jobDuty +
        '</p>' +
        '<h3 class="popup-li">任职要求：</h3>' +
        '<p class="popup-li-cont">' +
        _job.jobLi +
        '</p>' +
        '<div class="popup-btns flex-hc-vc">' +
        '	 <a class="submit-resume" href="' + (this.isMobile ? 'javascript:void(0);' : '//campus.lango-tech.com/front/resume') +
        '" onclick="' + (this.isMobile ? 'Page.showPopup()' : '') + '" target="_blank">投递简历</a>' +
        '</div>';
    } else {
      var _html =
        '<p>请用电脑登录网申页面填写简历信息</p><p style="padding-top: 10px;cursor: pointer;" onclick="Page.copyHandle($(\'#website\').get(0))">网申地址：<span id="website" style="text-decoration: underline;color: #23527c;">http://campus.lango-tech.com/front/resume</span></p>';
    }


    if (this.hidePopupTimer) {
      clearTimeout(this.hidePopupTimer);
      this.hidePopupTimer = null;
    }

    $('#popupCont').empty().append(_html);
    $('#popup').removeClass('hide-popup').css('top', $(document).width() <= 1024 ? ($(window).scrollTop() + 64 + 'px') :
      '50%');
  },

  // 隐藏弹窗延时器
  hidePopupTimer: null,

  // 隐藏弹窗
  hidePopup: function() {
    $('#popup').css('top', '-100%');

    var _self = this;
    this.hidePopupTimer = setTimeout(function() {
      $('#popup').addClass('hide-popup');
      clearTimeout(_self.hidePopupTimer);
      _self.hidePopupTimer = null;
    }, 500)
  },

  // 自动复制
  copyHandle: function(node) {
    var range = document.createRange();
    range.selectNodeContents(node);
    var selection = document.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    document.execCommand('Copy');
  }
});

/********************************************* 以上声明，以下调用 *********************************************/

if (Page.isIE() && Page.isNotSupportIE()) {
  alert('系统检测到您正在使用IE' + Page.supportIEVersion + '以下内核的浏览器，不能实现完美体验，请更换或升级浏览器访问！');
}

// css hack 360安全浏览器
if ($('#testLi').width() > 382) {
  $(document.body).append('<style type="text/css">.jc-job li {margin-right: 1.7%;}</style>');
}

Page.initMain();
