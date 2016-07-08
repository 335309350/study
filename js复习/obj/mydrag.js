//拖拽的父类，只要传入一个ID就可以new fnDrag(id);
function fnDrag(drag_id){
			var _this=this;
			//指向对象fnDrag,私有变量_this防止this混淆
			this.disX=0;//物体的x,y
			this.disY=0;
			this.drag_box=document.getElementById(drag_id);
			this.drag_box.onmousedown=function(ev){
				_this.fnMousedown(ev);
				return false;//阻止默认行为，防止内容被选中
			}
		}
		fnDrag.prototype.fnMousedown=function (ev){
				var _this=this;//指向对象fnDrag
				var oEvent=ev || window.event;
				//可视区的x减去div的物体的x
				//alert(oEvent.clientX);
				this.disX=oEvent.clientX-this.drag_box.offsetLeft;
				this.disY=oEvent.clientY-this.drag_box.offsetTop;
				//鼠标移动
				document.onmousemove=function(ev){
					_this.fnMouseMove(ev);
				}
				//鼠标弹起
				document.onmouseup=function(){
					_this.fnMouseUp();
				}
		}
		fnDrag.prototype.fnMouseMove=function (ev){
					var oEvent=ev || window.event;
					//设置div的left,top
					//鼠标的x,y减去disx,disy
					this.drag_box.style.left=oEvent.clientX-this.disX+"px";
					this.drag_box.style.top=oEvent.clientY-this.disY+"px";
		}
		fnDrag.prototype.fnMouseUp=function (){
					document.onmousemove=null;
					document.onmouseup=null;
		}