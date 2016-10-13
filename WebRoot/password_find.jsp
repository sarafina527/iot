<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<!doctype html >
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>找回密码</title>
<link href="css/password_find.css" rel="stylesheet" type="text/css"/>
<link href="css/reset.css" rel="stylesheet" type="text/css"/>
<jsp:include page="favicon.jsp"></jsp:include>
</head>

<body>
	<div class="password_find_containter">
    	<div class="topbg">
            <img src="img/HaiCloudlogo.png" class="Hailogo" />
            <h1 class="webname">智能监测系统</h1>
        </div>
        <div class="pf_mainbody">
            <div class="pf_sub">
                <h3>找回密码</h3>
                <ul>
                <li class="topmenushow">1.填写注册邮箱</li>
                <li class="topmenuhid">2.设置新密码</li>
                <li class="topmenuhid">完成</li>
                </ul>
                
                <!--邮箱验证-->
                <form class="pfemailcheck" action="" method="get" autocomplete="off">
                <input type="text" id="register_email" placeholder="请输入注册邮箱" /><!--登录邮箱--> 
                <input type="button" id="register_get_identifying_code" value="获取验证码" /> <!--获取验证码-->  
                <p id="check_register"></p>
                <input type="number" id="register_identifying_code" placeholder="请输入验证码" /><!--验证码--> 
                <input type="submit" id="register_register_button" value="确定" /><!-- 确认 -->  
                </form>
                
                <!--密码重置-->
                <form class="newpwd" action="" method="get" autocomplete="off">
                <input type="password" id="register_password" placeholder="请输入新的密码" /><!--密码-->
                <p id="check_register"></p>
                <input type="password" id="register_password_check" placeholder="请再次输入密码" disabled=""/><!--确认密码-->
                <p id="check_register"></p>
                <input type="submit" class="login_button" id="newpwd_checkbut" value="确认"  />
                </form>  
                
                <!--重新登录-->
                <div class="relogin">
                <p>修改密码成功，请重新<a href="login.jsp">登录</a>！</p>
                </div>          
                
            </div>
        </div>
    </div>
<script src="js/password_find.js" type="text/javascript"></script>
</body>
</html>
