
[#assign ui=JspTaglibs["/WEB-INF/classes/tld/ui.tld"] /]

[@ui.page]
<link rel="stylesheet" type="text/css" href="${static_server}/themes/metro/css/bootstrap-fileupload.css" />
<link rel="stylesheet" type="text/css" href="${static_server}/themes/metro/css/chosen.css" />
<link rel="stylesheet" type="text/css" href="${static_server}/themes/metro/css/select2_metro.css" />

<script charset="utf-8" src="${static_server}/themes/metro/js/jquery.upload.js"></script>

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
		<!-- 页面头部 -->
		<div class="row-fluid">
			<div class="span12">
				<!-- 页面头部定义-->
				<h3 class="page-title">发布App </h3>
			</div>
		</div>

		<div id="dashboard">
			<div class="row-fluid">
				<div class="span12">

					<div class="portlet box purple">
						<div class="portlet-title">
							<div class="caption"><i class="icon-reorder"></i>发布一个新的App（Android）</div>
							<div class="tools">
								<a href="javascript:;" class="collapse"></a>
							</div>
						</div>
						<div class="portlet-body form">
							<form class="form-horizontal form-row-seperated" id="editform">
								<input type="hidden" name="id" value="${edition.id}">
								
								<div class="control-group">
									<label class="control-label" >上传APK</label>
									<div class="controls">
										<div class="fileupload fileupload-new" data-provides="fileupload">
											<span class="btn btn-file">
											<span class="fileupload-new">选择文件</span>
											<span class="fileupload-exists">重新选择</span>
											<input type="file" class="default" name="apk" id="apk">
											</span>
											<span class="fileupload-preview"></span>
											<a href="#" class="close fileupload-exists" data-dismiss="fileupload" style="float: none"></a>
										</div>
									</div>
								</div>
								
								<div class="control-group">
									<label class="control-label" >版本号</label>
									<div class="controls">
										<input type="text" id="version" class="m-wrap span6 validate[required]" maxlength="100" name="edition.version" value="${edition.version }">
									</div>
								</div>
								<div class="control-group">
									<label class="control-label" >版本名称</label>
									<div class="controls">
										<input type="text" id="versionName" class="m-wrap span6 validate[required]" maxlength="100" name="edition.versionName" value="${edition.versionName }">
									</div>
								</div>
								<div class="control-group">
									<label class="control-label" >升级号</label>
									<div class="controls">
										<input type="text" id="versionCode" class="m-wrap span6 validate[required]" maxlength="100" name="edition.versionCode" value="${edition.versionCode }">
									</div>
								</div>
								
								<div class="control-group">
									<label class="control-label" >升级类型</label>
									<div class="controls">
										<label class="radio">
											<div class="radio"><span [#if edition.updateType == 1 ]class="checked"[/#if]><input type="radio" name="edition.updateType" value="1" [#if edition.updateType == 1 ]checked="checked"[/#if]></span></div>正常升级
										</label>
										<label class="radio">
											<div class="radio"><span [#if edition.updateType == 2 ]class="checked"[/#if]><input type="radio" name="edition.updateType" value="2" [#if edition.updateType == 2 ]checked="checked"[/#if]></span></div>强制升级
										</label>
									</div>
								</div>
								
								<div class="control-group">
									<label class="control-label" >是否开启</label>
									<div class="controls">
										<label class="radio">
											<div class="radio"><span [#if edition.valid == true ]class="checked"[/#if]><input type="radio" name="edition.valid" value="true" [#if edition.valid == true ]checked="checked"[/#if]></span></div>开启
										</label>
										<label class="radio">
											<div class="radio"><span [#if edition.valid == false ]class="checked"[/#if]><input type="radio" name="edition.valid" value="false" [#if edition.valid == false ]checked="checked"[/#if]></span></div>关闭
										</label>
									</div>
								</div>
								
								<div class="control-group">
									<label class="control-label" >升级说明</label>
									<div class="controls">
										<textarea rows="5" class="span6 m-wrap"  id="desc" name="edition.desc">${edition.desc}</textarea>
									</div>
								</div>
								
								<div class="form-actions">
									<a href="javascript:void(0);" class="btn blue btnsubmit span2">确定</a>
									<a href="javascript:window.history.go(-1);" class="btn btncancel span2">取消</a>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
			
			<div class="clearfix"></div>
		</div>
	</div>
[/@ui.page]
<script type="text/javascript" src="${static_server}/themes/metro/js/bootstrap-fileupload.js"></script>
<script type="text/javascript" src="${static_server}/themes/metro/js/chosen.jquery.min.js"></script>
<script type="text/javascript" src="${static_server}/themes/metro/js/select2.min.js"></script>
<script type="text/javascript" src="${static_server}/script/vlink.admin.js"></script>
<script>
	$(document).ready(function (){
		$(".btnsubmit").click(function(){
			// 判断是否上传文件
			if ($("#apk").val().length == 0){
				window.alert("请选择文件");
				return;
			}
			
			
			// 检查数据项是否都填写了
			if ($("#version").val().length == 0){
				window.alert("请填写版本号");
				return;
			}
			if ($("#versionName").val().length == 0){
				window.alert("请填写版本名称");
				return;
			}
			if ($("#versionCode").val().length == 0){
				window.alert("请填写升级号");
				return;
			}
			
			// 检查升级类型是否填写
			if($("input[name='edition.updateType']:checked").length == 0) {
				window.alert("请选择升级类型");
				return;
			}
			
			// 检查是否开启
			if($("input[name='edition.valid']:checked").length == 0) {
				window.alert("请选择是否开启本次升级");
				return;
			}
			
			// 检查数据项是否都填写了
			if ($("#desc").val().length == 0){
				window.alert("请填写升级说明");
				return;
			}
			
			Submit.uploadForm("/app/admin/upgrade/update", "editform",function(result){
				window.location.assign("/app/admin/upgrade/list");
			},null,false,null, false);
		});
	});	
</script>
