package huxg.schoolreport.taglib;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.tagext.BodyTagSupport;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import huxg.framework.PageInfo;
import huxg.framework.filter.parameter.ParameterWrapper;
import huxg.framework.util.StringUtils;
import huxg.framework.util.uuid.Key;

/**
 * 分页标签
 * 
 * @author huxg
 * 
 */
public class PageSplitTag extends BodyTagSupport {

	private static final long serialVersionUID = 1L;

	private static final Log log = LogFactory.getLog(PageSplitTag.class);

	String link;
	String callback;
	String renderTo;
	String formid;
	int style = 1;

	boolean refreshFirstPage = true;

	public String getLink() {
		return link;
	}

	public void setLink(String link) {
		this.link = link;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public String getCallback() {
		return callback;
	}

	public void setCallback(String callback) {
		this.callback = callback;
	}

	public String getRenderTo() {
		return renderTo;
	}

	public void setRenderTo(String renderTo) {
		this.renderTo = renderTo;
	}

	public boolean isRefreshFirstPage() {
		return refreshFirstPage;
	}

	public void setRefreshFirstPage(boolean refreshFirstPage) {
		this.refreshFirstPage = refreshFirstPage;
	}

	public String getFormid() {
		return formid;
	}

	public void setFormid(String formid) {
		this.formid = formid;
	}

	public int getStyle() {
		return style;
	}

	public void setStyle(int style) {
		this.style = style;
	}

	public int doStartTag() throws JspException {

		try {
			StringBuffer sb = new StringBuffer();

			PageInfo pageInfo = (PageInfo) ParameterWrapper.getWrapper().get("com.huxg.taglib.PageSplitTag");

			// 取得总页数
			int totalPageCount;
			if (pageInfo.getRowCount() % pageInfo.getPageSize() == 0)
				totalPageCount = pageInfo.getRowCount() / pageInfo.getPageSize();
			else
				totalPageCount = pageInfo.getRowCount() / pageInfo.getPageSize() + 1;

			int currentPage = pageInfo.getCurrentPageIndex();

			if (totalPageCount > 1) {
				if (this.style == 1) {
					printStaticPageSplit(sb, pageInfo, currentPage);
				} else if (this.style == 2) {
					printScrollDownPageSplit(sb, pageInfo);
				}
			}

			pageContext.getOut().write(sb.toString());
		} catch (Exception e) {
			log.error(e);
		}
		return EVAL_PAGE;
	}

	public void printScrollDownPageSplit(StringBuffer sb, PageInfo pageInfo) {
		sb.append("<script type=\"text/javascript\">\n");
		sb.append(" $(document).ready(function(){    \n");
		sb.append("		var _loading_page_ = false;\n");
		sb.append("		var _current_page_ = 1;\n");
		int totalPage = pageInfo.getRowCount() / 20 + (pageInfo.getRowCount() % 20 == 0 ? 0 : 1);
		sb.append("		_total_page_ = " + totalPage + ";\n");
		sb.append("		$(window).scroll(function () {\n");
		sb.append("			$(\"#_loading_page_\").remove();\n");
		sb.append("			if (_total_page_ <= _current_page_){return;}\n");

		sb.append("			var bodyHeight = $(document.body).height();\n");
		sb.append("			var scrollTop = $(window).scrollTop();\n");
		sb.append("			var wheight = $(\"#" + this.renderTo + "\").height();\n");
		sb.append("			var wtop = $(\"#" + this.renderTo + "\").offset().top;\n");
		sb.append("			if ((bodyHeight + scrollTop) >= (wtop + wheight)){\n");
		sb.append("				if(_loading_page_ == false){\n");
		sb.append("					$(\"#" + this.renderTo + "\").append(\"<div id='_loading_page_' class='scrolldown_loading'></div>\");\n");
		sb.append("					$(\"#_loading_page_\").html(\"正在加载，请稍后。。。\");\n");
		sb.append("					var currentStart = _current_page_ * 20 + 1;\n");
		sb.append("						_current_page_ = _current_page_ + 1;\n");

		String s = this.link;
		sb.append("					ajax_append_html(\"" + s + "&start=\" + currentStart,\"" + this.renderTo + "\", function(result){\n");
		sb.append("						_loading_page_ = false;\n");
		sb.append("					});\n");
		sb.append("         	}\n");
		sb.append("         	_loading_page_ = true;\n");
		sb.append("     	};\n");
		sb.append(" 	});\n");

		sb.append("});\n");

		sb.append("\n");
		sb.append("</script>\n");
	}

	private void printStaticPageSplit(StringBuffer sb, PageInfo pageInfo, int currentPage) {
		sb.append("<script type=\"text/javascript\">\n");
		sb.append("");
		sb.append(" $(document).ready(function(){    \n");
		String ld = StringUtils.isEmpty(this.renderTo) ? "Pagination" : this.renderTo;
		sb.append("    $(\"#" + ld + "\").pager({\n");

		String cb = StringUtils.isEmpty(this.getCallback()) ? "mycallback" + Key.key() : this.getCallback();
		sb.append("        callback: " + cb + ",");
		sb.append("        pagesize:" + pageInfo.getPageSize() + ",");
		sb.append("        totalrecords:" + pageInfo.getRowCount() + ",");
		sb.append("        pageindex:" + (currentPage) + ",");
		sb.append("        listnum:4");
		sb.append("    });\n");
		sb.append("});\n");
		String s = this.link;
		
		if (s.contains("?"))
			s = s + "&";
		else
			s = s + "?";
		
		// 定义回调函数，通过Post方式向后台发送数据
		if (StringUtils.isEmpty(this.getCallback())) {
			sb.append("function " + cb + "(page_id){\n");
			if (StringUtils.isEmpty(formid)) {
				sb.append("    var nextStart = (page_id - 1) * " + pageInfo.getPageSize() + " ;\n");
				sb.append("window.location.assign(\"" + s + "start=\" + nextStart);");
				sb.append("return false;\n");
			} else {
				sb.append("    var nextStart = (page_id -1 ) * " + pageInfo.getPageSize() + " ;\n");
				sb.append("var fm = document.getElementById(\"" + this.formid + "\");");
				sb.append("fm.action = \"" + s + "start=\" + nextStart;");
				sb.append("fm.submit();");
				sb.append("return false;\n");
			}
			// }
			sb.append("}\n");
		}
		sb.append("\n");
		sb.append("</script>\n");
	}

	protected StringBuffer render(long totalPage, long currPage, StringBuffer realUrl, long total) throws JspException {
		return null;
	}

	@Override
	public void release() {
		link = null;
		// bindto = null;
		callback = null;
		renderTo = null;
		formid = null;
		style = 1;
		refreshFirstPage = true;
		super.release();
	}
}
