function clickNode(){
	$('.nodelist li').removeClass('active');
	$(this).addClass('active');
	var nodeId = $(this).children().text();
	$('#node_id').val(nodeId);
	
}
//选择折线图数据源
function clickType(){
	$('.typelist li').removeClass('active');
	$(this).addClass('active');
}
function updatePara(){
	var paras = urlArgs();
	var nodeId = paras["node_id"];
	if(nodeId){
		$('.nodelist li span:contains("'+nodeId+'")').parent().addClass('active');
		$('#node_id').val(nodeId);
	}else{

		$('.nodelist').children().eq(0).addClass('active');
	}
	var stdate = paras["stdate"];
	var enddate = paras["enddate"];
	if(stdate){
		$('#stdate').val(stdate);
	}
	if(enddate){
		$('#enddate').val(enddate);
	}

}
// 解析URL参数，返回参数关联数组
function urlArgs() {
    var args = {};
    var query = location.search.substring(1); // 过滤掉'?'
    var pairs = query.split("&");//以&符号拆分
    for(var i = 0; i < pairs.length; i++)
    {
        var pos = pairs[i].indexOf('=');
        if (pos == -1)
             continue;
        var name = pairs[i].substring(0,pos);
        var value = pairs[i].substring(pos+1);
        value = decodeURIComponent(value);
        args[name] = value; 
    }
    return args;
}
//数据表的样式
function tablestyle(){
	$('tr:nth-child(odd)').addClass('odd');
	$('tr').first().removeClass('odd').addClass('tablehead');
}
// function initNode(){
// 	var args = urlArgs();
// 	var nodeId = args["nodeId"];
// 	$('.nodelist li').removeClass('active');
// 	if(nodeId){
// 		$('.nodelist li span:contains("'+nodeId+'")').parent().addClass('active');
// 	}else{
// 		$('.nodelist').children().eq(0).addClass('active');
// 	}
	
// }
function defaultdate(){
	if(!$('#stdate').val()){
		$('#stdate').val('2015-06-01');
	}
	if(!$('#enddate').val()){
		var myDate = new Date();
		var datestr = myDate.Format("yyyy-MM-dd");
		// var spacei = datestr.indexOf(" ");
		// datestr = datestr.substring(0,spacei);
		// datestr = datestr.replace(/\//g,'-');
		$('#enddate').val(datestr);
	}
	
}
Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

