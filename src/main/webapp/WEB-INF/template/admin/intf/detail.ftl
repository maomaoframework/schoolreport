
[#assign ui=JspTaglibs["/WEB-INF/classes/tld/ui.tld"] /]

[@ui.page]
<link rel="stylesheet" type="text/css" href="${static_server}/themes/metro/css/bootstrap-fileupload.css" />
<link rel="stylesheet" type="text/css" href="${static_server}/themes/metro/css/chosen.css" />
<link rel="stylesheet" type="text/css" href="${static_server}/themes/metro/css/select2_metro.css" />
<script type="text/javascript" src="${static_server}/script/ckeditor/ckeditor.js"></script>
[@ui.plugin plugin="upload"][/@ui.plugin]
[@jqPlugin.plugin date='1'/]
<style>
	.video{
		position:absolute;
		right:50px;
		top:180px;
	}
	.polyv_btn{
		width: 88px !important;
	}
</style>
		<div class="container-fluid">
			<!-- BEGIN PAGE HEADER-->
			<div class="row-fluid">
				<div class="span12">
					<h3 class="page-title">
						接口：${inter.url }（${inter.desc }）
					</h3>
					<ul class="breadcrumb">
						<li><i class="icon-home"></i><a href="/app/admin/intf/list">接口列表</a> <i class="icon-angle-right"></i></li>
						<li>查看接口详细信息</li>
					</ul>
				</div>
			</div>
			<div class="row-fluid">
				<div class="span12">
					<!-- BEGIN SAMPLE FORM PORTLET-->
					<div class="portlet box green">
						<div class="portlet-title">
							<div class="caption">
								<i class="icon-reorder"></i><span class="hidden-480">测试</span>
							</div>
						</div>
						<div class="portlet-body form">
							<h4>接口说明</h4>
							<div style="padding-left:20px;padding-right:20px;">
								<p>${inter.em }</p>
								<p>${inter.memo }</p>
							</div>
							<hr/>
							<h4>返回值说明</h4>
							<div style="padding-left:20px;padding-right:20px;">
								${inter.returnValue }
							</div>
							<hr/>
							<form id="addform" class="form-horizontal">
								<input type="hidden" name="id" value="${inter.id }">
								[#list inter.parameters as p]
									<div class="control-group">
										<label class="control-label">${p.name}（${p.desc}）</label>
										<div class="controls">
											<input type="text" class="span3 m-wrap [#if p.isRequired == "true"] validate[required][/#if]" name="${p.name}" value="${p.defaultValue }"/>
										</div>
									</div>
								[/#list]
								<div class="form-actions">
									<a href="javascript:void(0);" class="btn blue btnExecute">测试</a>
								</div>
								
							</form>
						</div>
						<div id="executeResult" style="display:none;">
							<h3 style="color:white;font-size:15px;line-height:20px;padding-left: 20px;">  返回结果</h3>
							<div class="control-group" style="background-color: #FFFFFF;padding:10px;line-height: 25px;word-wrap: break-word; word-break: normal;" id="innerResult">
							</div>
						</div>
					</div>
					<!-- END SAMPLE FORM PORTLET-->
				</div>
			</div>
			<!-- END PAGE CONTENT-->
		</div>
	[/@ui.page]
<script type="text/javascript" src="${static_server}/themes/metro/js/bootstrap-fileupload.js"></script>
<script type="text/javascript" src="${static_server}/themes/metro/js/chosen.jquery.min.js"></script>
<script type="text/javascript" src="${static_server}/themes/metro/js/select2.min.js"></script>
<script type="text/javascript" src="${static_server}/script/vlink.admin.js"></script>
<script>
	String.prototype.startWith=function(str){  
            if(str==null||str==""||this.length==0||str.length>this.length)  
              return false;  
            if(this.substr(0,str.length)==str)  
              return true;  
            else  
              return false;  
            return true;  
    }  
        
	$(document).ready(function (){
		$(".btnExecute").click(function(){
			$("#executeResult").hide();
			$("#innerResult").html("");
			
			var interUrl = "${inter.url}";
			var url = "/app/admin/intf/execute";
			if (interUrl.startWith("/service")) {
			   url = "/app/admin/intf/execute"
			} else {
			   url = interUrl;
			}
			
			Submit.submitForm(url, "addform",function(result){
				if(result.success == false){
					if (typeof(result.message) != "undefined") {
						showErrorDialog(result.message);	
					} else {
						$("#executeResult").show();
						$("#innerResult").html(Utils.json2String(result));
					}
					
				} else{
					$("#executeResult").show();
					$("#innerResult").html(Utils.json2String(result));
				}
			},null,false,null, false);
		});
	});
	
</script>
