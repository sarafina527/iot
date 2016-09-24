<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ page import="com.model.maxmin,com.model.Users,com.model.sensormeta,com.dao.sensormetaDao" %>
<%
String rootpath = request.getContextPath();
%>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>节点管理</title>
	<link rel="stylesheet" type="text/css" href="css/reset.css">
	<link rel="stylesheet" type="text/css" href="css/layout.css">
    <link rel="stylesheet" type="text/css" href="css/nodeManage.css">
</head>
<body>
	<div class="header">
		<div class="logo"><a href="#">智能检测系统</a></div>
		<div class="nav">
			<ul>
				<li><a href="<%=rootpath%>/realtime.jsp">监控中心</a></li>
				<li><a href="<%=rootpath%>/nodeManager.jsp">节点管理</a></li>
				<li><a href="#">开发者中心</a></li>
				<li><a href="#">运行记录</a></li>
				<%
					Users u = (Users)session.getAttribute("user");
					if(null == u)
					{
					    response.sendRedirect(rootpath+"/login.jsp");
					}else{
						%><li class="user"><a href="#"><%=u.getUsername()%></a></li>
						<%
					}
					int node_id = 1;
					if(request.getParameter("nodeId")!=null){
						node_id = Integer.parseInt(request.getParameter("nodeId"));
					}
				%>
				<li><a href="#">退出</a></li>
			</ul>
		</div>
	</div>
	<div class="wrap1">
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
		<div class="nodeManageContent">
            <!-- <div class="node_id_div nodeName">节点<input type="text" value="1" id="node_id" name="node_id" readonly=true></div> -->
           
            <div>
            	<table class="nodeTable">
                	<thead>
                    	<tr>
							<th>传感器类</th>
							<th>最高警戒值</th>
							<th>最警戒值</th>
							<th>节点位置</th>
						</tr>
                    </thead>
                    
                    <tbody>
                        <%
                        sensormetaDao smd = new sensormetaDao();
                        List<sensormeta> ml = smd.queryByNodeId(node_id);
                        
                        for(int i=0;i<ml.size();i++)
                        {
                            int sensor_id=ml.get(i).getSensor_id();
                            String sensor_type=ml.get(i).getSensor_type();
                            //int node_id=ml.get(i).getNode_id();
                           
                            double max_alert=ml.get(i).getMax_alert();
                            double min_alert=ml.get(i).getMin_alert();
                            String location=ml.get(i).getLocation();
                            
                            
                %>
                            
                        <tr id="colume_<%=sensor_id %>">
                            <td><%=sensor_type %></td>
                            <td><input type="text" value="<%=max_alert %>" onchange="updateMaxAlert(<%=sensor_id%>,this.value)"></input></td>
                            <td><input type="text" value="<%=min_alert %>" onchange="updateMinAlert(<%=sensor_id%>,this.value)"></input></td>
                            <td><input type="text" value="<%=location %>" onchange="updateLocation(<%=node_id%>,this.value)"></input></td>
                                                 
                        </tr>  
                                  
                                  
                    <%
                        }
                    %>
                        	
                    </tbody>
                </table>
				<input type="button" value="保存">
            </div>

			
			
		</div>
	</div>
	
	<div class="footer">
		<div class="copyright">
             <!-- ©  -->2016 Najing Hadoop; user contributions licensed under 
		</div>
	</div>
    <script type="text/javascript" src="<%=rootpath%>/js/jquery-3.1.0.js"></script>
    <script type="text/javascript" src="<%=rootpath%>/js/nodeManage.js"></script>
	<script type="text/javascript">
        $(document).ready(function(){
            $('.nodelist li').bind('click',clickNode);
            initNode();

        });
    </script>

</body>
</html>