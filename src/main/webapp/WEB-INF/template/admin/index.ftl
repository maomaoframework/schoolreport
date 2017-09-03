[#assign ui=JspTaglibs["/WEB-INF/classes/tld/ui.tld"] /]
[#assign fmt=JspTaglibs["/WEB-INF/classes/tld/fmt.tld"] /]
<!DOCTYPE html>
<!--[if IE 8]> <html lang="en" class="ie8 no-js"> <![endif]-->
<!--[if IE 9]> <html lang="en" class="ie9 no-js"> <![endif]-->
<!--[if !IE]><!--> <html lang="en" class="no-js"> <!--<![endif]-->
<head>
	<meta charset="utf-8" />
	<title>${systemName}</title>
	<meta content="width=device-width, initial-scale=1.0" name="viewport" />
	<meta content="${systemDescription}" name="description" />
	<meta content="${systemAuthor}" name="author" />
	<!-- 全局样式定义 -->
	<link href="${static_server}/themes/metro/css/bootstrap.min.css" rel="stylesheet" type="text/css"/>
	<link href="${static_server}/themes/metro/css/bootstrap-responsive.min.css" rel="stylesheet" type="text/css"/>
	<link href="${static_server}/themes/metro/css/font-awesome.min.css" rel="stylesheet" type="text/css"/>
	<link href="${static_server}/themes/metro/css/style-metro.css" rel="stylesheet" type="text/css"/>
	<link href="${static_server}/themes/metro/css/style.css" rel="stylesheet" type="text/css"/>
	<link href="${static_server}/themes/metro/css/style-responsive.css" rel="stylesheet" type="text/css"/>
	<link href="${static_server}/themes/metro/css/default.css" rel="stylesheet" type="text/css" id="style_color"/>
	<link href="${static_server}/themes/metro/css/uniform.default.css" rel="stylesheet" type="text/css"/>
	<link rel="shortcut icon" href="${static_server}/themes/metro/image/favicon.ico" />
  	<!-- 核心插件 -->        	
  	<script src="${static_server}/themes/metro/js/jquery-1.10.1.min.js" type="text/javascript"></script>	
  	<script src="${static_server}/themes/metro/js/jquery-migrate-1.2.1.min.js" type="text/javascript"></script>	
  	<script src="${static_server}/themes/metro/js/jquery-ui-1.10.1.custom.min.js" type="text/javascript"></script>	
  	<script src="${static_server}/themes/metro/js/bootstrap.min.js" type="text/javascript"></script>	
  	<!--[if lt IE 9]>	
  	<script src="${static_server}/themes/metro/js/excanvas.min.js"></script>	
  	<script src="${static_server}/themes/metro/js/respond.min.js"></script>  	
  	<![endif]-->   	
  	<script src="${static_server}/themes/metro/js/jquery.slimscroll.min.js" type="text/javascript"></script>	
  	<script src="${static_server}/themes/metro/js/jquery.blockui.min.js" type="text/javascript"></script>  	
  	<script src="${static_server}/themes/metro/js/jquery.cookie.min.js" type="text/javascript"></script>	
  	<script src="${static_server}/themes/metro/js/jquery.uniform.min.js" type="text/javascript" ></script>
  	<script src="${static_server}/script/jquery/js/jquery.validationEngine.js?v=1" type="text/javascript"></script>	
  	<script src="${static_server}/script/jquery/js/jquery.validationEngine-zh_CN.js" type="text/javascript" ></script>
  	<script src="${static_server}/script/vlink.admin.js" type="text/javascript"></script></head>
<body class="page-header-fixed" >
<div id="_dialog_box_" class="modal hide fade" tabindex="-1" data-backdrop="static" data-keyboard="false">
<div class="modal-body"></div></div><style>
		html,body{
			width:100% !important;
			height:100% !important;
		}  
		body{
			background-color: #3d3d3d !important;
		}
	</style>
	<table style="height:100%;width:100%;border:0px;" border="0">
		<tr>
			<td style="height:43px;">
				<div class="header navbar navbar-inverse navbar-fixed-top">
		
				<!-- 顶部导航 -->
				<div class="navbar-inner">
					<div class="container-fluid">
						<!-- LOGO 开始-->
						<a class="brand" href="${setting("site.url")}" style="width:400px;margin-left:40px;">${systemName}</a>
						<!-- END LOGO -->
						<div class="navbar hor-menu hidden-phone hidden-tablet">
							<div class="navbar-inner">
								<ul class="nav" id="top_menu">
									<li class="active">
										<a href="javascript:void(0);" data-role="platform">接口说明<span class="selected"></span></a>
									</li>
								</ul>
							</div>
						</div>
						
						<a href="javascript:;" class="btn-navbar collapsed" data-toggle="collapse" data-target=".nav-collapse">
							<img src="${static_server}/themes/metro/image/menu-toggler.png" alt="" />
						</a>          
		
						<!-- 顶部导航菜单 -->              
						<ul class="nav pull-right">
							<!-- 个人信息下拉按钮 -->
							<li class="dropdown user">
								<a href="#" class="dropdown-toggle" data-toggle="dropdown">
									<img alt="" src="${static_server}/themes/metro/image/avatar1_small.jpg" />
									<span class="username"></span>
									<i class="icon-angle-down"></i>
								</a>
							</li>
							<!-- 个人信息结束 -->
						</ul>
					</div>
				</div>
			</div>
			<!-- 头部结束 -->
			</td>
		</tr>
		<tr>
			<td valign="top" id="td-content">
				<div class="page-container" style="min-height:100px;height:100%;" id="div-content">
					<!-- 左侧导航条 -->
					<div class="page-sidebar nav-collapse collapse" style="min-height:450px;height:auto !important;" id="div-menu-tree">
			
						<!-- 导航菜单开始 -->        
						<ul class="page-sidebar-menu" id="menu_platform">
							<li>
								<div class="sidebar-toggler hidden-phone"></div>
							</li>
							<!--<li >
								<a href="/app/admin/intf/list" target="_frmContent_" id="btnInterfaces">
									<i class="icon-bookmark-empty"></i> 
									<span class="title">接口列表</span>
									<span class="arrow "></span>
								</a>
							</li>-->
							
							<li >
								<a href="/app/admin/notice/index" target="_frmContent_" id="btnInterfaces">
									<i class="icon-bookmark-empty"></i> 
									<span class="title">通知公告</span>
									<span class="arrow "></span>
								</a>
							</li>
							
							<li >
								<a href="/app/admin/kb/index" target="_frmContent_" id="btnInterfaces">
									<i class="icon-bookmark-empty"></i> 
									<span class="title">课表维护</span>
									<span class="arrow "></span>
								</a>
							</li>
							
							<li >
								<a href="/app/admin/upgrade/list" target="_frmContent_" id="btnInterfaces">
									<i class="icon-bookmark-empty"></i> 
									<span class="title">App升级管理</span>
									<span class="arrow "></span>
								</a>
							</li>
						</ul>
						
						<!-- 导航菜单结束 -->
					</div>
					<!-- 导航栏结束 -->
			
					<!--  中间页面开始 -->
					<div class="page-content" style="height:100% !important;min-height:430px !important;" id="div-content_frame">
						<iframe frameborder="0" style="width:100%;height:100%;" id="_frmContent_" name="_frmContent_" scrolling="auto"" src="/app/admin/intf/list"></iframe>
					</div>
					<!-- 中间页面结束 -->
				</div>
				
			</td>
		</tr>
		<tr>
			<td style="height:40px;">
				<!-- 底部开始 -->
				<div class="footer">
					<div class="footer-inner">${systemCopyright}</div>
					<div class="footer-tools">
						<span class="go-top">
						<i class="icon-angle-up"></i>
						</span>
					</div>
				</div>
				<!-- 底部结束 -->
			</td>
		</tr>
	</table>
	<!-- 装入本页面插件 -->
	[@jqPlugin.plugin formValidation="1" /]
	<script src="${static_server}/themes/metro/js/ms.js" type="text/javascript"></script>	<script>		jQuery(document).ready(function() {    
		   App.init(); // 初始化布局和核心插件
        $('form').validationEngine();
		});
	</script></body></html>
<script> 
	
	$(document).ready(function(){
		var menuLi = $(".sub-menu").children();
		menuLi.click(function(){
			menuLi.removeClass("active");
			$(this).addClass("active");
		});
		
		var topMenus = $("#top_menu").find("a");
		topMenus.click(function(){
			var parentLi = $(this).parent();
			var siblings = parentLi.siblings();
			
			siblings.children().find("span").remove();
			siblings.removeClass("active");
			
			parentLi.addClass("active");
			$('<span class="selected"></span>').appendTo($(this));
			
			menuLeft = $("#menu_" + $(this).attr("data-role"));
			menuLeft.siblings().hide();
			menuLeft.show();
		});
		
		if (NavigatorVersion.isIE8()) {
			$("#div-menu-tree").removeClass("collapse");
		}
		var h = $("#td-content").height();
		$("#div-content").height(h);
		$("#div-menu-tree").height(h);
		$("#div-content_frame").height(h);
		$("#_frmContent_").height(h - 20);
		
		$(".page-sidebar-menu>li").click(function(){
			$(this).siblings().removeClass("active");
			$(this).addClass("active");
			Utils.stopPropagation();
		});
	});
	document.body.onresize = function (){
		var h = $("#td-content").height();
		$("#div-content").height(h);
		$("#div-menu-tree").height(h);
		$("#div-content_frame").height(h);
		$("#_frmContent_").height(h - 20);
	}
	$("#btnInterfaces").parent().click();
</script>
 

