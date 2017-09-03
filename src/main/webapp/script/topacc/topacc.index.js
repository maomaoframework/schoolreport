TopBar.init();
IndexTop.init();

act = Utils.getAction();

if (act.length == 0 || act == 'index') {
	var _SlideshowTransitions = [
     { $Duration: 1200, $Opacity: 2 }
     ];

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
}

// 刷新首页面新闻部分内容
var obj = document.getElementById("frag_news");
if (obj) {
	Request.fill('/index/frag_news', "frag_news" ,false);
}



// 初始化商品购买
ShoppingCart.initShoppingPage();

// 首页最右侧导航条
$(".index a").on("click",function(){
	var bid = $(this).attr("data-id");
	if(bid == "agency"){
		window.location.hash = "#agency"; 
	}else if(bid == "course"){
		window.location.hash = "#course"; 
	}else if(bid == "books"){
		window.location.hash = "#books"; 
	}else if(bid == "process"){
		window.location.hash = "#process";
	}
});


// 导航菜单选中状态
ctx = Utils.getContextPath();
if (ctx == null || ctx.length == 0) {
    $(".ind-nav>ul>li:first-child").addClass("on");
} else {
    $(".menu-" + ctx).parent().addClass("on");
}


$(".floor-rig-link>a").click(function(){
	var link = $(".ind-course .floor-rig-head>span[class=on]").attr("data-link");
	if (typeof(link) != "undefined")
		window.location.assign(link);
});

if (user == null) {
	$(".ind-personal").show();
} else {
	Request.fill('/ucenter/index_welcome', 'welcome-personal',false);
}

// 首页右侧广告的tab切换
$('.ind-notice-tit span').click(function(){
    $(this).addClass("on").siblings("span").removeClass("on")
    $('.ind-notice-con').eq($(this).index()).addClass('on').siblings().removeClass('on');
})

// 合作机构鼠标移上下拉
$(".agen-job").hover(function(){
    $(this).find(".agen-txt").toggle();
})
// 券下拉
$(".agency-main dd h3 span").hover(function(){
    $(this).find(".agen-ticket").toggle();
})

// 点击导航切换内容
$(".floor-rig-head span").click(function(){
    $(this).addClass("on").siblings("span").removeClass("on")
    $(this).parent().next().children().eq($(this).index()).addClass("on").siblings().removeClass("on")
});

// 首页大图切换
$(".hd>ul>li").click(function(){
	Utils.stopPropagation();
});

$(".hd").children().not("a").on("click",function(event){
	var cp = $(this).find('li[class=on]').html();
	var curpoint = parseInt(cp);
	if (curpoint > 0)
		curpoint = curpoint - 1;
	var a = $(this).parent().prev('div').find('a').eq(parseInt(curpoint));
	a.append("<span style='display:none;' id='ev"+parseInt(curpoint)+"'></span>");
    $("#ev"+parseInt(curpoint)).click();
	return false;
});

