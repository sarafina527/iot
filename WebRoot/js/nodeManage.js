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
	// alert(sensorId);
	// alert(maxAlert); 
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
// function getmaxAlert(str){     
// 	xmlHttp = GetXmlHttpObject();     
// 	if(xmlHttp == null){         
// 		alert ("you browser don't support the ajax");          
// 		return;     
// 	}     
// 	var url = "./sensorResponse_1.jsp";     
// 	url = url + "?q="+ str;     
// 	url = url + "&sid ="+ Math.random();     
// 	xmlHttp.onreadystatechange = stateChanged;     
// 	xmlHttp.open("GET", url, true);     
// 	xmlHttp.send(null); 
// } 
function stateChanged() {     
	if(xmlHttp.readyState==4)     {         
		//document.getElementById("rocarsmaxAlert").value = xmlHttp.responseText;  
		alert("update success");   
	} 
}
// function recontrol(nodeId,sensorId,samplerate) {
// 	alert(sensorId);
// 	alert(samplerate);
// 	xmlHttp = GetXmlHttpObject();     
// 	if(xmlHttp == null){         
// 		alert ("you browser don't support the ajax");          
// 		return;     
// 	}     
// 	var url = "./recontrol_1.jsp"; 
// 	url = url + "?nodeId="+ nodeId;   
// 	url = url + "&sensorId="+ sensorId;     
// 	url = url + "&samplerate="+ samplerate;     
// 	url = url + "&sid ="+ Math.random();     
// 	xmlHttp.onreadystatechange = controlSend;     
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