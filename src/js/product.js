/**
 * 产品中心
 * */

$.extend(true, window.Page || (window.Page = {}), {
  // 产品数据图
  productMap: null,

  // 当前产品信息
  curProduct: null,

  // 初始化正文内容
  initMain: function() {
    var _self = this;

    $.getJSON('lango19/data/product.json?' + Date.now(), function(response) {
      _self.productMap = response['product']['productList'];
    });
  },

  // 切换产品分类
  switchType: function(index) {
    var _index = +index || 0;
    var _html = '';

    this.curProduct = this.productMap[_index];
    $('#product_preview').attr('src', this.curProduct['imgList'][0]).attr('alt', this.curProduct['name']);
    $('#product_cont_name').html(this.curProduct['name']);
    $('#product_cont_content').html(this.curProduct['content1']);
    $('#product_cont_sub').html(this.curProduct['content2']);
    $('#product_cont_img_0').attr('src', this.curProduct['imgList'][0]).attr('alt', this.curProduct['name']);
    $('#product_cont_img_1').attr('src', this.curProduct['imgList'][1]).attr('alt', this.curProduct['name']);
    $('#product_cont_img_2').attr('src', this.curProduct['imgList'][2]).attr('alt', this.curProduct['name']);
    $.each(this.curProduct['itemList'], function(i, item) {
      _html += '<li class="product-item ' + (i == 0 ? 'active' : '') + '" onclick="Page.switchItem(' + i + ');">' +
        item + '</li>';
    });
    $('#product_items').empty().append(_html);
    this.switchItem(0);
  },

  // 切换产品子分类
  switchItem: function(index) {
    var _index = +index || 0;

    $('.product-item').removeClass('active').eq(_index).addClass('active');
    $('#product_details').empty().append(this.curProduct['itemContentList'][_index]);
  },
});

/********************************************* 以上声明，以下调用 *********************************************/

Page.initMain();

// 初始化滚动展示动画
new WOW().init();

$('.dd').on('click', function() {
  if (!Page.productMap)
    return false;

  $('.dd').removeClass('active');
  $(this).addClass('active');
  $('.product-type-right').addClass('hidden');
  $('.product-contbox').removeClass('hidden');
  Page.switchType($(this).data('index'));
});

$('.li').on('click', function() {
  if (!Page.productMap)
    return false;

  $('.dd').removeClass('active')
    .eq(+$(this).data('index') || 0).addClass('active');
  $('.product-type-right').addClass('hidden');
  $('.product-contbox').removeClass('hidden');
  Page.switchType($(this).data('index'));
});

$('#product_cont_imgbox').on('mouseover click', 'img', function() {
  $('#product_preview').attr('src', $(this).attr('src'));
});
