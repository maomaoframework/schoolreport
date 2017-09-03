[#assign fmt=JspTaglibs["/WEB-INF/classes/tld/fmt.tld"] /]
[#assign ui=JspTaglibs["/WEB-INF/classes/tld/ui.tld"] /]

[@ui.page]

	[@ui.plugin plugin="pagesplit"][/@ui.plugin]
	<div class="container-fluid">
		<!-- 页面头部 -->
		<div class="row-fluid">
			<div class="span12">
				<!-- 页面头部定义-->
				<h3 class="page-title">通知管理</h3>
			</div>
		</div>

		<div id="dashboard">
			<div class="row-fluid">
				<div class="span12" responsive" data-tablet="span12 fix-offset" data-desktop="span6">
					<!-- 居民物业费缴纳表-->
					<div class="portlet box purple">
						<div class="portlet-title">
							<div class="caption"><i class="icon-cogs"></i>通知列表</div>
							<div class="actions">
								<a href="/app/admin/notice/edit" class="btn blue"><i class="icon-plus"></i>&nbsp;添加</a>
							</div>
						</div>
						<div class="portlet-body">
							<table class="table table-striped table-bordered table-hover" id="sample_3">
								<thead>
									<tr>
										<th>通知</th>
										<th width="200">发布时间</th>
										<th width="200">操作</th>
									</tr>
								</thead>
								<tbody>
									<!-- 合计行 -->
									[#list notices as i]
										<tr class="odd gradeX">
											<td><a href="/app/admin/notice/edit?id=${i.id}">${i.title }</a></td>
											<td nowrap>
												[@fmt.formatDate value=i.releaseTime pattern="yyyy/MM/dd HH:mm"  /]
											</td>
											<td>
												<a class="btn mini green " href="/app/admin/notice/feedback?id=${i.id}">
													<i class="icon-trash"></i>查看回执
												</a>
												<a class="btn mini green " href="/app/admin/notice/edit?id=${i.id}">
													<i class="icon-trash"></i>修改
												</a>
												<a class="btn mini red btndelete" data-id="${i.id}" href="javascript:void(0);">
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
			if (window.confirm("您确定要删除此通知吗？")) {
				// 执行删除
				var cid = $(this).attr("data-id");
				Submit.invok("/app/admin/notice/delete?id=" + cid, function() {
					window.location.reload(true);
				});		
			}
		});
	});
	
</script>