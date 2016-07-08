/**
*  得到鼠标的位置
*  返回obj={'x':x,'y':y};
*/
 //封装一个得到鼠标的位置getPos(),返回json格式
function getMousePos(ev){
    var oEvent=ev || event;
    var scrollTop=document.documentElement.scrollTop || document.body.scrollTop;
    var scrollLeft=document.documentElement.scrollLeft || document.body.scrollLeft;
    //返回(x,y)的json格式
    //滚动的scrollLeft加上可视区的clientX=x
    return {x:oEvent.clientX+scrollLeft,y:oEvent.clientY+scrollTop};
}