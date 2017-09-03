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
			document.onmousedown=function(event){ 
				var e=event ||window.event; 
				var elm=e.srcElement || e.target; 
				
				$(".course-category,.train-type").hide(function(){
					$(".nav").children().removeClass("on");
				});
			};
			$(window).bottomScrollLoading({
			    out:$(document),
			    range:0,
			    callback:function(){
			    	//$(".btn-search").click();
			    	DownPageSplit.pageDown(DownPageSplit.pages['btnPageDown']);
			    }
			});
			
			$(".nav").click(function(){
				dorpmenu = $(this).attr("for");
				ts = $("." + dorpmenu);
				ts.toggle();
				
				$(this).siblings().children().removeClass("on");
				
				if (ts.is(":visible")){
					$(this).children().addClass("on");
				} else {
					$(this).children().removeClass("on");
				}
			});
			
			$(".course-filter>li").click(function(){
                $(this).siblings().removeClass("on");
                $(this).addClass("on");
                $(".btn-search").click();
            });
			
			$(".btn-search").click(function(){
		    	category = $(".course-category").find("li[class=on]").attr('data-value');
		    	method = $(".train-type").find("li[class=on]").attr('data-value');
		    	params = Utils.getFormJson(jQuery("#form-search"));
				params["category"] = category;
				params["techmethod"] = method;
				DownPageSplit.clearParameter('btnPageDown').setParameters('btnPageDown', params).refresh('btnPageDown');
		    });
			
			keyword = $("#keyword").attr("value");
			if (typeof(keyword) != "undefined" && keyword != null && keyword.length > 0) {
				DownPageSplit.clearParameter('btnPageDown').setParameter('btnPageDown', 'keyword', keyword);
			}
			
			$("#btnPageDown").click();
			
			// 所在位置
			var uan = $.cookie("user_area_name");
			$(".area>.skip").html(uan);
			$("#search_area").val(uan);
			$("#search_area").click(function(){
				window.location.assign("/area/choose/mobile");
			});
		},
		
		detail : function (){
			$(".nav li").click(function(){
				$(this).siblings().removeClass("on");
				$(this).addClass("on");
				$(".coursepart").hide();
				forArea = $(this).attr("for");
				$("#" + forArea).show();
			});
			$(".nav li:first").click();
		}
	};
}();

courses.init();