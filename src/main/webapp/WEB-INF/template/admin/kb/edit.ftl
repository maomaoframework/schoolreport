
[#assign ui=JspTaglibs["/WEB-INF/classes/tld/ui.tld"] /]

[@ui.page]
<link rel="stylesheet" type="text/css" href="${static_server}/themes/metro/css/bootstrap-fileupload.css" />
<link rel="stylesheet" type="text/css" href="${static_server}/themes/metro/css/chosen.css" />
<link rel="stylesheet" type="text/css" href="${static_server}/themes/metro/css/select2_metro.css" />
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
		<div class="row-fluid">
			<div class="span12">
				<h3 class="page-title">查看课表 </h3>
			</div>
		</div>

		<div id="dashboard">
			<div class="row-fluid">
				<div class="span12">
					<div class="portlet box purple">
						<div class="portlet-title">
							<div class="caption"><i class="icon-reorder"></i>${classRoom.name}</div>
							<div class="tools">
								<a href="javascript:;" class="collapse"></a>
							</div>
						</div>
						<div class="portlet-body form">
							<form class="form-horizontal form-row-seperated" id="editform">
								<input type="hidden" name="id" value="${classRoom.id}">
								<input id="kb" type="hidden" name="classRoom.kb" value="${classRoom.kb}"　>
								<div class="control-group">
									<label class="control-label" >当前课表</label>
									<div class="controls">
										<div id="uploadImage"></div>
									</div>
								</div>
								<div class="form-actions">
									<a href="javascript:void(0);" class="btn blue btnUpdate span2">确定</a>
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
	var defaultPic = "${classRoom.kb}";
	if (defaultPic.length == 0 || defaultPic == "null"){
		defaultPic = '/media/themes/metro/image/nopic.gif';
	}
	
	ImageUpload.createUploadImage('uploadImage', 300, 300 , defaultPic  , function(result){
		$("#kb").val(result.cWjljXd);
	});
	
	$(document).ready(function(){
		$(".btnUpdate").click(function(){
			Submit.submitForm("/app/admin/kb/update", 'editform' ,function() {
				window.location.assign('/app/admin/kb/index');
			});		
		});
	});
</script>
