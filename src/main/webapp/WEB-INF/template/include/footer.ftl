<!-- 底部开始 -->
	<div class="footer">
		<div class="f-service wrap clearfix">
			<dl>
				<dt>帮助中心</dt>
				
				[@entity_list entity="CmsArticle" var="articles" where="CChannelId = 'ff808081506feb4401506fecd2470000' and NIsRelease = 1" limit="0,5"]
					[#list articles as n]
						<dd><a href="/news/${n.id}" title="${n.CTitle }">${n.CTitle }</a></dd>
					[/#list]
				[/@entity_list]
			</dl>
			<dl>
				<dt>服务支持</dt>
				[@entity_list entity="CmsArticle" var="articles" where="CChannelId = 'ff808081506feb4401506fed44120001' and NIsRelease = 1" limit="0,5"]
					[#list articles as n]
					<dd><a href="/news/${n.id}" title="${n.CTitle }">${n.CTitle }</a></dd>
					[/#list]
				[/@entity_list]
			</dl>
			<dl>
				<dt>关于鼎尖</dt>
				[@entity_list entity="CmsArticle" var="articles" where="CChannelId = 'ff808081506feb4401506fed897b0002' and NIsRelease = 1" limit="0,5"]
					[#list articles as n]
						<dd><a href="/news/${n.id}" title="${n.CTitle }">${n.CTitle }</a></dd>
					[/#list]
				[/@entity_list]
			</dl>
			<dl>
				<dt>关注我们</dt>
				<dd><a href="javascript:void(0);" title="官方微信" onclick="Utils.showWeixinQRCode();">官方微信</a></dd>
				<dd><a href="${setting("url.sina.weibo")}" target="_blank" title="新浪微博">新浪微博</a></dd>
			</dl>
			<div id="hot-line" class="hot-line">
				<img src="${static_server}/themes/greencube/images/tel.png" alt="" />
				<strong>010-82830939</strong>
				<p>周一至周五 9:00-18:00</p>
			</div>
		</div>
		<div class="f-bot">
			<div class="wrap">
				<a href="" title=""><img src="${static_server}/themes/images/footer_logo.png" alt="" title="" /></a>
				<!-- <div class="f-link">
					<a href="" title="">了解鼎尖</a>
					<a href="" title="">媒体关注</a>
					<a href="" title="">联系我们</a>
					<a href="" title="">合作伙伴</a>
					<a href="" title="">招聘信息</a>
					<a href="" title="">客户服务</a>
					<a href="" title="">版权声明</a>
					<a href="" title="">帮助中心</a>
					<a href="" title="">网站地图</a>
					<a href="" title="">友情链接</a>
					<a href="" title="">TOP</a>
					 <a href="" id="cnzz_stat_icon_1256527141" title="">站点统计</a>
				</div> -->
				<p>Copyright © 2014 - 2015 鼎尖（北京）教育科技有限公司版权所有. All Rights Reservedc|京ICP备15008184号-1</p>
			</div>
		</div>
	</div>
	<!-- <script type="text/javascript">var cnzz_protocol = (("https:" == document.location.protocol) ? " https://" : " http://");document.write(unescape("%3Cspan id='cnzz_stat_icon_1256527141'%3E%3C/span%3E%3Cscript src='" + cnzz_protocol + "s95.cnzz.com/z_stat.php%3Fid%3D1256527141%26show%3Dpic' type='text/javascript'%3E%3C/script%3E"));</script> -->
</body>
</html>