package huxg.schoolreport.taglib;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.tagext.BodyTagSupport;

import huxg.framework.util.StringUtils;

@SuppressWarnings("serial")
public class HtmlFormat extends BodyTagSupport {
	private String html;
	private int length = -1;
	private String ellipsis = "true";

	public String getHtml() {
		return html;
	}

	public void setHtml(String html) {
		this.html = html;
	}

	public String getEllipsis() {
		return ellipsis;
	}

	public void setEllipsis(String ellipsis) {
		this.ellipsis = ellipsis;
	}

	@Override
	public void release() {
		super.release();
		html = null;
		length = -1;
	}

	public int getLength() {
		return length;
	}

	public void setLength(int length) {
		this.length = length;
	}

	@Override
	public int doEndTag() throws JspException {
		try {
			if (!StringUtils.isEmpty(html)) {
				String s = delHTMLTag(html);
				if (length > 0) {
					if (length >= s.length())
						length = s.length();

					if ("true".equals(ellipsis))
						s = s.substring(0, length) + "...";
					else
						s = s.substring(0, length);
				}
				pageContext.getOut().println(s);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return EVAL_PAGE;
	}

	private static final String regEx_script = "<script[^>]*?>[\\s\\S]*?<\\/script>"; // 定义script的正则表达式
	private static final String regEx_style = "<style[^>]*?>[\\s\\S]*?<\\/style>"; // 定义style的正则表达式
	private static final String regEx_html = "<[^>]+>"; // 定义HTML标签的正则表达式

	public static String delHTMLTag(String htmlStr) {
		Pattern p_script = Pattern.compile(regEx_script, Pattern.CASE_INSENSITIVE);
		Matcher m_script = p_script.matcher(htmlStr);
		htmlStr = m_script.replaceAll(""); // 过滤script标签

		Pattern p_style = Pattern.compile(regEx_style, Pattern.CASE_INSENSITIVE);
		Matcher m_style = p_style.matcher(htmlStr);
		htmlStr = m_style.replaceAll(""); // 过滤style标签

		Pattern p_html = Pattern.compile(regEx_html, Pattern.CASE_INSENSITIVE);
		Matcher m_html = p_html.matcher(htmlStr);
		htmlStr = m_html.replaceAll(""); // 过滤html标签

		return htmlStr.trim(); // 返回文本字符串
	}

	public static String delHTMLTag(String htmlStr, int len, boolean ellipsis) {
		String s = htmlStr;
		if (!StringUtils.isEmpty(htmlStr)) {
			s = delHTMLTag(htmlStr);
			if (len > 0) {
				if (len >= s.length())
					len = s.length();

				if (ellipsis)
					s = s.substring(0, len) + "...";
				else
					s = s.substring(0, len);
			}
		}
		return s;
	}
}
