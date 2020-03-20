$(function() {
  if (window.Page) {

    // 初始化正文内容
    window.Page.initMain = function() {
      $.getJSON('lango19/data/docs.json?' + Date.now(), function(response) {
        var _data = response['data'];
        var _html = '';

        if (_data.length > 0) {
          $.each(_data, function(index, item) {
            if (item.show === 1) {
              _html += '<li><a id="f_' + item.id + '" class="' + (index === 0 ? 'active' : '') +
                '" href="javascript:Page.switchDoc(\'' + item.id + '\', \'' + item.file + '\');">' +
                item.title + '</a></li>';
            }
          });

          window.Page.switchDoc(_data[0].id, _data[0].file);
        }

        $('#docsBar').html(_html);
      });
    };

    // 切换文档
    window.Page.switchDoc = function(id, file) {
      if (id && file) {
        $('#docsBar').find('a.active').removeClass('active').end().find('#f_' + id).addClass('active');

        $.ajax({
          url: 'lango19/data/' + file + '?' + Date.now(),
          type: 'GET',
          dataType: 'text'
        }).done(function(res) {
          if ($('#f_' + id).hasClass('active')) {
            $('#markdown').html(marked(res));
            $('#toTop').click();
          }
        });
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
