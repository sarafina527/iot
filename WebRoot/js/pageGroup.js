// JavaScript Document
$(function(){
	//根据总页数判断，如果小于5页，则显示所有页数，如果大于5页，则显示5页。根据当前点击的页数生成
	
	var pageCount = parseInt($('#pageCount').text());//后台总页数
	//生成分页按钮
	var pn = 0;
	var args = urlArgs();
	if(args['page']){
		pn = parseInt(args['page']);
	}

	if(pageCount>5){
		if(pn<=3){
			page_icon(1,5,pn);
		}else{
			if(pageCount-pn<=2){
				page_icon(pageCount-4,pageCount,pn-pageCount+4);
			}else{
				page_icon(pn-2,pn+2,2);
			}			
		}
		
	}else{
		page_icon(1,pageCount,pn);
	}
	// function init(){

	// }
	
	//点击分页按钮触发
	$("#pageGro li").live("click",function(){
		if(pageCount > 5){
			var pageNum = parseInt($(this).html());//获取当前页数
			goToPage(pageNum);
			pageGroup(pageNum,pageCount);
		}else{
			$(this).addClass("on");
			var pageNum = parseInt($(this).html());//获取当前页数
			goToPage(pageNum);
			$(this).siblings("li").removeClass("on");
		}
	});
	
	//点击上一页触发
	$("#pageGro .pageUp").click(function(){
		if(pageCount > 5){
			var pageNum = parseInt($("#pageGro li.on").html());//获取当前页
			pageUp(pageNum,pageCount);
		}else{
			var index = $("#pageGro ul li.on").index();//获取当前页
			if(index > 0){
				$("#pageGro li").removeClass("on");//清除所有选中
				$("#pageGro ul li").eq(index-1).addClass("on");//选中上一页
			}
		}
		pageNum = parseInt($("#pageGro li.on").html());
		goToPage(pageNum);
	});
	
	//点击下一页触发
	$("#pageGro .pageDown").click(function(){
		if(pageCount > 5){
			var pageNum = parseInt($("#pageGro li.on").html());//获取当前页
			pageDown(pageNum,pageCount);
		}else{
			var index = $("#pageGro ul li.on").index();//获取当前页
			if(index+1 < pageCount){
				$("#pageGro li").removeClass("on");//清除所有选中
				$("#pageGro ul li").eq(index+1).addClass("on");//选中上一页
			}
		}
		pageNum = parseInt($("#pageGro li.on").html());
		goToPage(pageNum);
	});
});

//点击跳转页面
function pageGroup(pageNum,pageCount){
	switch(pageNum){
		case 1:
			page_icon(1,5,0);
		break;
		case 2:
			page_icon(1,5,1);
		break;
		case pageCount-1:
			page_icon(pageCount-4,pageCount,3);
		break;
		case pageCount:
			page_icon(pageCount-4,pageCount,4);
		break;
		default:
			page_icon(pageNum-2,pageNum+2,2);
		break;
	}
}

//根据当前选中页生成页面点击按钮
function page_icon(page,count,eq){
	var ul_html = "";
	for(var i=page; i<=count; i++){
		ul_html += "<li>"+i+"</li>";
	}
	$("#pageGro ul").html(ul_html);
	$("#pageGro ul li").eq(eq).addClass("on");
}

//上一页
function pageUp(pageNum,pageCount){
	switch(pageNum){
		case 1:
		break;
		case 2:
			page_icon(1,5,0);
		break;
		case pageCount-1:
			page_icon(pageCount-4,pageCount,2);
		break;
		case pageCount:
			page_icon(pageCount-4,pageCount,3);
		break;
		default:
			page_icon(pageNum-2,pageNum+2,1);
		break;
	}
}

//下一页
function pageDown(pageNum,pageCount){
	switch(pageNum){
		case 1:
			page_icon(1,5,1);
		break;
		case 2:
			page_icon(1,5,2);
		break;
		case pageCount-1:
			page_icon(pageCount-4,pageCount,4);
		break;
		case pageCount:
		break;
		default:
			page_icon(pageNum-2,pageNum+2,3);
		break;
	}
}
function goToPage(pageNum){
	var cursearch = location.search;
	var pattern = /page=\d+/;
	if(cursearch.length==0){
		//参数列表为空
		location.search = "?page="+pageNum;
	}else if(pattern.test(cursearch)){
		//已有参数 替代
		location.search = cursearch.replace(pattern,"page="+pageNum);
	}else{
		//有参数但没有page参数
		location.search = cursearch+"&page="+pageNum;
	}
}
// 解析URL参数，返回
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