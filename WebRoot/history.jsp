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
	<link rel="stylesheet" type="text/css" href="<%=rootpath%>/css/pageGroup.css"/>
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
				<li><a href="<%=rootpath%>/realtime.jsp">监控中心</a></li>
				<li><a href="<%=rootpath%>/history.jsp">历史数据</a></li>
				<li><a href="<%=rootpath%>/nodeManage.jsp">节点管理</a></li>
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
		<!-- content body -->
		<div class="content">
			<ul class="tab-bar">
				<li><a href="<%=rootpath%>/realtime.jsp">实时监控</a></li>
				<li class="active"><a href="<%=rootpath%>/history.jsp">历史数据</a></li>
				<li><a href="<%=rootpath%>/send.jsp">数据下载</a></li>
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
					    <input type="button" id="trend" value="趋势图" >
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
			    <div id="pageGro" class="cb">
			    	<%
						int count = 0;
						int pageCounts=0;
						if(request.getAttribute("totalCount")!=null){
							count =(Integer)(request.getAttribute("totalCount"));
							if(count%10==0){
								pageCounts = count/10;
							}else{
								pageCounts = count/10+1;
							}
						}					
			    	%>
			    	<span id="pageCount"><%=pageCounts%></span>
			    	<div class="first button">首页</div>
					<div class="pageUp button">上一页</div>
					<div class="pageList">
					    <ul>
					        <li>1</li>
					        <li>2</li>
					        <li>3</li>
					        <li>4</li>
					        <li>5</li>
					    </ul>
					</div>
					<div class="pageDown button">下一页</div>
					<div class="end button">尾页</div>
				</div>
			</div>
						<!-- 数据分析 -->
			<div class="anlysis">
				<p>数据分析</p>
				<%
					Anlysis anl= (Anlysis) request.getAttribute("anl");
			      	if(anl!=null){
					 %>
				<div class="light float-left clearfat">
					<span class="unit">光照(Lx)</span>
					<label for="">平均值</label>
					<input class="average" type="text" value=<%=anl.getLightave() %> readonly=true>
					<label for="">最大值</label>
					<input class="max" type="text" value=<%=anl.getLightmax() %> readonly=true>
					<label for="">最小值</label>
					<input class="min" type="text" value=<%=anl.getLightmin() %> readonly=true>
				</div>
				<div class="temp float-left">
					<span class="unit">温度(°C)</span>
					<label for="">平均值</label>
					<input class="average" type="text" value=<%=anl.getTempave() %> readonly=true>
					<label for="">最大值</label>
					<input class="max" type="text" value=<%=anl.getTempmax() %> readonly=true>
					<label for="">最小值</label>
					<input class="min" type="text" value=<%=anl.getTempmin() %> readonly=true>

				</div>
				<div class="humi float-left">
					<span class="unit">湿度(g/m3)</span>
					<label for="">平均值</label>
					<input class="average" type="text" value=<%=anl.getHumiave() %> readonly=true>
					<label for="">最大值</label>
					<input class="max" type="text" value=<%=anl.getHumimax() %> readonly=true>
					<label for="">最小值</label>
					<input class="min" type="text" value=<%=anl.getHumimin() %> readonly=true>
				</div>
				<div class="soiltemp float-left">
					<span class="unit">土壤温度(°C)</span>
					<label for="">平均值</label>
					<input class="average" type="text" value=<%=anl.getSoiltempave() %> readonly=true>
					<label for="">最大值</label>
					<input class="max" type="text" value=<%=anl.getSoiltempmax() %> readonly=true>
					<label for="">最小值</label>
					<input class="min" type="text" value=<%=anl.getSoiltempmin() %> readonly=true>
				</div>
				<div class="soilhumi float-left">					
					<span class="unit">土壤湿度(g/m3)</span>
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
</div>
<div class="footer">
	<div class="sub-footer">&copy;2016 南京海道普公司 </div>
</div>
	
<!-- 	<div class="footer"></div>
	</div> -->
	<script type="text/javascript" src="<%=rootpath%>/js/jquery-3.1.0.js"></script>
	<script type="text/javascript" src="<%=rootpath%>/js/jquery-1.8.3.min.js"></script>
	<script type="text/javascript" src="<%=rootpath%>/js/common.js"></script>
	<script type="text/javascript" src="<%=rootpath%>/js/hisclick.js"></script>
	<script type="text/javascript" src="<%=rootpath%>/js/laydate.dev.js"></script>
	<script type="text/javascript" src="<%=rootpath%>/js/pageGroup.js"></script>
	<script type="text/javascript" src="<%=rootpath%>/js/pageCenter.js"></script>
	<script src="js/jquery-1.9.1.min.js"></script>
	<script src="js/layer/layer.js"></script>
	<script type="text/javascript">
		// 日期选择控件
        laydate({
            elem: '#stdate'
        });
        laydate({
            elem: '#enddate'
        });
        // 分页
        function goPage(page){  
	        //给pagenation.currentpage赋值，改变后的值  
		    document.getElementById(" ").value=page;  
		    alert("/////"+page);  
		    document.pagenation.submit();  
		}
		// onload
		$(document).ready(function(){
			$('.nodelist li').bind('click',clickNode);//点击切换样式
			updatePara();//根据url参数更新页面选择项样式
			tablestyle();//表格奇偶行样式区分
			defaultdate();//设置默认日期
			AdjustColumnsHeight();//调整sidebar高度
		});
		// 历史趋势图
		$('#trend').on('click', function(){
		  layer.open({
		  type: 2,
		  title: false,
		  maxmin: false,
		  shadeClose: true, //点击遮罩关闭层
		  area : ['1016px' , '430px'],
		  content: 'trendFig.jsp'
		  });
		});
    </script>
	
	
</body>
</html>