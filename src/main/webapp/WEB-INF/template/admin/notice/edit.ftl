
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
		<!-- 页面头部 -->
		<div class="row-fluid">
			<div class="span12">
				<!-- 页面头部定义-->
				<h3 class="page-title">通知管理 </h3>
			</div>
		</div>

		<div id="dashboard">
			<div class="row-fluid">
				<div class="span12">

					<div class="portlet box purple">
						<div class="portlet-title">
							<div class="caption"><i class="icon-reorder"></i>创建一个通知</div>
							<div class="tools">
								<a href="javascript:;" class="collapse"></a>
							</div>
						</div>
						<div class="portlet-body form">
							<form class="form-horizontal form-row-seperated" id="editform">
								<input type="hidden" name="id" value="${n.id}">
								<input type="hidden" name="n.receiverDeptId" value="${n.receiverDeptId}" id="receiverDeptId">
								
								<div class="control-group">
									<label class="control-label" >通知类型</label>
									<div class="controls">
										<select class="span6 m-wrap" data-placeholder="请选择通知类型" tabindex="1" name="n.noticeType" id="noticeType">
											<option value="1" data-name="全校通知" [#if n.noticeType == 1 ]selected ="selected"[/#if] >全校通知</option>
											<option value="2" data-name="全校教师通知" [#if n.noticeType == 2 ]selected ="selected"[/#if] >全校教师通知</option>
											<option value="3" data-name="部门教师通知" [#if n.noticeType == 3 ]selected ="selected"[/#if] >部门教师通知</option>
											<option value="4" data-name="全校学生通知" [#if n.noticeType == 4 ]selected ="selected"[/#if] >全校学生通知</option>
										</select>
									</div>
								</div>
								
								<div class="control-group notice-scope" style="display:none">
									<label class="control-label" >通知范围</label>
									<div class="controls notice-scope-content">
										
									</div>
								</div>
								
								<div class="control-group ">
									<label class="control-label" for="lastName">标题</label>
									<div class="controls">
										<input type="text" id="title" class="m-wrap span6 validate[required]" maxlength="100" name="n.title" value="${n.title }">
									</div>
								</div>
								<div class="control-group">
									<label class="control-label" >内容</label>
									<div class="controls">
										<textarea rows="5" class="span6 m-wrap"  name="n.content">${n.content}</textarea>
									</div>
								</div>
								
								<div class="control-group">
									<label class="control-label" >是否需要回复</label>
									<div class="controls">
										<label class="radio">
											<div class="radio"><span [#if n.needReply == 2 ]class="checked"[/#if]><input type="radio" name="n.needReply" value="2" [#if n.needReply == 2 ]checked="checked"[/#if]></span></div>是
										</label>
										<label class="radio">
											<div class="radio"><span [#if n.needReply == 1 ]class="checked"[/#if]><input type="radio" name="n.needReply" value="1" [#if n.needReply == 1 ]checked="checked"[/#if]></span></div>否
										</label>
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
			// 针对部门做处理
			if ($('input[name=dept]').length > 0){
				// 取得所有已经选中的选项
				if ($('input[name=dept]:checked').length > 0) {
					var selectedDept = $('input[name=dept]:checked');
					var selStr = '';
					$.each(selectedDept, function(index, el){
						if (selStr.length == 0){
							selStr += $(this).val();
						} else {
							selStr += "," + $(this).val();
						}
					});
				}
				
				$("#receiverDeptId").val(selStr);
			}
			
			// 如果是向部门发送的消息，则必须选择一个部门
			if ($("#noticeType").val() == "2" && $("#receiverDeptId").val().length == 0){
				window.alert("您还没有选择部门");
				return;
			}
			Submit.uploadForm("/app/admin/notice/update", "editform",function(result){
				if(result.success == false){
					showErrorDialog(result.msg);
				} else{
					window.location.assign("/app/admin/notice/index");
				}
			},null,false,null, false);
		});
		
		$("#noticeType").change(function(){
			var selectVal = $(this).children('option:selected').val();		
			if (selectVal == 1){
				$('.notice-scope .notice-scope-content').html('');
				$('.notice-scope').hide();
			} else if (selectVal == 2){
				// 查询数据
				Submit.request('/service/UserService/loadDepts', function(result){
					if (result.success == true && result.data != null && result.data.rows != null){
						// 将部门显示出来
						var _html = '';
						for (var i = 0; i < result.data.rows.length; i ++){
							if (result.data.rows[i].length == 0)
								continue;
								
							_html += '<span style="display:inline-block;paddingRight:10px;height: 25px;padding-right: 20px;"><input type="checkbox" name="dept" value="' + result.data.rows[i] + '" style="width:20px;height:20px;"> <label style="display:inline-block;">' + result.data.rows[i] + '</label></span>';
						}
						$('.notice-scope .notice-scope-content').html(_html);
						$('.notice-scope').show();
					}
				});
			}	
		});
	});	
</script>
