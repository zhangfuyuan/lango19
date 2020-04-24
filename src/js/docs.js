$(function() {
  if (window.Page) {

    // 初始化正文内容
    window.Page.initMain = function() {
      var self = this;

      $.getJSON('lango19/data/docs.json?' + Date.now(), function(response) {
        var _data = response['data'];
        var _docLen = _data.length;
        var _html = '';
        var _param2Obj = self.param2Obj();
        var _activeIndex = _param2Obj ? (parseInt(_param2Obj.index) || 0) : 0;
        _activeIndex = _activeIndex > _docLen - 1 ? 0 : _activeIndex;

        if (_docLen > 0) {
          $.each(_data, function(index, item) {
            if (item.show === 1) {
              _html += '<li><a id="f_' + item.id + '" class="' + (index === _activeIndex ? 'active' : '') +
                '" href="javascript:Page.switchDoc(\'' + item.id + '\', \'' + item.file + '\', ' + index +
                ', ' + item.neutral + ', \'' + item.i18n + '\');">' + item.title + '</a></li>';
            }
          });

          self.switchDoc(_data[_activeIndex].id, _data[_activeIndex].file, _activeIndex, _data[_activeIndex].neutral,
            _data[_activeIndex].i18n);
        }

        $('#docsBar').html(_html);
      });
    };

    // 切换文档
    window.Page.switchDoc = function(id, file, index, isNeutral, i18n) {
      var self = this;

      if (id && file) {
        $('#docsBar').find('a.active').removeClass('active').end().find('#f_' + id).addClass('active');
        var language = '';

        try {
          if (i18n && i18n !== 'undefined') {
            var locale = self.getSysLanguage();

            if (locale !== 'zh-CN' && ['zh-TW', 'en'].indexOf(locale) > -1 &&
              i18n.split && i18n.split(',').indexOf(locale) > -1) language = locale + '/';
          }
        } catch (err) {
          console.log(err);
        }

        $.ajax({
          url: 'lango19/data/' + language + file + '?' + Date.now(),
          type: 'GET',
          dataType: 'text'
        }).done(function(res) {
          if ($('#f_' + id).hasClass('active')) {
            $('#markdown').html(marked(res));
            $('#toTop').click();
            window.history.pushState(null, null, self.changeURLPar(window.location.href, 'index', index));

            if (isNeutral == 1) {
              $('#header, .main-left, .footer').addClass('hide');
              document.title = '';
            } else {
              $('#header, .main-left, .footer').removeClass('hide');
              document.title = '广州朗国电子科技有限公司';
            }
          }
        });
      }
    };

    // 解析URL中符号 ? 后的键值对生成对象
    window.Page.param2Obj = function(url) {
      var search = (url || window.location.href).split('?')[1];

      if (!search) return {};

      return JSON.parse('{"' +
        decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') +
        '"}');
    };

    // 给当前页面url添加参数
    window.Page.changeURLPar = function(uri, par, par_value) {
      var pattern = par + '=([^&]*)';
      var replaceText = par + '=' + par_value;
      if (uri.match(pattern)) { //如果连接中带这个参数
        var tmp = '/\\' + par + '=[^&]*/';
        tmp = uri.replace(eval(tmp), replaceText);
        return (tmp);
      } else {
        if (uri.match('[\?]')) { //如果链接中不带这个参数但是有其他参数
          return uri + '&' + replaceText;
        } else { //如果链接中没有带任何参数
          return uri + '?' + replaceText;
        }
      }
      return uri + '\n' + par + '\n' + par_value;
    }

    // 获取当前系统语言（默认英文）
    window.Page.getSysLanguage = function() {
      var locale = navigator.language || navigator.browserLanguage || navigator.systemLanguage || navigator.userLanguage ||
        '';

      if (/zh[-_].*CN/i.test(locale)) {
        locale = 'zh-CN';
      } else if (/zh[-_].*(TW|HK|MO)/i.test(locale)) {
        locale = 'zh-TW';
      } else {
        locale = 'en';
      }

      return locale;
    }

    window.Page.initMain();

    // 显示滚回顶部图标
    $('#content').scroll(function() {
      if (!window.Page.scrollTimer) {
        window.Page.scrollTimer = setTimeout(function() {
          if ($('#content').scrollTop() > 0) {
            $('#toTop').addClass('to-top-show');
          } else {
            $('#toTop').removeClass('to-top-show');
          }

          clearTimeout(window.Page.scrollTimer);
          window.Page.scrollTimer = null;
        }, 250);
      }
    });

  }
});
