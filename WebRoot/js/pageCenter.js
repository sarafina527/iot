// 修改网站名
function webName(){
    var ologo = document.getElementsByClassName("logo");
    var oname = ologo[0].getElementsByTagName('a');
   
    if(document.body.clientWidth >= 600)
    {
        oname[0].innerHTML = "农业物联云平台——HaiCloud物联云用户终端系统";
    }
    else
    {
        oname[0].innerHTML = "农业物联云平台——<br>HaiCloud物联云用户终端系统";
    }
}
function box(){
    //获取DIV为‘box’的盒子
    var oBox = document.getElementById('centerContainer');
    //var osidebar = document.getElementById('sidebar');
    //获取元素自身的宽度
    var L1 = oBox.offsetWidth;
    //获取元素自身的高度
    // var H1 = oBox.offsetHeight;
    //获取实际页面的left值。（页面宽度减去元素自身宽度/2）
    var Left = (document.documentElement.clientWidth-L1)/2;
    //获取实际页面的top值。（页面宽度减去元素自身高度/2）
    // var top = (document.documentElement.clientHeight-H1)/2;
    oBox.style.left = Left+'px';
    //osidebar.style.left = Left+10+'px';
    // oBox.style.top = top+'px';
}

function getNowFormatDate() {
	
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + date.getHours() + seperator2 + date.getMinutes()
            + seperator2 + date.getSeconds();
    // document.getElementById('datetime1').innerHTML = currentdate;
    return currentdate;
   
}

//实时数据及历史数据页面sidebar高度调整
function AdjustColumnsHeight() {
    var sideCol = window.document.getElementById('sidebar');
    var mainCol = window.document.getElementsByClassName('content')[0];
 
    var hsideCol = sideCol.offsetHeight;
    var hmainCol = mainCol.offsetHeight;
 
    // var maxHeight = Math.max( hsideCol , hmainCol)-40;
    var maxHeight = hmainCol-40;
    // console.log(document.body.clientWidth);
    if(document.body.clientWidth >= 800)
        sideCol.style.height = maxHeight + 'px';
    // else
    //     {sideCol.style.height =  55+ 'px';}
    // console.log(sideCol.style.height);
    // else if(document.body.clientWidth < 800)
    else
    {
        // var header = document.getElementsByClassName('header')[0];
        var logo = document.getElementsByClassName('logo')[0];
        // header.style.marginLeft = (document.body.clientWidth/2 - 150)+"px";
        logo.style.marginLeft = (document.body.clientWidth/2 - 170)+"px";
        // logo.style.marginLeft = 0+"px";
        // console.log(document.body.clientWidth/2);
        // console.log(logo.style.marginLeft);
        // console.log(logo.style.marginLeft);

    }
}

function CheckboxAll(){
    // console.log("check");
    var AcheckboxContainer = document.getElementsByClassName('checkboxContainer')[0];
    var Ainput = new Array(); 
    Ainput = AcheckboxContainer.getElementsByTagName('input');
    // console.log(Ainput);
    if(Ainput[0].checked==true)
    {
        for(i=0;i<Ainput.length;i++)
        {
            Ainput[i].checked=true;
        }

    }
    else
    {
        for(i=0;i<Ainput.length;i++)
        {
            Ainput[i].checked=false;
        } 
    }

}

function CheckboxSub(){
    var AcheckboxContainer = document.getElementsByClassName('checkboxContainer')[0];
    var Ainput = new Array(); 
    Ainput = AcheckboxContainer.getElementsByTagName('input'); 
    for(i=1;i<Ainput.length;i++)  
    {
        if(Ainput[i].checked==false)
        {
            Ainput[0].checked=false;
            break;
        }
    } 
}
window.onresize=function(){ 
    // if(document.body.clientWidth<=800 || document.body.clientWidth)
        location=location;
        // console.log(111);
};
