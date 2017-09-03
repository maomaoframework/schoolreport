var min = 60;
var intervalHandler;
function disableButton() {
	$("#btn-getcode").css("background-color","gray");
	$("#btn-getcode").attr("disabled","disabled");
	
	// 设置文字
	intervalHandler = setInterval(function(){
		$("#btn-getcode").html((--min)  + "秒后再次发送");
	}, 1000);
	
	setTimeout(enableButton,60 * 1000);
}

function enableButton() {
	min = 60;
	$("#btn-getcode").css("background-color","#3d84c4");
	$("#btn-getcode").removeAttr("disabled");
	clearInterval(intervalHandler);
	$("#btn-getcode").html("获取验证码");
}
var shopping = function (){
return {
	/**
	 * 购物车页面
	 */
	buy : function(){
		// 点击获取验证码出发
		$(".get-code").on("click",function(){
			if($("#btn-getcode").attr("disabled") == "disabled") {
				return false;
			}
			
			// 判断手机号码是否正确
			mobile = $("#mobile").attr("value");
			var a = /^((\(\d{3}\))|(\d{3}\-))?13\d{9}|14[57]\d{8}|15\d{9}|18\d{9}|17\d{9}$/;
			if (mobile.length != 11 || !mobile.match(a)) {
				Dialog.showErrorMessage("请输入正确的手机号码!");
				return false;
			} 
			Utils.sendVerifyCode(mobile, '您的手机校验码是');
			disableButton();
			return false;
		});
		
		
		function buy_confirm (goodsid){
			var abc = [];
			zz = {};
			zz["id"] = goodsid;
			zz["count"] = "1";
			abc.push(zz);
			
        	// 跳转至确认页面
			var ck = JSON.stringify(abc);
			ck = encodeURIComponent(encodeURIComponent(ck));
			window.location.assign("/shopping/dobuy?ck=" + ck);
		};
		
		// 提交订单
		$(".btn_green").click(function(){
			if (!$("#form-cart").validationEngine("validate")) {
				return false;
			}

			var mobile = $("#mobile").val().trim();
			var verifycode = $("#verifycode").val().trim();
			if (mobile.length == 0) {
				Dialog.showErrorMessage("请输入手机号");
				return false;
			}
			
			if (verifycode.length == 0) {
				Dialog.showErrorMessage("请输入手机验证码");
				return false;
			}
			
			// 判断密码与确认密码是否相符
			var goodsid = $(this).attr("data-value");
			if (user == null) {
				// 用户未登录
				var _params_ = Utils.getFormJson(jQuery("#form-cart"));
				var params = _params_;
				$.ajax({
					type : "post",
					cache : false,
					url : $("#form-cart").attr("action"),
					data : jQuery.param(params),
					dataType: "json",
					success : function(result, textStatus){
						if(result.success === true){
							var expiresDate = new Date();
				        	expiresDate.setTime(expiresDate.getTime() + 60 * 60 * 1000 * 24 * 365);
				        	returnval = Utils.string2Json(result.data);
				        	$.cookie(returnval.asdfsd, returnval.zqccc , { expires: expiresDate , path: '/' });
				        	$.cookie("_topacc_user_", Utils.json2String(returnval.u) , { expires: expiresDate , path: '/' });
				        	buy_confirm(goodsid);
						}else{
							Dialog.showErrorMessage(result.msg);
							return false;
						}
					}
				});
			} else {
				// 校验验证码是否正确
				Request.invok('/wbs/is_verify_code_valid?mobile=' + mobile + "&verifycode=" + verifycode, function(result){
					if (result.success == true) {
						buy_confirm(goodsid);
					}else {
						Dialog.showErrorMessage(result.msg);
					}
				});
			}
			
		});
	},
	dobuy : function (){
		// 提交订单按钮
		$("#submit-order").click(function() {
			if (!$("#form-order").validationEngine("validate")) {
				return false;
			}
			
			sd = "";
			sc = "";
			nr = false;

			// MAIN :: 检查各项
			// 检查上课人信息是否都填写了
			gs = $("input[id^='g_']");
			$.each(gs, function(index, element) {
				if ($(element).attr("value").length == 0) {
					Dialog.showErrorMessage("请填写上客人信息");
					return false;
				} 
			});

			// 检查手机号是否正确
			if ($(".mobile").length > 0) {
				var mobile = $(".imobile").val();
				
				// 判断手机号码是否正确
				var a = /^((\(\d{3}\))|(\d{3}\-))?13\d{9}|14[57]\d{8}|15\d{9}|18\d{9}|17\d{9}$/;
				if (mobile.length != 11 || !mobile.match(a)) {
					Dialog.showErrorMessage("上客人手机号码有误，请重新输入！");
					return false;
				} 
			}
							
			$("#sd").attr("value", sd);
			$("#sc").attr("value", sc);
			$("#nr").attr("value", nr);
			
			paytype = $("input[class='paytype-checked']").attr("data-value");
			$("#paytype").attr("value",paytype );
			
			$("#form-order").submit();
		});
	}
};
}();

