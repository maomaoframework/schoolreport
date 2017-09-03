TopBar.init();
IndexTop.init();
var books = function (){
	return {
		init :function (){
			books._act_ = [];
			books._act_["/books/..."] = books.detail;
		},
		
		getfunc : function(){
			var pathname = window.location.pathname;
			
			pStr = pathname.split("/");
			for (key in books._act_){
				matched = true;
				pKeys = key.split("/");
				for (i = 0; i < pStr.length; i ++) {
					slice1 = pStr[i];
					slice2 = pKeys[i];
					if (slice2 == "...")
						continue;
					matched = matched && (slice1 == slice2);
				}
				
				if (matched == true) {
					return books._act_[key];
				}
			}
			return null;
		},
		
		index : function(){
			$(".course-nav>span").click(function(){
	    		$(this).siblings().removeClass("on");
	    		$(this).addClass("on");
				data = $(this).attr("data-value");
				DownPageSplit.clearParameter('btnPageDown').setParameter('btnPageDown', 'filter', data).refresh('btnPageDown');
		    });
			
			keyword = $("#keyword").attr("value");
			if (typeof(keyword) != "undefined" && keyword != null && keyword.length > 0) {
				DownPageSplit.clearParameter('btnPageDown').setParameter('btnPageDown', 'keyword', keyword);
			}
			$("#btnPageDown").click();
		},
		
		/**
		 * 图书详情
		 */
		detail : function(){
		    // 滚动条滚到一定距离把，锚点导航进行fixed
			var fixTop = $('.anchor-tit').offset().top;
			var titH = $('.anchor-box').height();
			var spanLen = $('.anchor-tit span').length;
			var scrollArray  = [];
			$(".book-detail-box h2").each(function(index,value){
			    scrollArray.push($(value).offset().top-60);
			});
			$(window).scroll(function(){
			    if($(document).scrollTop() > fixTop) {
			        $('.anchor-tit').addClass('fixed');
			    }else {
			        $('.anchor-tit').removeClass('fixed');
			    }
			
			    for (var a = 0; a <= spanLen-1; a++) {
			        if ($(window).scrollTop() >= scrollArray[a]) {
			            $(".anchor-tit span").eq(a).addClass("on").siblings().removeClass("on");
			        };
			    };
			});
			
			$(".minus").on("click",function(){
				ipt = $(this).parent().children("input");
				v = ipt.attr("value");
				i = 1;
				try{
					i = parseInt(v);
				}catch(e) {
					i = 1;
				}
				
				if (--i <= 0)
					i = 1;
				
				ipt.attr("value", i);
				$(".buy_goods").attr("data-count",i);
			});
			$(".plus").on("click",function(){
				ipt = $(this).parent().children("input");
				v = ipt.attr("value");
				i = 1;
				try{
					i = parseInt(v);
				}catch(e) {
					i = 1;
				}
				
				i ++;
				
				ipt.attr("value", i);
				$(".buy_goods").attr("data-count",i);
			});
			
			// 首页点击锚点链接相应位置
			$('.anchor-tit span').click(function(){
			    var anText = $(this).text();
			    $(".book-detail-box h2").each(function () {
			        if ($(this).text() == anText) {
			            var scrollT = parseInt($(this).offset().top) - 60;
			            $('body, html').animate({scrollTop: scrollT});
			        }
			    });
			});
			
			Buttons.bindButtons("buy_goods");
			
			$(".book-group[type='checkbox']").on("click",function(){
				var flag = $(this).attr("checked");
				if(typeof(flag) == 'undefined'){
					var price = $(this).attr("data-price");
					var total = $(".total .price").attr("data-total");
					var temp = parseFloat(total) - parseFloat(price);
					$(".total .price").attr("data-total",temp);
					$(".total .price").find("span").html(temp.toFixed(2));
				}else{
					var total = $(".total .price").attr("data-total");
					var price = $(this).attr("data-price");
					var temp = parseFloat(total) + parseFloat(price);
					$(".total .price").attr("data-total",temp);
					$(".total .price").find("span").html(temp.toFixed(2));
				}
			});
			
			$(".btn-batch-buy-goods").on("click",function(){
				var sel_book =  $(".book-group[type='checkbox']:checked");
				var bookIds = "";
				$(sel_book).each(function(){
					bookIds +=$(this).attr("data-value")+",";
					
				});
				if (bookIds.length == 0) {
					Dialog.showErrorMessage("您还没有选择图书哦^_^");
					return false;
				}
				Utils.doAfterLogin(function(){
					var sel_book =  $(".book-group[type='checkbox']:checked");
					var bookIds = "";
					$(sel_book).each(function(){
						bookIds +=$(this).attr("data-value")+",";
						
					});
					
					params["bookIds"] = bookIds;
					Request.post('/shopping/add_books', params, function(result){
						if(result.success == false){
							Dialog.showErrorMessage(result.msg);
						}else{
							Dialog.showMessage("已添加至购物车");
							setTimeout(function(){
								window.location.reload(true);
							}, 2000);
						}
						
					});
				});
			});
		}
	};
}();

books.init();