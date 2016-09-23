// 添加onload处理
function addLoadEvent (newfunc) {
	var oldonload = window.onload;
	if(typeof(oldonload)!='function'){
		window.onload = newfunc;
	} else{
		window.onload = function(){
			oldonload();
			newfunc();
		}
	}
}
// 向目标元素后面插入新元素
function insertAfter (newElement,targetElement) {
	var parent = targetElement.parentNode;
	if(parent.lastChild == targetElement){
		parent.appendChild(newElement);
	}  else{
		parent.insertBefore(newElement, targetElement.nextSibling);
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
