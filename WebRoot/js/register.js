window.onload=function(){
  var rgInput = document.getElementsByTagName('input');
  var rgname = rgInput[0];//用户名
  var rgpwd1 = rgInput[1];//登录密码
  var rgpwd2 = rgInput[2];//确认登录密码
  var rgemail = rgInput[3];//注册邮箱
  var rgP = document.getElementsByTagName('p');
  //提示信息
  var rgname_msg = rgP[0];
  var rgpwd1_msg = rgP[1];
  var rgpwd2_msg = rgP[2];
  var rgemail_msg = rgP[3];

  var rgname_length = 0;
  
  function getLength(str){
  // \x00-xff代表单字节字符。
	  return str.replace(/[^\x00-\xff]/g, "xx").length;
	}

//会员名

	//聚焦提示
	rgname.onfocus = function(){
	  rgname_msg.style.display = "inline";
	  rgname_msg.innerHTML = "<i class=rg_def>支持中文、字母、数字及“_”的组合，4-20个字符。</i>";
	}
	
	//失焦提示  
	rgname.onblur = function(){
		rgname_length = getLength(this.value);
		//含有非法字符
		var reg = /[^\w\u4e00-\u9fa5]/g;    // \w代表“数字、字母（不分大小写）、下划线”，\u4e00-\u9fa5代表汉字。 
		if(reg.test(this.value)){
		  rgname_msg.innerHTML = '<i class=rg_err>含有非法字符！</i>';
		}
		//用户名为空
		else if (this.value==""){
		  rgname_msg.innerHTML = "<i class=rg_err>用户名不能为空！</i>";
		}
		//字符长度超过20
		else if (rgname_length > 20){
		  rgname_msg.innerHTML = "<i class=rg_err>长度超过20个字符！</i>";
		}
		//字符长度小于4
		else if (rgname_length < 4){
		  rgname_msg.innerHTML = "<i class=rg_err>长度少于4个字符！</i>";
		}
		//用户名已被使用
		//OK
		else {
		  rgname_msg.innerHTML = "<i class=rg_cor></i>";
		}
	
	}
	
//密码

	//聚焦提示
	rgpwd1.onfocus = function(){
	  rgpwd1_msg.style.display = "inline";
	  rgpwd1_msg.innerHTML = "<i class=rg_def>建议使用字母、数字和符号两种及以上的组合，6-20个字符。</i>";
	  rgpwd2.setAttribute("disabled",true);
	}
	//失焦提示  
	rgpwd1.onblur = function(){
		rgpwd1_length = getLength(this.value);
/*		//含有非法字符
		var reg_pw = /[\u4e00-\u9fa5]/g;    //\u4e00-\u9fa5代表汉字。 判断是否含有汉字 
		if(reg_pw.test(this.value)){
		  rgpwd1_msg.innerHTML = '<i class=rg_err>含有非法字符！</i>';
		}*/
		//用户名为空
		if (this.value==""){
		  rgpwd1_msg.innerHTML = "<i class=rg_err>密码不能为空！</i>";
		}
		//字符长度超过20
		else if (rgpwd1_length > 20){
		  rgpwd1_msg.innerHTML = "<i class=rg_err>长度超过20个字符！</i>"; 
		}
		//字符长度小于4
		else if (rgpwd1_length < 6){
		  rgpwd1_msg.innerHTML = "<i class=rg_err>长度少于6个字符！</i>";
		}
		//用户名已被使用
		//OK
		else {
		  rgpwd1_msg.innerHTML = "<i class=rg_cor></i>";
		  rgpwd2.removeAttribute("disabled");
		}
	
	}

//确认密码

  rgpwd2.onblur = function(){
	  rgpwd2_msg.style.display = "inline";
    if(this.value != rgpwd1.value){
      rgpwd2_msg.innerHTML = '<i class=rg_err>两次输入的密码不一致！</i>';
    }else{
      rgpwd2_msg.innerHTML = '<i class=rg_cor></i>';
    }
  }
	
	rgemail.onblur = function(){
		rgemail_msg.style.display = "inline";
	 	var rg_filter  = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		if (this.value==""){
		  rgemail_msg.innerHTML = "<i class=rg_err>邮箱不能为空！</i>";
		}
	 	else if (rg_filter.test(this.value))
	 	{
			 rgemail_msg.innerHTML = '<i class=rg_cor></i>';
			 }
		 else {
			 rgemail_msg.innerHTML = '<i class=rg_err>您输入的邮箱格式不正确！</i>';
	 	}
	}	
		
}


