function clickNode(){
	$('.nodelist li').removeClass('active');
	$(this).addClass('active');
	var nodeId = $(this).children().text();
	$('#node_id').val(nodeId);
	// var href = location.href;
	// if(location.search!=""){
	// 	location.search
	// }
	location.search = "?nodeId="+nodeId;
}
function initNode(){
	var args = urlArgs();
	var nodeId = args["nodeId"];
	$('.nodelist li').removeClass('active');
	if(nodeId){
		$('.nodelist li span:contains("'+nodeId+'")').parent().addClass('active');
		$('#node_id').val(nodeId);
	}else{
		$('.nodelist').children().eq(0).addClass('active');
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
function GetXmlHttpObject(){     
	var xmlHttp = null;     
	try{         xmlHttp = new XMLHttpRequest();     }
	catch(e){         
		try{             
			xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");         
		}catch(e){             
			xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");         
		}     
	}     
	return xmlHttp; 
}
function updateMaxAlert(sensorId,maxAlert){ 
	// alert(sensorId);
	// alert(maxAlert); 
	xmlHttp = GetXmlHttpObject();     
	if(xmlHttp == null){         
		alert ("you browser don't support the ajax");          
		return;     
	}     
	var url = "./servlet/SensorUpdate";     
	url = url + "?sensorId="+ sensorId;     
	url = url + "&maxAlert="+ maxAlert;     
	url = url + "&sid ="+ Math.random();     
	xmlHttp.onreadystatechange = stateChanged;     
	xmlHttp.open("GET", url, true);     
	xmlHttp.send(null); 
} 
function updateMinAlert(sensorId,minAlert){ 

	xmlHttp = GetXmlHttpObject();     
	if(xmlHttp == null){         
		alert ("you browser don't support the ajax");          
		return;     
	}     
	var url = "./servlet/SensorUpdate";     
	url = url + "?sensorId="+ sensorId;     
	url = url + "&minAlert="+ minAlert;     
	url = url + "&sid ="+ Math.random();     
	xmlHttp.onreadystatechange = stateChanged;     
	xmlHttp.open("GET", url, true);     
	xmlHttp.send(null); 
} 

function stateChanged() {     
	if(xmlHttp.readyState==4)     {         
		//document.getElementById("rocarsmaxAlert").value = xmlHttp.responseText;  
		alert("update success");   
	} 
}
function updateLocation(nodeId,location){ 

	xmlHttp = GetXmlHttpObject();     
	if(xmlHttp == null){         
		alert ("you browser don't support the ajax");          
		return;     
	}     
	var url = "./servlet/SensorUpdate";     
	url = url + "?nodeId="+ nodeId;     
	url = url + "&location="+ encodeURI(encodeURI(location)); 
	// url=encodeURI(url); 
	// url=encodeURI(url); //最重要的部分,两次调用encodeURI ,就是编码两次
	xmlHttp.onreadystatechange = refresh;     
	xmlHttp.open("GET", url, true);     
	xmlHttp.send(null); 
}

function refresh(){
	if(xmlHttp.readyState==4){ 
		location.reload();
	}
}
// function switch_sensor(sensorId,switch_state){
// 	xmlHttp = GetXmlHttpObject();     
// 	if(xmlHttp == null){         
// 		alert ("you browser don't support the ajax");          
// 		return;     
// 	}     
// 	var url = "./servlet/SwitchSensor";     
// 	url = url + "?sensorId="+ sensorId;     
// 	url = url + "&switch_state="+ switch_state;
// 	xmlHttp.onreadystatechange = stateChanged;     
// 	xmlHttp.open("GET", url, true);     
// 	xmlHttp.send(null); 
// }
function recontrol(nodeId,samplerate) {
	// alert(nodeId);
	// alert(samplerate);
	xmlHttp = GetXmlHttpObject();     
	if(xmlHttp == null){         
		alert ("you browser don't support the ajax");          
		return;     
	}     
	var url = "./recontrol_1.jsp"; 
	url = url + "?nodeId="+ nodeId;   
	url = url + "&samplerate="+ samplerate;     
	url = url + "&sid ="+ Math.random();     
	xmlHttp.onreadystatechange = controlSend;     
	xmlHttp.open("GET", url, true);     
	xmlHttp.send(null); 
}
function controlSend() {     
	if(xmlHttp.readyState==4)     {         
		//document.getElementById("rocarsmaxAlert").value = xmlHttp.responseText;  
		alert("send success");   
	} 
}