function getByClass(className,parentId){
	var oparent=document.getElementById(parentId)||document;
	var elems=[];
	var elements=oparent.getElementsByTagName('*');//数组
	for(var i=0;i<elements.length;i++){
		if(elements[i].className==className){
			elems.push(elements[i]);
		}
	}
	return elems;
}

window.onload=drag;

//拖曳事件
function drag(){
	var logo=getByClass("login_logo_webqq","loginPanel")[0];
	logo.onmousedown=fnDown;
	var close=document.getElementById("ui_boxyClose");
	close.onclick=function(){var a=document.getElementById("loginPanel");
		a.style.display="none";};
	//点击状态
	//状态栏事件
	var	states=document.getElementById("loginState");
	var stateShow=document.getElementById("loginStateShow");
	var stateText=document.getElementById("login2qq_state_txt");
	var statePanel=document.getElementById("loginStatePanel");
	var li=getByClass("statePanel_li","loginStatePanel");
	//按下状态栏，弹出面板
	states.onclick=function(){statePanel.style.display="block";};
	//状态面板鼠标事件（移上，移开，按下）
	for(var i=0;i<li.length;i++){
		li[i].onmouseover=function(){this.style.background="#ccc";};
		li[i].onmouseout=function(){this.style.background="#fff";};
		li[i].onclick=function(event){
			e=event|| widows.event;
			if(e.stopPropagation){
				e.stopPropagation();
			}else{
				e.cancelBubble=true;
			}
			statePanel.style.display="none";
			var id=this.id;
			//转换状态文字
			stateText.innerHTML=getByClass('stateSelect_text',id)[0].innerHTML;
			//转换图片
			stateShow.className="login-state-show " +id;
		};
	
	}
}

//按下鼠标
function fnDown(evnet){
		e=event || window.event;
	var pDis=document.getElementById("loginPanel"),
		pL=pDis.offsetLeft,pT=pDis.offsetTop;//面板与body距离
	var l=e.clientX-pL,
		t=e.clientY-pT;//鼠标移动时与面板距离
	document.onmousemove=function(event){
		e=event || window.event;
		fnMove(event,l,t);
	};
	//释放鼠标
	document.onmouseup=function(){
	document.onmousemove=null;
	document.onmouseup=null;
	};
	}

//鼠标移动
function fnMove(evnet,l,t){	
	e=event || window.event;
	var panel=document.getElementById("loginPanel");
	var W=document.documentElement.clientWidth || document.body.clientWidth,
		H=document.documentElement.clientHeight || document.body.clientHeight;
	maxW=W-panel.offsetWidth;
	maxH=H-panel.offsetHeight;
	var L=e.clientX-l,
		T=e.clientY-t;
	if(L<0){
		L=0;
	}else if(L>maxW){
		L=maxW;
	}
	if(T<0){
		T=0;
	}else if(T>maxH){
		T=maxH;
	}
	document.title=L+":"+T;

	panel.style.left=L+"px";
	panel.style.top=T+"px";

}
