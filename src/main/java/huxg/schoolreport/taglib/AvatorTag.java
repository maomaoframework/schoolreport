package huxg.schoolreport.taglib;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.tagext.BodyTagSupport;

import huxg.framework.config.SysConfiguration;

/**
 * 显示用户头像
 */

public class AvatorTag extends BodyTagSupport {
	private String userid;

	public String getUserid() {
		return userid;
	}

	public void setUserid(String userid) {
		this.userid = userid;
	}

	@Override
	public int doEndTag() throws JspException {
//		try {
//			User user = getUser();
//
//			String html = "";
//			if (user == null) {
//				html = printBlankAvatorUrl();
//			} else {
//
//				String imgUrl = user.getCPhoto();
//
//				if (StringUtils.isEmpty(imgUrl)) {
//					html = printBlankAvatorUrl();
//				} else {
//					html = printAvatorUrl(imgUrl);
//				}
//			}
//
//			pageContext.getOut().println(html);
//		} catch (Exception e) {
//			e.printStackTrace();
//		} finally {
//			release();
//		}
		return EVAL_PAGE;
	}

	// private User getUser() {
	// String userid = this.getUserid();
	// User user = null;
	// if (StringUtils.isEmpty(userid)) {
	// HttpServletRequest request = ParameterWrapper.getWrapper().getRequest();
	// User u = LMSUserAuthentication.getLoginUserInfo(request);
	// if (u == null)
	// return null;
	// }
	//
	// final String uid = userid;
	// JedisTemplate jedisTemplate = (JedisTemplate)
	// SpringUtils.getBean("jedisTemplate");
	// user = jedisTemplate.execute(new JedisAction<User>() {
	// @Override
	// public User action(Jedis jedis) {
	// String xml = jedis.hget(RedisDaoSupportImpl.POOL + "User", uid);
	// if (xml != null) {
	// XStream x = new XStream();
	// return (User) x.fromXML(xml);
	// }
	// return null;
	// }
	// });
	// return user;
	// }

	public void release() {
		super.release();
		userid = null;
	}

	private String printAvatorUrl(String url) {
		return url;
	}

	private String printBlankAvatorUrl() {
		return SysConfiguration.getProperty("system.static_server") + "/themes/images/ind_head_no.png";
	}
}
