TopBar.init();
act = Utils.getAction();

if (act.length == 0)
	$("a[href='/ucenter']").parent().addClass("current");
else
	$("a[href='/ucenter/" + act + "']").parent().addClass("current");

// 顶部头部
Request.post ("/ucenter/stat", null, function(result){
	try{
		o = result.data.toJson();
		$(".nav_ul .nav_tip").html(o.messageCount);
	}catch(exception) {
		
	}
});



// 我关注的考试弹出对话框的考试类型选择事件
$(document).on("click",".exam_type span",function(){
	$(this).addClass("on");
    $(this).siblings('.exam_type span').removeClass('on');
});

// 待上课中得查看教学大纲
$("#main-content").on('click', '.link_ckdg a,#ckdg a', function(){
	did = $(this).attr("data-id");
	tbid = ".teach_dagang[id=" + did + "]";
	$(tbid).toggle();
});

$(document).on("click","dl.selects",function(event){
	   var t = $(this); 
	   var inputs = t.children("input");
	   var s = t.children("dt").children("span");
	   var dd =  t.find("dd");
	   t.css("zIndex",1);
	   dd.show();
	   dd.children("a").off().click(function(event){
	   		 s.html($(this).html());
	   		 inputs.val($(this).attr("data-value"));
			 dd.hide();
			 Utils.stopPropagation();
	   })
 })
	$(document).on("mouseleave","dl.selects",function(event){
	   var t = $(this); 
	  t.css("zIndex",0);
	   t.find("dd").hide(); 
	   Utils.stopPropagation();
});


var ucenter = function (){
	return {
		index : function(){
			instadmin.index_home();
		},
		
		/**
		 * 首页面
		 */
		index:function(){
			
		},
		
		my_course : function(){
		},
		
		my_account : function(){
			// 学习卡账户充值按钮
			$("#main-content").on('click', '.btn-card-recharge', function(){
				if (!$("#form_charge").validationEngine("validate")){
					return;
				}
				s = $("input[name=serial]");
				m = $("input[name=mm]");
				c = $("input[name=ac]");
				var o = {};
				o['serial'] = s.attr("value");
				o['mm'] = m.attr("value");
				o['ac'] = c.attr("value");
				
				if (o['serial'].length == 0){
					s.addClass("border-bold");
					return;
				} else{
					s.removeClass("border-bold");
				}
				if (o['mm'].length == 0){
					m.addClass("border-bold");
					return;
				} else{
					m.removeClass("border-bold");
				}
				if (o['ac'].length == 0){
					c.addClass("border-bold");
					return;
				} else{
					c.removeClass("border-bold");
				}
				jQuery.ajax({
					type : "post",
					cache : false,
					url : '/card/charge',
					data : jQuery.param(o),
					dataType: "json",
					success : function(resultdata, textStatus){
						if(resultdata.success === true){
							Dialog.showMessage("充值成功");
							$(".tabs2_title li").first().click();
						}else{
							Dialog.showError(resultdata.msg);
						}
					}
				});
			});
		},
		
		/**
		 * 账户充值
		 */
		my_account_charge : function (){
			// 窗口关闭按钮点击事件
			$('.pop_close').click(function(){
				$('.popbg').hide();
			    $('.popwindow').hide();
			})
			
			// 点击弹出支付提示弹窗
			$('.fi-charge-dopay').click(function(){
				// 进行支付之前的验证
				var _params_ = Utils.getFormJson(jQuery("#chargeForm"));
				var params = _params_;
				$.ajax({
					type : "post",
					cache : false,
					async: false, 
					url : '/payment/chargecheck',
					data : jQuery.param(params),
					dataType: "json",
					success : function(resultdata, textStatus){
						if(resultdata.success === true){
							$('.popbg').show();
							$('.popwindow').show();
							$("#chargeForm").submit();
						}else{
							Utils.showError(resultdata.msg);
						}
					}
				}); 
			});
		},
		my_message :function (){
			$("#btnPageDown").click();
		}
	};
}();


