<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ page import="com.model.Users,java.util.List,java.util.ArrayList"%>
<%
String rootpath = request.getContextPath();
%>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>实时监控</title>
	<link rel="stylesheet" type="text/css" href="css/reset.css">
	<link rel="stylesheet" type="text/css" href="css/layout.css">
	<jsp:include page="favicon.jsp"></jsp:include>
</head>
<body>
<div id="centerContainer">
	<!-- header -->
	<div class="header-container">
	<div class="header">
		<div class="logo"><a href="#">智能检测系统</a></div>
		<div class="nav">
			<ul>
				<li><a href="realtime.jsp">监控中心</a></li>
				<li><a href="<%=rootpath%>/history.jsp">历史数据</a></li>
				<li><a href="nodeManage.jsp">节点管理</a></li>
				<!-- <li><a href="#">开发者中心</a></li> -->
				<!-- <li><a href="#">运行记录</a></li> -->
				<%
					Users u = (Users)session.getAttribute("user");
					if(null == u)
					{
					    response.sendRedirect(rootpath+"/login.jsp");
					    return;
					}else{
						%><li class="user"><a href="#"><%=u.getUsername()%></a></li>
						<%
					}
				%>
				<!-- <li><a href="#">退出</a></li> -->
			</ul>
		</div>
	</div>
	</div>
	<div class="wrap">
		<!-- sidebar -->
		<div class="sidebar" id="sidebar">
			<ul class="nodelist">
				<%
        			if(null == u)
					{
					    response.sendRedirect("login.jsp");
					}else{
						List<Integer> nodes = (List)session.getAttribute("nodes");
        				for(int i=0;i<nodes.size();i++){
	        				%>
	        				<li>节点<span><%=nodes.get(i)%></span></li>
	        				<%
        				}
        			}
        		%>
			</ul>			
		</div>
		<!-- content body -->
		<div class="content">
			<ul class="tab-bar">
				<li><a href="">实时监控</a></li>
				<li class="active"><a href="history.jsp">历史数据</a></li>
			</ul>
			<div class="rt-data">
				<div class="rt-data-top">
					<div class="datetime">
						&nbsp;
					</div>
					<div class="status">
						<!-- <ul >
							<li>数据正常</li>
							<li>数据异常</li>
							<li>设备断开</li>
						</ul> -->
						节点<span></span>
					</div>
					<div class="clear"></div>
				</div>
				<div class="rt-data-main">
					<div id="chart-container1"></div>
					<div id="chart-container2"></div>
					<div id="chart-container3"></div>
					<div id="chart-container4"></div>
					<div id="chart-container5"></div>
				</div>

				<ul class="selecttype typelist">
					<li class="active">温度(°C)<span>temp</span></li>
					<li>湿度(g/m3)<span>humi</span></li>
					<li>光照(Lx)<span>light</span></li>
					<li>土壤温度(°C)<span>soiltemp</span></li>
					<li>土壤湿度(g/m3)<span>soilhumi</span></li>
				</ul>
				<div class="figure" id="linechart">
					
				</div>
			</div>


		</div>
	</div>
	
	<!-- <div class="footer"></div> -->
		
</div>
</div>
<div class="footer">
	<div class="sub-footer">&copy;2016 南京海道普公司 </div>
</div>
	<script type="text/javascript" src="<%=rootpath%>/js/jquery-3.1.0.js"></script>
	<script type="text/javascript" src="<%=rootpath%>/js/common.js"></script>
    <script type="text/javascript" src="<%=rootpath%>/js/realtime.js"></script>
    <script type="text/javascript" src="<%=rootpath%>/js/fusioncharts.js"></script>
    <script type="text/javascript" src="<%=rootpath%>/js/gaugeinit.js"></script>
    <script type="text/javascript" src="<%=rootpath%>/js/pageCenter.js"></script>
	<script type="text/javascript">
		$(document).ready(function(){
			$('.nodelist li').bind('click',clickNode);//bind the click event 
			$('.typelist li').bind('click',clickType);
			updatePara();//update the active node and type
			$('.typelist li').click(linechart);
			getGaugejson();
			setInterval(getGaugejson,5000);
			getLinejson();
			setInterval(getLinejson,5000);
			// console.log(rtjson);
			// FusionCharts.ready(temp);
		 //    FusionCharts.ready(humi);
		 //    FusionCharts.ready(light);
		 //    FusionCharts.ready(solidtemp);
		 //    FusionCharts.ready(solidhumi);
		 	FusionCharts.ready(gaugechart);
		    FusionCharts.ready(linechart);
		    AdjustColumnsHeight();//调整sidebar高度
			
		});
 		
	</script>
	
</body>
</html>