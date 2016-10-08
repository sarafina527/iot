// 实时页面 选择节点号，刷新页面
function clickNode(){
	$('.nodelist li').removeClass('active');
	$(this).addClass('active');
	var nodeId = $(this).children().text();
	$('#node_id').val(nodeId);
	refreshByNodeclick(nodeId);
	
}
//实时页面 选择折线图数据源 类型
function clickType(){
	$('.typelist li').removeClass('active');
	$(this).addClass('active');
}
//实时页面 根据URL参数更新页面节点号
function updatePara(){
	var paras = urlArgs();
	var nodeId = paras["node_id"];
	if(nodeId){
		$('.nodelist li span:contains("'+nodeId+'")').parent().addClass('active');
		$('#node_id').val(nodeId);
	}else{//若没有则初始化为第一个

		$('.nodelist').children().eq(0).addClass('active');
	}
	var type = paras["type"];
	if(type){
		$('.typelist li.active').addClass('active');
	}else{//若没有则初始化为第一个
		$('.typelist').children().eq(0).addClass('active');
	}
}
//添加或修改参数，刷新页面
function refreshByNodeclick(nodeId){
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
