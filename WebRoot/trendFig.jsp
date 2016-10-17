<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ page import="com.model.Users,java.util.List,java.util.ArrayList"%>
<%
String rootpath = request.getContextPath();
%>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>趋势图</title>
	<link rel="stylesheet" type="text/css" href="css/reset.css">
	<link rel="stylesheet" type="text/css" href="css/layout.css">
	<jsp:include page="favicon.jsp"></jsp:include>
</head>
<body>
<!-- 切换按钮 -->
<div class="trendContainer">
	<ul class="selecttype typelist trendBar">
		<li class="active">温度(°C)<span>temp</span></li>
		<li>湿度(g/m3)<span>humi</span></li>
		<li>光照(Lx)<span>light</span></li>
		<li>土壤温度(°C)<span>soiltemp</span></li>
		<li>土壤湿度(g/m3)<span>soilhumi</span></li>
	</ul>
<!-- 趋势图 -->
	<div class="figure trendChart" id="linechart"></div>
</div>

	<script type="text/javascript" src="<%=rootpath%>/js/jquery-3.1.0.js"></script>
	<script type="text/javascript" src="<%=rootpath%>/js/common.js"></script>
    <script type="text/javascript" src="<%=rootpath%>/js/realtime.js"></script>
    <script type="text/javascript" src="<%=rootpath%>/js/hisclick.js"></script>
    <script type="text/javascript" src="<%=rootpath%>/js/fusioncharts.js"></script>
    <script type="text/javascript" src="<%=rootpath%>/js/hisfigure.js"></script>
    <script type="text/javascript" src="<%=rootpath%>/js/pageCenter.js"></script>
    <script src="<%=rootpath%>/js/jquery-1.9.1.min.js"></script>
    <script src="<%=rootpath%>/js/layer/layer.js"></script>
	<script type="text/javascript">
		$(document).ready(function(){
			$('.typelist li').bind('click',clickType);
			updatePara();//update the active node and type
			$('.typelist li').click(linechart);
			getMaxMin();
		    FusionCharts.ready(linechart);   	    
			
		});
 		// var stDate=parent.$("#stdate").val();//获取父页面查询起始时间
 		// var endDate=parent.$("#enddate").val();//获取父页面查询截止时间 		
 		// var nodeId=parent.$("#node_id").val();//获取节点 
 		// var type = $('.typelist li.active span').text();
 		// console.log(stDate+" "+endDate+" "+nodeId+" "+type);
	</script>
	
</body>
</html>