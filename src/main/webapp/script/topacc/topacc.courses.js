TopBar.init();
IndexTop.init();

/**
 * 课程类
 */
var courses = function (){
	return {
		init :function (){
			courses._act_ = [];
			courses._act_["/courses/..."] = courses.detail;
		},
		
		getfunc : function(){
			var pathname = window.location.pathname;
			
			pStr = pathname.split("/");
			for (key in courses._act_){
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
					return courses._act_[key];
				}
			}
			return null;
		},
		
		index : function(){
			$(".course-filter a").click(function(){
                $(this).siblings().removeClass("on");
                $(this).addClass("on");
                $(".btn-search").click();
            });
			$(".btn-search").click(function(){
		    	category = $($(".course-filter>dl")[0]).find("a[class=on]").attr('data-value');
		    	method = $($(".course-filter>dl")[1]).find("a[class=on]").attr('data-value');
		    	area = $($(".course-filter>dl")[2]).find("a[class=on]").attr('data-value');
		    	params = Utils.getFormJson(jQuery("#form-search"));
				params["category"] = category;
				params["techmethod"] = method;
				params["city"] = area;
				DownPageSplit.clearParameter('btnPageDown').setParameters('btnPageDown', params).refresh('btnPageDown');
		    });
			
			keyword = $("#keyword").attr("value");
			if (typeof(keyword) != "undefined" && keyword != null && keyword.length > 0) {
				DownPageSplit.clearParameter('btnPageDown').setParameter('btnPageDown', 'keyword', keyword);
			}
			
			$("#btnPageDown").click();
		},
		detail : function (){
			// 课程详情页面全部功能链接
		    // 1、点击商品预览图片
		    var imgNumber = $('.det-list-show').children('ul').children('li').length;
		    var step = (imgNumber-2)*98;
		    var nowPos = 0;
		    var imgSrc = null;
		    var xuHao = null;
		    var getXuHao = null;
		    var picLeft = null;
		    var scrLeft =null;
		    $('.det-btn-l').click(function(){
		        if (nowPos > 0) {
		            nowPos -= 98;
		            $('.det-list-show').animate({
		                'scrollLeft' : nowPos
		            },500);
		        };
		    });
		    $('.det-btn-r').click(function(){
		        if (nowPos < step) {
		            nowPos += 98;
		            $('.det-list-show').animate({
		                'scrollLeft' : nowPos
		            },500);
		        };
		    })
		    var isrc;
		    $(".det-list-show img").hover(function(){
		        isrc = $(this).attr("src")
		        $(this).closest("li").addClass("on").siblings().removeClass("on")
		        $(".det-img img").attr("src", isrc)
		    });
		    
		    // 2、商品详情页面, 
		    // 滚动条滚到一定距离把，锚点导航进行fixed
		    var titH = $('.anchor-box').height();
		    var spanLen = $('.anchor-tit span').length;
		    var scrollArray  = [];
		    
		    if (typeof ($('.anchor-tit').offset()) != 'undefined') {
		    	var fixTop = $('.anchor-tit').offset().top;
		    }
		    $(".buy-course-box h2").each(function(index,value){
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
		    
		    // 点击锚点链接相应位置
		    $('.anchor-tit span').click(function(){
		        var anText = $(this).text();
		        $(".buy-course-box h2").each(function () {
		            if ($(this).text() == anText || $(this).children("span").first().text() == anText) {
		                var scrollT = parseInt($(this).offset().top) - 60;
		                $('body, html').animate({scrollTop: scrollT});
		            }
		        });
		    });
		    
		    // 初始化商品购买功能
		    ShoppingCart.initShoppingPage();
		    
		    if ($(".other-course li").length == 0){
				$(".other-course>img").siblings().hide();
			}
		}
	};
}();

courses.init();