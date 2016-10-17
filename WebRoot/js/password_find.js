window.onload=function(){
	var oli = document.getElementsByTagName('li');
	var oemail = oli[0];
	var onewpwd = oli[1];
	var oOK = oli[2];
	var newpwdcheck = document.getElementById('newpwd_checkbut');
	
	newpwdcheck.onclick = function(){
		oOK.className = "topmenushow";
		}
	
	}
	
	