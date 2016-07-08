$(function(){
	//$(".li-main>a,.lih-main>a")
	//这样的方式可以实现纵向和横向的点击显示
	$(".li-main>a").click(function(){
		//alert("ok");
		//找到li-main子节点里面的a(下一个)
		var li_main_ul=$(this).next("ul");
		/*第一种方式通过css的display:none,block
		//显示和隐藏
		//找到li-main子节点里面a的下一个兄弟节点ul
		if(li_main_ul.css("display")=="none"){
			//如果子节点a下一个兄弟节点ul隐藏就显示
			li_main_ul.css("display","block");
		}else{
			li_main_ul.css("display","none");
		}
		*/
		//第二种方式通过show(),hide()显示和隐藏
		//改变了长度，高度给定一个时间有动画效果
		//li_main_ul.show(500);
		/*
		if(li_main_ul.css("display")=="none"){
			//如果子节点a下一个兄弟节点ul隐藏就显示
			li_main_ul.show(500);//有动画效果
		}else{
			li_main_ul.hide(500);//隐藏动画效果
		}
		*/
		//第三种方式用toggle()切换css来实现
		
		//li_main_ul.toggle();
		//当前显示就隐藏，反之亦然
		//第四种方式，slideUp()和slideDown();
		//收起和显示，在高度上改变
		/*
		if(li_main_ul.css("display")=="none"){
			//如果子节点a下一个兄弟节点ul隐藏就显示
			li_main_ul.slideDown(500);//有动画效果
		}else{
			li_main_ul.slideUp(500);//隐藏动画效果
		}
		*/
		//第五种方式,slideToggle();
		li_main_ul.slideToggle();
		changeIcon($(this));//改变下拉菜单图标
		//li_main_ul.siblings().slideToggle();	
	});
	//横向菜单鼠标划过
	$(".lih-main").hover(function(){
		$(this).children("ul").slideDown(600);
		//当前对象lih-main中的子节点ul显示
		changeIcon($(this).children("a"));//改变下拉菜单图标
	
	},function(){
		$(this).children("ul").slideUp(600);
		//当前对象的子节点ul隐藏
		changeIcon($(this).children("a"));//改变下拉菜单图标
	});	
});
/*
	*修改主菜单的图标
	*/
	function changeIcon(mainNode){
		if(mainNode){
			if(mainNode.css("background-image").indexOf("collapse.gif")>=0){
				//如果有下拉图标就要改成
				mainNode.css("background-image","url(./images/extend.gif)");
				//当前的html相对的位置
			}else{
				mainNode.css("background-image","url(./images/collapse.gif)");
			}
		
		}
	}
