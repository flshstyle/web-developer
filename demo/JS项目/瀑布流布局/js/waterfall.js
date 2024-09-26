//目标：实现瀑布页面布局，滚动到底部是加载元素项并排列
window.onload=function(){
	waterfall('main','box');
	var dataInt={"data":[{"src":"1.jpg"},{"src":"4.jpg"},{"src":"7.jpg"},{"src":"9.jpg"}]}
	//当页面滑动到底部时，加载渲染元素
	window.onscroll=function(){
		if(checkedScroll()){
			for(var i=0;i<dataInt.data.length;i++){
				var parent=document.getElementById("main");
				var box=document.createElement("div");
				box.className="box";
				parent.appendChild(box);
				var pic=document.createElement("div");
				pic.className="pic";
				box.appendChild(pic);
				var img=document.createElement("img");
				img.src="./images/"+dataInt.data[i].src;
				pic.appendChild(img);
			}
			waterfall('main','box');
		}
	}
}
// 通过class获得元素
function getByClass(obj,className){
	var result=[];
	var allBox=obj.getElementsByTagName("*");
	for(var i=0;i<allBox.length;i++){
		if(allBox[i].className==className){
			result.push(allBox[i]);
		}
	}
	return result;
}
// 获得min最小盒子高度在数组中的位置
function getminIndex(arr,min){
	for(var i in arr){
		if(arr[i]==min){
			return i;
		}
	}
}
// 排列瀑布布局
// parentID父级元素ID
// childID子元素ID
function waterfall(parentID,childID){
	var parent=document.getElementById(parentID);
	var boxs=getByClass(parent,childID);
	//页面宽
	var cw=document.documentElement.clientWidth||document.body.clientWidth;
	var bw=boxs[0].offsetWidth;//盒子的宽
	var num=Math.floor(cw/bw);//每一行有多少个元素
	var boxHs=[];//用数组装入前一排盒子的高
	var oParent=document.getElementById("main");
	oParent.style.cssText="width:"+bw*num+"px;margin:0 auto;"
	for(var i=0;i<boxs.length;i++){
		if(i<num){
			boxHs.push(boxs[i].offsetHeight);
		}
		else{
			var min=Math.min.apply(null,boxHs);//求得这一排盒子高的最小值
			var minBox_i=getminIndex(boxHs,min);//最小盒子高度在数组中的位置
			//排列除第一行盒子外的盒子，把他们加到最小高度的盒子下面
			boxs[i].style.position="absolute";
			boxs[i].style.top=min+"px";
			boxs[i].style.left=boxs[minBox_i].offsetLeft+"px";
			boxHs[minBox_i]+=boxs[i].offsetHeight;//更新快框的列高
		}
	}
}
// 检测是否滚动到底部最下面一个盒子的中部位置
function checkedScroll(){
	var top=document.documentElement.scrollTop||document.body.scrollTop;
	var parent=document.getElementById("main");
	var boxs=getByClass(parent,"box");
	var lastBox=boxs[boxs.length-1];//获得最后一个盒子
	var documentH=document.documentElement.clientHeight;//页面高度
    var H=Math.floor(lastBox.offsetHeight/2);//获得盒子的一半高
    var boxTop=lastBox.offsetTop;//盒子的距离父元素顶部的距离
    return documentH+top>H+boxTop?true:false;//滚动到底部最下面一个盒子的中部位置时返回true
}