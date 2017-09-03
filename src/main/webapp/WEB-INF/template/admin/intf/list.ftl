[#assign fmt=JspTaglibs["/WEB-INF/classes/tld/fmt.tld"] /]
[#assign ui=JspTaglibs["/WEB-INF/classes/tld/ui.tld"] /]

[@ui.page]


	[@ui.plugin plugin="pagesplit"][/@ui.plugin]
	<div class="container-fluid">
		<!-- 页面头部 -->
		<div class="row-fluid">
			<div class="span12">
				<!-- 页面头部定义-->
				<h3 class="page-title">接口列表</h3>
	
				<ul class="breadcrumb">
					<li>
						<i class="icon-home"></i>下表显示全部接口和相关说明 
						<span>
								<select name="selectedService" id="selectedService">
									[#list allServices as s]
										<option value="${s.name}" [#if s.name == service]selected="selected"[/#if]>${s.desc }</option>
									[/#list]
								</select>
							</form>
						</span>
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

		<div id="dashboard">
			<div class="row-fluid">
				<div class="span12" responsive" data-tablet="span12 fix-offset" data-desktop="span6">
					<!-- 居民物业费缴纳表-->
					<div class="portlet box purple">
						<div class="portlet-title">
							<div class="caption"><i class="icon-cogs"></i>接口列表</div>
							<div class="actions">
								<a href="javascript:void(0);" class="btn blue reloadInters"><i class="icon-plus"></i>&nbsp;刷新</a>
							</div>
						</div>
						<div class="portlet-body">
							<table class="table table-striped table-bordered table-hover" id="sample_3">
								<thead>
									<tr>
										<th>名称</th>
										<th>接口地址</th>
										<th>Method</th>
										<th>参数</th>
										<th colspan="2">操作</th>
									</tr>
								</thead>
								<tbody>
									<!-- 合计行 -->
									[#list services as s]
										[#list s.interfaces as i]
											<tr class="odd gradeX">
												<td>${i.desc }</td>
												<td>${i.url }</td>
												<td>${i.method }</td>
												<td>
													[#list i.parameters as p]
														<div>< >${p.name}</span><span> -- ${p.desc}(string)</span></div>
													[/#list]
												</td>
												<td nowrap>
													<a href="/app/admin/intf/detail?id=${i.id }" class="btn green mini"><i class="icon-edit"></i> 明细</a>
												</td>
											</tr>
										[/#list]
									[/#list]
								</tbody>
							</table>
							<div id="pagesplit"></div>
							[@ui.pagesplit link="/app/admin/video/video_list" renderTo="pagesplit" /]
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
		DynamicTime.init("dynamictime");
		$(".reloadInters").on("click",function(){
			if (window.confirm("确定要刷新接口列表吗？")){
				Submit.invok("/app/admin/intf/reload",function(){
					window.location.reload(true);
				});				
			}
		});
		$("#selectedService").change(function(){
			window.location.assign("/app/admin/intf/list?service=" + $(this).val());
		});
	});
	
</script>