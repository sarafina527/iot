<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<!doctype html >
<html>
	<head>
		<title>物联云登陆</title>
		<link href="css/login.css" rel="stylesheet" type="text/css"/>
		<link rel="stylesheet" type="text/css" href="css/reset.css">
		<jsp:include page="favicon.jsp"></jsp:include>
	</head>
	<body>
		<div class="login_containter">
			<img src="img/HaiCloudlogo.png" class="Hailogo" />
		    <h1 class="webname">田间云终端信息监测系统</h1>
		    <form action="servlet/LoginServlet" class="login_mainbody" name="loginform" method="post" id="loginform">
		    	<h1>登录</h1>
		    	<img src="img/register/user.png">
		        <input type="text" class="login_username" name="username" placeholder="用户名"/>
		        <img src="img/register/lock.png">
		        <input type="password" class="login_password" name="password" placeholder="登录密码" />
		        <input type="submit" class="login_button" value="登录"  />
		        <a href="password_find.jsp">忘记密码</a>
		        <!-- <a href="#" id="trial">点击试用</a> -->
		        <a href="register.jsp">免费注册</a>
		        <p id="testuser"></p>
			</form>
		</div>
				
	  		
	</body>
</html>
