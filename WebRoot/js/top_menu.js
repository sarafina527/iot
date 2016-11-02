
function addTopMenu(){
	console.log("222");
	var Htopmenu = document.getElementById('topmenu');
	// alert(Hsidebar);
	Htopmenu.innerHTML = '<ul nav nav-tabs pull-right>'+
					'<nav class="cl-effect-5">'+
						'<li><a class="active" href="index.html"><span data-hover="首页">首页</span></a></li> '+
						'<li><a href="about.html"><span data-hover="平台介绍">平台介绍</span></a></li>'+
						'<li><a href="apply.html"><span data-hover="应用场景">应用场景</span></a></li> '+
						'<li id="trans"><a href="login.jsp"><span data-hover="客户体验">客户体验</span></a><ul  id="trans-nav"><li><a href="login.jsp">农业物联云平台</a></li><li><a href="pumplogin.jsp">水泵物联云平台</a></li></ul></li> '+
						'<li><a href="cooperate.html"><span data-hover="定制与商务合作">定制与商务合作</span></a></li>'+
						'<li class="dropdown">'+
				          '<a class="dropdown-toggle" data-toggle="dropdown" href="#">产品销售 <b class="caret"></b></a>'+
				          '<ul class="dropdown-menu">'+
				           // '<li><a href="datacollect.html">数据采集仪</a></li>'+
				           // '<li><a href="board.html">开发板</a></li>'+
				           //  '<li><a href="cloudstore.html">云存储服务器</a></li>'+
				           // ' <li><a href="cloudgate.html">云存储网关</a></li>'+
				           //  '<li><a href="webserver.html">Web服务器</a></li>'+
				           // ' <li><a href="iotgate.html">物联网网关</a></li>'+
				           //  '<li class="divider"></li>'+
				            '<li><a href="choice.html">产品选型参考</a></li>'+
				           	'<li><a href="GPRSgate.html">GPRS网关</a></li>'+
				            '<li><a href="wifiGate.html">wifi网关</a></li>'+
				            '<li><a href="zizuGate.html">自组网网关</a></li>'+
				            '<li><a href="bdyiti.html">数采大数据一体机</a></li>'+
				          '</ul>'+
				       ' </li>'+
					'</nav>'+
					'</ul>';
	// alert(Hsidebar.innerHTML);
	var headerTopMenu = document.getElementsByClassName('cl-effect-5')[0];
	headerTopMenu.innerHTML = '<li><a href="aboutus.html"><span data-hover="关于我们">关于我们</span></a></li><li><a href="contact.html"><span data-hover="联系我们">联系我们</span></a></li>'
	if(document.getElementById('myScrollspy'))
	{
		var Hsidebar = document.getElementById('myScrollspy');
		Hsidebar.innerHTML = '<ul class="nav nav-tabs nav-stacked" data-spy="affix" data-offset-top="125">'+       
	            			'<li><a href="choice.html">产品选型参考</a></li>'+
	            			'<li><a href="GPRSgate.html">GPRS网关</a></li>'+
				            '<li><a href="wifiGate.html">wifi网关</a></li>'+
				            '<li><a href="zizuGate.html">自组网网关</a></li>'+
				            '<li><a href="bdyiti.html">数采大数据一体机</a></li>'+
	            			'</ul>';
	}
	
}
// 
// addLoadEvent(addTopMenu);
startList = function() {
    if (document.all && document.getElementById) {
        var navRoot = document.getElementById("trans-nav");
        for (i=0; i<navRoot.childNodes.length; i++) {
            var node = navRoot.childNodes[i];
            if (node.nodeName=="LI") {
                node.onmouseover=function() {
                    this.className+=" over";
                }
                node.onmouseout=function() {
                    this.className=this.className.replace(" over", "");
                }
            }
        }
    }
}
// addLoadEvent(startList);