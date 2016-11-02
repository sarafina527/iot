/*
 * test
 */
function Person(personName) {
	this.name = personName;
	this.info = "sadfadfaf";
	this.showInfo = function() {
		alert(this.info);
	};
}

function sleep(numberMillis) { 
	var now = new Date(); 
	var exitTime = now.getTime() + numberMillis; 
	while (true) { 
	now = new Date(); 
	if (now.getTime() > exitTime) 
	return; 
	} 
}

/*
 * Ajax
 */
function BunnyAjax(){
	this.bunnyRequest;
	this.bunnyRequestInfo;
	this.getXMLHttpRequest = function(){
		try{
			try{
				return new ActiveXObject("Microsoft.XMLHTTP");
			}
			catch(e){
				return new ActiveXObject("Msxml2.XMLHTTP");
			}
		}
		catch(e){
			return new XMLHttpRequest();
		}
	};
	
	//the request data include deviceId dataId method, measure and time 
	//deviceId 对应 节点几
	//dataId 对应 dataStore
	this.callBunnyAjax = function(requestInfo){
		var url = "http://localhost:8080/TestForJs/servlet/DataForBunnyChartServlet";
		//parse the requestInfo and reconstruct the url
		url = url + "?deviceId=" + requestInfo.deviceId;
		url = url + "&time=" + requestInfo.time;
		url = url + "&measure=" + requestInfo.measure;
		url = url + "&_dc=" + (new Date()).getTime();
		
		this.bunnyRequest.open("GET", url , true);
//		this.bunnyRequest.onreadystatechange = this.responseAjax;
		this.bunnyRequest.send(null);
	};
	
	this.responseAjax = function(){
		if(myRequest.bunnyRequest.readyState == 4){
			if(myRequest.bunnyRequest.status == 200){
				//var justlooklook = myRequest.bunnyRequest.responseText;
				//解析数据  
				//根据dataId  把数据放入对应的dataStore中
				var dataJson = JSON.parse(myRequest.bunnyRequest.responseText);
				//var justlooklook = dataJson.dataId;
				DataStore[dataJson.dataId] = dataJson;
				
				
			}
		}
	};
};

var myRequest = new BunnyAjax();
myRequest.bunnyRequest = myRequest.getXMLHttpRequest();
//you can call callBunnyAjax when you need refresh the data
//myRequest.callBunnyAjax();

/*
 * dataStore
 * globle data receive the data come from ajax
 * 
 */
var DataStore = {
	dataNum : 0 ,
//	data1 : {
//		min : null,
//		max : null,
//		avg : null
//	}
};


/*
 * BunnyChart		version 0.1
 * bar
 * 
 */

var BunnyChart = {};

BunnyChart.testNum = 1;
BunnyChart.ctx;
BunnyChart.Draw;
BunnyChart.testVariable;


/*
 * BunnyChart.Refresh 		version 0.1
 * 1 通过Ajax更新DataStore中的数据
 * 2 重画每个instance
 * 				 
 * 					 
 */
BunnyChart.Refresh = function(){
	
	//遍历 BunnyChart.InstanceRegist  利用Ajax取数据         
	//这里要改，数据更新太频繁，一个设备一次更新就好，现在是一个设备N个表，就要更新N吃
//	myRequest.bunnyRequestInfo = {};
	var nCount = 0;
	for(nCount=0 ; nCount<BunnyChart.InstanceRegist.instanceNum ; nCount++ ){
		
//		var myRequest = new BunnyAjax();
//		myRequest.bunnyRequest = myRequest.getXMLHttpRequest();
//		myRequest.bunnyRequestInfo = {};
//		
//		myRequest.bunnyRequestInfo.deviceId	= BunnyChart.InstanceRegist.instanceArray[nCount].instanceObject.option.deviceId;
//		myRequest.bunnyRequestInfo.method	= BunnyChart.InstanceRegist.instanceArray[nCount].instanceObject.option.method;
//		myRequest.bunnyRequestInfo.measure 	= BunnyChart.InstanceRegist.instanceArray[nCount].instanceObject.option.measure;
//		myRequest.bunnyRequestInfo.time		= BunnyChart.InstanceRegist.instanceArray[nCount].instanceObject.option.time;
		
		var barObject;
		barObject = BunnyChart.InstanceRegist.instanceArray[nCount].instanceObject;
		
//		myRequest.bunnyRequest.onreadystatechange = function(){
//			if(myRequest.bunnyRequest.readyState == 4){
//				if(myRequest.bunnyRequest.status == 200){
//					//解析数据  
//					//根据dataId  把数据放入对应的dataStore中
//					var dataJson = JSON.parse(myRequest.bunnyRequest.responseText);
//					//var justlooklook = dataJson.dataId;
//					DataStore[dataJson.dataId] = dataJson;
//					
//					delete myRequest.bunnyRequest;
//					myRequest.bunnyRequest = null;
//				}
//			}
//		};
		
//		setTimeout(function(){
//			myRequest.callBunnyAjax(myRequest.bunnyRequestInfo);
//        },100*nCount);
		
		var url = "http://localhost:8080/TestForJs/servlet/DataForBunnyChartServlet";
		//parse the requestInfo and reconstruct the url
		url = url + "?deviceId=" + barObject.bunnyRequestInfo.deviceId;
		url = url + "&time=" + barObject.bunnyRequestInfo.time;
		url = url + "&measure=" + barObject.bunnyRequestInfo.measure;
		url = url + "&_dc=" + (new Date()).getTime();
		
		barObject.bunnyRequest.open("GET", url , true);
//		this.bunnyRequest.onreadystatechange = this.responseAjax;
		barObject.bunnyRequest.send(null);
//		myRequest.callBunnyAjax(myRequest.bunnyRequestInfo);
		sleep(300);
	}
	
	//遍历 BunnyChart.InstanceRegist  利用每个对象进行重画
	for(nCount=0 ; nCount<BunnyChart.InstanceRegist.instanceNum ; nCount++ ){
		BunnyChart.InstanceRegist.instanceArray[nCount].instanceObject.Draw();
		
	}
	
};

setInterval(
		BunnyChart.Refresh , 1000
	);

/*
 * BunnyChart.InstanceRegist 		version 0.1
 * instanceNum  当前网页中新建了多少个实例
 * instanceArray  当前网页中每个实例的信息
 * 					包括了实例使用的数据（设备）信息
 * 						实例的指针
 */
BunnyChart.InstanceRegist = {
		instanceNum : 0
};
BunnyChart.InstanceRegist.instanceArray = new Array();



/*
 * BunnyChart		version 0.1
 * bar构造函数
 * 
 */
BunnyChart.Bar = function(divId) {
	this.option = {
		deviceId : 0,
		time : "weekly", // daily , weekly , monthly
		measure : "light", // light , temp , humi
		method : [ "min", "max", "avg" ], // "min","max","avg"
		yAxisStart : 0,
		yAxisStep : 20,
		margin : {
			left : 40,
			top : 40,
			right : 40,
			bottom : 40
		},
		SpaceBetBarDiffArr : 40, // width between bars in different array
		SpaceBetBarSameArr : 5, // width between bars in same array
		existGrid : true
	};
	this.mapDiv = document.getElementById(divId);

	this.canvas = document.createElement('canvas');
	// compute width and height of specified div
	this.width = this.mapDiv.offsetWidth;
	this.height = this.mapDiv.offsetHeight;
	this.canvas.width = this.width;
	this.canvas.height = this.height;
	//add canvas to specified div
	this.mapDiv.appendChild(this.canvas);
	this.ctx = this.canvas.getContext("2d");
	BunnyChart.ctx = this.canvas.getContext("2d");
	BunnyChart.Draw = this.Draw;
	
	
	//在每个BunnyChart.Bar对象中新建一个XHR对象
	this.bunnyRequest = myRequest.getXMLHttpRequest();
	this.bunnyRequestInfo = {};
	
//	//Index in dataStroe
//	DataStore.dataNum = DataStore.dataNum + 1 ;
//	this.indexOfDataStroe = "data" + DataStore.dataNum;
	
	BunnyChart.testVariable = this;
	
	//display window in chart
	this.disWnd = {
		left : 0,
		top : 0,
		right :0,
		bottom : 0
	};
	//bar width use ComputeBarWidth() to compute before call draw()
	this.barWidth = 10;
	
	//刷新函数
	this.Refresh = function(refreshInt){
		myRequest.bunnyRequestInfo = {
			deviceId : this.option.deviceId,
			method : this.option.method,
			measure : this.option.measure,
			time : this.option.time
		};
		
		setInterval(
			"BunnyChart.Draw(BunnyChart.ctx)" , refreshInt
		);
	
		
	};
	
	this.ComputeDisWnd = function(){
		this.disWnd.left = this.option.margin.left ;
		this.disWnd.top = this.option.margin.top ;
		this.disWnd.right = this.width - this.option.margin.right ;
		this.disWnd.bottom = this.height - this.option.margin.bottom ;		
	};
	
	this.ComputeBarWidth = function(){
		var barNum = this.option.method.length;
		this.barWidth = ((this.disWnd.right - this.disWnd.left)-this.option.SpaceBetBarDiffArr) / barNum - this.option.SpaceBetBarDiffArr;
		if(this.barWidth >= 5){
			return true;
		} 
		else {
			//there is no sufficient space
			return false;
		} 
		
	};
	
	this.DrawGrid = function(){
		var ctx = this.ctx;
		var disWndWidth = this.disWnd.right - this.disWnd.left;
		var disWndHeight = this.disWnd.bottom - this.disWnd.top;
		var xStart = this.disWnd.left;
		var yStart = this.disWnd.top;
		var xEnd = this.disWnd.right;
		var yEnd = this.disWnd.bottom;
		var xCur = this.disWnd.left;
		var yCur = this.disWnd.bottom;
		var xInterval = disWndWidth / 10 ;
		var yInterval = disWndHeight / 10 ;
		
//		ctx.beginPath(); 
		var count=0;
		//竖线
		for(count=0 ; count<11 ; count++){
			xCur = xStart + count * xInterval;
			ctx.beginPath();
			ctx.moveTo(xCur , yStart); 
			ctx.lineTo(xCur , yEnd); 
			ctx.closePath();
			ctx.lineWidth = 0.5; 
			ctx.strokeStyle = "#CECECE"; 
			ctx.stroke(); 
		}
		//横线
		for(count=0 ; count<11 ; count++){
			yCur = yStart + count * yInterval;
			ctx.beginPath();
			ctx.moveTo(xStart , yCur); 
			ctx.lineTo(xEnd , yCur); 
			ctx.closePath();
			ctx.lineWidth = 0.5; 
			ctx.strokeStyle = "#CECECE"; 
			ctx.stroke(); 
		}
		
//		ctx.lineWidth = 2.0; 
//		ctx.strokeStyle = "#CC0000";
//		ctx.stroke(); 
	};

	this.DrawAxis = function(){
		var ctx = this.ctx;
		var xStart = this.disWnd.left;
		var yStart = this.disWnd.bottom;
		var xEnd = this.disWnd.right;
		var yEnd = this.disWnd.top;
		
		ctx.beginPath();
		ctx.moveTo(xStart , yStart); 
		ctx.lineTo(xStart , yEnd); 
		ctx.closePath();
		ctx.lineWidth = 0.5; 
		ctx.strokeStyle = "#000000"; 
		ctx.stroke(); 
		
		ctx.beginPath();
		ctx.moveTo(xStart , yStart); 
		ctx.lineTo(xEnd , yStart); 
		ctx.closePath();
		ctx.lineWidth = 0.5; 
		ctx.strokeStyle = "#000000"; 
		ctx.stroke(); 
		
		var yMaxValue = 0;
		if(this.option.measure == "light"){
			yMaxValue = 10000;
		}else if(this.option.measure == "temp"){
			yMaxValue = 50;
		}else{
			yMaxValue = 100;
		}
		var count = 0;
		ctx.font = "Bold 10px Arial"; 
//		ctx.font = "Bold 20px 宋体"; 
		ctx.textAlign = "right";
		ctx.fillStyle = "#222222"; 
		var outPut;
		var yStart = this.disWnd.bottom;
		var spaceInAxis = (this.disWnd.bottom - this.disWnd.top)/10;
		for(count=0 ; count<11 ; count++){
			outPut = yMaxValue/10*count;
			ctx.fillText(outPut, this.disWnd.left-5, yStart-spaceInAxis*count+4); 
		}
		
		ctx.font = "20px 宋体"; 
		var xStart = this.disWnd.left + this.option.SpaceBetBarDiffArr + this.barWidth * 0.7;
		var yStart = this.disWnd.bottom + 20 ;
		ctx.fillText("最小值", xStart, yStart); 
		xStart = xStart + this.barWidth + this.option.SpaceBetBarDiffArr;
		ctx.fillText("最大值", xStart, yStart); 
		xStart = xStart + this.barWidth + this.option.SpaceBetBarDiffArr;
		ctx.fillText("平均值", xStart, yStart); 
	};
	
	this.DrawBar = function(){
		var ctx = this.ctx;
		
		var barNum = this.option.method.length;
		var yMaxValue = 0;
		if(this.option.measure == "light"){
			yMaxValue = 10000;
		}else if(this.option.measure == "temp"){
			yMaxValue = 50;
		}else{
			yMaxValue = 100;
		}
		var dataMin ;
		var dataMax ;
		var dataAvg ;
		//before ajax running, all the value is NaN
		if(DataStore[this.indexOfDataStroe] == null){ dataMin = yMaxValue * 0.1; }
		else{ dataMin = DataStore[this.indexOfDataStroe].min; }
		if(DataStore[this.indexOfDataStroe] == null){ dataMax = yMaxValue * 0.1; }
		else{ dataMax = DataStore[this.indexOfDataStroe].max; }
		if(DataStore[this.indexOfDataStroe] == null){ dataAvg = yMaxValue * 0.1; }
		else{ dataAvg = DataStore[this.indexOfDataStroe].avg; }
		
		var count = 0;
		var xStart = this.disWnd.left + this.option.SpaceBetBarDiffArr;
		var yStart = this.disWnd.bottom;
		var xEnd = 0;
		var yEND = 0;
		ctx.lineWidth = 3;
//		for(count=0 ; count<barNum ; count++){
		xEnd = xStart + this.barWidth;
		yEND = yStart - dataMin / yMaxValue * (this.disWnd.bottom - this.disWnd.top);
		ctx.fillStyle = "#CBDDE6";
		ctx.fillRect(xStart, yEND, xEnd-xStart , yStart-yEND);
		ctx.strokeStyle = "#97BBCD";
		ctx.strokeRect(xStart, yEND, xEnd-xStart , yStart-yEND);
//		}
		xStart = xStart + this.barWidth + this.option.SpaceBetBarDiffArr;
		xEnd = xStart + this.barWidth;
		yEND = yStart - dataMax / yMaxValue * (this.disWnd.bottom - this.disWnd.top);
		ctx.fillStyle = "#CBDDE6";
		ctx.fillRect(xStart, yEND, xEnd-xStart , yStart-yEND);
		ctx.strokeStyle = "#97BBCD";
		ctx.strokeRect(xStart, yEND, xEnd-xStart , yStart-yEND);

		xStart = xStart + this.barWidth + this.option.SpaceBetBarDiffArr;
		xEnd = xStart + this.barWidth;
		yEND = yStart - dataAvg / yMaxValue * (this.disWnd.bottom - this.disWnd.top);
		ctx.fillStyle = "##CBDDE6";
		ctx.fillRect(xStart, yEND, xEnd-xStart , yStart-yEND);
		ctx.strokeStyle = "#97BBCD";
		ctx.strokeRect(xStart, yEND, xEnd-xStart , yStart-yEND);
		
	};
	
	this.DrawLabel = function(){
		var ctx = this.ctx;
		var outPut;
		if(this.option.measure == "light"){
			outPut = "光照强度（单位：Lx）";
		}else if(this.option.measure == "temp"){
			outPut = "环境温度（单位：°C）";
		}else{
			outPut = "环境湿度（单位：g/m3）";
		}
		ctx.font = "20px 宋体"; 
		ctx.strokeStyle = "#000000";
		ctx.textAlign = "left";
		var xStart = 10;
		var yStart = this.disWnd.top - 15 ;
		ctx.fillText(outPut, xStart, yStart); 
		
		if(this.option.time == "daily"){
			outPut = "本天内数据统计";
		}else if(this.option.time == "weekly"){
			outPut = "本周内数据统计";
		}else{
			outPut = "本月数据统计";
		}
		ctx.textAlign = "right";
		var xStart = this.canvas.width - this.barWidth * 0.2;
		var yStart = this.disWnd.top - 20 ;
		ctx.fillText(outPut, xStart, yStart); 
	};
	
	this.Draw = function(specifiedCtx) {
//		alert("i'm here------------1");
		var ctx;
		if(specifiedCtx = null){
			ctx = specifiedCtx;
		}else{
			ctx = this.ctx;
		}
		//记得先擦除
		ctx.fillStyle = "white";
		ctx.fillRect(0 , 0 , this.canvas.width-1 , this.canvas.height-1);
	    
//		ctx.strokeStyle = "red";
//		// ���Ĳ������ƾ��Σ�ֻ���ߡ������ǿյ�
//		ctx.strokeRect(10, 10, 190, 100);
//		ctx.fillStyle = "blue";
//		ctx.fillRect(110, 110, 100, 100);
//		ctx.moveTo(1, 1);
//		ctx.lineTo(800, 800);
//
//		ctx.beginPath(); // ��ʼ·������
//		ctx.moveTo(20, 20); // ����·����㣬���Ϊ(20,20)
//		ctx.lineTo(200, 200); // ����һ����(200,20)��ֱ��
//		ctx.lineTo(400, 20);
//		ctx.closePath();
//		ctx.lineWidth = 2.0; // �����߿�
//		ctx.strokeStyle = "#CC0000"; // �����ߵ���ɫ
//		ctx.stroke(); // �����ߵ���ɫ����ʱ�����߲ű�ÿɼ�
		
//		ctx.font = "Bold 20px Arial"; 
//		ctx.font = "Bold 20px 宋体"; 
//		ctx.textAlign = "left";
//		ctx.fillStyle = "#008600"; 
//		ctx.fillText("呵呵!", 10, 50); 
//		ctx.strokeText("Hello!", 10, 100);
		
		BunnyChart.testNum = 2;
		
		/*  
		 *  1 compute space
		 * (1) compute postion of display window
		 * (2) compute the width of bars
		 */ 
		this.ComputeDisWnd();
		if( this.ComputeBarWidth() == false){
			
			ctx.font = "Bold 20px 宋体"; 
			ctx.textAlign = "left";
			ctx.fillStyle = "#008600"; 
			ctx.fillText("空间不够!", 10, 50); 
			ctx.strokeText("请调整option或div元素属性", 10, 100);
			
		}
		
		// get the data for displaying firstly, cause the max of data would be used in drawing grid
		
		
		//2 draw grid
		this.DrawGrid();	
		
		//3 draw bar
		this.DrawBar();
		
		//4 draw xAxis and yAxis
		this.DrawAxis();
				
		//5 draw xlabel ylabel and unit
		this.DrawLabel();
		
		
		
		
	};

	// Initial function receive json as a parameter, the json is assigned by user
	this.Initial = function(optionInfo) { //  receive json
		if (optionInfo.deviceId != null) {
			this.option.deviceId = optionInfo.deviceId;
		}
		if (optionInfo.time != null) {
			this.option.time = optionInfo.time;
		}
		if (optionInfo.measure != null) {
			this.option.measure = optionInfo.measure;
		}
		if (optionInfo.method != null) {
			this.option.method = optionInfo.method;
		}
		if (optionInfo.yAxisStart != null) {
			this.option.yAxisStart = optionInfo.yAxisStart;
		}
		if (optionInfo.yAxisStep != null) {
			this.option.yAxisStep = optionInfo.yAxisStep;
		}
		
		//Index in dataStroe
		DataStore.dataNum = DataStore.dataNum + 1 ;
		this.indexOfDataStroe = "data" + this.option.deviceId;		//有可能多个chart用一个数据源
		
		//在InstanceRegist 中登记我们初始化的实例
		//因为实例中要包含设备的ID，所以登记操作放在了Initial中，不能放在构造函数中
		BunnyChart.InstanceRegist.instanceArray[BunnyChart.InstanceRegist.instanceNum] = {
			deviceId : this.indexOfDataStroe,
			instanceObject : this
		};
		BunnyChart.InstanceRegist.instanceNum = BunnyChart.InstanceRegist.instanceNum + 1;
		
		//初始化每个BunnyChart.Bar对象中的XHR对象，要在初始化option的参数后才能进行		
		this.bunnyRequestInfo.deviceId	= this.option.deviceId;
		this.bunnyRequestInfo.method	= this.option.method;
		this.bunnyRequestInfo.measure 	= this.option.measure;
		this.bunnyRequestInfo.time		= this.option.time;
		this.bunnyRequest.onreadystatechange = function(){
			if(this.readyState == 4){
				if(this.status == 200){
					//解析数据  
					//根据dataId  把数据放入对应的dataStore中
					var dataJson = JSON.parse(this.responseText);
					//var justlooklook = dataJson.dataId;
					DataStore[dataJson.dataId] = dataJson;
					
				//	delete myRequest.bunnyRequest;
				//	myRequest.bunnyRequest = null;
				}
			}
		};
		
		
		//设置完成后立即进行一次绘图
		this.Draw();
	};

};
