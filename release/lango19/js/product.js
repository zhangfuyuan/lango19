$.extend(!0,window.Page||(window.Page={}),{productMap:null,curProduct:null,initMain:function(){var i=this;$.getJSON("lango19/data/product.json?"+Date.now(),function(t){i.productMap=t.product.productList})},switchType:function(t){var i=+t||0,c="";this.curProduct=this.productMap[i],$("#product_preview").attr("src",this.curProduct.imgList[0]).attr("alt",this.curProduct.name),$("#product_cont_name").html(this.curProduct.name),$("#product_cont_content").html(this.curProduct.content1),$("#product_cont_sub").html(this.curProduct.content2),$("#product_cont_img_0").attr("src",this.curProduct.imgList[0]).attr("alt",this.curProduct.name),$("#product_cont_img_1").attr("src",this.curProduct.imgList[1]).attr("alt",this.curProduct.name),$("#product_cont_img_2").attr("src",this.curProduct.imgList[2]).attr("alt",this.curProduct.name),$.each(this.curProduct.itemList,function(t,i){c+='<li class="product-item '+(0==t?"active":"")+'" onclick="Page.switchItem('+t+');">'+i+"</li>"}),$("#product_items").empty().append(c),this.switchItem(0)},switchItem:function(t){var i=+t||0;$(".product-item").removeClass("active").eq(i).addClass("active"),$("#product_details").empty().append(this.curProduct.itemContentList[i])},switchTypeTimer:null,switchTypeAnimation:function(t,i,c){this.switchTypeTimer&&(clearTimeout(this.switchTypeTimer),this.switchTypeTimer=null,t.css("animation-name","none")),setTimeout(function(){t.css("animation-name",i),this.switchTypeTimer=setTimeout(function(){t.css("animation-name","none"),this.switchTypeTimer=null},c)},16)}}),Page.initMain(),Page.isIE()&&Page.isNotSupportIE()||(new WOW).init(),$(".dd").on("click",function(){if(!Page.productMap)return!1;$(".dd").removeClass("active"),$(this).addClass("active"),$("#product_type_right").addClass("hidden"),$("#product_contbox").removeClass("hidden"),Page.switchType($(this).data("index")),Page.switchTypeAnimation($("#product_contbox"),"toleft",400)}),$(".li").on("click",function(){if(!Page.productMap)return!1;$(".dd").removeClass("active").eq(+$(this).data("index")||0).addClass("active"),$("#product_type_right").addClass("hidden"),$("#product_contbox").removeClass("hidden"),Page.switchType($(this).data("index")),Page.switchTypeAnimation($("#product_contbox"),"toleft",400)}),$("#product_cont_imgbox").on("mouseover click","img",function(){$("#product_preview").attr("src",$(this).attr("src"))});