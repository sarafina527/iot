//图表
//获取仪表盘的最新数据   
function getGaugejson(){
    var requestData = {nodeId:$('.nodelist li.active span').text()};
    $.get('servlet/realtimeJson',requestData,function(data){
        window.rtjson = JSON.parse(data);//获取当前第一条数据  全局变量存储最新数据
        $('.datetime').text(rtjson.date+" "+rtjson.time);

    });
    // console.log(rtjson);
}
function getLinejson(){
    var requestData = {nodeId:$('.nodelist li.active span').text(),type:$('.typelist li.active span').text()};
    $.get('servlet/rtJsonServlet',requestData,function(data){
        window.linejson = data;
    });
}

//仪表盘5个子图
function gaugechart() {
    var requestData = {nodeId:$('.nodelist li.active span').text()};
    $.get('servlet/realtimeJson',requestData,function(data){
        window.rtjson = JSON.parse(data);//获取当前第一条数据
        $('.datetime').text(rtjson.date+" "+rtjson.time);
        var tempchart = new FusionCharts({
            type: 'thermometer',
            renderAt: 'chart-container1',
            id  : 'tempID',
            width: '200',
            height: '250',
            dataFormat: 'json',
            dataSource: {
                "chart": {
                    "caption": "气温监测",
                    "lowerLimit": "0",//最小值
                    "upperLimit": "100", //最大值          
                    "decimals" : "2",//小数
                    "numberSuffix": "°C",//单位
                    "showhovereffect": "1",//鼠标移上的特效
                    "thmFillColor": "#6d5799",//液体颜色
                    "thmOriginX": "100",
                    "valueFontColor" : "#000000",//字体颜色
                    "theme" : "fint",
                    "bgCOlor": "#ffffff"
                },
                "value":rtjson.temp,
            },
            "events" :{
                "initialized": function (evt, arg) {
                    var dataUpdate = setInterval(function () {                        
                        FusionCharts.items["tempID"].feedData("&value="+rtjson.temp);//传数据
                    }, 5000);//设置更新频率5000ms
                    
                },
                
            }
        });
        var humichart = new FusionCharts({
            type: 'cylinder',
            dataFormat: 'json',
            id: 'humiID',
            renderAt: 'chart-container2',
            width: '200',
            height: '250',
            dataSource: {
                "chart": {
                    "caption": "湿度监测",
                    "lowerLimit": "0",
                    "upperLimit": "100",
                    "numberSuffix": "g/m3",
                    "showValue": "0",
                    "showhovereffect": "1",
                    "bgCOlor": "#ffffff",
                    "borderAlpha": "0",
                    "cylFillColor": "#008ee4",
                    "showValue":true
                },
                "value":rtjson.humi
            },
            "events":{
                "rendered": function(evtObj, argObj){
                    setInterval(function () {
                        FusionCharts.items["humiID"].feedData("&value="+rtjson.humi);//传数据
                    }, 5000);
                }
            }
        });
        var lightchart = new FusionCharts({
            type: 'bulb',
            renderAt: 'chart-container3',
            id: 'lightID',
            width: '200',
            height: '250',
            dataFormat: 'json',
            dataSource: {
                "chart": {
                    "caption": "光照监测",
                    "upperlimit": "25000",
                    "lowerlimit": "200",
                    "captionPadding":"30",
                    "showshadow":"0",
                    "showvalue": "1",
                    "useColorNameAsValue":"1",
                    "placeValuesInside":"1",
                    "valueFontSize": "16",
                    //Cosmetics
                    "showborder": "0",
                    "bgcolor": "#FFFFFF",
                    "showValue":true
                },
                "colorrange": {
                    "color": [
                        {
                            "minvalue": "25000",
                            "maxvalue": "30000",
                            "label": "超出上界！",
                            "code": "#ff0000"
                        }, 
                        {
                            "minvalue": "200",
                            "maxvalue": "25000",
                            "label": "指标正常",
                            "code": "#00ff00"
                        }, 
                        {
                            "minvalue": "",
                            "maxvalue": "200",
                            "label": "超出下界",
                            "code": "#ff9900"
                        }
                    ]
                },
                "value": rtjson.light
            },
            "events":{
                "rendered": function(evtObj, argObj){               
                    setInterval(function () {
                        // var requestData = {nodeId:$('.nodelist li.active span').text(),type:"light"};
                        // $.get('servlet/realtimeValue',requestData,function(data){
                        //     FusionCharts.items["light"].feedData("&value="+data);//传数据
                        // });
                        FusionCharts.items["lightID"].feedData("&value="+rtjson.light);//传数据
                        // console.log(rtjson.count);
                    }, 5000);
                }
            }
        });
        var stempchart = new FusionCharts({
            type: 'thermometer',
            renderAt: 'chart-container4',
            id  : 'soiltempID',
            width: '200',
            height: '250',
            dataFormat: 'json',
            dataSource: {
                "chart": {
                    "caption": "土壤温度监测",
                    "lowerLimit": "0",
                    "upperLimit": "100",
                    "numberSuffix": "°C",
                    "decimals" : "2",
                    "showhovereffect": "1",
                    "thmFillColor": "#e44b23",                
                    "thmOriginX": "100",
                    "theme" : "fint",
                    "bgcolor":"#ffffff",
                    "valueFontColor" : "#000000",//字体颜色
                    "showValue":true
                },
                "value": rtjson.soiltemp
            },
            "events" :{
                "initialized": function (evt, arg) {
                    var dataUpdate = setInterval(function () {
                       
                        FusionCharts.items["soiltempID"].feedData("&value="+rtjson.soiltemp);//传数据
                       
                    }, 5000);
                }  
            }
        });
        var shumichart = new FusionCharts({
            type: 'cylinder',
            dataFormat: 'json',
            id: 'soilhumiID',
            renderAt: 'chart-container5',
            width: '200',
            height: '250',
            dataSource: {
                "chart": {
                    "caption": "土壤湿度监测",
                    "lowerLimit": "0",
                    "upperLimit": "100",
                    "numberSuffix": "g/m3",
                    "showhovereffect": "1",
                    "bgCOlor": "#ffffff",
                    "cylFillColor": "#f1e05a",
                    "valueFontColor" : "#000000",//字体颜色
                    "showValue":true
                },
                "value": rtjson.soilhumi
            },
            "events":{
                "rendered": function(evtObj, argObj){
                    setInterval(function () {
                        
                        FusionCharts.items["soilhumiID"].feedData("&value="+rtjson.soilhumi);//传数据
                        $('.status span').text($('.nodelist li.active span').text());
                    }, 5000);
                }
            }
        });
        tempchart.render();
        humichart.render();
        lightchart.render();
        stempchart.render();
        shumichart.render();

    });
}

function linechart() {
    var requestData = {nodeId:$('.nodelist li.active span').text(),type:$('.typelist li.active span').text()};
    $.get('servlet/rtJsonServlet',requestData,function(data){
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
                    "xAxisName": "Date",
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
            },
            "events":{
                "rendered": function(evtObj, argObj){
                    setInterval(function () {
                        var chartRef = FusionCharts("lineID"); 
                        var url = 'http://localhost:8080/iot/servlet/rtJsonServlet'+"?nodeId"+$('.nodelist li.active span').text()+"&type="+ $('.typelist li.active span').text();
                        console.log(url);
                        chartRef.setChartDataUrl(url,"json")       
                        // chartRef.setJSONData(linejson);//传数据
                        // console.log(linejson);
                    }, 5000);
                }
            }
            
        });
    
        visitChart.render();
        // setInterval(linechart,5000);
    });
    
}