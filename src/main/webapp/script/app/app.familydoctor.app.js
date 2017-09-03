var familydoctor = function() {
	return {
		validate : function(formid) {
			jQuery('#' + formid).validationEngine({
				showOneMessage: true,
				validationEventTrigger: ''
			});
			return $("#" + formid).validationEngine("validate");
		}
	};
}();