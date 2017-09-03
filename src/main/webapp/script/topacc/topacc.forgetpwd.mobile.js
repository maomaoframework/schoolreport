var min = 60;
var intervalHandler;

// 点击获取验证码出发
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

// 点击获取验证码出发
$(".get-code").on("click",function(){
	if($("#btn-getcode").attr("disabled") == "disabled") {
		return;
	}
	
	// 判断手机号码是否正确
	mobile = $("#mobile").attr("value");
	var a = /^((\(\d{3}\))|(\d{3}\-))?13\d{9}|14[57]\d{8}|15\d{9}|18\d{9}|17\d{9}$/;
	if (mobile.length != 11 || !mobile.match(a)) {
		Dialog.showErrorMessage("请输入正确的手机号码!");
		return;
	} 
	Utils.sendVerifyCode(mobile, '您的手机校验码是');
	disableButton();
});

$(".check_mobile").click(function(){
	if (!FormValidate.validate('forgetpwd-form') ){
		return false;
	}
	$("#forgetpwd-form").submit();
});

$(".netx-step").click(function(){
	Request.submit($("#forgetpwd-form").attr("action"), 'forgetpwd-form', function(result){
		if (JsonResultValidation.validate(result) == true) {
			Dialog.showMessage("密码已重设");
			
			// 正确操作，读取消息内容
			els = result.elements;
			setTimeout(function() {
				window.location.assign(els[0].redirect);
				window.close();
			}, 2 * 1000);
		}
	});
});