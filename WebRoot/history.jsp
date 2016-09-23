<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ page import="com.model.Users,java.util.List,java.util.ArrayList,java.util.Date,com.model.sensordata,com.model.Anlysis,java.text.SimpleDateFormat"%>

<%
String rootpath = request.getContextPath();
%>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>历史记录</title>
	<link rel="stylesheet" type="text/css" href="<%=rootpath%>/css/reset.css">
	<link rel="stylesheet" type="text/css" href="<%=rootpath%>/css/layout.css">
</head>
<body>
	<div class="header">
		<div class="logo"><a href="#">智能检测系统</a></div>
		<div class="nav">
			<ul>
				<li><a href="realtime.jsp">监控中心</a></li>
				<li><a href="nodeManage.jsp">节点管理</a></li>
				<li><a href="#">开发者中心</a></li>
				<!-- <li><a href="#">运行记录</a></li> -->
				<%
					Users u = (Users)session.getAttribute("user");
					if(null == u)
					{
					    response.sendRedirect(rootpath+"/login.jsp");
					}else{
						%><li class="user"><a href="#"><%=u.getUsername()%></a></li>
						<%
					}
				%>
				<li><a href="#">退出</a></li>
			</ul>
		</div>
	</div>
	<div class="wrap">
		<div class="sidebar">
			<ul class="nodelist">
			<%  
				if(null != u)
				{
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
		<div class="content">
			<ul class="tab-bar">
				<li><a href="<%=rootpath%>/realtime.jsp">实时监控</a></li>
				<li class="active"><a href="">历史数据</a></li>
			</ul>
			<!-- 日期查询 -->
			<form action="<%=rootpath%>/servlet/HistoryServlet" class="search">
				
				<div class="">
					<fieldset>
						<span>起始日期：</span>			
					    <input class="calendar" size="16" type="text" id="stdate" name="stdate">
					    <span class="calendar-icon"></span>
						<span>截至日期：</span>			
					    <input class="calendar" size="16" type="text" id="enddate" name="enddate">
					    <div class="node_id_div">节点<input type="text" value="1" id="node_id" name="node_id" readonly=true></div>
					    <input type="submit" value="查询" >
					    
					</fieldset>
				</div>
			</form>
			<!-- 数据表 -->
			<div class="data-table">
				<table class="datalist" id="histable">
					<!-- <caption>历史数据</caption> --> 
					<thead>
						<tr>
							<th><span>采集日期</span></th>
							<th><span>采集时间</span></th>
							<th><span>环境光照</span>(Lx)</th>
							<th><span>环境温度</span>(°C)</th>
							<th><span>环境湿度</span>(g/m3)</th>
							<th><span>土壤温度</span>(°C)</th>
							<th><span>土壤湿度</span>(g/m3)</th>
							<th>监控状态</th>
						</tr>
					</thead>
					<tbody>
					<%
						List<sensordata> list= (List) request.getAttribute("result");
				      	SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
				      	if(list!=null){
					      	for(sensordata d:list){
					      		%>
					      		<tr>
					      			<td><%=sdf.format(d.getDate()) %></td>
					      			<td><%=d.getTime() %></td>
						            <td><%=d.getLight() %></td>
						            <td><%=d.getTemp() %></td>
						            <td><%=d.getHumi() %></td>
						            <td><%=d.getSoiltemp() %></td>
						            <td><%=d.getSoilhumi() %></td>
						            <td>指标正常</td>
					      		</tr>
					      		<%
					      	}
					      }	
					 %>
					</tbody>
			    </table>
			</div>
						<!-- 数据分析 -->
			<div class="anlysis">
				<p>数据分析</p>
				<%
					Anlysis anl= (Anlysis) request.getAttribute("anl");
			      	if(anl!=null){
					 %>
				<div class="light float-left clearfat">
					<label for="">平均值</label>
					<input class="average" type="text" value=<%=anl.getLightave() %> readonly=true>
					<label for="">最大值</label>
					<input class="max" type="text" value=<%=anl.getLightmax() %> readonly=true>
					<label for="">最小值</label>
					<input class="min" type="text" value=<%=anl.getLightmin() %> readonly=true>
				</div>
				<div class="temp float-left">
					<label for="">平均值</label>
					<input class="average" type="text" value=<%=anl.getTempave() %> readonly=true>
					<label for="">最大值</label>
					<input class="max" type="text" value=<%=anl.getTempmax() %> readonly=true>
					<label for="">最小值</label>
					<input class="min" type="text" value=<%=anl.getTempmin() %> readonly=true>

				</div>
				<div class="humi float-left">
					<label for="">平均值</label>
					<input class="average" type="text" value=<%=anl.getHumiave() %> readonly=true>
					<label for="">最大值</label>
					<input class="max" type="text" value=<%=anl.getHumimax() %> readonly=true>
					<label for="">最小值</label>
					<input class="min" type="text" value=<%=anl.getHumimin() %> readonly=true>
				</div>
				<div class="soiltemp float-left">

					<label for="">平均值</label>
					<input class="average" type="text" value=<%=anl.getSoiltempave() %> readonly=true>
					<label for="">最大值</label>
					<input class="max" type="text" value=<%=anl.getSoiltempmax() %> readonly=true>
					<label for="">最小值</label>
					<input class="min" type="text" value=<%=anl.getSoiltempmin() %> readonly=true>
				</div>
				<div class="soilhumi float-left">
					<label for="">平均值</label>
					<input class="average" type="text" value=<%=anl.getSoilhumiave() %> readonly=true>
					<label for="">最大值</label>
					<input class="max" type="text" value=<%=anl.getSoilhumimax() %> readonly=true>
					<label for="">最小值</label>
					<input class="min" type="text" value=<%=anl.getSoilhumimin() %> readonly=true>
				</div>
					<%
					}
					 %>
			</div>

		</div>
	</div>

	
	<div class="footer"></div>
		
	<script type="text/javascript" src="<%=rootpath%>/js/jquery-3.1.0.js"></script>
	<script type="text/javascript" src="<%=rootpath%>/js/hisclick.js"></script>
	<script type="text/javascript" src="<%=rootpath%>/js/laydate.dev.js"></script>
	<script type="text/javascript">
        laydate({
            elem: '#stdate'
        });
        laydate({
            elem: '#enddate'
        });

        function goPage(page){  
	        //给pagenation.currentpage赋值，改变后的值  
		    document.getElementById(" ").value=page;  
		    alert("/////"+page);  
		    document.pagenation.submit();  
		}
		$(document).ready(function(){
			$('.nodelist li').bind('click',clickNode);
			// $('.nodelist').children().eq(0).addClass('active');
			updatePara();
			tablestyle();
		});
    </script>
	
	
</body>
</html>