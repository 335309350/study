//继承mydrag.js中的fnDrag(id)
function fnDrag_Limit(id){
	//继承父类fnDrag(id)
	fnDrag.call(this,id);
}
//拖拽自己的属性和方法
//先继承父fnDrag的原型
for(var i_proto in fnDrag.prototype){
	fnDrag_Limit.prototype[i_proto]=fnDrag.prototype[i_proto];
}
//定义子类的方法显示范围
/*
	fnDrag.prototype.fnMouseMove=function (ev){
					var oEvent=ev || window.event;
					//设置div的left,top
					//鼠标的x,y减去disx,disy
					this.drag_box.style.left=oEvent.clientX-this.disX+"px";
					this.drag_box.style.top=oEvent.clientY-this.disY+"px";
		}
	*/
//覆盖父级的fnMouseMove,只需要重写父类的移动方法
fnDrag_Limit.prototype.fnMouseMove=function (ev){
					var oEvent=ev || window.event;
					//设置div的left,top
					//鼠标的x,y减去disx,disy
					var l_x=oEvent.clientX-this.disX;
					var l_y=oEvent.clientY-this.disY;
					//防止飞出左右边界
					if(l_x<0){
						l_x=0;
					}else if(l_x>document.documentElement.clientWidth-this.drag_box.offsetWidth){
						l_x=document.documentElement.clientWidth-this.drag_box.offsetWidth;
					}
					//防止飞出上下边界
					if(l_y<0){
						l_y=0;
					}else if(l_y>document.documentElement.clientHeight-this.drag_box.offsetHeight){
						l_y=document.documentElement.clientHeight-this.drag_box.offsetHeight;
					}
					this.drag_box.style.left=l_x+"px";
					this.drag_box.style.top=l_y+"px";
		}