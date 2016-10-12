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
    sideCol.style.height = maxHeight + 'px';
    // hmainCol.style.height = maxHeight + 'px';
}

