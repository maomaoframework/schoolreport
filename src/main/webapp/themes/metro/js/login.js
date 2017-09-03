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
					window.location.assign("/ucenter");
				}
			},false);
        }
        
    };

}();