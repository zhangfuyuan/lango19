$(function(){window.Page&&(window.Page.initMain=function(){$.getJSON("lango19/data/docs.json?"+Date.now(),function(o){var a=o.data,i="";0<a.length&&($.each(a,function(o,a){1===a.show&&(i+='<li><a id="f_'+a.id+'" class="'+(0===o?"active":"")+'" href="javascript:Page.switchDoc(\''+a.id+"', '"+a.file+"');\">"+a.title+"</a></li>")}),window.Page.switchDoc(a[0].id,a[0].file)),$("#docsBar").html(i)})},window.Page.switchDoc=function(a,o){a&&o&&($("#docsBar").find("a.active").removeClass("active").end().find("#f_"+a).addClass("active"),$.ajax({url:"lango19/data/"+o+"?"+Date.now(),type:"GET",dataType:"text"}).done(function(o){$("#f_"+a).hasClass("active")&&($("#markdown").html(marked(o)),$("#toTop").click())}))},window.Page.initMain(),$("#content").scroll(function(){window.Page.scrollTimer||(window.Page.scrollTimer=setTimeout(function(){0<$("#content").scrollTop()?$("#toTop").addClass("to-top-show"):$("#toTop").removeClass("to-top-show"),clearTimeout(window.Page.scrollTimer),window.Page.scrollTimer=null},250))}))});