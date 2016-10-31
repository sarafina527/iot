<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ page import="com.model.Users,java.util.List,java.util.ArrayList"%>
<%
String rootpath = request.getContextPath();
%>
<!doctype html >
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>用户信息</title>
	<link rel="stylesheet" type="text/css" href="css/reset.css">
	<link rel="stylesheet" type="text/css" href="css/layout.css">
  <link rel="stylesheet" type="text/css" href="css/userMsg.css">
  <jsp:include page="favicon.jsp"></jsp:include>
</head>

<body>
<div id="centerContainer" class="userMsgBg">
    <div class="header-container">
    	<div class="header">
            <div class="logo">
                <a href="#">农业物联云平台——HaiCloud物联云用户终端系统</a>
            </div>
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
                            %><li class="user"><a href="usermsg.jsp"><%=u.getUsername()%></a></li>
                            <%
                        }
                    %>
                    <!-- <li><a href="#">退出</a></li> -->
                </ul>
            </div>
        </div>
    </div>
    <!-- 页面主体部分 -->
    <div class="wrap1">
    	<div class="setting">
            <!--用户名-->
        	<div class="itemBox itemBoxTitle">用户信息
            </div>
       		<!--用户名-->
        	<div class="itemBox">
                <img src="img/userMsg/user.png">
                <p>
                    <span class="itemName">用户名</span>
                    <input type="text" class="itemInput" value="admin">
                    <span>可用用户名登录智能监控系统</span>
                </p>
            </div>
            <!--密码-->
            <div class="itemBox">
            	<img src="img/userMsg/lock.png">
                <p>
                    <span class="itemName">密码</span>
                    <input type="text" class="itemInput" value="已设置">
                    <span>用于保护帐号信息和登录安全</span>
                </p>
                <button id="pwd">更改</button>
            </div>
            <!--邮箱-->
            <div class="itemBox">
            	<img src="img/userMsg/email.png">
                <p>
                    <span class="itemName">邮箱</span>
                    <input type="text" class="itemInput" value="widowinn@163.com">
                    <span>可用邮箱加密码登录智能监控系统，可用邮箱找回密码</span>
                </p>
                <button id="email">更改</button>
            </div>
            <!--手机-->   
            <div class="itemBox">
                <img src="img/userMsg/teliphone.png">
                <p>
                    <span class="itemName">手机</span>
                    <input type="text" class="itemInput" value="13897977829">
                    <span>可用手机号加密码登录录智能监控系统，可用邮箱找回密码</span>
                </p>
                <button id="teliphone">更改</button>
            </div>         
        </div>
    </div>
</div>
<div class="footer">
    <div class="sub-footer">&copy;2016 南京海道普公司 </div>
</div>

<script src="js/jquery-1.9.1.min.js"></script>
<script src="js/layer/layer.js"></script>
<script>
//修改密码
$('#pwd').on('click', function(){
  layer.open({
  type: 2,
  title: false,
  maxmin: false,
  shadeClose: true, //点击遮罩关闭层
  area : ['800px' , '400px'],
  content: 'userMsg_pwd.html'
  });
});
//修改邮箱
$('#email').on('click', function(){
  layer.open({
  type: 2,
  title: false,
  maxmin: false,
  shadeClose: true, //点击遮罩关闭层
  area : ['800px' , '400px'],
  content: 'userMsg_email.html'
  });
});
//修改手机
$('#teliphone').on('click', function(){
  layer.open({
  type: 2,
  title: false,
  maxmin: false,
  shadeClose: true, //点击遮罩关闭层
  area : ['800px' , '400px'],
  content: 'userMsg_tel.html'
  });
});
</script>
</body>
</html>
