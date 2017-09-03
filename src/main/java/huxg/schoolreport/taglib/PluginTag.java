package huxg.schoolreport.taglib;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.tagext.BodyTagSupport;

import huxg.framework.config.SysConfiguration;

public class PluginTag extends BodyTagSupport {
	private String plugin;

	public String getPlugin() {
		return plugin;
	}

	public void setPlugin(String plugin) {
		this.plugin = plugin;
	}

	public enum PluginType {
		editor, upload, datepicker, pagesplit;
	}

	@Override
	public int doEndTag() throws JspException {
		try {
			StringBuffer sb = new StringBuffer();
			if (this.plugin.equals(PluginType.editor.name())) {
				sb.append("<link rel=\"stylesheet\" href=\"").append(SysConfiguration.getProperty("system.static_server") + "/script/kindeditor-4.1.10/themes/default/default.css\" />");
				sb.append("<link rel=\"stylesheet\" href=\"").append(SysConfiguration.getProperty("system.static_server") + "/script/kindeditor-4.1.10/plugins/code/prettify.css\" />");
				sb.append("<script charset=\"utf-8\" src=\"").append(SysConfiguration.getProperty("system.static_server") + "/script/kindeditor-4.1.10/kindeditor.js\"></script>");
				sb.append("<script charset=\"utf-8\" src=\"").append(SysConfiguration.getProperty("system.static_server") + "/script/kindeditor-4.1.10/lang/zh_CN.js\"></script>");
				sb.append("<script charset=\"utf-8\" src=\"").append(SysConfiguration.getProperty("system.static_server") + "/script/kindeditor-4.1.10/plugins/code/prettify.js\"></script>");
			} else if (this.plugin.equals(PluginType.upload.name())) {
				sb.append("<link rel=\"stylesheet\" type=\"text/css\" href=\"" + SysConfiguration.getProperty("system.static_server") +  "/script/uploadify/uploadify.css\"/>");
				sb.append("<script type=\"text/javascript\" src=\"" + SysConfiguration.getProperty("system.static_server") +  "/script/uploadify/jquery.uploadify.js\"></script>");

			} else if (this.plugin.equals(PluginType.datepicker.name())) {
				sb.append("<script charset=\"utf-8\" src=\"").append(SysConfiguration.getProperty("system.static_server") + "/script/My97DatePicker/WdatePicker.js\"></script>");
			} else if (this.plugin.equals(PluginType.pagesplit.name())) {
				sb.append("<script charset=\"utf-8\" src=\"").append(SysConfiguration.getProperty("system.static_server") + "/themes/metro/js/jquery.pager.js\"></script>");
				sb.append("<link rel=\"stylesheet\" href=\"").append(SysConfiguration.getProperty("system.static_server") + "/themes/metro/css/jquery.pager.css\" />");
			}
			pageContext.getOut().print(sb.toString());
		} catch (Exception e) {
			e.printStackTrace();
		}

		// 附加头尾巴
		return EVAL_PAGE;
	}
}
