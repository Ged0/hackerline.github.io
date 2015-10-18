/*
* by line
* email£ºzh.hackerline@gmail.com
*/


//document.getElementById('sms_chandiv').innerHTML = innerHTML + "<textarea id='area'></textarea>"

function auto_sendmsg(){
//	 var str = document.getElementById('chart_content').value;
	 document.getElementById('chart_content').value = document.getElementById('area').value;
	sendmsg();
	setTimeout(auto_sendmsg(),send_interval_time*1000+100);
	
}

function send_once(){
	document.getElementById('chart_content').value = "test";
	console.log("send_interval_time: "+send_interval_time);
	console.log("sendtime: "+sendtime);
	document.getElementById('sms_chandiv').innerHTML = document.getElementById('sms_chandiv').innerHTML + "<textarea class='cs_textarea' id='area' name='chart_content' maxlength='50' placeholder='test' tabindex='1'></textarea>";
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
