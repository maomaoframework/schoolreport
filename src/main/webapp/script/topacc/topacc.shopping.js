TopBar.init();

var shopping = function (){
return {
	/**
	 * 购物车页面
	 */
	cart : function(){
		ShoppingCart.refreshCart();
		
		$($(".steps-tit>span")[0]).addClass("on");
		
		// 删除商品按钮
		$('.remove-item').unbind("click").bind('click', function(){
			var t = $(this);
			var dl = window.location.href;
			var prefix = dl.substring(0, dl.indexOf(".do?"));
			prefix = prefix.substring(prefix.lastIndexOf("/") + 1);
			datavalue = $(this).attr("data-value");
			
			Dialog.showConfirmDialog("确定要移除该商品吗？", function(){
				ShoppingCart.removeItem(prefix, datavalue, t);
			});
		}); 
		
		// 热门商品幻灯片事件
		$(".hot-goods .good-left").slide({ mainCell:".slide",effect:"leftLoop",autoPlay:true });
		
		// 增加或减少商品按钮
		$(".sub").click(function(){
			ipt = $(this).parent().children("input");
			v = ipt.attr("value");
			i = 1;
			try{
				i = parseInt(v);
			}catch(e) {
				i = 1;
			}
			
			if (--i <= 0)
				i = 1;
			
			ipt.attr("value", i);
			thisid = ipt.attr("name").substring(2);
			price = $("#item_price_" + ipt.attr("name")).html();
			totalprice = parseFloat(price) * i;
			$("#td-" + thisid).html("<strong>¥" + totalprice.toFixed(2) + "</strong>");
			recharge();
		});
		
		
		 // 增加的方法
		$(".plus").click(function(){
			ipt = $(this).parent().children("input");
			v = ipt.attr("value");
			i = 1;
			try{
				i = parseInt(v);
			}catch(e) {
				i = 1;
			}
			
			i ++;
			
			ipt.attr("value", i);
			thisid = ipt.attr("name").substring(2);
			price = $("#item_price_" + ipt.attr("name")).html();
			totalprice = parseFloat(price) * i;
			$("#td-" + thisid).html("<strong>¥" + totalprice.toFixed(2) + "</strong>");
			recharge();
		});
		
		/**
		 * 当价格改变后，用于重新计算商品价格
		 */
		function recharge(){
			// 检查当前选定了哪些商品
			choosegoods = $(".chk_choosegoods:checked");
			if (choosegoods.length == 0) {
				// 直接设置各区域为0
				$(".accounts-ri>span>em").html("¥0.00");
				$(".accounts-ri>span>i").html("¥0.00");
			} else {
				var items = [];
				$.each(choosegoods, function(index, el){
					itm = {};
					itm["id"] = $(el).attr("data-value");
					if ($(el).attr("data-category") == "book") {
						itm["count"] = $("input[name=g_" + itm["id"] + "]").attr("value");
					}
					items.push(itm);
				});
				
				$("#ck").attr("value", JSON.stringify(items));
				
				Request.submit("/shopping/recharge" , "form-cart", function(resultdata){
					if(resultdata.success === true){
						data = Utils.string2Json(resultdata.data);
						$(".accounts-ri>span>em").html("¥" + data.totalfee);
						$(".accounts-ri>span>i").html("¥" + data.savedfee);
						
					} else{
						window.location.assign(resultdata.checkout);
					}
				});
			}
		};
		
		// 选择商品前面的checkbox后触发的事件
		$(".chk_choosegoods").click(function(){
			recharge();
		});
			
		// 提交按钮，去结算，进入结算收银台
		$(".checkout-btn").click(function(){
			// 判断是否登录，如果没有登录则弹出登录对话框
			Utils.doAfterLogin(function(){
				// 计算选定的商品
				var abc = [];
				$.each(choosegoods, function(index, el){
					zz = {};
					zz["id"] = $(el).attr("data-value");
					if ($(el).attr("data-category") == "book") {
						zz["count"] = $("input[name=g_" + zz["id"] + "]").attr("value");
					}
					abc.push(zz);
				});
				
				if (abc.length == 0) {
					Utils.showError("您尚未选择商品");
					return;
				}
				$("#ck").attr("value", JSON.stringify(abc));
				$("#form-cart").submit();
			}, true);
		});
		
		// 判断当前选中了哪些商品，然后开始计算价格
		recharge();
	},
	
	/**
	 * 订单确认页面
	 */
	confirm : function (){
		
	}
};
}();

