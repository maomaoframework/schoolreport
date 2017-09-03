TopBar.init();
IndexTop.init();

var institution = function (){
	return {
		init :function (){
			institution._act_ = [];
			institution._act_["/institution/..."] = institution.ins_view;
			institution._act_["/institution/.../goods"] = institution.goods;
			institution._act_["/institution/.../teachers"] = institution.teachers;
			institution._act_["/institution/.../news"] = institution.news;
			institution._act_["/institution/.../campus"] = institution.campus;
			institution._act_["/institution/.../album"] = institution.album;
			institution._act_["/institution/.../videos"] = institution.videos;
			institution._act_["/institution/.../evals"] = null;
			institution._act_["/institution/.../intro"] = null;
			institution._act_["/institution/.../coupons/receive"] = institution.coupon_receive;
		},
		
		getfunc : function(){
			var pathname = window.location.pathname;
			
			pStr = pathname.split("/");
			for (key in institution._act_){
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
					return institution._act_[key];
				}
			}
			return null;
		},
		
		getFuncKey : function (){
			var pathname = window.location.pathname;
			
			pStr = pathname.split("/");
			
			for (key in institution._act_){
				matched = true;
				pKeys = key.split("/");
				if (pStr.length != pKeys.length) {
					continue;
				}
				for (i = 0; i < pStr.length; i ++) {
					slice1 = pStr[i];
					slice2 = pKeys[i];
					if (slice2 == "...")
						continue;
					matched = matched && (slice1 == slice2);
				}
				
				if (matched == true) {
					return key;
				}
			}
			return null;
		},
		
		/**
		 * 首页面
		 */
		index : function(){
			$(".address-filter a").click(function(){
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
			
			// 鼠标放上时显示网络推荐课程
			$("#index_container").on('hover', '.recommend-label' , function(){
				$(this).find(".agen-txt").toggle();
			});
		},
		/**
		 * 登录页面
		 */
		login : function (){
			
		},
		
		/**
		 * 机构注册页面
		 */
		regist : function (){
			function enableButton() {
				min = 60;
				$("#btn-getcode").css("background-color","#3d84c4");
				$("#btn-getcode").removeAttr("disabled");
				clearInterval(intervalHandler);
				$("#btn-getcode").html("获取验证码");
			}
			
			function disableButton() {
				$("#btn-getcode").css("background-color","gray");
				$("#btn-getcode").attr("disabled","disabled");
				
				// 设置文字
				intervalHandler = setInterval(function(){
					$("#btn-getcode").html((--min)  + "秒后再次发送");
				}, 1000);
				
				setTimeout(enableButton,60 * 1000);
			}
			
			if (typeof(areas) != "undefined" && areas != null && areas.length > 0) {
				// 为省添加列表
				$.each(areas, function (index, element){
					if (index > 0) {
						if (element.CClassCode.length == 0) {
							$("#pronvice").append("<option value='" + element.CId + "_" + element.CName + "'>" + element.CName + "</option>");
						}
					}
				});
			}
			
			// 当省改变的时候
			$('#pronvice').bind('change',function(){
				selid = $("#pronvice").val();
				if (current_selid == selid)
					return;
				
				$('#city').empty();
				len = areas.length;
				for (var i = 0; i < len; i ++) {
					vname = areas[i].CId + "_" + areas[i].CName;
					if (vname === selid) {
						$.each(areas[i].subAreas, function(index, element){
							$('#city').append("<option value='" + element.CId + "_" + element.CName  + "'>" + element.CName + "</option>");
						});
						break;
					}
				}
			});
			
			// 点击注册按钮时触发
			$(".regist-submit").click(function(){
				Request.submit("/institution/regist/submit", "regist-form",function(result){
					if(result.success == false){
						$("#regist-tips").html(result.msg);
					} else{
						window.location.assign("/institution/regist/success");
					}
				},null,false,null, false);
			});
			
			// 点击获取验证码出发
			$(".get-code").on("click",function(){
				if($("#btn-getcode").attr("disabled") == "disabled") {
					return;
				}
				
				// 判断手机号码是否正确
				mobile = $("#CDirectorPersonMobile").attr("value");
				var a = /^((\(\d{3}\))|(\d{3}\-))?13\d{9}|14[57]\d{8}|15\d{9}|18\d{9}|17\d{9}$/;
				if (mobile.length != 11 || !mobile.match(a)) {
					Dialog.showErrorMessage("请输入正确的手机号码!");
					return;
				} 
				Utils.sendVerifyCode(mobile, '您申请机构验证的验证码是');
				disableButton();
			});
		},
		
		/**
		 * 机构首页面
		 */
		ins_view : function(){
			// 显示教师点击后的弹出照片对话框
			$(".color-box").colorbox({photo:true, rel:'group-1', width:"750px", height:"612px",
    	    	title:function(){
    	    		var imgTitle = $(this).find('img').attr('title');
    	    		return imgTitle;
    			}
    		});
			
			var _SlideshowTransitions = [{ $Duration: 1200, $Opacity: 2 }];

                 var options = {
                     $AutoPlay: true,
                     $AutoPlaySteps: 1,
                     $AutoPlayInterval: 3000,
                     $PauseOnHover: 1,
                     $ArrowKeyNavigation: true,
                     $SlideDuration: 500,
                     $MinDragOffsetToSlide: 20,
                     //$SlideWidth: 600,
                     //$SlideHeight: 300,
                     $SlideSpacing: 0,
                     $DisplayPieces: 1,
                     $ParkingPosition: 0,
                     $UISearchMode: 1,
                     $PlayOrientation: 1,
                     $DragOrientation: 3,
                     $SlideshowOptions: {
                         $Class: $JssorSlideshowRunner$,
                         $Transitions: _SlideshowTransitions,
                         $TransitionsOrder: 1,
                         $ShowLink: true
                     },

                     $BulletNavigatorOptions: {
                         $Class: $JssorBulletNavigator$,
                         $ChanceToShow: 2,
                         $AutoCenter: 1,
                         $Steps: 1,
                         $Lanes: 1,
                         $SpacingX: 10,
                         $SpacingY: 10,
                         $Orientation: 1
                     },

                     $ArrowNavigatorOptions: {
                         $Class: $JssorArrowNavigator$,
                         $ChanceToShow: 2,
                         $Steps: 1
                     }
                 };
            var jssor_slider1 = new $JssorSlider$("slider1_container", options);
		},
		
		/**
		 * 机构主页-领取优惠券页面
		 */
		coupon_receive:function(){
			$(".receive").on("click",function(){
				var cardId = $(this).attr("data-id");
				var typeId = $(this).attr("data-type");
				var inst = $(this).attr("data-inst");
				params = {};
				params["userId"] = user.id;
				params["typeId"] = typeId;
				params["insId"] = insid;
				params["cardId"] = cardId;
				Request.post("/card/draw", params, function(result){
					if (result.success === false){
						if(result.msg =="received"){
							$(".confirm-receive").show();
						}else if(result.msg == "finished"){
							$(".confirm-null").show();
						}else{
							$(".confirm-success").show();
						}
					} else {
						Dialog.showMessage("恭喜，您领取到了一张优惠券");
						setTimeout(function(){
							window.location.assign("/institution/" + inst);
						},3000);
					}
				});
			});
			
			$(".confirm-btn a").on("click",function(){
				
				var classname = $(this).attr("data-class");
				$("."+classname).hide();
				
			});
		},
		
		/**
		 * 机构主页-商品列表界面
		 */
		goods : function(){
			$("#btnPageDown").click();
			
			$(".course-nav>span").click(function(){
	    		$(this).siblings().removeClass("on");
	    		$(this).addClass("on");
	    		filter = $(this).attr("data-value");
				$.get("/institution/" + insid + "/goods/pages" + "?filter=" + filter, function(result) {
					$("#goods_container").html(result);
				});
		    });
		},
		
		/**
		 * 机构主页-老师界面
		 */
		teachers : function (){
			$("#btnPageDown").click();
			
			$(".mechan-pic li").click(function(){
		        $(".pic-show").show();
		        var windowtop = $(window).scrollTop();
		        var windowH =  $(window).height();
		        var pic = $('.pic-show .pic-cont').height();
		        var top = parseInt(windowtop + (windowH-pic)/2);
		        $(".pic-show .pic-cont").css({
		            top:top
		        });
		    });
		    $('.pic-show .pic-cont em ').click(function(){
		        $('.pic-show').hide();
		    });
		    
		},
		
		/**
		 * 机构主页 - 机构咨询页面
		 */
		news : function (){
			$(".infor-head-nav span").click(function(){
		        $(this).addClass("on").siblings().removeClass("on");
		        $(".infor-list ul").eq($(this).index()).addClass("on").siblings().removeClass("on")
		    });
		},
		
		/**
		 * 校区页面
		 */
		campus : function (){
			var output = Mustache.render('{{#msg}}<dl><dt><a href="javascript:void(0);" onclick="BaiduMap.gotoLocation({{CLon}}, {{CLat}}, \'{{.CName}}\')">{{CName}}</a></dt><dd>{{CAddr}}</dd></dl>{{/msg}}', compus);
			$(".campus-list").html(output);
			
			if (compus.msg.length > 0) {
				BaiduMap.createMap(container, compus.msg[0].CLon , compus.msg[0].CLat , compus.msg[0].CName);
			}
		},
		
		/**
		 * 相册
		 */
		album : function(){
			$("#btnPageDown").click();
			
			$(".mechan-pic li").click(function(){
                $(".pic-show").show();
                var windowtop = $(window).scrollTop();
                var windowH =  $(window).height();
                var pic = $('.pic-show .pic-cont').height();
                var top = parseInt(windowtop + (windowH-pic)/2);
                $(".pic-show .pic-cont").css({
                    top:top
                });
                $(".color-box").colorbox({photo:true, rel:'group-1', width:"750px", height:"612px",
                    title:function(){
                            var imgTitle = $(this).find('img').attr('title');
                            return imgTitle;
                            }
                    });
            });
            $('.pic-show .pic-cont em ').click(function(){
                $('.pic-show').hide();
            });
		},
		
		/**
		 * 视频
		 */
		videos : function(){
			$("#btnPageDown").click();
		}
	};
}();

institution.init();

//顶部黑色导航条选中状态
if ($(".nav").length > 0) {
	funcKey = institution.getFuncKey();
	
	if (funcKey != null) {
		pKeys = funcKey.split("/");
		
		if (pKeys.length >= 3) {
			lastKey = pKeys[pKeys.length - 1];
			if (lastKey == "...") {
				$("#homepage").parent().siblings().removeClass("on");
				$("#homepage").parent().addClass("on");
			}  else {
				var cp = $("#" + lastKey).parent(); 
				cp.siblings().removeClass("on");
				cp.addClass("on");
			}
		}
		
	}
}
