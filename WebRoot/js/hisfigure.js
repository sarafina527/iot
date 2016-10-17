function getLinejson(){
    var requestData = {nodeId:parent.$('.nodelist li.active span').text(),type:$('.typelist li.active span').text()};
    var curl = location.href;
    var head = curl.slice(0,curl.indexOf('iot'))+'iot/';
    $.get(head+'servlet/HistoryJson',requestData,function(data){
        // window.linejson = data;
        linejson = JSON.parse(data);//传数据
	    var visitChart = new FusionCharts({
	        id: 'lineID',
	        type: 'line',
	        renderAt: 'linechart',
	        width: '800',
	        height: '300',
	        dataFormat: 'json',
	        dataSource: {
	            "chart": {
	                "caption": "趋势图",
	                "xAxisName": "日期(date)",
	                "yAxisName": $('.typelist li.active').text(),
	                //Cosmetics
	                "lineThickness" : "2",
	                "paletteColors" : "#0075c2",
	                "baseFontColor" : "#333333",
	                "captionFontSize" : "14",
	                "divlineAlpha" : "100",
	                "divlineColor" : "#999999",
	                "divlineThickness" : "1",
	                "divLineIsDashed" : "1",
	                "showXAxisLine" : "1",
	                "showAlternateHGridColor" : "0",                    
	            },
	            "data":linejson,
	            "trendlines": [
	            {
	                "line": [
	                    {
	                        "startvalue": mmjson[$('.typelist li.active span').text()+'_max'],
	                        "endvalue": "",
	                        "istrendzone": "",
	                        "valueonright": "1",
	                        "color": "fda813",
	                        "displayvalue": "max",
	                        "showontop": "1",
	                        "thickness": "2"
	                    },
	                    {
	                        "startvalue": mmjson[$('.typelist li.active span').text()+'_min'],
	                        "endvalue": "",
	                        "istrendzone": "",
	                        "valueonright": "1",
	                        "color": "f77027",
	                        "displayvalue": "警戒值",
	                        "showontop": "1",
	                        "thickness": "2"
	                    }
	                ]
	            }
	        ]
	        },
	    });  
		visitChart.render();
    });
}
//获取MaxMin对象
function getMaxMin(){
    var requestData = {nodeId:parent.$('.nodelist li.active span').text()};
    var curl = location.href;
    var head = curl.slice(0,curl.indexOf('iot'))+'iot/';
    $.get(head+'servlet/MaxMinServlet',requestData,function(data){
        window.mmjson = JSON.parse(data);//获取当前第一条数据  全局变量存储最新数据
        console.log(mmjson[$('.typelist li.active span').text()+'_max']);
    });
}

function linechart() {
    var requestData = {nodeId:parent.$('.nodelist li.active span').text(),type:$('.typelist li.active span').text(),stdate:parent.$("#stdate").val(),enddate:parent.$("#enddate").val()};
    var curl = location.href;
    var head = curl.slice(0,curl.indexOf('iot'))+'iot/';
    $.get(head+'servlet/HistoryJson',requestData,function(data){
        window.linejson = JSON.parse(data);//传数据
        console.log(linejson);
        var visitChart = new FusionCharts({
            id: 'lineID',
            type: 'line',
            renderAt: 'linechart',
            width: '800',
            height: '300',
            dataFormat: 'json',
            dataSource: {
                "chart": {
                    "caption": "趋势图",
                    "xAxisName": "时间(time)",
                    "yAxisName": $('.typelist li.active').text(),
                    //Cosmetics
                    "lineThickness" : "2",
                    "paletteColors" : "#0075c2",
                    "baseFontColor" : "#333333",
                    "captionFontSize" : "14",
                    "divlineAlpha" : "100",
                    "divlineColor" : "#999999",
                    "divlineThickness" : "1",
                    "divLineIsDashed" : "1",
                    "showXAxisLine" : "1",
                    "showAlternateHGridColor" : "0", 
                    "showvalues": "0",
                    "labelStep": "16",	
                    "anchorRadius" :"0",
                    "labelDisplay": "none" ,
                    // "slantLabels" :"2"       
                },
                "data":linejson,
                "trendlines": [
                {
                    "line": [
                        {
                            "startvalue": mmjson[$('.typelist li.active span').text()+'_max'],
                            "endvalue": "",
                            "istrendzone": "",
                            "valueonright": "1",
                            "color": "fda813",
                            "displayvalue": "max",
                            "showontop": "1",
                            "thickness": "2"
                        },
                        {
                            "startvalue": mmjson[$('.typelist li.active span').text()+'_min'],
                            "endvalue": "",
                            "istrendzone": "",
                            "valueonright": "1",
                            "color": "f77027",
                            "displayvalue": "警戒值",
                            "showontop": "1",
                            "thickness": "2"
                        }
                    ]
                }
            ]
            }, 
            "events":{
                "rendered": function(evtObj, argObj){
                    setInterval(function () {
                        console.log(linejson);
                    }, 5000);
                }
            }           
        });
    
        visitChart.render();
    });
    
}