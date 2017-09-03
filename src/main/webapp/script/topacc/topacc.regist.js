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

$("input").on("blur",function(){
	var ts = $(this);
	vl = ts.attr("value");
	if (ts.hasClass("servervalidate")) {
		if (!ts.validationEngine("validate")){
			Request.invok("/regist/isValidate?item=" + $(this).attr("id") + "&value=" + vl, function (result){
				if(result.success != true){
					ts.validationEngine('showPrompt',result.msg,'formError',null, true);
				}
			});	
		}
	} else {
		ts.validationEngine("validate");
	}
});

$("#btn-regist").click(function(){
	$('#regist-form').validationEngine({
		maxErrorsPerField:1
	});
	
	if (!$("#regist-form").validationEngine("validate")){
		return false;
	}
	
	// 判断密码与确认密码是否相符
	pwd = $("#password").attr("value");
	if (!typeof(document.getElementById("rePassword")) == "undefined") {
		cpwd = $("#rePassword").attr("value");
		if (pwd != cpwd) {
			Utils.errorInput("#rePassword", "密码与确认密码不符，请重新输入");
			return;
		}
	}
	
	var _params_ = Utils.getFormJson(jQuery("#regist-form"));
	_params_["_rd_url_"] = window.top.location.href;
	var params = _params_;
	$.ajax({
		type : "post",
		cache : false,
		url : '/regist/submit',
		data : jQuery.param(params),
		dataType: "json",
		success : function(result, textStatus){
			if(result.success === true){
				var expiresDate = new Date();
	        	expiresDate.setTime(expiresDate.getTime() + 60 * 60 * 1000 * 24 * 365);
	        	returnval = Utils.string2Json(result.data);
	        	$.cookie(returnval.asdfsd, returnval.zqccc , { expires: expiresDate , path: '/' });
	        	$.cookie("_topacc_user_", Utils.json2String(returnval.u) , { expires: expiresDate , path: '/' });
	        	window.top.location.assign(returnval.rdp);
			}else{
				Dialog.showErrorMessage(result.msg);
				return;
			}
		}
	});
});