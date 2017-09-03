[#assign ui=JspTaglibs["/WEB-INF/classes/tld/ui.tld"] /]
[#assign fmt=JspTaglibs["/WEB-INF/classes/tld/fmt.tld"] /]
[@ui.apppage title="选择地区"]
<style type="text/css">
a{ text-decoration:none;}
li{ list-style:none;}
.area{ padding:8px 0; position:fixed; background-color:#f1f1f1; width:100%; top:0px; border-bottom:1px solid #d5d5d5;}
.skip{ text-align:center;font-size:1.3em; color:#231815;}
.skip span{ color:#5aaf00; font-size:1.4em; font-family:"微软雅黑";}
h5{ font-size:1.2em; color:#231815; line-height:40px; padding-left:5%;}
table{ width:100%; border-bottom:1px solid #e0e0e0;}
td{ border:1px solid #e0e0e0; text-align:center; font-size:1.1em; color:#3e3a39; height:36px; border-bottom:none;}
.letter td{ width:20%;}
.td2{ border-left:0px;border-right:0px;}
ul{ width:100%; border-top:1px solid #e0e0e0;margin-left:0px;}
li{ border:1px solid #e0e0e0; text-align:center; font-size:1.1em; color:#3e3a39; height:36px; border-top:none; width:32.7%; float:left; line-height:36px; }
</style>

<div class="header navbar navbar-inverse navbar-fixed-top">
	<div class="navbar-inner">
		<div class="container-fluid">
			<h4 style="line-height:30px;color:white;">当前定位城市：<span> 南京</span></h4>
		</div>
		
		<div class="container-fluid">
			<div id="dashboard">
				<div class="row-fluid">
					<h5>热门城市</h5>
					<table border="0" cellspacing="0" cellpadding="0">
						<tr>
					    	<td class="td2 area_item" data-id="110000" data-name="北京">北京</td>
					        <td class="area_item" data-id="40288b8b3afed262013afed46d6e2141" data-name="广州">广州</td>
					        <td class="td2 area_item" data-id="40288b8b3afed262013afed46d6e2167" data-name="深圳">深圳</td>
					    </tr>
					    <tr>
					    	<td class="td2 area_item" data-id="40288b8b3afed262013afed46d6e1126" data-name="合肥">合肥</td>
					        <td class="area_item" data-id="40288b8b3afed262013afed46d6e2303" data-name="南宁">南宁</td>
					        <td class="td2 area_item" data-id="40288b8b3afed262013afed46d6e0928" data-name="苏州">苏州</td>
					    </tr>
					    <tr>
					    	<td class="td2 area_item" data-id="40288b8b3afed262013afed46d6e2511" data-name="成都">成都</td>
					        <td class="area_item" data-id="500000" data-name="重庆">重庆</td>
					        <td class="td2 area_item" data-id="40288b8b3afed262013afed46d6e3071" data-name="西安">西安</td>
					    </tr>
					</table>
					
					<h5>更多城市</h5>
					<table border="0" cellspacing="0" cellpadding="0" class="letter">
						<tr>
					    	<td class="td2">A</td>
					        <td>B</td>
					        <td>C</td>
					        <td>D</td>
					        <td class="td2">E</td>
					    </tr>
					    <tr>
					    	<td class="td2">F</td>
					        <td>G</td>
					        <td>H</td>
					        <td>J</td>
					        <td class="td2">K</td>
					    </tr>
					   <tr>
					    	<td class="td2">L</td>
					        <td>M</td>
					        <td>N</td>
					        <td>O</td>
					        <td class="td2">P</td>
					    </tr>
					    <tr>
					    	<td class="td2">Q</td>
					        <td>R</td>
					        <td>S</td>
					        <td>T</td>
					        <td class="td2">V</td>
					    </tr>
					    <tr>
					    	<td class="td2">W</td>
					        <td>X</td>
					        <td>Y</td>
					        <td>Z</td>
					        <td class="td2"></td>
					    </tr>
					</table>
										
					<!-- 遍历地区 -->
					<div id="area_list">
					</div>
				</div>
				<div class="clearfix"></div>
			</div>
		</div>
	</div>
</div>


<script>
	$(document).ready(function(){
		jQuery.ajax({
			type : "post",
			cache : false,
			url : '/familydoctor/data_choose_area',
			success : function(resultdata, textStatus) {
				$("#area_list").html(resultdata);
			}
		});
		
		
		$(".area_item").click(function(){
			var areaId = $(this).attr("data-id"); 
			var areaName = $(this).attr("data-name");
			UserLocationSniffer.changeArea(areaId, areaName,function(){
				window.history.go(-1);
			});
		});
		$(".letter td").click(function(){
			$("html,body").animate({scrollTop:$("#h_" + $(this).html()).offset().top},1000)
		});
		
		// 所在位置
		var uan = $.cookie("user_area_name");
		$(".area>.skip>span").html(uan);
	});
</script>
[/@ui.apppage]