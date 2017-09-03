/*
**=======================================================================================
*文件上传处理类
*创建人：姜亚正
*日期：2012-8-1
**=======================================================================================
*/

var PLATFORM_ROOT_URL = "http://www.oedu.cc";
var FILESERVER_ROOT_URL = "http://media.oedu.cc";

//文件加入到上传队列中失败
function fileQueueError(file, errorCode, message) {
    try {
        var status = this.getStats();
        var queueErrors = status.queue_errors;
        var size = this.settings.file_size_limit; //获取设置的大小限制

        var successfulUploads = status.successful_uploads;
        var limit = this.settings.file_upload_limit - successfulUploads; //获取设置的选择数量限

        var errMsg;
        switch (errorCode) {
            case SWFUpload.QUEUE_ERROR.FILE_EXCEEDS_SIZE_LIMIT: //如果是大小限制
                errMsg = "文件 " + file.name + "  大小 " + UpLoadHandle.fileSize(file.size) + "\n";
                UpLoadHandle.errorMessage = UpLoadHandle.errorMessage || "";
                UpLoadHandle.errorMessage += errMsg;
                UpLoadHandle.queueErrors++;
                if (queueErrors == UpLoadHandle.queueErrors) {
                    var strFileSize = size;
                    if (size.indexOf("KB") != -1) {
                        size = size.replace(" ", "").replace("KB", "");
                        strFileSize = UpLoadHandle.fileSize(size * 1024);
                    } 
                    UpLoadHandle.errorMessage = "系统设置单文件最大不能超过" + strFileSize + "\n" +
												"您选择的下列文件大小超过" + strFileSize + "：\n" +
												UpLoadHandle.errorMessage;
                    UpLoadHandle.errorMessage = null;
                    //UpLoadHandle.queueErrors = 0;
                }
                break;
            case SWFUpload.QUEUE_ERROR.QUEUE_LIMIT_EXCEEDED: //如果是超出选择的数目限制
                if (successfulUploads == 0) {
                    alert("最多只能选择" + limit + "个文件，请重新选择！");
                }
                else if (successfulUploads == this.settings.file_upload_limit)//如果上传成功的数量==设置的最大数量
                {
                    alert("已经成功上传" + successfulUploads + "个文件，最多只能上传" + successfulUploads + "个文件，请确认！");
                }
                else {
                    alert("已经成功上传" + successfulUploads + "个文件，最多还能选择" + limit + "个文件，请重新选择！");
                }
                break;
            default:
                break;
        }
    }
    catch (ex) {
        this.debug(ex);
    }
}

//文件开始往服务端上传
function uploadStart(file) {
    var newfile = this.unescapeFilePostParams(file);
    this.addPostParam("ID", file.id);
    this.addPostParam("OrderIndex", file.index);
    if (UpLoadHandle.uploadBeginTime == null) {
        UpLoadHandle.uploadBeginTime = new Date();
    }
    UpLoadHandle.singleFileBeginTime = new Date();
}

//正在上传
function uploadProgress(file, complete, total) {
    try {
        UpLoadHandle.singleFiletimeSpan = UpLoadHandle.dateDiff('T', UpLoadHandle.singleFileBeginTime, UpLoadHandle.uploadNowTime); //获取时间间隔

        UpLoadHandle.uploadNowTime = new Date();
        timeSpan = UpLoadHandle.dateDiff('T', UpLoadHandle.uploadBeginTime, UpLoadHandle.uploadNowTime); //获取时间间隔

        var completeSizeTotal = 0;
        completeSizeTotal = UpLoadHandle.completeFileSize;
        completeSizeTotal += complete;

        UpLoadHandle.completeAllFileSize = UpLoadHandle.completeFileSize;
        UpLoadHandle.completeAllFileSize += complete

        var percent = Math.ceil((complete / total) * 100); // 单文件上传百分比
        var leftSizeTotal = UpLoadHandle.totalFileSize - completeSizeTotal; //未上传的总大小
        UpLoadHandle.leftTimeTotal = Math.round(leftSizeTotal * timeSpan / UpLoadHandle.completeAllFileSize / 1000); //未上传剩余时间
        var totalPercent = Math.ceil((completeSizeTotal / UpLoadHandle.totalFileSize) * 100); //所有文件的已上传百分比
        var totalSpeed = UpLoadHandle.fileSize(UpLoadHandle.completeAllFileSize / timeSpan * 1000) + "/秒"; //上传速率

        var fileID = file.id;
        $("#progressBar_" + file.id).css("width", percent + "%"); //单文件进度条
        $("#percent_" + file.id).html("").html(percent + "%"); //单文件进度比

        $("#progressBarTotal").css("width", totalPercent + "%"); //总进度条
        $("#percentTotal").html("").html(totalPercent + "%"); //总进度比
        $("#speedTotal").html("").html(totalSpeed); //上传速度
        $("#completeSizeTotal").html("").html(UpLoadHandle.fileSize(completeSizeTotal)); //已完成

        if (UpLoadHandle.timeInterval == null) {
            setTimeout(function() { $("#leftTimeTotal").html("").html(UpLoadHandle.convertSeconds(UpLoadHandle.leftTimeTotal)); }, 200);
            UpLoadHandle.timeInterval = setInterval(function() { $("#leftTimeTotal").html("").html(UpLoadHandle.convertSeconds(UpLoadHandle.leftTimeTotal)); }, 1000);
        }

        if (percent == 100) {
            $("#progressBarContainer_" + file.id).html("").html("<span class=\"validitying\">正在验证</span>");
        }
    }
    catch (ex) {
        this.debug(ex);
    }
}

//上传成功
function uploadSuccess(file, serverData) {
    try {
        if (serverData == "不能连接远程服务器") {
            var msg = "远程服务器连接失败，建议确认后重新上传！";
            $("#progressBarContainer_" + file.id).html("").html("<span class=\"uploadfailed\" title=\"" + msg + "\">上传失败</span>");
            UpLoadHandle.isUploadFailed = true; //上传发生错误
            alert(msg);
            return;
        }
        if (serverData.indexOf("发生错误") > -1) {
            var msg = serverData;
            $("#progressBarContainer_" + file.id).html("").html("<span class=\"uploadfailed\" title=\"" + msg + "\">上传失败</span>");
            UpLoadHandle.isUploadFailed = true; //上传发生错误
            alert(msg);
            return;
        }
        else {
            UpLoadHandle.completeFileSize += file.size;
            $("#progressBarContainer_" + file.id).html("").html("<span class=\"uploadfinished\">已上传</span>");
            UpLoadHandle.isUploadFailed = false; //上传未发生错误
            UpLoadHandle.updateFile(file.id, serverData); //更新客户端对应的变量中的服务端ID
        }
    }
    catch (ex) {
        this.debug(ex);
    }
}

//一个文件上传周期结束
function uploadComplete(file) {
    try {
        if (!UpLoadHandle.isUploadFailed) {
            if (UpLoadHandle.timeInterval != null) {
                clearInterval(UpLoadHandle.timeInterval);
                UpLoadHandle.timeInterval = null;
            }
            if (this.getStats().files_queued == 0) {
                UpLoadHandle.totalFileSize = 0;
                UpLoadHandle.completeFileSize = 0;
                UpLoadHandle.completeAllFileSize = 0;
                UpLoadHandle.uploadBeginTime = null;
            }
            if (this.getStats().files_queued > 0) {

                //上传中_Uploading(0)
                $("#" + UpLoadHandle.hidUploadStatus).val("0");

                this.startUpload();
            }
            else {
                //所有文件均已上传完毕
                $('#spanTotalFile').removeClass().addClass('uploadstep2');
                $("#spanSelectFiles").removeClass().addClass("info1");
                $("#spanWriteInfo").removeClass().addClass("info2 infoselected");
                $("#spanCompleteUpload").removeClass().addClass("info3");
                $("#progressBarTotal").css("width", "100%"); //总进度条
                $("#percentTotal").html("").html("100%"); //总进度比
                $("#leftTimeTotal").html("").html("0秒钟");

                //所有文件上传完毕后记录上传状态_Uploaded(1)
                $("#" + UpLoadHandle.hidUploadStatus).val("1");
            }
        }
    }
    catch (ex) {
        this.debug(ex);
    }
}

//上传失败或取消时触发
function uploadError(file, errorCode, message) {
    try {
        switch (errorCode) {
            case SWFUpload.UPLOAD_ERROR.FILE_CANCELLED:
                try {
                    UpLoadHandle.removeFile(file.id);
                    if (UpLoadHandle.files.length == 0) {
                        $("#ShowFiles").html("");
                        $("#ShowTotalArea").html("");
                        this.setButtonDisabled(false);
                        this.setButtonDimensions(150, 41);
                        this.setButtonImageURL(UpLoadHandle.continueUploadBtn);
                        $('#spanTotalFile').removeClass().addClass('uploadstep2');
                        $("#spanSelectFiles").removeClass().addClass("info1");
                        $("#spanWriteInfo").removeClass().addClass("info2 infoselected");
                        $("#spanCompleteUpload").removeClass().addClass("info3");
                    }
                    else if (this.getStats().files_queued == 0 && this.getStats().successful_uploads > 0) {
                        $("#progressBarTotal").css("width", "100%"); //总进度条
                        $("#percentTotal").html("").html("100%"); //总进度比
                        $("#leftTimeTotal").html("").html("0秒"); //剩余时间
                        $("#" + file.id).remove();
                    }
                    else {
                        $("#" + file.id).remove();
                    }
                    UpLoadHandle.totalFileSize -= file.size;
                    UpLoadHandle.setIndex("ShowFiles");
                }
                catch (ex1) {
                    this.debug(ex1);
                }
                break;
            case SWFUpload.UPLOAD_ERROR.UPLOAD_STOPPED:
                try {
                }
                catch (ex2) {
                    this.debug(ex2);
                }
            case SWFUpload.UPLOAD_ERROR.UPLOAD_LIMIT_EXCEEDED:
                break;
            default:
                break;
        }
    }
    catch (ex3) {
        this.debug(ex3);
    }
}

//客户端创建的文件对象
var File = function(file) {
    if (file) {
        this.FileName = file.name.toLowerCase();
        this.ID = file.id;
        this.FileExtension = file.type.toLowerCase();
        this.FileSize = file.size;
        this.Title = UpLoadHandle.getFileName(file.name);
        this.OrderIndex = file.index;
        this.ServerID = ""; //服务器端返回的唯一ID
        if (file.serverid) {
            this.ServerID = file.serverid;
        }
        this.ViewPermission = "";
    }
    else {
        this.FileName = "";
        this.ID = "";
        this.FileExtension = "";
        this.FileSize = 0;
        this.Title = "";
        this.OrderIndex = 0;
        this.ServerID = "";
        this.ViewPermission = "";
    }
};

//上传文件处理类
var UpLoadHandle = {
    leftTimeTotal: 0, //剩余时间
    hiddenID: "hidSave", //隐藏域控件ID
    hidUploadStatus: "hidUploadStatus", //上传状态控件ID
    finishedShowAreaID: "FinishedShowArea", //上传成功后的显示区域ID
    isContinue: true, //是否继续添加
    isAllowContinueUpload: true, //是否允许继续添加
    totalFileSize: 0, //选择的总文件大小
    completeFileSize: 0, //成功完成上传的总大小
    completeAllFileSize: 0, //完成的总大小
    uploadBeginTime: null, //开始上传的时间
    uploadNowTime: null, //正在上传时的时间
    timeInterval: null,
    errorMessage: null, //用于保存错误列表信息
    queueErrors: 0, //选择的错误数量累加
    isUploadFailed: false, //上传是否发生错误
    uploadFileBtn: FILESERVER_ROOT_URL + "/theme/cloud/images/uploadfile.png", //上传文件按钮
    continueUploadBtn:  FILESERVER_ROOT_URL + '/theme/cloud/images/continueupload.png', //继续上传按钮
    files: [],
    //添加文件至files
    addFile: function(file) {
        this.files.push(new File(file));
        this.setJsonStr();
        if (this.files.length == 1) {
            $("#down_" + this.files[0].ID).removeClass().addClass("hiddenelement down");
            $("#up_" + this.files[0].ID).removeClass().addClass("hiddenelement up");
            if (!UpLoadHandle.isAllowContinueUpload) {
                $("#title_" + this.files[0].ID).removeClass().addClass("hiddenelement title");
                $("#filenewname_" + this.files[0].ID).removeClass().addClass("hiddenelement filenewname");
                //swfu.setButtonDisabled(true);
                //swfu.setButtonDimensions(0, 0);
                $("#swfu_container").removeClass().addClass("swfuploadbutton1");
            }
        }
        else {
            $("#down_" + this.files[0].ID).removeClass().addClass("down");
            $("#up_" + this.files[0].ID).removeClass().addClass("up");
            if (!UpLoadHandle.isAllowContinueUpload) {
                $("#title_" + this.files[0].ID).removeClass().addClass("title");
                $("#filenewname_" + this.files[0].ID).removeClass().addClass("filenewname");
                //swfu.setButtonDisabled(true);
                //swfu.setButtonDimensions(0, 0);
                $("#swfu_container").removeClass().addClass("swfuploadbutton1");
            }
        }
        $("#ShowFiles").removeClass("hiddenelement").addClass("showelement uploadlist");
        $("#UploadFileBeKnows").removeClass().addClass("UploadFileBeKnow hiddenelement");
    },
    //从files移除文件队列
    removeFile: function(fileID) {
        var i = this.files.length;
        var temp = null;
        while (i--) {
            temp = UpLoadHandle.files[i];
            if (temp.ID == fileID) {
                UpLoadHandle.files.splice(i, 1);
                break;
            }
        }
        this.setJsonStr();

        if (this.files.length == 1) {
            $("#down_" + this.files[0].ID).removeClass().addClass("hiddenelement down");
            $("#up_" + this.files[0].ID).removeClass().addClass("hiddenelement up");
            if (!UpLoadHandle.isAllowContinueUpload) {
                $("#title_" + this.files[0].ID).removeClass().addClass("hiddenelement title");
                $("#filenewname_" + this.files[0].ID).removeClass().addClass("hiddenelement filenewname");
                //swfu.setButtonDisabled(true);
                //swfu.setButtonDimensions(0, 0);
                $("#swfu_container").removeClass().addClass("swfuploadbutton1");
            }
        }
        if (this.files.length == 0) {
            $("#ShowFiles").removeClass("showelement").addClass("hiddenelement");
            $('#spanTotalFile').removeClass().addClass('uploadstep1');
            $("#spanSelectFiles").removeClass().addClass("info1 infoselected");
            $("#spanWriteInfo").removeClass().addClass("info2");
            $("#spanCompleteUpload").removeClass().addClass("info3");

            $("#UploadFileBeKnows").removeClass().addClass("UploadFileBeKnow");

            //隐藏内容区域填写信息
            $('#' + UpLoadHandle.finishedShowAreaID).css("display", "none");
        }
    },
    //获取文件信息
    getFile: function(fileID) {
        var i = this.files.length;
        var temp = null;
        while (i--) {
            temp = UpLoadHandle.files[i];
            if (temp.ID == fileID) {
                return temp;
                break;
            }
        }
    },
    //更新客户端文件列表的文件serverID
    updateFile: function(fileID, serverID) {
        var i = this.files.length;
        var temp = null;
        while (i--) {
            temp = UpLoadHandle.files[i];
            if (temp.ID == fileID) {
                UpLoadHandle.files[i].ServerID = serverID;
                break;
            }
        }
        this.setJsonStr();
    },
    //更新指定文件名称
    updateFileName: function(fileID) {
        var i = this.files.length;
        var temp = null;
        while (i--) {
            temp = UpLoadHandle.files[i];
            if (temp.ID == fileID) {
                UpLoadHandle.files[i].Title = $("#fileName_" + fileID).val();
                break;
            }
        }
        this.setJsonStr();
    },
    //更新所有文件名称
    updateAllFileName: function() {
        var i = this.files.length;
        var temp = null;
        while (i--) {
            temp = UpLoadHandle.files[i];
            UpLoadHandle.files[i].Title = $("#fileName_" + temp.ID).val();
        }
        this.setJsonStr();
    },
    //更新浏览权限
    updateViewPermission: function(fileID) {
        var i = this.files.length;
        var temp = null;
        while (i--) {
            temp = UpLoadHandle.files[i];
            if (temp.ID == fileID) {
                var radForInternet = document.getElementById("radForInternet_" + fileID);
                var radOnlyForGroup = document.getElementById("radOnlyForGroup_" + fileID);
                if (radForInternet && radForInternet.checked) {
                    UpLoadHandle.files[i].ViewPermission = "1";
                }
                else if (radOnlyForGroup && radOnlyForGroup.checked) {
                    UpLoadHandle.files[i].ViewPermission = "2";
                }
                break;
            }
        }
        this.setJsonStr();
    },
    //更新所有浏览权限
    updateAllViewPermission: function() {
        var i = this.files.length;
        var temp = null;
        while (i--) {
            temp = UpLoadHandle.files[i];
            var radForInternet = document.getElementById("radForInternet_" + fileID);
            var radOnlyForGroup = document.getElementById("radOnlyForGroup_" + fileID);
            if (radForInternet && radForInternet.checked) {
                UpLoadHandle.files[i].ViewPermission = "1";
            }
            else if (radOnlyForGroup && radOnlyForGroup.checked) {
                UpLoadHandle.files[i].ViewPermission = "2";
            }
        }
        this.setJsonStr();
    },
    //上移
    upFile: function(fileID) {
        var index = $("#ShowFiles>div").index($("#" + fileID));
        if (index == 0) {
            alert("已经处在第一个位置！");
        }
        else {
            index--;
            $("#" + fileID).insertBefore($("#ShowFiles>div").get(index));
        }
        this.setIndex("ShowFiles");
        this.updateAllFileName();
    },
    //下移
    downFile: function(fileID) {
        var index = $("#ShowFiles>div").index($("#" + fileID));
        var lastIndex = $("#ShowFiles>div").length - 1;
        if (index == lastIndex) {
            alert("已经处在最后一个位置！");
        }
        else {
            index++;
            $("#" + fileID).insertAfter($("#ShowFiles>div").get(index));
        }
        this.setIndex("ShowFiles");
        this.updateAllFileName();
    },
    //指定类型的指定文件是否存在
    isExist: function(fileName, fileType) {
        fileName = fileName.toLowerCase();
        fileType = fileType.toLowerCase();
        var i = this.files.length;
        var temp = null;
        while (i--) {
            temp = this.files[i];
            if (temp.FileName == fileName && temp.FileExtension == fileType) {
                return true;
            }
        }
        return false;
    },
    //重新上传文件 添加人：肖刚 添加日期：2013.01.05
    reUploadFile: function(fileID, masterID, clientID, sessid) {
        if (swfu != null) { 
            if (confirm("确定要重新上传文件吗？")) {
                var tempFile = UpLoadHandle.getFile(fileID);
                if (tempFile) {
                    var serverID = tempFile.ServerID;
                    $.ajax({
                        url: "/Services/DeleteFiles.ashx?MasterID=" + masterID + "&ClientID=" + clientID+ "&SessID=" + sessid,
                        type: "post",
                        dataType: "json",
                        data: { "ServerID": serverID },
                        beforeSend: function(XMLHttpRequest) {
                        },
                        success: function(data, status) {
                            UpLoadHandle.removeFile(fileID); //删除客户端对应的文件变量
                            $("#" + fileID).remove();
                            $("#ShowFiles").html("");
                            $("#ShowTotalArea").html("");
                            swfu.setButtonDimensions(150, 41);
                            swfu.setButtonImageURL(UpLoadHandle.uploadFileBtn);
                            $('#spanTotalFile').removeClass().addClass('uploadstep1');
                            $("#spanSelectFiles").removeClass().addClass("info1 infoselected");
                            $("#spanWriteInfo").removeClass().addClass("info2");
                            $("#spanCompleteUpload").removeClass().addClass("info3");
                            $("#UploadFileBeKnows").removeClass().addClass("UploadFileBeKnow");
                            $(fileID).removeClass().addClass("uploaditem showelement");

                            if (!UpLoadHandle.isAllowContinueUpload) {
                                swfu.setButtonDisabled(false);
                                swfu.setButtonDimensions(150, 41);
                                swfu.setButtonCursor(SWFUpload.CURSOR.HAND);
                                $("#swfu_container").removeClass().addClass("swfuploadbutton");
                            }
                            var status = swfu.getStats();
                            status.successful_uploads = status.successful_uploads - 1;
                            swfu.setStats(status);
                        },
                        complete: function(data, status) {
                        },
                        error: function() {
                        }
                    });
                }
                else {
                    alert("重新上传失败！");
                }
            }
        }
    },
    //删除或取消文件
    deleteFile: function(fileID, masterID, clientID, sessid) {
        if (swfu != null) {
            var file = swfu.getFile(fileID);
            //正在上传
            if (file != null && file.filestatus != -4) {
                if (confirm("确定要取消上传当前文件吗？")) {
                    swfu.cancelUpload(fileID, true); //取消上传
                }
            }
            else {
                if (confirm("确定要删除当前文件吗？")) {
                    var tempFile = UpLoadHandle.getFile(fileID);
                    if (tempFile) {
                        var serverID = tempFile.ServerID;
                        $.ajax({
                            url: "/Services/DeleteFiles.ashx?MasterID=" + masterID + "&ClientID=" + clientID+ "&SessID=" + sessid,
                            type: "post",
                            dataType: "json",
                            data: { "ServerID": serverID },
                            beforeSend: function(XMLHttpRequest) {
                            },
                            success: function(data, status) {
                                UpLoadHandle.removeFile(fileID); //删除客户端对应的文件变量
                                $("#" + fileID).remove();
                                UpLoadHandle.setIndex("ShowFiles"); //重新排序
                                var divCount = $("#ShowFiles").children().length;
                                if (divCount == 0) {
                                    $("#ShowFiles").html("");
                                    $("#ShowTotalArea").html("");
                                    swfu.setButtonImageURL(UpLoadHandle.uploadFileBtn);
                                    $('#spanTotalFile').removeClass().addClass('uploadstep1');
                                    $("#spanSelectFiles").removeClass().addClass("info1 infoselected");
                                    $("#spanWriteInfo").removeClass().addClass("info2");
                                    $("#spanCompleteUpload").removeClass().addClass("info3");
                                    $("#UploadFileBeKnows").removeClass().addClass("UploadFileBeKnow");
                                    if (!UpLoadHandle.isAllowContinueUpload) {
                                        swfu.setButtonDisabled(false);
                                        swfu.setButtonDimensions(150, 41);
                                        swfu.setButtonCursor(SWFUpload.CURSOR.HAND);
                                        $("#swfu_container").removeClass().addClass("swfuploadbutton");
                                    }
                                }

                                var status = swfu.getStats();
                                status.successful_uploads = status.successful_uploads - 1;
                                swfu.setStats(status);
                            },
                            complete: function(data, status) {
                            },
                            error: function() {
                            }
                        });
                    }
                    else {
                        alert("删除失败！");
                    }
                }
            }
        }
    },
    //设置文件队列索引
    setIndex: function(div) {
        var divCount = $("#" + div).children().length;
        for (var i = 0; i < divCount; i++) {
            var obj = $("#" + div).children()[i];
            var id = obj.id;
            for (var fileIndex = 0; fileIndex < UpLoadHandle.files.length; fileIndex++) {
                if (UpLoadHandle.files[fileIndex].ID == id) {
                    UpLoadHandle.files[fileIndex].OrderIndex = (i + 1);
                    break;
                }
            }
            document.getElementById("index_" + id).innerHTML = (i + 1);
            this.setJsonStr();
        }
    },
    //日期比较
    dateDiff: function(interval, date1, date2) {
        var objInterval = { 'D': 1000 * 60 * 60 * 24, 'H': 1000 * 60 * 60, 'M': 1000 * 60, 'S': 1000, 'T': 1 };
        interval = interval.toUpperCase();
        try {
            return Math.round((date2.getTime() - date1.getTime()) / eval('objInterval.' + interval));
        }
        catch (e) {
            return e.message;
        }
    },
    //将秒转换成时分秒
    convertSeconds: function(seconds) {
        try {
            var seconds = seconds;
            var unit = "秒钟";
            if (seconds < 60) {
                unit = "秒钟";
                return seconds + unit;
            }
            else if (seconds > 60) {
                unit = "分钟";
                seconds /= 60;
                return seconds.toFixed(2) + unit;
            }
            else if (seconds > (60 * 60)) {
                unit = "小时";
                seconds /= (60 * 60);
                return seconds.toFixed(2) + unit;
            }
        }
        catch (ex) {
            this.debug(ex);
        }
    },
    //获取文件大小
    fileSize: function(size) {
        try {
            var size = size;
            var unit = "B";
            if (size > (1024 * 1024 * 1024)) {
                unit = "GB";
                size /= (1024 * 1024 * 1024);
            } else if (size > (1024 * 1024)) {
                unit = "MB";
                size /= (1024 * 1024);
            } else if (size > 1024) {
                unit = "KB";
                size /= 1024;
            }
        } catch (ex) {
            this.debug(ex);
        }
        return size.toFixed(2) + unit;
    },
    //获取文件名
    getFileName: function(fileName) {
        var index = fileName.lastIndexOf('.');
        var fileNameWithOutExt = fileName.substring(0, index);
        if (fileNameWithOutExt.length > 25) {
            fileNameWithOutExt = fileNameWithOutExt.substring(0, 25);
        }
        return fileNameWithOutExt;
    },
    //设置JSON字符串
    getJsonStr: function(files) {
        var length = files.length;
        var jsonStr = "";
        if (length > 0) {
            jsonStr = "[";
            for (var i = 0; i < length; i++) {
                var ID = files[i].ID;
                var Title = files[i].Title;
                var OrderIndex = files[i].OrderIndex;
                var ServerID = files[i].ServerID;
                var ViewPermission = files[i].ViewPermission;
                if (i == length - 1) {
                    jsonStr += "{\"ID\":\"" + ID + "\",\"ServerID\":\"" + ServerID + "\",\"Title\":\"" + Title + "\",\"OrderIndex\":" + OrderIndex + ",\"ViewPermission\":\"" + ViewPermission + "\"}";
                }
                else {
                    jsonStr += "{\"ID\":\"" + ID + "\",\"ServerID\":\"" + ServerID + "\",\"Title\":\"" + Title + "\",\"OrderIndex\":" + OrderIndex + ",\"ViewPermission\":\"" + ViewPermission + "\"},";
                }
            }
            jsonStr += "]";
            jsonStr = encodeURIComponent(jsonStr);
            return jsonStr;
        }
    },
    //隐藏域保存JSON字符串
    setJsonStr: function() {
        $("#" + this.hiddenID).val(this.getJsonStr(this.files));
    }
};

// 上传文件成功
// 添加人：肖刚
// 添加日期：2013.01.04
function upFileSuccess() {
    $('#spanTotalFile').removeClass().addClass('uploadstep3');
    $("#spanSelectFiles").removeClass().addClass("info1");
    $("#spanWriteInfo").removeClass().addClass("info2");
    $("#spanCompleteUpload").removeClass().addClass("info3 infoselected");

    $("#uploadcontainerinfo").addClass("hiddenelement");

    $('#baseInfo').removeClass().addClass('hiddenelement');
    $('#successInfo').removeClass().addClass('');
}

// 编辑文件(第三个状态)
// 添加人：肖刚
// 添加日期：2013.01.04
function upEditFileSuccess() {
    $('#spanTotalFile').removeClass().addClass('uploadstep3');
    $("#spanSelectFiles").removeClass().addClass("info1");
    $("#spanWriteInfo").removeClass().addClass("info2");
    $("#spanCompleteUpload").removeClass().addClass("info3 infoselected");
    $("#UploadFileBeKnows").removeClass().addClass("UploadFileBeKnow hiddenelement");
}

//文件加入到上传队列中
function fileQueued(file) {
	try {
		$('#spanSelectFiles').removeClass().addClass(
				'fontsize14 fontweightbold colordullred');
		$('#spanWriteInfo').removeClass().addClass('fontsize14 colorlightgrey');
		$('#spanCompleteUpload').removeClass().addClass(
				'fontsize14 colorlightgrey');
		var filesCount = this.getStats().files_queued;
		var divCount = $('#ShowFiles').children().length;
		var str = "";
		// if (UpLoadHandle.isContinue == true) {
		file.index = divCount;
		// }
		str = '<div id="'
				+ file.id
				+ '" class="uploaditem showelement" >'
				+ '<div id="index_'
				+ file.id
				+ '" class="rowindex" >'
				+ (file.index + 1)
				+ '</div>'
				+ '<div class="filename">'
				+ file.name
				+ '</div>'
				+ '<div class="filesize">'
				+ UpLoadHandle.fileSize(file.size)
				+ '</div>'
				+ '<div id="progressBarContainer_'
				+ file.id
				+ '" class="filestatus">'
				+ '<div class="uploadscheduleout progressbarbordercolor">'
				+ '<div class="uploadschedulein progressbarbgcolor" id="progressBar_'
				+ file.id
				+ '" style="width:0%"></div>'
				+ '</div>'
				+ '<div id="percent_'
				+ file.id
				+ '" class="floatleft marginleft5">0%</div>'
				+ '</div>'
				+ '<div id="title_'
				+ file.id
				+ '" class="title" style="width:50px;">标题：</div>'
				+ '<div id="filenewname_'
				+ file.id
				+ '" class="filenewname"><input id="fileName_'
				+ file.id
				+ '" type="label" maxlength="25" class="input" value="'
				+ UpLoadHandle.getFileName(file.name)
				+ '" onblur="UpLoadHandle.updateFileName(\''
				+ file.id
				+ '\');"  /></div>'
				+ '<div class="operate">'
				//+ '<span class="delete" onclick="UpLoadHandle.deleteFile(\''
				//+ file.id
				//+ '\',\'' + getQueryString("kcid") +  '\',\'upfShareFile\',\'y4nz4du23abkebsxlf2te1mt\');">&nbsp;</span>';
		// str += '<span id="down_' + file.id + '" class="down"
		// onclick="UpLoadHandle.downFile(\'' + file.id +
		// '\');">&nbsp;</span><span id="up_' + file.id + '" class="up"
		// onclick="UpLoadHandle.upFile(\'' + file.id + '\');">&nbsp;</span>';
		str += '</div><div class="clearstatic"></div></div>'
		$('#ShowFiles').append(str);
		UpLoadHandle.addFile(file);
		UpLoadHandle.totalFileSize += file.size;
	} catch (ex) {
		this.debug(ex);
	}
}

//选择文件对话框关闭
function fileDialogComplete(numFilesSelected, numFilesQueued) {
	try {
		var count = $('#ShowTotalArea').children().length;
		var str = ""
		if (numFilesQueued > 0) {
			if (count == 0) {
				str = '<div class="uploadstatus" >'
						+ '<div class="title">总进度：</div>'
						+ '<div class="schedule">'
						+ '<div class="uploadscheduletotalout progressbarbordercolor">'
						+ '<div id="progressBarTotal" class="uploadscheduletotalin progressbarbgcolor" style="width:0%"></div>'
						+ '</div>'
						+ '<div id="percentTotal" class="percentage">0%</div>'
						+ '</div>'
						+ '<div class="uploaded" style="position:relative; top:1px">已上传：<span id="completeSizeTotal" style="position:relative; top:-1px"></span></div>'
						+ '<div class="speed" style="position:relative; top:1px">上传速度：<span id="speedTotal" ></span></div>'
						+ '<div class="timer" style="position:relative; top:1px">大约剩余时间：<span id="leftTimeTotal" ></span></div>'
						+ '<div class="clearstatic"></div>' + '</div>';
				$('#ShowTotalArea').append(str);
			}
			this.startUpload();
			this.setButtonImageURL(UpLoadHandle.continueUploadBtn);
			$('#spanSelectFiles').removeClass().addClass(
					'fontsize14 colorlightgrey');
			$('#spanWriteInfo').removeClass().addClass(
					'fontsize14 fontweightbold colordullred');
			$('#spanCompleteUpload').removeClass().addClass(
					'fontsize14 colorlightgrey');

			// 显示内容区域填写信息
			$('#' + UpLoadHandle.finishedShowAreaID).css('display', 'block');

			UpLoadHandle.isContinue = true;
		}
	} catch (ex) {
		this.debug(ex);
	}
}

function checkUploadStatus() {
    var uploadStatus = document.getElementById('hidUploadStatus_upfShareFile');
    if(uploadStatus){
        if (uploadStatus.value == '-1') {
            alert('你还没有选择要上传文件，请确认！');
            return false;
        }
        else if (uploadStatus.value != '1') {
            alert('文件还没有完全上传完，请稍等！');
            return false;
        }
    }
    return true;
}

var swfu;


$(document).ready(function() {
    	var courseid = getQueryString("kcid");
    	var uploadType= $("#uploadType").val();
        UpLoadHandle.uploadFileBtn = FILESERVER_ROOT_URL + '/theme/cloud/images/uploadfile.png';
        UpLoadHandle.continueUploadBtn = FILESERVER_ROOT_URL + '/theme/cloud/images/continueupload.png';
        swfu = new SWFUpload({
            //基本设置
            upload_url: "/CourseView.uploadMetrial&clientid=upfShareFile&configkey=GroupFile&courseid=" + courseid  +"&uploadType=" + uploadType,
            post_params: {
                'ASPSESSID': 'y4nz4du23abkebsxlf2te1mt'
            },
            //上传文件设置
            file_size_limit: '100.00 MB',
            file_types: '*.doc;*.docx;*.ppt;*.pptm;*.pptx;*.pot;*.pps;*.ppsx;*.potm;*.potx;*.xls;*.xlsx;*.pdf;*.txt;*.rtf;*.jpg;*.png;*.gif;*.bmp;*.rar;*.zip;*.iso',
            file_types_description: '所有支持的文件类型',
            file_upload_limit: 100,  // 0表示不限制选择文件的数量
            file_queue_limit: 100,
            //定义事件				
            file_queue_error_handler: fileQueueError,
            file_dialog_complete_handler: fileDialogComplete,
            upload_progress_handler: uploadProgress,
            upload_error_handler: uploadError,
            upload_success_handler: uploadSuccess,
            upload_complete_handler: uploadComplete,
            file_queued_handler: fileQueued,
            upload_start_handler: uploadStart,
            button_window_mode:SWFUpload.WINDOW_MODE.OPAQUE,
            //按钮设置
            //开始上传按钮
            button_image_url: UpLoadHandle.uploadFileBtn,                                
            button_placeholder_id: 'spanButtonPlaceholder_upfShareFile',
            button_width: 109,
            button_height: 30,
            button_disabled: false,
            buttonCursor: SWFUpload.CURSOR.HAND,
            button_action: SWFUpload.BUTTON_ACTION.SELECT_FILES,
            button_text: '',
            button_text_style: '',
            button_text_top_padding: 0,
            button_text_left_padding: 0,
            //Flash设置
            flash_url: PLATFORM_ROOT_URL + '/script/swfupload/swfupload.swf',
            
            //是否开启调试，true是，false否
            debug: false
        });
        UpLoadHandle.hiddenID = 'hidFileLists_upfShareFile';
        UpLoadHandle.hidUploadStatus = 'hidUploadStatus_upfShareFile';
        UpLoadHandle.finishedShowAreaID = 'divOperateArea';
        
        // 完成上传按钮
        $("#btnGetploadEverFiles").click(function(){
        	ajax_fill_page("/CourseView.do?action=loadCourseMetrials&&kcid="  + courseid ,"course_content");
        });
    }); 
