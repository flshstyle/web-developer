var data=["iphone6","ipad","洗衣机","冰箱",
"千元购物券","佳能相机","机械键盘",
"谢谢参与","柳毅","柳毅"];
var flag=0;
var timer;

window.onload=function(){	
	var play=document.getElementById("play"),
	stop=document.getElementById("stop");
	//执行停止
	play.onclick=fnPlay;
	stop.onclick=fnStop;
	//键盘事件
	document.onkeyup=function(event){
		e=event||window.event;
		if(e.keyCode==13){
			if(flag==0){
				fnPlay();
				flag=1;
			}else{
				fnStop();
				flag=0;
			}
		}
	};
};

function fnPlay(){
	clearInterval(timer);
	timer=setInterval(change, 50);
	function change(){
		title=document.getElementById("title");
		var random=Math.floor(Math.random()*data.length);
		title.innerHTML=data[random];
	}
	var play=document.getElementById("play");
	play.style.background="#999";
}
function fnStop(){
	clearInterval(timer);
	var play=document.getElementById("play");
	play.style.background="#363";
}