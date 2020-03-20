$(function() {
  if (window.Page) {

    // 初始化正文内容
    window.Page.initMain = function() {
      $.getJSON('lango19/data/download.json?' + Date.now(), function(response) {
        var _data = response['data'];
        var _html = '';
        var _first = null;

        if (_data.length > 0) {
          window.Page.downloadMap = _data;
          $.each(_data, function(index, item) {
            if (item.show === 1) {
              _html += '<dt>' + item.title + '</dt>';

              if (item.subList.length > 0) {
                $.each(item.subList, function(inde, ite) {
                  if (ite.show === 1) {
                    _html += '<dd><a id="f_' + item.id + '_' + ite.subId + '" class="' + (!_first ?
                        'active' : '') + '" href="javascript:Page.switchDownload(\'' + item.id +
                      '\', \'' + ite.subId + '\');">' + ite.title + '</a></dd>';

                    if (!_first) {
                      _first = {
                        id: item.id,
                        subId: ite.subId
                      };
                    }
                  }
                });
              }
            }
          });

          if (_first) {
            window.Page.switchDownload(_first.id, _first.subId);
          }
        }

        $('#downloadBar').html(_html);
      });
    };

    // 切换文档
    window.Page.switchDownload = function(id, subId) {
      if (id && subId && window.Page.downloadMap &&
        window.Page.downloadMap[id] && window.Page.downloadMap[id].subList[subId]) {
        var _data = window.Page.downloadMap[id].subList[subId];
        var _html = '';

        $.each(_data.linkList, function(index, item) {
          if (item.show === 1) {
            _html += '<li class="flex-hb-vc">' +
              '<div>' +
              '<p class="download-list-name">' + item.name + '</p>' +
              '<p class="download-list-sub">' + item.sub + '</p>' +
              '</div>' +
              '<a class="download-list-link" href="' + item.href + '" target="_blank">' + item.download + '</a>' +
              '</li>';
          }
        });

        $('#downloadBar').find('a.active').removeClass('active')
          .end().find('#f_' + id + '_' + subId).addClass('active');
        $('#downloadTitle').html(_data.title);
        $('#downloadExplain').html(_data.explain);
        $('#downloadList').html(_html);
      }
    };

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
