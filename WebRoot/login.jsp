<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<!doctype html >
<html>
	<head>
		<title>物联云登陆</title>
		<link href="css/login.css" rel="stylesheet" type="text/css"/>
	</head>
	<body>
		<div class="login_containter">
			<img src="img/HaiCloudlogo.png" class="Hailogo" />
		    <h1 class="webname">田间云终端信息监测系统</h1>
		    <form action="servlet/LoginServlet" class="login_mainbody" name="loginform" method="post" id="loginform">
		    	<h1>登录</h1>
		        <input type="text" class="login_username" name="username" placeholder="用户名"/>
		        <input type="password" class="login_password" name="password" placeholder="登录密码" />
		        <input type="submit" class="login_button" value="登录"  />
		        <a href="#">忘记密码</a>
		        <!-- <a href="#" id="trial">点击试用</a> -->
		        <a href="register.html">免费注册</a>
		        <p id="testuser"></p>
			</form>
		</div>
				
	  		
	</body>
</html>
