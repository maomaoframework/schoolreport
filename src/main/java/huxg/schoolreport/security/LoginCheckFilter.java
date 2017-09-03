package huxg.schoolreport.security;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;

import com.alibaba.fastjson.JSONObject;
import huxg.framework.security.LoginCheckConfiguration;
import huxg.framework.security.UserAuthentication;
import huxg.framework.util.StringUtils;

public class LoginCheckFilter implements Filter {

	private static final Logger logger = Logger.getLogger(LoginCheckFilter.class);
	// private List<String> filters = new ArrayList<String>();
	private String loginPage = "/login.html";

	public void destroy() {

	}

	@SuppressWarnings("unchecked")
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
		HttpServletRequest httpRequest = (HttpServletRequest) request;
		HttpServletResponse httpResponse = (HttpServletResponse) response;
		HttpSession session = httpRequest.getSession();

		// 开始检查用户cookie中是否包含登录信息
		JSONObject user = (JSONObject) session.getAttribute("SESSION_User");

		// 如果用户是空，保存的用户id非空，则尝试从cookie中读取
		httpRequest.setCharacterEncoding("UTF-8");
		// String requestPath = httpRequest.getRequestURI();
		String filterPath = httpRequest.getRequestURI();

		// 判断filterPath是否在登录列表中，同时还要判定当前用户是否已经登录
		String queryString = httpRequest.getQueryString();
		if (!StringUtils.isEmpty(queryString)) {
			filterPath += "?" + queryString;
		}

		if (requireLogin(filterPath, request)) {
			RequestDispatcher dispatcher = httpRequest.getRequestDispatcher(loginPage);
			dispatcher.forward(httpRequest, httpResponse);
		} else {
			chain.doFilter(request, response);
		}
	}

	/**
	 * 判断是否需要登录
	 * 
	 * @return
	 */
	public boolean requireLogin(String path, ServletRequest request) {
		LoginCheckConfiguration checker = LoginCheckConfiguration.getInstance();
		if (checker.exclude(path)) {
			return false;
		}

		if (checker.include(path)) {
			HttpSession session = ((HttpServletRequest) request).getSession();
			if (null == session)
				return true;

			if (!UserAuthentication.isLogin(session))
				return true;
			else {
				return false;
			}
		}
		return false;

	}

	public void init(FilterConfig config) throws ServletException {
		if (config.getInitParameter("loginpage") != null)
			loginPage = config.getInitParameter("loginpage");
	}

}