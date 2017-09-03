var min = 60;
var intervalHandler;
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

$("#btn-regist").click(function(){
	if (!FormValidate.validate('regist-form') ){
		return false;
	}
	// 判断密码与确认密码是否相符
	var _params_ = Utils.getFormJson(jQuery("#regist-form"));
	var params = _params_;
	$.ajax({
		type : "post",
		cache : false,
		url : $("#regist-form").attr("action"),
		data : jQuery.param(params),
		dataType: "json",
		success : function(result, textStatus){
			if(result.success === true){
				var expiresDate = new Date();
	        	expiresDate.setTime(expiresDate.getTime() + 60 * 60 * 1000 * 24 * 365);
	        	returnval = Utils.string2Json(result.data);
	        	$.cookie(returnval.asdfsd, returnval.zqccc , { expires: expiresDate , path: '/' });
	        	$.cookie("_topacc_user_", Utils.json2String(returnval.u) , { expires: expiresDate , path: '/' });
	        	window.location.assign(returnval.rdp);
			}else{
				Dialog.showErrorMessage(result.msg);
				return false;
			}
		}
	});
	return false;
});