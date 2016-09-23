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
	$('#stdate').val('2015-06-01');
	var myDate = new Date();
	var datestr = myDate.toLocaleString();
	var spacei = datestr.indexOf(" ");
	datestr = datestr.substring(0,spacei);
	datestr = datestr.replace(/\//g,'-');
	$('#enddate').val(datestr);
}

