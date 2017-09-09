package huxg.schoolreport.controller;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.thrift.TServiceClient;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSONObject;
import huxg.framework.filter.parameter.ParameterWrapper;
import huxg.framework.thrift.ThriftClientTemplate;
import huxg.framework.thrift.ThriftClientTemplate.ThriftAction;
import huxg.framework.util.JsonUtils;
import huxg.framework.util.StringUtils;
import huxg.framework.vo.Message;
import huxg.framework.web.controller.BaseController;

/**
 * 登录处理类 处理登录请求
 * 
 * @author apple
 * 
 */
@Controller("loginController")
@RequestMapping("/login")
public class LoginController extends BaseController {
	private static final String SESSION_KEY = "TXv8CYuoO0OCREMxPZ";

	@RequestMapping(value = "")
	public String login(ModelMap model, HttpServletRequest request) {
		return "/login";
	}

	@RequestMapping(value = "/mini")
	public String miniLogin(HttpServletRequest request) throws Exception {
		return "/front/miniLogin";
	}

	@RequestMapping(value = "/dologin")
	public @ResponseBody String login() throws Exception {
		String username = (String) getParameter("username");
		String password = (String) getParameter("password");

		if (StringUtils.isEmpty(username)) {
			return Message.errorMessage("账号不能为空");
		}
		if (StringUtils.isEmpty(password)) {
			return Message.errorMessage("密码不能为空");
		}

		if (isError())
			return Message.error();

		boolean pwdEncrypted = false;
		try {
			pwdEncrypted = Boolean.valueOf((String) getParameter("pwdEncrypted"));
		} catch (Exception e) {

		}

		HttpSession session = ParameterWrapper.getWrapper().getRequest().getSession();

		return login(username, password, "", pwdEncrypted, session, "");
	}

	public String login(final String username, final String password, final String verifycode,
			final boolean pwdEncrypted, HttpSession session, final String usertype) throws Exception {
		// try {
		// String result = thriftTemplate.execute("LoginService", new
		// ThriftAction() {
		// @Override
		// public String action(TServiceClient paymentService) throws Exception
		// {
		// return ((LoginService.Client) paymentService).login(username,
		// password, verifycode, pwdEncrypted, usertype);
		// }
		// });
		//
		// JSONObject jo = JsonUtils.String2JSONObject(result);
		//
		// JSONObject user = jo.getJSONObject("data");
		//
		// // 如果最终可以取到该用户信息
		// if (jo.getBoolean("success") == false) {
		// return Message.errorMessage("用户名或密码输入有误，请重新输入！");
		// }
		//
		// // 验证是否是机构用户登录
		// if (!StringUtils.isEmpty(usertype) && "ins".equals(usertype)) {
		// if ("admin".equals(user.getString("userType"))) {
		// return Message.errorMessage("用户名或密码输入有误，请重新输入！");
		// }
		// }
		//
		// // 更新session
		// session.setAttribute("SESSION_User", user);
		//
		// ParameterWrapper.getWrapper().getRequest().setAttribute("_yhbh_",
		// user.getString("id"));
		// return Message.okMessage(new String[] { "asdfsd", "zqccc", "rdp",
		// "uid", "u" },
		// new String[] { SESSION_KEY, user.getString("id"), "/admin",
		// user.getString("id"), user.toString() });
		// } catch (Exception e) {
		// // 返回错误
		// e.printStackTrace();
		// return Message.errorMessage("用户名或密码有误，请重试");
		// }
		return null;
	}

	@RequestMapping(value = "/logout")
	public @ResponseBody String logout() {
		return null;
	}

	@RequestMapping(value = "/islogin")
	public @ResponseBody String checkLogin() {
		return null;
	}

	/**
	 * 检查用户是否登录
	 * 
	 * @return
	 */
	public String islogin() {
		// User user = getLoginUserInfo();
		// if (user == null)
		// return errorJson();
		// else
		// return okJson();
		return null;
	}

	/**
	 * 检查用户是否登录
	 * 
	 * @return
	 */
	@RequestMapping(value = "/isInslogin")
	public @ResponseBody String isInslogin() {
		// User user = getLoginUserInfo();
		// return user != null && !StringUtils.isEmpty(user.getCInstId()) ?
		// okJson() : errorJson();
		return null;
	}
}
