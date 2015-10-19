/*
* by line
* email£ºzh.hackerline@gmail.com
*/

var talk = "test";

//document.getElementById('sms_chandiv').innerHTML = innerHTML + "<textarea id='area'></textarea>"

function get_and_send(){
	talk = document.getElementById('chart_content').value;
	auto_sendmsg();
}

function sendmsg_once(){
	document.getElementById('chart_content').value = talk + Math.ceil(Math.random() * 25 + 1);
	console.log(document.getElementById('chart_content').value);
	sendmsg();
}

function auto_sendmsg(){
	setTimeout("sendmsg_once()",send_interval_time*1000+100);
	
}

function send_once(){
	document.getElementById('chart_content').value = "test";
	console.log("send_interval_time: "+send_interval_time);
	console.log("sendtime: "+sendtime);
	console.log("innerHTML: "+ document.getElementById('sms_chandiv').innerHTML);
	sendmsg();
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
