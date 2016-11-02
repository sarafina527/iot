function winshow2()
{
	var x1=document.getElementById("r_t_d");
	var x2=document.getElementById("h_d");
	var x3=document.getElementById("a_d");
	x1.className="hidden";
	x2.className="show";
	x3.className="hidden";
	var title1=document.getElementById("t_r_t_d");
	var title2=document.getElementById("t_h_d");
	var title3=document.getElementById("t_a_d");
	title1.className="buttondefault";
	title2.className="buttonactive";
	title3.className="buttondefault";
}
function winshow1()
{
	var x1=document.getElementById("r_t_d");
	var x2=document.getElementById("h_d");
	var x3=document.getElementById("a_d");
	x1.className="show";
	x2.className="hidden";
	x3.className="hidden";
	var title1=document.getElementById("t_r_t_d");
	var title2=document.getElementById("t_h_d");
	var title3=document.getElementById("t_a_d");
	title1.className="buttonactive";
	title2.className="buttondefault";
	title3.className="buttondefault";	
}
function winshow3()
{
	var x1=document.getElementById("r_t_d");
	var x2=document.getElementById("h_d");
	var x3=document.getElementById("a_d");
	x1.className="hidden";
	x2.className="hidden";
	x3.className="show";
	var title1=document.getElementById("t_r_t_d");
	var title2=document.getElementById("t_h_d");
	var title3=document.getElementById("t_a_d");
	title1.className="buttondefault";
	title2.className="buttondefault";
	title3.className="buttonactive";	
}
var flag = false;
function CheckForm()
{
  var photo=document.getElementById("oc");
 if(flag)
 {
  document.getElementById("oc").src = "imageswpf/open.png";
  flag=false;
 }else {
  document.getElementById("oc").src = "imageswpf/close.png";
  flag=true;
  }
  
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
var stateflag = false;
function stateChange()
{
	var nodeId=document.getElementById("pumpnumber").value;
	xmlHttp = GetXmlHttpObject();     
	if(xmlHttp == null){         
		alert ("you browser don't support the ajax");          
		return;     
	}     
	var url = "./pumprecontrol_1.html"; 
	url = url + "?nodeId="+ nodeId;   
	     
	
	 if(stateflag)
	 {
		document.getElementById("oc").src = "imageswpf/open.png";
		stateflag=false;
		url = url + "&state="+ 1;     
		url = url + "&sid ="+ Math.random();

	 }else {
		document.getElementById("oc").src = "imageswpf/close.png";
		stateflag=true;
		url = url + "&state="+ 0;     
		url = url + "&sid ="+ Math.random();
	 }
	xmlHttp.onreadystatechange = pumpcontrolSend;     
	xmlHttp.open("GET", url, true);     
	xmlHttp.send(null);
  
}
function pumpcontrolSend() {     
	if(xmlHttp.readyState==4)     {         
		//document.getElementById("rocarsmaxAlert").value = xmlHttp.responseText;  
		alert("send success");   
	} 
}

function onchanged(obj){
         document.getElementById('txt').value=obj.options[obj.selectedIndex].text;
         //alert(txt);
    }
function nodechanged () {
	var nodeId = document.getElementById("pumpnumber").value;
	if(nodeId=="1"){
		var url = "./pumpindex.html";
	}else if (nodeId == "2") {
		var url = "./pumpindex_2.html";
	}else {
		var url = "./pumpindex_3.html";
	}
	location = url;
}
function hnodechanged () {
	var nodeId = document.getElementById("pumpnumber").value;
	if(nodeId=="1"){
		var url = "./pumphistory.html";
	}else if (nodeId == "2") {
		var url = "./pumphistory_2.html";
	}else {
		var url = "./pumphistory_3.html";
	}
	location = url;
}
function anodechanged () {
	var nodeId = document.getElementById("pumpnumber").value;
	if(nodeId=="1"){
		var url = "./analysis.html";
	}else if (nodeId == "2") {
		var url = "./analysis_2.html";
	}else {
		var url = "./analysis_3.html";
	}
	location = url;
}
  