// 排列瀑布布局，并渲染
// 开头这里不能用$(document)，因为它是在页面加载时同时加载
// 以下是加载完成后，才加载function里面的函数
$(window).on("load",function(){
	waterfall();
	// json数据格式
	var dataInt={'data':[{'src':'1.jpg'},{'src':'2.jpg'},{'src':'3.jpg'},{'src':'4.jpg'}]};
	//添加onscroll事件监听
	$(window).on("scroll",function(){
		//当滑动到下边,加载数据
		if(checkedScroll()){
			//each方法遍历数组
			$.each(dataInt.data,function(index,value){
				var box=$("<div>").addClass("box").appendTo($("#main"));
				var pic=$("<div>").addClass("pic").appendTo(box);
				$("<img>").attr("src","./images/"+value.src).appendTo(pic);
			});
		}
		waterfall();
	});
});
// 瀑布布局函数
function waterfall(){
	var $boxs=$("#main>div");
	var boxw=$boxs.eq(0).outerWidth();
	var num=Math.floor($(window).outerWidth()/boxw);
	$("#main").css({"width":boxw*num+"px","margin":"0 auto"});
	var boxHarr=[];
	$boxs.each(function(index,value){
		if(index<num){
			boxHarr.push($(value).outerHeight());//压入前一排box的高度，value为box元素
		}
		else{
			var min=Math.min.apply(null,boxHarr);
			var minIndex=$.inArray(min,boxHarr);
			$(value).css({
				"position":"absolute",
				"top":min+"px",
				"left":minIndex*boxw+"px"
			});
			boxHarr[minIndex]+=$(value).outerHeight();
		}
	});
}
//判断是否滚动到最后一个box的一半，是则返回ture
function checkedScroll(){
	var $boxs=$("#main>div");
	var lastbox=$boxs.last();
	//盒子的距离顶部的位置加其高度的一半
	var lastbox_half_h=lastbox.offset().top+Math.floor(lastbox.outerHeight()/2);
	var Top=$(window).scrollTop()+$(window).height();//滚动高度+页面高度
	return Top>lastbox_half_h?true:false;
}