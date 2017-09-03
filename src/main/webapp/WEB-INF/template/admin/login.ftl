
[#assign ui=JspTaglibs["/WEB-INF/classes/tld/ui.tld"] /]

[#if LOGIN_USER??]
	[@c.redirect url="/ucenter">[@/redirect]
[/#if]
[@ui.page bodyClass="login"]
	<link href="${static_server}/themes/metro/css/login.css" rel="stylesheet" type="text/css"/>
	<div class="logo">
		<img src="${static_server}/themes/metro/image/logo-big.png" alt="" /> 
	</div>

	<div class="content">
		<!-- BEGIN LOGIN FORM -->
		<form class="form-vertical login-form" id="login-form">
			<h3 class="form-title">用户登录</h3>
			<div class="alert alert-error hide">
				<button class="close" data-dismiss="alert"></button>
				<span>请输入用户名和密码</span>
			</div>

			<div class="control-group">
				<!--ie8, ie9 does not support html5 placeholder, so we just show field title for that-->
				<label class="control-label visible-ie8 visible-ie9">用户名</label>
				<div class="controls">
					<div class="input-icon left">
						<i class="icon-user"></i>
						<input class="m-wrap placeholder-no-fix" type="text" placeholder="账号" class="bar validate[required]" maxlength="20" name="username" value="xm"/>
					</div>
				</div>
			</div>

			<div class="control-group">
				<label class="control-label visible-ie8 visible-ie9">Password</label>
				<div class="controls">
					<div class="input-icon left">
						<i class="icon-lock"></i>
						<input class="m-wrap placeholder-no-fix" type="password" placeholder="密码" class="bar validate[required]" maxlength="20"  name="password" value="888888"/>
					</div>
				</div>
			</div>

			<div class="form-actions">
				<label class="checkbox">
					<input type="checkbox" id="rememberCheck" name="rememberCheck" value="1"/>下次记住我
				</label>

				<button type="submit" class="btn green pull-right">
					登录 <i class="m-icon-swapright m-icon-white"></i>
				</button>            
			</div>

			<div class="forget-password">
				<h4><a href="/forgetpwd">忘记密码 ?</h4></h4>
				<p>您遇到任何问题，可以直接拨打我们的24小时客服电话18500431276咨询.</p>
			</div>
		</form>
	</div>
	<div class="copyright">${setting("footer.copyright")}</div>
[/@ui.page]

<script src="${static_server}/themes/metro/js/jquery.validate.min.js" type="text/javascript"></script>
<script>
jQuery(document).ready(function() {     
	Front.Public.initLoginButton();
});

var Login = function () {
    return {
        //main function to initiate the module
        init: function () {
           $('.login-form').validate({
	            errorElement: 'label', //default input error message container
	            errorClass: 'help-inline', // default input error message class
	            focusInvalid: false, // do not focus the last invalid input
	            rules: {
	                username: {
	                    required: true
	                },
	                password: {
	                    required: true
	                },
	                remember: {
	                    required: false
	                }
	            },
	            messages: {
	                username: {
	                    required: "账号不能空白."
	                },
	                password: {
	                    required: "密码不能空白."
	                }
	            },

	            invalidHandler: function (event, validator) { //display error alert on form submit   
	                $('.alert-error', $('.login-form')).show();
	            },

	            highlight: function (element) { // hightlight error inputs
	                $(element).closest('.control-group').addClass('error'); // set error class to the control group
	            },

	            success: function (label) {
	                label.closest('.control-group').removeClass('error');
	                label.remove();
	            },

	            errorPlacement: function (error, element) {
	                error.addClass('help-small no-left-padding').insertAfter(element.closest('.input-icon'));
	            },

	            submitHandler: function (form) {
	            	Login.doLogin();
	            	return false;
	            }
	        });

	        $('.login-form input').keypress(function (e) {
	            if (e.which == 13) {
	                if ($('.login-form').validate().form()) {
	                	submitForm();
	                }
	                return false;
	            }
	        });
        },
        doLogin:function (){
        	Submit.submitForm("/login/login", "login-form",function(result){
				if(result.success == false){
					var v = $('.alert-error', $('.login-form'));
					v.html(result.msg);
					$('.alert-error', $('.login-form')).show();
					return;
				} else{
					var expiresDate = new Date();
		        	expiresDate.setTime(expiresDate.getTime() + 60 * 60 * 1000 * 24 * 365);
					jQuery.cookie(result.bp, result.ce,{ expires: expiresDate , path: '/',domain:'.' + document.domain });
					var url = result.rdp+"?uid="+result.uid;
					window.location.assign(url);
				}
			},false);
        }
        
    };

}();
</script>