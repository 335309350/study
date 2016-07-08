//事件处理函数库
//
/**
 *  通用的事件监听函数
 *  listenEvent(eventObj,eventType,eventFunc);
 *  事件处理元素对象，事件类型click,keypress,blur,事件函数func
 */
function listenEvent(eventTarget,eventType,eventHandler){
    //事件处理的对象eventTarget,eventType事件类型(click,keypress,mouseover),eventHandler事件处理函数
    if(eventTarget.addEventListener){
        //判断是否支持w3c dom level2的事件监听方法
        //dom level2事件处理，把一个函数分配给一个事件处理程序
        eventTarget.addEventListener(eventType,eventHandler,false);//默认向内部向外部冒泡
    }else if(eventTarget.attachEvent){
         //IE8 支持attachEvent,在事件的前面添加on修饰，是attachEvent必须的
         eventType="on"+eventType;
         //监听事件
         eventTarget.attachEvent(eventType,eventHandler);
         //只接收事件类型和事件处理函数
    }else{
        //IE8以下的老版本浏览器采用dom level 0事件处理
        eventTarget["on"+eventType]=eventHandler;
    }
}
/**
 *  移除事件监听
 *  stopListening(eventObj,eventType,eventFunc);
 *  事件处理元素对象，事件类型click,keypress,blur,事件函数func
 */

function stopListening(eventTarget,eventType,eventHandler){
    if(eventTarget.removeEventListener){
        //w3c dom level2 方式
        eventTarget.removeEventListener(eventType,eventHandler,false);//从内到外部冒泡
    }else if(eventTarget.detachEvent){
        eventType="on"+eventType;
        eventTarget.detachEvent(eventType,eventHandler);//IE
    }else{
        eventTarget["on"+eventType]=null;//老版本取消事件
    }
}

/**
 *  如果除了使用自己的事件监听和移除事件，还要用其他的JS库，可以取消JS库的事件处理，避免覆盖。
 *  不管window.onload事件处理程序如何分配，都将赋值给一个变量
*/
function addLoadEvent(func){
    var oldonload=window.onload;
    if(typeof window.onload != 'function'){
        //如果没有指定window.onload,就赋值func
        window.onload=func;
    }else{
        //给事件处理分配一个匿名函数，调用我们之前分配的事件处理
        window.onload=function(){
            if(oldonload){
                oldonload();
            }
            func();
        }
    }
}

/**
 *  在事件传播到其他元素之前，取消事件
 *  用法：在一个事件完成前取消它
    *  比如：表单提交前
    *  function validateForm(evt){
        evt=evt || window.evt;
        cancelEvent(evt);
    *  }
 */
function cancelEvent(event){
    if(event.preventDefault){
        event.preventDefault();//阻止默认事件发生
    }else{
        event.returnValue=false;//Dom level 0事件取消
    }
} 
/**
 *  阻止一个事件在一组嵌套元素中传播
 *  元素在另一个元素汇总，可以阻止冒泡传播
 *  适用任何元素和事件
 *  用法：在内部元素点击事件的事件处理程序中，调用该函数，传入事件对象
    *  比如： function clickOne(evt){
    if(flag){
        cancelPropagation(evt);
    }
    *  }
 */
function cancelPropagation(event){
    if(event.stopPropagation){
        event.stopPropagation();
    }else{
        event.cancelPropagation=true;
    }
}
