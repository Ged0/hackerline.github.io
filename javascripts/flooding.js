/*
* by line
* email£ºzh.hackerline@gmail.com
*/

function auto_sendmsg(){
//	 var str = document.getElementById('chart_content').value;
	 document.getElementById('chart_content').value = "test";
	sendmsg();
	setTimeout(auto_sendmsg(),send_interval_time*1000+100);
	
}

function set(){
	var str = document.getElementById('area').value;
	console.log(str);
}
	
function set1(){
	var str = document.getElementById('area').value;
	document.getElementById('area1').value = document.getElementById('area1').value + str;
	console.log(document.getElementById('area1').value)
}
	
function set_time(){
	set1();
	setTimeout('set_time()',1000);
}
	
function test(){
	//	document.getElementById('area1').value = "test";
	console.log("test");
}
