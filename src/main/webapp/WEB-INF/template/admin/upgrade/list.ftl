[#assign fmt=JspTaglibs["/WEB-INF/classes/tld/fmt.tld"] /]
[#assign ui=JspTaglibs["/WEB-INF/classes/tld/ui.tld"] /]

[@ui.page]

	[@ui.plugin plugin="pagesplit"][/@ui.plugin]
	<div class="container-fluid">
		<!-- 页面头部 -->
		<div class="row-fluid">
			<div class="span12">
				<!-- 页面头部定义-->
				<h3 class="page-title">App升级管理</h3>
			</div>
		</div>

		<div id="dashboard">
			<div class="row-fluid">
				<div class="span12" responsive" data-tablet="span12 fix-offset" data-desktop="span6">
					<div class="portlet box purple">
						<div class="portlet-title">
							<div class="caption"><i class="icon-cogs"></i>历次版本发布列表</div>
							<div class="actions">
								<a href="/app/admin/upgrade/edit" class="btn blue"><i class="icon-plus"></i>&nbsp;发布新版</a>
							</div>
						</div>
						<div class="portlet-body">
							<table class="table table-striped table-bordered table-hover" id="sample_3">
								<thead>
									<tr>
										<th>版本号</th>
										<th>版本名称</th>
										<th>更新号</th>
										<th>文件大小</th>
										<th>更新类型</th>
										<th>是否有效</th>
										<th>APK URL</th>
										<th>更新说明</th>
										<th>发布时间</th>
										<th style="width:200px">操作</th>
									</tr>
								</thead>
								<tbody>
									<!-- 合计行 -->
									[#list editions as e]
										<tr class="odd gradeX">
											<td>${e.version}</td>
											<td>${e.versionName}</td>
											<td>${e.versionCode}</td>
											<td>${e.filesize}</td>
											<td>
												[#if e.updateType == 2]
													强制更新
												[#else]
													正常更新
												[/#if]
											</td>
											<td>
												[#if e.valid == true]
													<span style="color:red">开启</span>
												[#else]
													<span style="color:green">关闭</span>
												[/#if]
											</td>
											<td>${e.apkurl}</td>
											<td>${e.desc}</td>
											<td>
												[@fmt.formatDate value=e.createTime pattern="yyyy/MM/dd HH:mm"  /]
											</td>
											<td>
												<a class="btn mini green changeValid " data-id="${e.id}" href="javascript:void(0);">
													<i class="icon-trash"></i>状态
												</a><br/>
												<a class="btn mini red btndelete" data-id="${e.id}" href="">
													<i class="icon-trash"></i>删除
												</a>
											</td>
										</tr>
									[/#list]
								</tbody>
							</table>
							<div id="pagesplit"></div>
							[@ui.pagesplit link="/app/admin/notice/index" renderTo="pagesplit" /]
						</div>
					</div>
					<!-- 系统通知公告结束-->
				</div>
			</div>
			<div class="clearfix"></div>
		</div>
	</div>
[/@ui.page]
<script>
	$(document).ready(function(){
		$(".btndelete").click(function(){
			if (window.confirm("您确定要删除此升级吗？")) {
				// 执行删除
				var cid = $(this).attr("data-id");
				Submit.invok("/app/admin/upgrade/delete?id=" + cid, function() {
					window.location.reload(true);
				});		
			}
		});
		
		$(".changeValid").click(function(){
			var cid = $(this).attr("data-id");
			Submit.invok("/app/admin/upgrade/updateValid?id=" + cid, function() {
				window.location.reload(true);
			});	
		});
	});
	
</script>