<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<title>${systemName }</title>
	[#include "/include/top_js_and_css.ftl" /]
</head>
<body>
	<!-- 头部开始 -->
	<div class="header" style="position:relative;z-index:200;">
		[#include "/include/top_bar.ftl" /]
		<div class="ind-hd-main">
			<div class="wrap clearfix">
				<a class="logo" href="${setting("site.url")}" title=""><img src="${static_server}/themes/images/logo.png" alt="${systemName }" title="${systemName }" /></a>
				<span class="city Spand">
					<span id="sel-area"></span>
					<a href="javascript:void(0);" class="on" title="切换地区" >切换地区</a>
					<div class="Spandiv" style="display:none;">
			            <p style="margin-top: 80px;"><i style="margin-right: 18px;">A</i><span data-value="340000">安徽</span></p>
			            <p><i style="margin-right: 18px;">B</i><span data-value="110000">北京</span></p>
			            <p><i style="margin-right: 18px;">C</i><span data-value="500000">重庆</span></p>
			            <p><i style="margin-right: 18px;">D</i><span data-value="210000">大连</span></p>
			            <p><i style="margin-right: 20px;">F</i><span data-value="350000">福建</span></p>
			            <p><i style="margin-right: 17px;">G</i><span data-value="440000">广东</span>
			                <span data-value=450000>广西</span>
			                <span data-value="520000">贵州</span>
			                <span data-value="620000">甘肃</span>
			            </p>
			            <p><i style="margin-right: 18px;">H</i><span data-value="130000">河北</span>
			                <span data-value="410000">河南</span>
			                <span data-value="420000">湖北</span>
			                <span data-value="430000">湖南</span>
			                <span data-value="230000">黑龙江</span>
			                <span data-value="460000">海南</span>
			            </p>
			            <p><i style="margin-right: 20px;">J</i><span data-value="220000">吉林</span>
			                <span data-value="320000">江苏</span>
			                <span data-value="360000">江西</span>
			            </p>
			            <p><i style="margin-right: 20px;">L</i><span data-value="210000">辽宁</span></p>
			            <p><i style="margin-right: 17px;">N</i><span data-value="330000">宁波</span><span data-value="150000">内蒙古</span>
			             <span data-value="640000">宁夏</span>
			            </p>
			            <p><i style="margin-right: 16px;">Q</i><span data-value="370000">青岛</span>
			            	<span data-value="630000">青海</span>
			            </p>
			            <p><i style="margin-right: 12px;">S</i>
			            	<span data-value="440000">深圳</span>
			                <span data-value="310000">上海</span>
			                <span data-value="370000">山东</span>
			                <span data-value="510000">四川</span>
			                <span data-value="610000">陕西</span>
			                <span data-value="140000">山西</span>
			            </p>
			            <p><i style="margin-right: 18px;">T</i><span data-value="120000">天津</span></p>
			            <p><i style="margin-right: 14px;">X</i>
			            	<span data-value="350000">厦门</span>
			                <span data-value="540000">西藏</span>
			                <span data-value="650000">新疆</span>
			            </p>
			            <p><i style="margin-right: 18px;">Y</i><span data-value="530000">云南</span></p>
			            <p><i style="margin-right: 15px;">Z</i>
			                <span data-value="330000">浙江</span>
			            </p>
					</div>
				</span>
				<div class="head-search">
	                <form action="/courses" method="post" id="index_form" class="search-form">
	                	<div class="hd-select">
	                		<span>
	                			[#if searchCategory == 'courses']
	                					课程
	                			[#elseif searchCategory == 'institution']
	                					机构
	                			[#elseif searchCategory == 'books']
	                					图书
	                			[#else]		
	                					课程
	                			[/#if]
	                		</span>
	                		<ul>
	                			<li data-type="courses">课程</li>
	                			<li data-type="institution">机构</li>
	                			<li data-type="books">图书</li>
	                		</ul>
	                	</div>
	                    <input name="keyword" id="keyword" type="text" class="input-text" value="${keyword}" maxlength="60"placeholder="找课程、培训机构、会计图书">
	                    <input type="submit" id="search_btn" value="" class="input-submit">
	                </form>
	            </div>
	            <ul class="ind-hd-agency clearfix">
	            	<li>
	            		<i></i>
	            		机构认证
	            	</li>
	            	<li>
	            		<i></i>
	            		随时退
	            	</li>
	            	<li>
	            		<i></i>
	            		真实评价
	            	</li>
	            </ul> 
			</div>
			<!-- 导航 -->
			<div class="ind-nav wrap">
				<ul class="clearfix">                             
					<li><a href="${site_url}" title="首页">首页</a></li>
					<li><a href="/news" title="资讯" class="menu-news">资讯</a></li>
					<li><a href="/institution" title="合作机构" class="menu-institution">合作机构</a></li>
					<li><a href="/courses" title="课程" class="menu-courses">课程</a></li>
					<li><a href="/books" title="书店" class="menu-books">书店</a></li>
					<li><a href="/news/ff808081506feb4401506feeede30004" title="平台流程">平台流程</a></li>
					<li><a href="/institution/login" title="机构入驻">机构入驻</a></li>
				</ul>
			</div>
		</div>
	</div>