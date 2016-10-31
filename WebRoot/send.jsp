<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ page import="com.model.Users,java.util.List,java.util.ArrayList,java.util.Date,com.model.sensordata,com.model.Anlysis,java.text.SimpleDateFormat"%>

<%
String rootpath = request.getContextPath();
%>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>数据下载</title>
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
				<li><a href="<%=rootpath%>/history.jsp">历史数据</a></li>
				<li class="active"><a href="<%=rootpath%>/send.jsp">数据下载</a></li>
			</ul>
			<!-- 日期查询 -->
			<form action="<%=rootpath%>/servlet/FileDownload" class="search sendContainer">
				
				<div class="">
					<fieldset class="sendFieldset">
						<span>起始日期：</span>			
					    <input class="calendar" size="16" type="text" id="stdate" name="stdate">
					    <span class="calendar-icon"></span>
						<span>截至日期：</span>			
					    <input class="calendar" size="16" type="text" id="enddate" name="enddate">
					    <div class="node_id_div1">节点<input type="text" value="1" id="node_id" name="node_id" readonly=true></div>
					    <input class="sendSubmit" type="submit" value="下载" >
					    <div class="checkboxContainer"> 						    
						    <input type="checkbox" name="all" id="all" value="all" checked="checked" onclick="CheckboxAll()">
						    <label for="all">全选</label>					    
						    <input type="checkbox" name="light" id="light" value="light" checked="checked" onclick="CheckboxSub()">
						    <label for="light">环境光照</label>					    
						    <input type="checkbox" name="temp" id="temp" value="temp" checked="checked" onclick="CheckboxSub()">
						    <label for="temp">环境温度</label>
						    <input type="checkbox" name="humi" id="humi" value="humi" checked="checked" onclick="CheckboxSub()"> 
						    <label for="humi">环境湿度</label>
						    <input type="checkbox" name="soiltemp" id="soiltemp" value="soiltemp" checked="checked" onclick="CheckboxSub()">
						    <label for="soiltemp">土壤温度</label>						    
						    <input type="checkbox" name="soilhumi" id="soilhumi" value="soilhumi" checked="checked" onclick="CheckboxSub()">
						    <label for="soilhumi">土壤湿度</label>
					    </div>	
					    <p class="attention">*您可自主选择需要下载的历史数据时间段，并可按需选择传感器数据。</p>			    
					</fieldset>
				</div>
			</form>

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
			// AdjustColumnsHeight();
		});
    </script>
	
	
</body>
</html>