
var shopping = function (){
return {
	pay_qrcode : function (){
		// 点击弹出支付提示弹窗
		$('.pay-now').click(function(){
			$("#paymentForm").submit();
		});
	}
};
}();
