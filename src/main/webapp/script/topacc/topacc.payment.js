TopBar.init();

Request.fill("/order/fragment_invoice_receiver_list", "invoice-receiver");
$("#rechoosePay").click(function(){
	$('.prompt-alert').hide();
});

/*************payment收银台************/
// 预览发票信息
$(".btn-invoice-preview").click(function(){
	// 判断发票地址
	fpdz = "";
	if ($(".revise-main").is(":visible") == false) {
		if ($(".invoice-item-p.mc").length == 1) {
			fpdz = $(".invoice-item-p>p").html();
		}
	} else {
		if ($(".address-item.on").length > 0){
			fpdz = $($(".address-item.on")[0]).children("span[class=text]").html();
		}
	}
	$("#span-invoice-preview-fpdz").html(fpdz);
	$("#span-invoice-preview-yjfs").html("挂号信");
	
	$("#invoice-preview-title").hide();
	$("#invoice-preview-nsrsbh").hide();
	$("#invoice-preview-zcdz").hide();
	$("#invoice-preview-zcdh").hide();
	$("#invoice-preview-khyh").hide();
	$("#invoice-preview-khzh").hide();
	$("#invoice-preview-type").hide();
	
	if($($(".invoice-type-head.main span")[0]).hasClass("on") === true) {
		if ($($(".invoice-type-head.sub span")[0]).hasClass("on") === true){
			// 个人机打发票
			$("#invoice-preview-title").hide();
			$("#invoice-preview-nsrsbh").hide();
			$("#invoice-preview-zcdz").hide();
			$("#invoice-preview-zcdh").hide();
			$("#invoice-preview-khyh").hide();
			$("#invoice-preview-khzh").hide();
			
			$("#invoice-preview-type").show();
			$("#span-invoice-preview-type").html("个人");
		} else {
			// 个人机打发票
			$("#invoice-preview-title").show();
			$("#invoice-preview-type").show();
			
			$("#span-invoice-preview-title").html($("#CTitle").attr("value"));
			$("#span-invoice-preview-type").html("单位");
		}
	} else {
		$("#invoice-preview-title").show();
		$("#invoice-preview-nsrsbh").show();
		$("#invoice-preview-zcdz").show();
		$("#invoice-preview-zcdh").show();
		$("#invoice-preview-khyh").show();
		$("#invoice-preview-khzh").show();
		$("#invoice-preview-type").show();
		
		$("#span-invoice-preview-type").html("增值税专用发票");
		$("#span-invoice-preview-title").html($("#CCorpName").attr("value"));
		$("#span-invoice-preview-nsrsbh").html($("#CNsrsbm").attr("value"));
		$("#span-invoice-preview-zcdz").html($("#CZcdz").attr("value"));
		$("#span-invoice-preview-zcdh").html($("#CZcdh").attr("value"));
		$("#span-invoice-preview-khyh").html($("#CKhyh").attr("value"));
		$("#span-invoice-preview-khzh").html($("#CYhzh").attr("value"));
	}
	$("#invoice-preview").show();
});

$(".address-box em").click(function(){
	$("#invoice-preview").hide();
});

// 发票接收地址的各项操作
$("#invoice-receiver").on('click',' .revise-add',function(){
	$(this).hide().parent().siblings(".invoice-item-p").hide();
	$(this).hide().parent().siblings(".revise-main").show();
}).on('click',' .address-edit',function(){
	$(this).siblings(".new-address").slideDown();
	$(this).parent().siblings("div").css("display","none");
	$(".address-item>ul").html("");
	dv = $(this).attr("data-value");
	Request.fill('/order/fragment_invoice_receiver_edit?id=' + dv, "address_" + dv);
}).on('click',' .address-del', function(){
	ts = $(this);
	dv = ts.attr("data-value");
	Request.invok("/ucenter/devlivery_delete?id=" + dv, function(result){
		ts.parent(".address-item").remove();
	});
}).on('click',' .address-choose', function(){
	if ($(this).hasClass("add-newaddress")) {
		$()
		$(this).siblings(".new-address").stop(true,true).slideDown();
		Request.fill('/order/fragment_invoice_receiver_edit' , "address_");
	}else{
		$(".add-newaddress").siblings(".new-address").stop(true,true).slideUp();
	};
	$(this).closest(".revise-main").find(".address-item").removeClass("on");
	$(this).parent().addClass("on");
}).on('click',' .new-add-confirm', function(){
	// 添加接收人确认提交按钮
	ts = $(this);
	infoid = $(this).attr("data-value");
	Request.submit("/ucenter/updateMailingInfo", "invoice-receiver-form",function(result){
		if(result.success == false){
			window.alert(result.msg);
		} else{
			Request.fill("/order/fragment_invoice_receiver_list?method=click", "invoice-receiver");
			$("div[class=address-item]").css("display","");
		}
	},null,false,null, false);
}).on('click',' .address-mask h2 em', function(){
	$("#invoice-preview").hide();
});

//点击银行图标选中
$(".inp-radio").click(function(){
	$(".type-online").find(".inp-radio").removeClass("on");
	$(".now-type img").attr("src", $(this).next().attr("src") );
	$(".now-type input[name=paytype]").attr("value", $(this).next().attr("data-value"));
	$(this).addClass("on");
	if ($(this).hasClass("wx-payment")) {
		$(".wx-alert").show();
	};
});

// 点击导航切换内容
$(".type-head span").click(function(){
	$(this).addClass("on").siblings().removeClass("on");
	$(".type-main>.type-item").eq($(this).index()).addClass("on").siblings().removeClass("on")
});

// 点击需要发票按钮
$(".invoice-btn").click(function(){
	$(this).toggleClass("on");
	$(".invoice-con").toggle();
});

// 点击发票类型， 机打、增值税发票
$(".invoice-type-head.main span").click(function(){
	if ($(this).index() == 0) {
		$(this).parent().next().stop(true,true).slideUp();
		$(".invoice-title").show();
	}else{
		$(this).parent().next().stop(true,true).slideDown();
		$(".invoice-title").hide();
	};
	$(this).addClass("on").siblings().removeClass("on")
});

// 点击发票抬头，个人、单位
$(".invoice-type-head span").click(function(){
	if ($(this).index() == 0) {
		$(this).parent().next().stop(true,true).slideUp();
	}else{
		$(this).parent().next().stop(true,true).slideDown();
	};
	$(this).addClass("on").siblings().removeClass("on")
});

// 点击关闭微信弹窗
$('.wx-alert-main h2 em').click(function(){
	$('.wx-alert').hide();
});

// 点击弹出支付提示弹窗
$('.pay-now').click(function(){
	// 检查
	// 进行支付之前的验证
	// 支付类型设置
	requireInvoice = $(".invoice-btn.on").length > 0;
	if (requireInvoice === true){
		if ($(".address-item.on").length == 0){
			Dialog.showErrorMessage("请选择发票接收地址");
			return;
		} else if ($(".address-item.on").length == 1) {
			dv = $($(".address-item.on")[0]).attr("data-value");
			if (typeof(dv) == "undefined") {
				Dialog.showErrorMessage("请填写发票接收地址");
				return;
			}
		}
	}
	
	if($($(".invoice-type-head.main span")[0]).hasClass("on") === true){
		$("#it").attr("value", "1");
		// 机打发票
		if ($($(".invoice-type-head.sub span")[0]).hasClass("on") === true){
			// 个人机打发票
			$("#tt").attr("value", "1");
			
		}else {
			// 单位发票
			$("#tt").attr("value", "2");
			
			// 判断增值税发票是否填写了必填项
			if ($("#CTitle").attr("value").length == 0) {
				Dialog.showErrorMessage("请填写单位名称");
				return false;
			}
		}
	} else{
		// 增值税发票
		$("#it").attr("value", "2");
		
		// 判断增值税发票是否填写了必填项
		if ($("#CCorpName").attr("value").length == 0) {
			Dialog.showErrorMessage("请填写单位全称");
			return false;
		}
		
		// 判断增值税发票是否填写了必填项
		if ($("#CNsrsbm").attr("value").length == 0) {
			Dialog.showErrorMessage("请填写纳税人识别码");
			return false;
		}
		
		// 判断增值税发票是否填写了必填项
		if ($("#CZcdz").attr("value").length == 0) {
			Dialog.showErrorMessage("请填写注册地址");
			return false;
		}
		
		// 判断增值税发票是否填写了必填项
		if ($("#CZcdh").attr("value").length == 0) {
			Dialog.showErrorMessage("请填写注册电话");
			return false;
		}
		
		// 判断增值税发票是否填写了必填项
		if ($("#CKhyh").attr("value").length == 0) {
			Dialog.showErrorMessage("请填写开户银行");
			return false;
		}
		
		if ($("#CYhzh").attr("value").length == 0) {
			Dialog.showErrorMessage("请填写银行账户");
			return false;
		}
	}
	
	// 设置选中的发票接收地址
	if ($(".revise-main").is(":visible") == false) {
		$("#sd").attr("value", $($(".invoice-item-p.mc")[0]).attr("data-value"));
	} else {
		if ($(".address-item.on").length > 0){
			$("#sd").attr("value", $($(".address-item.on")[0]).attr("data-value"));
		}
	}
	// 设置是否需要发票选项
	$("#ni").attr("value", $(".invoice-btn.on").length > 0 ? "1" : "");
	// 发送同步请求
	var _params_ = Utils.getFormJson(jQuery("#paymentForm"));
	var params = _params_;
	$.ajax({
		type : "post",
		cache : false,
		async: false, 
		url : '/payment/paycheck',
		data : jQuery.param(params),
		dataType: "json",
		success : function(resultdata, textStatus){
			if(resultdata.success === true){
				$('.prompt-alert').show();
				$("#paymentForm").submit();
			}else{
				window.alert(resultdata.msg);
			}
		}
	}); 
});
// 点击关闭支付提示弹窗
$('.pro-alert-main h2 em').click(function(){
	$('.prompt-alert').hide();
});

// 学习卡账户充值按钮
$(".recharge-btn").click(function(){
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
				window.location.reload();
			}else{
				window.alert(resultdata.msg);
			}
		}
	});
});

$(".btn-send-sms-message").click(function(){
	Request.invok("/wbs/sendBankInfo", function(result){
		if (result.success) {
			Dialog.showMessage("汇款信息已发送至你的手机，请查收");
		} else {
			Dialog.showErrorMessage("手机号有误，无法发送信息");
		}
	});
});

$($(".steps-tit>span")[1]).removeClass("item2");
$($(".steps-tit>span")[1]).addClass("item1");
$($(".steps-tit>span")[2]).addClass("on");