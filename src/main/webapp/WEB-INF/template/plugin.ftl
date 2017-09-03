<#--引入css-->
<#macro linkCss front="" instadmin="" ucenter="">
<@compress>
<#if front=='1'><link type="text/css" rel="stylesheet" href="${static_server}/themes/css/style${js_and_css_compress_extention}.css" /></#if>
<#if instadmin=='1'><link type="text/css" rel="stylesheet" href="${static_server}/themes/css/style${js_and_css_compress_extention}.css" /></#if>
<#if ucenter=='1'><link type="text/css" rel="stylesheet" href="${static_server}/themes/css/style${js_and_css_compress_extention}.css" /></#if>
</@compress>
</#macro>

<#--加载js-->
<#macro plugin jquery="" global="" formValidation="" date="" pager="" player="" uploadify="" keditor="" jcolorbox="" jdatepicker="" jslider="" jcrop="" myjs="" html5="">
<@compress>
<#if jquery=='1'><script type="text/javascript" src="${static_server}/script/jquery.min.js"></script></#if>
<#if global=='1'>
	<script type="text/javascript" src="${static_server}/script/global${js_and_css_compress_extention}.js" ></script>
	<script type="text/javascript" src="${static_server}/script/topacc${js_and_css_compress_extention}.js"></script>
</#if>
<#if formValidation=='1'>
</#if>
<#if date=='1'><script charset="utf-8" src="${static_server}/script/My97DatePicker/WdatePicker.js"></script></#if>
<#if pager=='1'>
	<script charset="utf-8" src="${static_server}/themes/metro/js/jquery.pager.js"></script>
	<link rel="stylesheet" href="${static_server}/themes/metro/css/jquery.pager.css" />
</#if>
<#if player=='1'>
	<script src="http://static.polyv.net/file/polyvplayer_v2.0.min.js"></script>
</#if>
<#if uploadify=='1'>
	<link rel="stylesheet" type="text/css" href="${static_server}/script/uploadify/uploadify.css"/>
	<script type="text/javascript" src="${static_server}/script/uploadify/jquery.uploadify.js"></script>
</#if>
<#if keditor=='1'>
	<link rel="stylesheet" href="${static_server}/script/kindeditor/themes/default/default.css" />
	<script src='${static_server}/script/kindeditor/kindeditor-min.js' type='text/javascript'></script>
	<script src='${static_server}/script/kindeditor/lang/zh_CN.js' type='text/javascript'></script> 
</#if>
<#if jcolorbox=='1'>
	<script type="text/javascript" src="${static_server}/script/jquery/js/jquery.colorbox-min.js"></script>
</#if>
<#if jdatepicker=='1'>
	<link rel="stylesheet" type="text/css" href="${static_server}/script/jquery/js/jquery.datetimepicker.css">
	<script src="${static_server}/script/jquery/js/jquery.datetimepicker.min.js"></script>
</#if>
<#if jslider=='1'>
	<script type="text/javascript" src="${static_server}/script/jssor/js/jssor.slider.mini.js"></script>
</#if>
<#if jcrop=='1'>
	<link rel="stylesheet" href="${static_server}/script/jcrop/css/jquery.Jcrop.css">
	<script src="${static_server}/script/jcrop/js/jquery.Jcrop.min.js"></script>
</#if>
<#if myjs=='1'>
	<script type="text/javascript" src="${static_server}/script/myjs.js"></script>
</#if>
<#if html5=='1'>
	<!--[if IE]>
		<script src="${static_server}/script/html5.js"></script>
	<![endif]-->
</#if>
</@compress>
</#macro>
