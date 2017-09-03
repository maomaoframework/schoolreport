
[#assign ui=JspTaglibs["/WEB-INF/classes/tld/ui.tld"] /]

[@ui.page]
	<div class="container-fluid">
		<!-- 页面头部 -->
		<div class="row-fluid">
			<div class="span12">
				<!-- 页面头部定义-->
				<h3 class="page-title">修改管理员密码</h3>
				<ul class="breadcrumb">
					<li>
						<i class="icon-home"></i>修改密码
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
		<div class="row-fluid">
					<div class="span12">
						<div class="portlet box blue">
							<div class="portlet-title">
								<div class="caption"><i class="icon-reorder"></i>修改密码</div>
								<div class="tools">
									<a href="javascript:;" class="collapse"></a>
								</div>
							</div>
							<div class="portlet-body form">
								<form action="#" class="form-horizontal" name="editform" id="editform">
									<div class="control-group success">
										<label class="control-label" for="inputSuccess">输入原密码</label>
										<div class="controls">
											<input type="password" class="span6 m-wrap validate[required]" id="oldpwd" name="oldpwd" />
										</div>
									</div>
									<div class="control-group success">
										<label class="control-label" for="inputSuccess">输入新密码</label>
										<div class="controls">
											<input type="password" class="span6 m-wrap validate[required]" id="newpwd" name="newpwd"/>
										</div>
									</div>
									<div class="control-group success">
										<label class="control-label" for="inputSuccess">确认新密码</label>
										<div class="controls">
											<input type="password" class="span6 m-wrap validate[required]" id="confirmpwd" name="confirmpwd"/>
										</div>
									</div>
									<div class="form-actions">
										<button type="button" class="btn blue">确定</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
	</div>
[/@ui.page]
<script>
$(document).ready(function(){
	DynamicTime.init("dynamictime");
});

$(document).ready(function(){
	DynamicTime.init("dynamictime");
	$(".btn").click(function(){
		Submit.submitForm("/ucenter/updatePwd", "editform",function(result){
			if(result.success == false){
				showErrorDialog(result.msg);
			} else{
				window.top.location.assign("/app/admin");
			}
		},null,true,null, false);
	});
});	
	
</script>
