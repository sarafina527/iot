<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
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
		<div class="logo"><a href="#"><img src="img/HaiCloudlogo.png" height="50px"/>智能检测系统</a></div>
		<div class="nav">
			<ul>
				<li><a href="#">监控中心</a></li>
				<li><a href="#">节点管理</a></li>
				<li><a href="#">开发者中心</a></li>
				<li><a href="#">运行记录</a></li>
				<li class="user"><a href="#">Admin</a></li>
				<li><a href="#">退出</a></li>
			</ul>
		</div>
	</div>
	<div class="wrap1">
		<div class="sidebar">
			<ul class="nodelist">
				<li class="active"><a href="#">节点一</a></li>
				<li><a href="#">节点二</a></li>
				<li><a href="#">节点三</a></li>
				<li><a href="#">节点四</a></li>
			</ul>		
		</div>
		<div class="nodeManageContent">
        	<input type="text" class="nodeName" value="节点一">
            <!-- <div class="mac">
            	<h1>MAC地址</h1>
                <input type="text" class="macValue" value="00-01-6C-06-A6-29">
                <button id="pwd">更改</button>
            </div> -->
            <div>
            	<table class="nodeTable">
                	<thead>
                    	<tr>
							<th>传感器类</th>
							<th>最高警戒值</th>
							<th>最警戒值</th>
							<th>开关</th>
						</tr>
                    </thead>
                    
                    <tbody>
                        <%
                        MaxMin 
                        
                        while(rs.next())
                        {
                            int sensor_id=rs.getInt(1);
                            String sensor_type=rs.getString(2);
                            int node_id=rs.getInt(3);
                            String description=rs.getString(4);
                            String location=rs.getString(5);
                            double max_alert=rs.getDouble(6);
                            double min_alert=rs.getDouble(7);
                            boolean switch_state=rs.getBoolean(8);
                            
                %>
                            
                        <tr id="colume_<%=sensor_id %>">
                            <td><%=sensor_type %></td>
                            <td><input type="text" style="width:70px" value="<%=max_alert %>" onchange="updateMaxAlert(<%=sensor_id%>,this.value)"></input></td>
                            <td><input type="text" style="width:70px" value="<%=min_alert %>" onchange="updateMinAlert(<%=sensor_id%>,this.value)"></input></td>
                            
                            <td><%
                                if(switch_state)
                                {
                                %>
                                <div class="switch">
                                    <input disabled="disabled" type="checkbox" checked id="switch_ckeckbox_<%=sensor_id %>"  onchange="switch_sensor(<%=sensor_id%>,<%=switch_state %>)"  />
                                </div>              
                                <%
                                }
                                else
                                {
                                %> 
                                <div class="switch">
                                    <input disabled="disabled" type="checkbox" unchecked id="switch_checkbox_<%=sensor_id %>" onchange="switch_sensor(<%=sensor_id%>,<%=switch_state %>)" />
                                </div>
                                <%  
                                }
                                %>             
                            </td>                            
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
	

</body>
</html>