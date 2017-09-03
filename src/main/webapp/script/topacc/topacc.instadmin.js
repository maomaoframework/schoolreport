act = Utils.getAction();
$("a[href='/instadmin/" + act + "']").parent().addClass("current");
$("a[href='/instadmin/" + act + "']").addClass("current");

// 对radio进行处理
$(document).on("click","a.a_radio",function(){
	   var v = $(this).attr("data-value");
	   $(this).addClass("checked").siblings(".a_radio").removeClass("checked");
	   $(this).parent().children("input").val(v);
 })
 
var instadmin = function (){
	return {
		index : function(){
			instadmin.index_home();
		},
		
		/**
		 * 首页面
		 */
		index_home:function(){
			$(".btn-remove-goods").click(function(){
				dataid = $(this).attr("data-id");
				Dialog.showConfirmDialog('删除后不可恢复，你是否确定删除此商品？', function(){
					Utils.assertInslogin();
					Request.invok('/instadmin/goods_delete?gid=' + dataid ,  function(){
						window.location.reload(true);
					});
				});
			});
			
			// 状态改变时触发
			$(".status-change").click(function(){
	  			Utils.assertInslogin();
          		if (window.confirm("确定要执行此操作吗？")) {
          			ts = $(this);
              		gid = ts.parent().parent().attr("data-id");
              		flag = ts.attr("data-value");
              		Request.invok('/instadmin/goods_status_change?gid=' + gid + "&status=" + flag, function(result){
              			if (result.success === true) {
              				window.location.reload(true);
              			} else {
              				Dialog.showErrorMessage(result.msg);
              			}
              		});          			
          		}
          	});
			
	  		$(".create-new-onlinegoods").click(function(){
          		// 代售网络课程	
          		Dialog.showDialog('/instadmin/goods_edit_online', '代售平台网络课程');
          	});
	  		
          	$(".goods-edit,.create-new-goods").click(function(){
          		Utils.assertInslogin();
          		gid = $(this).attr("data-value");
          		if (gid.length > 0) {
          			window.location.assign('/instadmin/goods_edit?id=' + gid);
          		} else {
          			window.location.assign('/instadmin/goods_edit');
          		}
          	});
		},
		goods_edit : function (){
			PlanEditor.init(jsonPlans);
		}
	};
}();


/**
 * 教学计划日历
 */
var PlanCalendar = function() {
	return {
		month_go : function(ts){
			dv = $(ts).attr("data-value");
			current = $(ts).parent().attr("data-value");
			Request.fill('/instadmin/plan_month?current=' + current + '&step=' + dv ,'my_course_calendar', false, function(){
				PlanCalendar.refreshCalendar();
			});
		},
		
		/**
		 * 刷新日历
		 */
		refreshCalendar : function() {
			// 用当前设置的教学计划，填充日历表格
			// 遍历每一天，同时设置样式
			var tds = $(".calendar_rili td");
			$.each(tds, function(index, element){
				if (typeof($(element).attr("id")) != "undefined") {
					elid = $(element).attr("id");
					
					// 遍历当前已经设置的计划
					if (PlanEditor.plans.length > 0){
						$.each(PlanEditor.plans, function(index,elplan){
							if (elplan.plan_date == elid) {
								// 显示到格子上去
								PlanEditor.showOnCell(elplan);
							}
						});
					}
				}
			});
		},
		onCellMouseOver : function(ts){
			$(ts).css("background-color", "#F7F7F7");
		},
		onCellMouseOut : function(ts){
			$(ts).css("background-color", "#FFFFFF");
		},
		onCellClick : function(ts){
			var planItems = $(ts).find(".plan_item");
			if (planItems.length == 0) {
				PlanEditor.add($(ts).find("span"));
			}
		}
		
	};
}();

/**
 * 教学计划的颜色
 */
var PlanColor = function() {
	return {
		colors : ["rgb(255, 184, 72)", "rgb(133, 43, 153)", "rgb(53, 170, 71)", "#69a4e0", "rgb(85, 85, 85)", "rgb(224, 34, 34)", "#4b8df8" ],
		itemcolor:[],
		/**
		 * 得到一种颜色
		 */
		getColor : function(content,thisplan){
			var thiscolor = null;
			for (i = 0; i < this.itemcolor.length ; i ++){
				if (this.itemcolor[i].chapterid == thisplan.chapterid) {
					thiscolor = this.itemcolor[i];
					break;
				}
			}
			
			// 不存在
			if (thiscolor == null) {
				thiscolor = {};
				thiscolor.chapterid = thisplan.chapterid;
				thiscolor.chaptername = this.parseCategoryName(thisplan.chaptername);
				thiscolor.color = this._getcolor_(content);
				this.itemcolor.push(thiscolor);
			}
			return thiscolor;
		},
		
		_getcolor_ :function(content){
			var len = this.itemcolor.length;
			if (len == 0) {
				return this.colors[0];					
			}
			else if (len < 6) {
				return this.colors[len + 1];
			} else {
				return this.colors[len % 6];
			};
		}, 
		
		parseCategoryName : function(str){
			// 去掉数字、去掉括号
			var b = str.replace(/\d+/g,'')
			b = b.replace("会计", "");
			// 清除掉括号及其中的内容
			return b;
		}
	};
}();

/**
 * 编辑器
 */
var PlanEditor = function() {
	return {
		plans: new Array(),
		currentPlan : null,
		currentTd : null,
		_total_index_ : 0,
		init : function(_plans_) {
			this.plans = _plans_;
		},
		
		initPlanId : function () {
			this.currentPlan["plan_id"] = "plan_id_" + (++ this._total_index_);
		},
		
		/**
		 * 选择资源
		 */
		chooseResource : function(li){
			ckbox = $(li).parent().children("input");
			var isChecked = ckbox.is(":checked");
			if (isChecked == true) {
				// 设置当前行颜色，同时将当前选中的资源添加到当前对象中
				$(li).parent().css("background-color", "");
				this.removeResource($(li).parent().attr("data-id"));
				ckbox.attr("checked", false);
				
				// 设置已选择的课程显示
				course_content = this.getCourseContent(this.currentPlan.resource_name);
				$(".alread_selected_course").html(course_content);
				
			} else {
				$(li).parent().css("background-color", "rgba(0, 158, 0, 0.24)");
				this.addResource($(li).parent().attr("data-id"));
				var data_category =  $(li).parent().attr("data-category");
				
				this.currentPlan["chapterid"] =  data_category;
				this.currentPlan["chaptername"] =  $(".category_tree_ul").find("li[data-id=" + data_category + "]").html();
				ckbox.attr("checked", true);
				
				// 设置已选择的课程显示
				course_content = this.getCourseContent(this.currentPlan.resource_name);
				$(".alread_selected_course").html(course_content);
			}
			//ckbox.click();
		}, 
		
		removeResource : function(resourceid){
			this.currentPlan["resource"].remove(resourceid);
			this.currentPlan["resource_name"].remove($(".category_list_ul li[data-id=" + resourceid + "]").children("span").html());
		},
		
		addResource : function(resourceid){
			this.currentPlan["resource"].push(resourceid);
			this.currentPlan["resource_name"].push($(".category_list_ul li[data-id=" + resourceid + "]").children("span").html());
		},
		
		/**
		 * 与编辑元素关联
		 */
		attachEditor : function(plan){
			// 上课时间
			var startHour = plan.beginTime;
			var pStart = startHour.split(":");
			$("select[name=NStartHour]").find("option[value='" + pStart[0] + "']").attr("selected",true);
			$("select[name=NStartMinute]").find("option[value='" + pStart[1] + "']").attr("selected",true);
			
			var endHour = plan.endTime;
			var pEnd = endHour.split(":");
			$("select[name=NEndHour]").find("option[value='" + pEnd[0] + "']").attr("selected",true);
			$("select[name=NEndMinute]").find("option[value='" + pEnd[1] + "']").attr("selected",true);
			
			// 主讲教师
			var pTeacherIds = plan.checkedTeacherIds.split(",");
			$.each(pTeacherIds, function(index, element){
				$(".techplan_edit_content input[value='" + element + "']").attr("checked", "true");	
			});
			
			// 刷新资源
			leftTreeUls = $(".category_tree_ul>li");
			leftTreeUls.removeClass("current");
			$(".category_tree_ul>li[data-id=" + plan.chapterid + "]").addClass("current");
			
			// 设置已选择的课程显示
			course_content = this.getCourseContent(plan.resource_name);
			$(".alread_selected_course").html(course_content);
			
			//chooseCategory($(".category_tree_ul>li[data-id=" + plan.chapterid + "]").get(0));
			
			// 设置选择
			var allSelectedResources = this.currentPlan.resource;
			Request.invok('/resource/category/' + plan.chapterid, function(result){
				if (result.success == true) {
					if (result.type == 'chapter') {
						var vhtml = "";
						$.each(result.chapters, function(index, el){
							var isSelected = false;
							for (i = 0 ; i < allSelectedResources.length; i ++) {
								if (el.CId == allSelectedResources[i]) {
									isSelected = true;
									break;
								}
							}
							
							if (isSelected == true){
								vhtml += "<li data-id=\"" + el.CId + "\" data-category=\"" + plan.chapterid + "\" style=\"background-color: rgba(0, 158, 0, 0.239216);\"><input type=\"checkbox\" checked=\"true\" onclick=\"PlanEditor.onResourceCheckboxClick(this);\" style=\"border:0px;\"> <span onclick=\"PlanEditor.chooseResource(this);\">" + el.CName + "</span></li>";	
							} else {
								vhtml += "<li data-id=\"" + el.CId + "\" data-category=\"" + plan.chapterid + "\"><input type=\"checkbox\" onclick=\"PlanEditor.onResourceCheckboxClick(this);\" style=\"border:0px;\"> <span onclick=\"PlanEditor.chooseResource(this);\">" + el.CName + "</span></li>";
							}
							
						});
						$(".category_list_ul").html(vhtml);
					} else if (result.type == 'videos'){
						
					}
				}
			});
		},
		
		/**
		 * 取得计划
		 */ 
		getPlan : function (id) {
			var pickEl = null;
			$.each(this.plans,function(index,element) {
				if (element.plan_id == id) {
					pickEl = element;
				}
			});
			return pickEl;
		},
		
		/**
		 * 编辑计划
		 */
		edit : function(ts){
			var planid = $(ts).attr("id");
			this.currentPlan = this.getPlan(planid);
			this.currentTd = $(ts).parents("td").attr("id");
			var nr = document.getElementById("techplan_item").innerHTML; 
			dialog({
				fixed: true,
				title: this.currentPlan["beginTime"] + "-" + this.currentPlan["endTime"] + " 教学计划", 
				lock:true,
				backdropOpacity:0.3,
				content: nr,
				ok:function(){
					return PlanEditor.save(true);
				},
				okValue:"确定"
			}).showModal();
			
			PlanEditor.attachEditor(this.currentPlan);
			
			Utils.stopPropagation();
		},
		
		/**
		 * 添加一个计划时执行
		 */
		add :function(ts){
			this.currentPlan = {};
			this.initPlanId();
			this.currentPlan["resource"] = new Array();
			this.currentPlan["resource_name"] = new Array();
			this.currentPlan["plan_date"] = "";
			this.currentPlan["plan_date"] = "";
			this.currentTd = $(ts).parents("td").attr("id");
			
			var nr = document.getElementById("techplan_item").innerHTML; 
			dialog({
				fixed: true,
				title: $(ts).parents("td").attr("id") + " - 创建教学计划", 
				lock:true,
				backdropOpacity:0.3,
				content: nr,
				ok:function(){
					return PlanEditor.save(false);
				},
				okValue:"确定"
			}).showModal();
			
			// 初始化要添加的数据，如果当前还没有添加过计划，则不执行，如果添加了计划，则按照上一次添加的计划设置初始数据
			if (this.plans.length > 0) {
				lastPlan = this.plans[this.plans.length - 1];
				this.currentPlan["beginTime"] =  lastPlan.beginTime;
				this.currentPlan["endTime"] =  lastPlan.endTime;
				this.currentPlan["chapterid"] = lastPlan.chapterid;
				this.currentPlan["chaptername"] = lastPlan.chaptername;
				this.currentPlan["checkedTeacherIds"] = lastPlan.checkedTeacherIds;
				PlanEditor.attachEditor(this.currentPlan);
			}
			Utils.stopPropagation();
		},
		
		/**
		 * 保存时执行
		 */
		save : function(isUpdate) {
			// 取得时间
			beginTime = $(".techplan_edit_content select[name=NStartHour]").val() + ":" + $(".techplan_edit_content select[name=NStartMinute]").val();
			endTime = $(".techplan_edit_content select[name=NEndHour]").val()  + ":" +  $(".techplan_edit_content select[name=NEndMinute]").val();
			
			this.currentPlan["beginTime"] = beginTime;
			this.currentPlan["endTime"] = endTime;
			
			// 主讲教师
			checkedTeachers = $(".techplan_edit_content>input[name=ckteacher]:checked");
			if (checkedTeachers.length == 0) {
				Dialog.showErrorMessage("请选择主讲教师");
				return false;
			}
			checkedTeachersids = "";
			$.each(checkedTeachers, function(index, el){
				if (checkedTeachersids == "")
					checkedTeachersids = $(el).val();
				else
					checkedTeachersids += "," + $(el).val();
			});
			
			if (checkedTeachersids.length == 0) {
				Dialog.showErrorMessage("请选择主讲教师");
				return false;			
			}
			this.currentPlan["checkedTeacherIds"] = checkedTeachersids;
			this.currentPlan["plan_date"] = this.currentTd;
			this.showOnCell(null, isUpdate);
			
			if (isUpdate == false) {
				this.plans.push(this.currentPlan);
			}
			this.currentPlan = {};
			return true;
		},
		
		/**
		 * 在格子中显示
		 */
		showOnCell : function(plan, isUpdate){
			if (typeof(plan) != "undefined" && plan != null) {
				var courseContent = $("#" + plan.plan_date).find(".fc-day-content");
				var thiscolor = PlanColor.getColor(courseContent, plan);
				// 上课时间
				var course_time =  plan.beginTime + "-" + plan.endTime;
				
				// 遍历教师
				var course_teachers = this.getTeacherName(plan.checkedTeacherIds) ;
				
				// 取得课程内容
				var course_content = this.getCourseContent(plan.resource_name);
				
				var vhtml = '<div class=\"plan_item\" onmouseover=\"PlanEditor.showTips(this);\" onmouseout=\"PlanEditor.hideTips(this);\" onclick=\"PlanEditor.edit(this);\" id="' + plan.plan_id + '" style="position: relative; height: 21px;background-color:' + thiscolor.color + '"><label style="margin: 0px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;width: 100px;display: inline-block;">' + course_time + " " + thiscolor.chaptername + '</label><div class="tips" style="width: 320px;word-wrap: break-word;white-space: normal;word-break: break-all;"><em style="" onclick="PlanEditor.removePlan(this);">删除</em><br/>上课时间：' + course_time + '<br/>主讲教师：' + course_teachers + '<br/>课程内容：' + course_content + '</div></div>';
				
				if (typeof(isUpdate) != "undefined" && isUpdate == true) {
					// 执行更新操作
					$(vhtml).insertBefore("#" + plan.plan_id);
				} else {
					courseContent.append($(vhtml));
				}
			} else {
				var courseContent = $("#" + this.currentTd).find(".fc-day-content");
				var thiscolor = PlanColor.getColor(courseContent, PlanEditor.currentPlan);
				// 上课时间
				var course_time =  this.currentPlan["beginTime"] + "-" + this.currentPlan["endTime"];
				
				// 遍历教师
				var course_teachers = this.getTeacherName() ;
				
				// 取得课程内容
				var course_content = this.getCourseContent();
				
				var vhtml = '<div class=\"plan_item\" onmouseover=\"PlanEditor.showTips(this);\" onmouseout=\"PlanEditor.hideTips(this);\" onclick=\"PlanEditor.edit(this);\" id="' + this.currentPlan.plan_id + '" style="position: relative; height: 21px;background-color:' + thiscolor.color + '" ><label style="margin: 0px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;width: 100px;display: inline-block;">' + course_time + " " + thiscolor.chaptername + '</label><div class="tips" style="width: 320px;word-wrap: break-word;white-space: normal;word-break: break-all;"><em style="" onclick="PlanEditor.removePlan(this);">删除</em><br/>上课时间：' + course_time + '<br/>主讲教师：' + course_teachers + '<br/>课程内容：' + course_content + '</div></div>';
				
				if (typeof(isUpdate) != "undefined" && isUpdate == true) {
					// 执行更新操作
					var thisDiv = $("#" + this.currentPlan.plan_id);
					var vparent = thisDiv.parent();
					var childrenDv = vparent.children();
					
					if (childrenDv.length == 1) {
						thisDiv.remove();
						courseContent.append($(vhtml));
					} else {
						$(vhtml).insertBefore(thisDiv);
						thisDiv.remove();
					}
				} else {
					courseContent.append($(vhtml));
				}
				
			}
		},
		
		getCourseContent : function(resourcename){
			if (typeof(resourcename) == "undefined") {
				return this.currentPlan.resource_name.join("，");	
			} else {
				return resourcename.join("，");	
			}
			
		},
		getTeacherName : function (teacherIds){
			if (typeof(teacherIds) == "undefined") {
				var s = "";
				var p = this.currentPlan.checkedTeacherIds.split(",");
				if (p.length > 0) {
					for (i = 0; i < p.length ; i ++) {
						if (s.length == 0)
							s = p[i].split("_")[1];
						else
							s += "," + p[i].split("_")[1]; 
					}
				}
				return s;
			} else {
				var s = "";
				var p = teacherIds.split(",");
				if (p.length > 0) {
					for (i = 0; i < p.length ; i ++) {
						if (s.length == 0)
							s = p[i].split("_")[1];
						else
							s += "," + p[i].split("_")[1]; 
					}
				}
				return s;
			}
		},
		/**
		 * 鼠标放上显示提示
		 */
		showTips : function(ts){
			var tips = $(ts).children(".tips");
			if (tips.length > 0) {
				if (!tips.is(":visible")) {
					tips.show();
				}
			} 
		},
		
		/**
		 * 鼠标移开，提示消失
		 */
		hideTips : function(ts) {
			var tips = $(ts).children(".tips");
			if (tips.length > 0) {
				if (tips.is(":visible"))
					tips.hide();
			} 
		},
		onCategoryClick : function(ts){
			var data_id = $(ts).attr("data-id");
			
			// 刷新资源
			leftTreeUls = $(".category_tree_ul>li");
			leftTreeUls.removeClass("current");
			$(ts).addClass("current");
			
			Request.invok('/resource/category/' + data_id, function(result){
				$(".category_list_ul").html("");
				if (result.success == true) {
					if (result.type == 'chapter') {
						var vhtml = "";
						$.each(result.chapters, function(index, el){
							vhtml += "<li data-id=\"" + el.CId + "\" data-category=\"" + data_id + "\"><input type=\"checkbox\" onclick=\"PlanEditor.onResourceCheckboxClick(this);\" style=\"border:0px;\"> <span onclick=\"PlanEditor.chooseResource(this);\">" + el.CName + "</span></li>";
						});
						$(".category_list_ul").html(vhtml);
					} else if (result.type == 'videos'){
						
					}
				}
			});
		},
		
		/**
		 * 点选资源前面的checkbox
		 */
		onResourceCheckboxClick :function (ts){
			var isChecked = $(ts).is(":checked");
			if (isChecked == true) {
				// 设置当前行颜色，同时将当前选中的资源添加到当前对象中
				$(ts).parent().css("background-color", "rgba(0, 158, 0, 0.24)");
				PlanEditor.addResource($(ts).parent().attr("data-id"));
				PlanEditor.currentPlan["chapterid"] =  $(ts).parent().attr("data-category");
				PlanEditor.currentPlan["chaptername"] =  $(".category_tree_ul").find("li[data-id=" + PlanEditor.currentPlan.chapterid + "]").html();
				
				// 设置已选择的课程显示
				course_content = this.getCourseContent(this.currentPlan.resource_name);
				$(".alread_selected_course").html(course_content);
			} else {
				$(ts).parent().css("background-color", "");
				PlanEditor.removeResource($(ts).parent().attr("data-id"));
				
				// 设置已选择的课程显示
				course_content = this.getCourseContent(this.currentPlan.resource_name);
				$(".alread_selected_course").html(course_content);
			}
		},
		
		/**
		 * 删除教学计划
		 */
		removePlan : function (ts) {
			var planid = $(ts).parent().parent().attr("id");
			$("#" + planid).remove();
			
			var thisplan = this.getPlan(planid);
			this.plans.remove(thisplan);
			Utils.stopPropagation();
		},
		
		/**
		 * 点击教师姓名label触发事件
		 */
		onTeacherNameLabelClick : function (ts){
			var ckbox = $(ts).prev();
			ckbox.click();
		}
	};
}();

/**
 * 编辑器
 */
var GoodsEditPage = function() {
	return {
		/**
		 * 提交商品
		 */
		onSubmitButtonClick : function (){
			
			Utils.assertInslogin();
			
			if ($("input[name='g.NTechMethod']").attr("value").length == 0) {
				Dialog.showErrorMessage("请选择授课方式");
				/* $("#course-techmethod").addClass("bb"); */
				/* window.location.hash = "#course-techmethod";  */ 
				return false;
			}else {
				$("#course-techmethod").removeClass("bb");
			}
			
			//商品名称
			if ($("input[name='g.CName']").attr("value").length == 0) {
				Dialog.showErrorMessage("请填写商品名称");
				/* $("#course-techmethod").addClass("bb"); */
				/* window.location.hash = "#CName";   */
				return false;
			}else {
				$("#course-techmethod").removeClass("bb");
			}
			
			// 课程图片
			if ($("#CPicPath").attr("value").length == 0) {
				Dialog.showErrorMessage("您必须上传商品首图");
				return false;
			}else {
				$("#tr_goodspic").removeClass("bb");
			}
			
			if ($("input[name='g.NSupportJgyhq']").attr("value").length == 0) {
				Dialog.showErrorMessage("请选择是否可用优惠券");
				return false;
			}else {
				var v = $("#course-coupon").find("a[class=checked]").attr("data-value");
				$("input[name='g.NSupportJgyhq']").attr("value",v);
			}
			
			if ($("input[name='intro.CSuitPeople']").attr("value").length >100) {
				Dialog.showErrorMessage("适用群体不要超过100个字符");
				return false;
			}else {
				$("#course_CSuitPeople").removeClass("bb");
			}
			
			if ($("input[name=beginYear]").attr("value").length == 0 ||
					$("input[name=beginMonth]").attr("value").length == 0 ||
					$("input[name=beginDay]").attr("value").length == 0){
				$("#tr_goodsdate").focus();
				Dialog.showErrorMessage("请选择课程开始时间");
				return false;
			} else{
				$("#tr_goodsdate").removeClass("bb");
			}
			
			if ($("input[name=endYear]").attr("value").length == 0 ||
					$("input[name=endMonth]").attr("value").length == 0 ||
					$("input[name=endDay]").attr("value").length == 0){
				Dialog.showErrorMessage("请选择课程结束时间");
				return false;
			} else {
				$("#tr_goodsdate").removeClass("bb");
			}
			
			//主讲教师
			var ck_teacher = $("input[name=ckteacher]:checked");
			if(ck_teacher.length >0){
				var ts = "";
				ck_teacher.each(function(){
					ts +=$(this).attr("data-ck")+",";
				});
				$("#teacherId").val(ts);
			}else{
				Dialog.showErrorMessage("请选择主讲教师");
				return false;
			}
			
			// 开始日期
			beginDate = $("input[name=beginYear]").attr("value") + "-" + $("input[name=beginMonth]").attr("value") + "-" + $("input[name=beginDay]").attr("value");
			$("#DBeginDate").attr("value", beginDate);
			
			// 结束日期
			endDate = $("input[name=endYear]").attr("value") + "-" + $("input[name=endMonth]").attr("value") + "-" + $("input[name=endDay]").attr("value");
			$("#DEndDate").attr("value", endDate);
			
			// 检查开始日期是否大于结束日期，日期是否合法
			d1 = beginDate.toDate();
			d2 = endDate.toDate();
			if(d1 > d2) {
				Dialog.showErrorMessage("课程时间填写有误，结束时间不能小于开始时间");
				return false;
			} else {
				$("#tr_goodsdate").removeClass("bb");
			}
			
			// 所在位置
			loc = $("input[name=courseLocation]").attr("value");
			if (loc == "__") {
				Dialog.showErrorMessage("请选择上课地点（可在校区管理中添加）");
				return false;
			} else {
				$("#tr_location").removeClass("bb");
			}
			
			if (loc.length > 0) {
				p = loc.split("_");
				$("#CLocation").attr("value",p[0]);
				$("#CLocLon").attr("value" , p[1]);
				$("#CLocLat").attr("value",  p[2]);
			}
			
			yj = $("input[name='g.NOriginalPrice']").attr("value");
			yhhjg = $("input[name='g.NRealPrice']").attr("value");
			
			if (yj.length > 0 && yhhjg.length > 0) {
				try{
					i1 = parseInt(yj);
					i2 = parseInt(yhhjg);
					if (i2 > i1 ) {
						Dialog.showErrorMessage("优惠后价格不能大于原价");
						return  false;
					}
				}catch(exception){}
			}
			
			var ck_teacher = $("input[name=ckteacher]:checked");
			if(ck_teacher.length >0){
				var ts = "";
				ck_teacher.each(function(){
					ts +=$(this).attr("data-ck")+",";
				});
				$("#teacherId").val(ts);
			}else{
				Dialog.showErrorMessage("请选择主讲教师");
				return false;
			}
			
			$("input[name=techplan]").attr("value",encodeURIComponent(encodeURIComponent(JSON.stringify(PlanEditor.plans))));
			
			Request.submit('/instadmin/goods_update', 'form-goods' , function(resultdata, textStatus){
				if (resultdata.success == true) {
					$(".ui-dialog-close").click();
				
					// 刷新页面
					window.location.assign("/instadmin/goods_list");
				} else {
					Dialog.showErrorMessage(resultdata.msg);
				}
			});
		}
	};
}();

