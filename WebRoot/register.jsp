<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<!doctype html >
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>用户注册</title>
<link href="css/register.css" rel="stylesheet" type="text/css"/>
<link href="css/reset.css" rel="stylesheet" type="text/css"/>
<jsp:include page="favicon.jsp"></jsp:include>
</head>

<body>
<form class="register_containter"  action=" " method="get" autocomplete="off" >
    <fieldset>
    	<img src="img/HaiCloudlogo.png" class="Hailogo" />
        <legend class="webname">田间云终端信息监测系统</legend>
        <div class="register_mainbody"><!--主体注册框-->
        	<div class="register_header1">注册新用户</div>
            <div class="register_header2">已有账号？去<a href="login.jsp">登录</a>></div>
            <input type="text" id="register_username" placeholder="请输入用户名"/><!--用户名-->
            <p id="check_register"></p>
            <input type="password" id="register_password" placeholder="请输入登录密码" /><!--密码-->
            <p id="check_register"></p>
            <input type="password" id="register_password_check" placeholder="请再次输入登录密码" disabled=""/><!--确认密码-->
            <p id="check_register"></p>
            <input type="text" id="register_email" placeholder="请输入登录邮箱" /><!--登录邮箱--> 
            <input type="button" id="register_get_identifying_code" value="获取验证码" /> <!--获取验证码-->  
            <p id="check_register"></p>
            <input type="number" id="register_identifying_code" placeholder="请输入验证码" /><!--验证码--> 
            <input type="submit" id="register_register_button" value="注册" /><!-- 注册 -->    
    	</div>
    </fieldset>
</form>
<script src="js/register.js" type="text/javascript"></script>
</body>
</html>
