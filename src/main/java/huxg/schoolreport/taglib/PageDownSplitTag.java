package huxg.schoolreport.taglib;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.tagext.BodyTagSupport;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import huxg.framework.PageInfo;
import huxg.framework.filter.parameter.ParameterWrapper;

/**
 * 分页标签
 * 
 * @author huxg
 * 
 */
public class PageDownSplitTag extends BodyTagSupport {

	private static final long serialVersionUID = 1L;

	private static final Log log = LogFactory.getLog(PageDownSplitTag.class);

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	@Override
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

			printPageSplit(sb, pageInfo, currentPage);

			pageContext.getOut().println(sb.toString());
		} catch (Exception e) {
			e.printStackTrace();
			log.error(e);
		}
		return EVAL_PAGE;
	}

	public void printPageSplit(StringBuffer sb, PageInfo pageInfo, int currentPage) {
		sb.append("<script type=\"text/javascript\">\n");
		int totalPage = pageInfo.getRowCount() / pageInfo.getPageSize() + (pageInfo.getRowCount() % pageInfo.getPageSize() == 0 ? 0 : 1);
		sb.append("if (typeof window._total_page_ === 'undefined' || window._total_page_ == null) {");
		sb.append("		window._total_page_ = " + totalPage + ";\n");
		sb.append("		window._page_size_ = " + pageInfo.getPageSize() + ";\n");
		sb.append("} ");
		sb.append("\n");
		sb.append("</script>\n");
	}

	protected StringBuffer render(long totalPage, long currPage, StringBuffer realUrl, long total) throws JspException {
		return null;
	}

	@Override
	public void release() {
		super.release();
	}

}
