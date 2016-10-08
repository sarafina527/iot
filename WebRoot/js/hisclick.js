//点击节点号
function clickNode(){
	$('.nodelist li').removeClass('active');
	$(this).addClass('active');
	var nodeId = $(this).children().text();
	$('#node_id').val(nodeId);
	refreshBCclick(nodeId);
	
}
//添加或修改参数，刷新页面
function refreshBCclick(nodeId){
	var cursearch = location.search;
	var pattern = /node_id=\d+/;
	if(cursearch.length==0){//添加或修改参数，刷新页面
		//参数列表为空
		location.search = "?node_id="+nodeId;
	}else if(pattern.test(cursearch)){
		//已有参数 替代
		location.search = cursearch.replace(pattern,"node_id="+nodeId);
	}else{
		//有参数但没有page参数
		location.search = cursearch+"&node_id="+nodeId;
	}
}

//历史页面 根据URL参数更新页面节点号和日期
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

//数据表的样式 奇数行给样式
function tablestyle(){
	$('tr:nth-child(odd)').addClass('odd');
	$('tr').first().removeClass('odd').addClass('tablehead');
}


//设置默认起始和截至日期
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
//日期格式化函数
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

