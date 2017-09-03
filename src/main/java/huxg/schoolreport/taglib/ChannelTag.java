package huxg.schoolreport.taglib;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.tagext.TagSupport;

import huxg.framework.util.SpringUtils;

/**
 * 文章列表标签
 */

public class ChannelTag extends TagSupport {
	private String channelid;
	private String var;

	public String getVar() {
		return var;
	}

	public void setVar(String var) {
		this.var = var;
	}

	public String getChannelid() {
		return channelid;
	}

	public void setChannelid(String channelid) {
		this.channelid = channelid;
	}

	@Override
	public int doStartTag() throws JspException {
		// 执行查询
//		CMSService cmsService = (CMSService) SpringUtils.getBean("CMSServiceImpl");
//		CmsChannel channel = cmsService.getChannelById(channelid);
//
//		pageContext.setAttribute(var, channel);

		// 执行查询
		return TagSupport.EVAL_BODY_INCLUDE;
	}

	@Override
	public int doAfterBody() throws JspException {
		pageContext.removeAttribute(var);
		return TagSupport.SKIP_BODY;
	}

	@Override
	public void release() {
		super.release();
		channelid = "";
		var = "";
	}
}
