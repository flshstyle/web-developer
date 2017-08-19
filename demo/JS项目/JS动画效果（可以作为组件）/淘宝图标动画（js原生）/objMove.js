function objMove(obj,json,sp,fn){
	window.clearInterval(obj.ctime);
	sp=sp?sp:30;
		obj.ctime=setInterval(function(){
			var flag=true;
			for(var i in json){
				var numNow=0;
				var speed=0;
				if (i=="opacity") {
					numNow=obj.currentStyle?parseInt(obj.currentStyle[i]):parseInt(getComputedStyle(obj,false)[i]*100);
				} else {
					numNow=obj.currentStyle?parseInt(obj.currentStyle[i]):parseInt(getComputedStyle(obj,false)[i]);
				}
				speed=(json[i]-numNow)>0?Math.ceil((json[i]-numNow)/8):Math.floor((json[i]-numNow)/8);
				numNow=Math.round(speed+numNow);
				if (i=="opacity") {
					obj.style.opacity=numNow/100;
				} else {
					obj.style[i]=numNow+"px";
				}
				
				if(numNow!=json[i]){
					flag=false;
				};
			}
			if (flag) {
				window.clearInterval(obj.ctime);
				if (fn) {
					fn();
				}
			}
		},sp);
};