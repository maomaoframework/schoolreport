[#assign fmt=JspTaglibs["/WEB-INF/classes/tld/fmt.tld"] /]
[#assign ui=JspTaglibs["/WEB-INF/classes/tld/ui.tld"] /]

[@ui.page]
	<div class="container-fluid">
		<!-- 页面头部 -->
		<div class="row-fluid">
			<div class="span12">
				<!-- 页面头部定义-->
				<h3 class="page-title">统计信息 <small>统计及通知信息</small></h3>
	
				<ul class="breadcrumb">
					<li>
						<i class="icon-home"></i>首页 
					</li>
					<li class="pull-right no-text-shadow">
						<div id="dashboard-report-range" class="dashboard-date-range responsive"  style="display: block;">
							<i class="icon-calendar"></i>
							<span id="dynamictime"></span>
						</div>
					</li>
				</ul>
			</div>
		</div>

		<div id="dashboard">
			<div class="row-fluid">
				<!-- 住户数统计 -->
				<div class="span3 responsive" data-tablet="span3" data-desktop="span3">
					<div class="dashboard-stat blue">
						<div class="visual">
							<i class="icon-comments"></i>
						</div>
						<div class="details">
							<div class="number">${u}</div>
							<div class="desc">  总访问量</div>
						</div>
						<a class="more" href="/resident.do?action=residentList">查看访问日志 <i class="m-icon-swapright m-icon-white"></i></a>                 
					</div>
				</div>
				
				<!-- 物业费缴纳情况 -->
				<div class="span3 responsive" data-tablet="span3" data-desktop="span3">
					<div class="dashboard-stat green">
						<div class="visual">
							<i class="icon-shopping-cart"></i>
						</div>
						<div class="details">
							<div class="number">${d }</div>
							<div class="desc">平均日访问量</div>
						</div>
						<a class="more" href="#">查看访问日志 <i class="m-icon-swapright m-icon-white"></i></a>                 
					</div>
	
				</div>
				
				<!-- 报修数 -->
				<div class="span3 responsive" data-tablet="span3 " data-desktop="span3">
					<div class="dashboard-stat purple">
						<div class="visual">
							<i class="icon-globe"></i>
						</div>
	
						<div class="details">
							<div class="number">${f}</div>
							<div class="desc">总学校数</div>
						</div>
						<a class="more" href="/maintain.do">查看明细 <i class="m-icon-swapright m-icon-white"></i></a>                 
					</div>
				</div>
				
				<!-- 报修解决比例 -->
				<div class="span3 responsive" data-tablet="span3" data-desktop="span3">
					<div class="dashboard-stat yellow">
						<div class="visual">
							<i class="icon-bar-chart"></i>
						</div>
						<div class="details">
							<div class="number">${b }<br/></div>
							<div class="desc">总学生数</div>
						</div>
						<a class="more" href="/maintain.do">查看明细 <i class="m-icon-swapright m-icon-white"></i></a>                 
					</div>
				</div>
	
			</div>
	
			<div class="clearfix"></div>
			
			<!-- <div class="row-fluid">
				<div class="span6">
					<div class="portlet box purple">
						<div class="portlet-title line">
							<div class="caption"><i class="icon-comments"></i>未处理订单</div>
							<div class="tools">
								<a href="${setting("site.url")}" class="reload"></a>
							</div>
						</div>

						<div class="portlet-body" id="chats">
							<div class="scroller" data-height="290px" data-always-visible="1" data-rail-visible1="1">
								<ul class="chats">
									<li class="in">
										<img class="avatar" alt="" src="${static_server}/themes/metro/image/avatar1.jpg" />
										<div class="message">
											<span class="arrow"></span>
											<a href="#" class="name">苏宁电器</a>
											<span class="datetime">2015-5-1</span>
											<span class="body">苏宁电器携手浩博科技，家电送上门，全场5折起五一大促销活动，价格更优惠，实惠多多。</span>
										</div>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
					
				<div class="span6">
					<div class="portlet box blue paddingless">
	
						<div class="portlet-title line">
							<div class="caption"><i class="icon-bell"></i>本日订单</div>
							<div class="tools">
								<a href="${setting("site.url")}" class="reload"></a>
							</div>
						</div>
	
						<div class="portlet-body">
	
							<div class="scroller" data-height="290px" data-always-visible="1" data-rail-visible="0">
							</div>
						</div>
	
					</div>
					 -->
					<!-- 系统通知公告结束-->
					
				</div>
			</div>
			<div class="clearfix"></div>
		</div>
	</div>
[/@ui.page]
<script>
	$(document).ready(function(){
		DynamicTime.init("dynamictime");
		$("#readNotify").click(function(){
			
		});
	});
</script>