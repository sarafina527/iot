window.onload = function(){
	var lgtrial = document.getElementById('trial');
	var lgP = document.getElementById('testuser');
	lgtrial.onclick = function(){
		lgP.style.display = "inline";
		lgP.innerHTML = "试用账号：<br />用户名：test &nbsp;&nbsp;密码：12345678";
		}
	
	}