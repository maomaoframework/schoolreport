package huxg.schoolreport.taglib;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.jsp.JspException;
import javax.servlet.jsp.tagext.BodyTagSupport;

import huxg.framework.config.SysConfiguration;
import huxg.framework.util.StringUtils;

public class PageTag extends BodyTagSupport {
	private boolean useSkin = true;
	private boolean loadJs = true;
	private boolean useSystemCss = true;
	private String bodyClass = null;

	public boolean isUseSystemCss() {
		return useSystemCss;
	}

	public void setUseSystemCss(boolean useSystemCss) {
		this.useSystemCss = useSystemCss;
	}

	public boolean isUseSkin() {
		return useSkin;
	}

	public void setUseSkin(boolean useSkin) {
		this.useSkin = useSkin;
	}

	@Override
	public void release() {
		useSkin = true;
		loadJs = true;
		useSystemCss = false;
		bodyClass = null;
		super.release();
	}

	@Override
	public int doStartTag() throws JspException {
		if (useSkin) {
			Cookie[] cookies = ((HttpServletRequest) pageContext.getRequest()).getCookies();
			String theme = "default";
			if (cookies != null) {
				for (Cookie cookie : cookies) {
					if ("vlink_skin".equals(cookie.getName())) {
						String cv = cookie.getValue();
						if (!StringUtils.isEmpty(cv)) {
							theme = "default";
						}
						break;
					}
				}
			} 
			StringBuffer sb = new StringBuffer();
			sb.append("<!DOCTYPE html>\r\n");
			sb.append("<!--[if IE 8]> <html lang=\"en\" class=\"ie8 no-js\"> <![endif]-->\r\n");
			sb.append("<!--[if IE 9]> <html lang=\"en\" class=\"ie9 no-js\"> <![endif]-->\r\n");
			sb.append("<!--[if !IE]><!--> <html lang=\"en\" class=\"no-js\"> <!--<![endif]-->\r\n");
			sb.append("<head>\r\n");
			sb.append("	<meta charset=\"utf-8\" />\r\n");
			sb.append("	<title>").append(SysConfiguration.getInstance().getProperty("system.name")).append("</title>\r\n");
			sb.append("	<meta content=\"width=device-width, initial-scale=1.0\" name=\"viewport\" />\r\n");
			sb.append("	<meta content=\"").append(SysConfiguration.getInstance().getProperty("meta.description")).append("\" name=\"description\" />\r\n");
			sb.append("	<meta content=\"").append(SysConfiguration.getInstance().getProperty("meta.author")).append("\" name=\"author\" />\r\n");
			sb.append("	<!-- 全局样式定义 -->\r\n");
			sb.append("	<link href=\"" + SysConfiguration.getProperty("system.static_server") + "/themes/metro/css/bootstrap.min.css\" rel=\"stylesheet\" type=\"text/css\"/>\r\n");
			sb.append("	<link href=\"" + SysConfiguration.getProperty("system.static_server") + "/themes/metro/css/bootstrap-responsive.min.css\" rel=\"stylesheet\" type=\"text/css\"/>\r\n");
			sb.append("	<link href=\"" + SysConfiguration.getProperty("system.static_server") + "/themes/metro/css/font-awesome.min.css\" rel=\"stylesheet\" type=\"text/css\"/>\r\n");
			sb.append("	<link href=\"" + SysConfiguration.getProperty("system.static_server") + "/themes/metro/css/style-metro.css\" rel=\"stylesheet\" type=\"text/css\"/>\r\n");
			sb.append("	<link href=\"" + SysConfiguration.getProperty("system.static_server") + "/themes/metro/css/style.css\" rel=\"stylesheet\" type=\"text/css\"/>\r\n");
			sb.append("	<link href=\"" + SysConfiguration.getProperty("system.static_server") + "/themes/metro/css/style-responsive.css\" rel=\"stylesheet\" type=\"text/css\"/>\r\n");
			sb.append("	<link href=\"" + SysConfiguration.getProperty("system.static_server") + "/themes/metro/css/default.css\" rel=\"stylesheet\" type=\"text/css\" id=\"style_color\"/>\r\n");
			sb.append("	<link href=\"" + SysConfiguration.getProperty("system.static_server") + "/themes/metro/css/uniform.default.css\" rel=\"stylesheet\" type=\"text/css\"/>\r\n");
			sb.append(" <link href=\"" + SysConfiguration.getProperty("system.static_server") + "/script/jquery/js/validationEngine.css?v=1\" rel=\"stylesheet\" type=\"text/css\">");
			sb.append("	<!-- 页面样式定义 --> \r\n");
			sb.append("	<link rel=\"shortcut icon\" href=\"" + SysConfiguration.getProperty("system.static_server") + "/themes/metro/image/favicon.ico\" />\r\n");

			sb.append("  <!-- 核心插件 -->        ");
			sb.append("	<script src=\"" + SysConfiguration.getProperty("system.static_server") + "/themes/metro/js/jquery-1.10.1.min.js\" type=\"text/javascript\"></script>");
			sb.append("	<script src=\"" + SysConfiguration.getProperty("system.static_server") + "/themes/metro/js/jquery-migrate-1.2.1.min.js\" type=\"text/javascript\"></script>");
			sb.append("	<script src=\"" + SysConfiguration.getProperty("system.static_server") + "/themes/metro/js/jquery-ui-1.10.1.custom.min.js\" type=\"text/javascript\"></script>");
			sb.append("	<script src=\"" + SysConfiguration.getProperty("system.static_server") + "/themes/metro/js/bootstrap.min.js\" type=\"text/javascript\"></script>");
			sb.append("");
			sb.append("	<!--[if lt IE 9]>");
			sb.append("	<script src=\"" + SysConfiguration.getProperty("system.static_server") + "/themes/metro/js/excanvas.min.js\"></script>");
			sb.append("	<script src=\"" + SysConfiguration.getProperty("system.static_server") + "/themes/metro/js/respond.min.js\"></script>  ");
			sb.append("	<![endif]-->   ");
			sb.append("");
			sb.append("	<script src=\"" + SysConfiguration.getProperty("system.static_server") + "/themes/metro/js/jquery.slimscroll.min.js\" type=\"text/javascript\"></script>");
			sb.append("	<script src=\"" + SysConfiguration.getProperty("system.static_server") + "/themes/metro/js/jquery.blockui.min.js\" type=\"text/javascript\"></script>  ");
			sb.append("	<script src=\"" + SysConfiguration.getProperty("system.static_server") + "/themes/metro/js/jquery.cookie.min.js\" type=\"text/javascript\"></script>");
			sb.append("	<script src=\"" + SysConfiguration.getProperty("system.static_server") + "/themes/metro/js/jquery.uniform.min.js\" type=\"text/javascript\" ></script>");
			sb.append("<script src=\"").append(SysConfiguration.getProperty("system.static_server") + "/script/vlink.admin.js\" type=\"text/javascript\"></script>");
			sb.append("");

			sb.append("</head>\r\n");
			// sb.append("\r\n");
			sb.append("<body class=\"");
			if (!StringUtils.isEmpty(bodyClass)) {
				sb.append(bodyClass);
			} else
				sb.append("page-header-fixed");
			sb.append("\">\r\n");
			sb.append("<div id=\"_dialog_box_\" class=\"modal hide fade\" tabindex=\"-1\" data-backdrop=\"static\" data-keyboard=\"false\">\r\n");
			sb.append("<div class=\"modal-body\">");
			sb.append("</div></div>");
			try {
				this.pageContext.getOut().print(sb.toString());
			} catch (Exception e) {
				e.printStackTrace();
			}
		}

		return EVAL_BODY_INCLUDE;

	}

	@Override
	public int doEndTag() throws JspException {
		StringBuffer sb = new StringBuffer();

		// sb.append("	<!-- 装入叶面级插件 -->");
		// sb.append("	<script src=\"/themes/metro/js/jquery.flot.js\" type=\"text/javascript\"></script>");
		// sb.append("	<script src=\"/themes/metro/js/jquery.flot.resize.js\" type=\"text/javascript\"></script>");
		// sb.append("	<script src=\"/themes/metro/js/jquery.pulsate.min.js\" type=\"text/javascript\"></script>");
		// sb.append("	<script src=\"/themes/metro/js/date.js\" type=\"text/javascript\"></script>");
		// sb.append("	<script src=\"/themes/metro/js/daterangepicker.js\" type=\"text/javascript\"></script>     ");
		// sb.append("	<script src=\"/themes/metro/js/jquery.gritter.js\" type=\"text/javascript\"></script>");
		// sb.append("	<script src=\"/themes/metro/js/fullcalendar.min.js\" type=\"text/javascript\"></script>");
		// sb.append("	<script src=\"/themes/metro/js/jquery.easy-pie-chart.js\" type=\"text/javascript\"></script>");
		// sb.append("	<script src=\"/themes/metro/js/jquery.sparkline.min.js\" type=\"text/javascript\"></script>  ");
		// sb.append("	<!-- 页面级插件装入完毕 -->");
		sb.append("");
		sb.append("	<!-- 装入本页面插件 -->");
		sb.append("<script src=\"").append(SysConfiguration.getProperty("system.static_server") + "/script/jquery/js/jquery.validationEngine.js?v=1\"></script>");
		sb.append("<script src=\"").append(SysConfiguration.getProperty("system.static_server") + "/script/jquery/js/jquery.validationEngine-zh_CN.js?v=1\"></script>");
		sb.append("	<script src=\"" + SysConfiguration.getProperty("system.static_server") + "/themes/metro/js/ms.js\" type=\"text/javascript\"></script>");
		sb.append("");
		sb.append("	<script>");
		sb.append("		jQuery(document).ready(function() {    \r\n");
		sb.append("		   App.init(); // 初始化布局和核心插件\r\n");
		sb.append("        $('form').validationEngine();\r\n");
		// sb.append("		   Index.init();\r\n");
		// sb.append("		   Index.initJQVMAP(); // 初始化页面脚本\r\n");
		// sb.append("		   Index.initCharts(); // 初始化自定义脚本\r\n");
		// sb.append("		   Index.initChat();\r\n");
		// sb.append("		   Index.initMiniCharts();\r\n");
		// sb.append("		   Index.initDashboardDaterange();\r\n");
		// sb.append("		   Index.initIntro();\r\n");
		sb.append("		});\r\n");
		sb.append("	</script>");
		sb.append("</body>");
		sb.append("");
		sb.append("</html>");
		try {
			this.pageContext.getOut().print(sb.toString());
		} catch (Exception e) {
			e.printStackTrace();
		}

		// 附加头尾巴
		return EVAL_PAGE;
	}

	public String getBodyClass() {
		return bodyClass;
	}

	public void setBodyClass(String bodyClass) {
		this.bodyClass = bodyClass;
	}

}
