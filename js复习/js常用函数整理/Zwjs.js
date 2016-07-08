/**
 *  author:bjdaheige@163.com
 *  time  : 2015-06-17 02:01
 *  desc  : 此库函数全部为js原生写的，可以帮助大家构造更好的web应用
 */
//长用的原生js公共库
var Zwjs={
    check_typeof : function (obj,type){
        //为了获取对象的 [[Class]]，我们需要使用定义在 Object.prototype 上的方法 toString 作用对象的时候就是[Object String]，[Object Array]等
        //JavaScript 标准文档中定义: [[Class]] 的值只可能是下面字符串中的一个： Arguments, Array, Boolean, Date, Error, Function, JSON, Math, Number, Object, RegExp, String.
        //这里我转化为小写
        
        var my_class = Object.prototype.toString.call(obj).slice(8,-1).toLowerCase();
        //返回String,Number,Object等
        return obj !== undefined && obj !== null && my_class === type.toLowerCase();
    },
    //得到对象的类型
    get_obj_type : function(obj){
        if(obj === undefined) return "undefined";
        if(obj === null) return "null";
        return Object.prototype.toString.call(obj).slice(8,-1).toLowerCase();//arguments,array,boolean,date,error,function,json,math,number,object,regxp,null,string,null
    },
    //将数组小到大排序
    sortArr : function(arr,isAsc){
        var isAsc = isAsc || 1;
        return arr.sort(function(a,b){
                if(isAsc == 1) return b - a;
                return a - b;
        });
        
    },
    //对数组随机排序
    rndSortArr : function(ary){
        return ary.sort(function(a,b){
            return Math.random() > 0.5 ? -1 : 1;
            //产生0-1之间的随机数，如果大于0.5就不交换位置，否则交换位置
        });
        
    },
    //客户区大小，可视区的大小document.documentElement.clientHeight(clientWidth)元素内容区域宽度加上左右（上下）内边距的宽度（高度）
    getviewport : function(){
        var view = {};
        if(document.compatMode == "BackCompat"){//IE7以下版本浏览器
            view.width = document.body.clientWidth;
            view.height = document.body.clientHeight;
        }else{
            view.width = document.documentElement.clientWidth;
            view.height = document.documentElement.clientHeight;
        }
        return view;
    },
    //得到鼠标的坐标（鼠标的x,y是相对于可见视口定位）
    getPos : function(event){
        var event = event || window.event;
        var pos = {};
        var sTop = document.documentElement.scrollTop || document.body.scrollTop;//支持跨平台
        var sLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
        //clientX(Y)表示可视区的x,y坐标
        pos.x = event.clientX + sLeft;
        pos.y = event.clientY + sTop;
        return pos;
    },
    //获取元素在屏幕上占用的可见空间，取得左和上偏移量offsetLeft,offsetTop
    //元素的上边框到父元素的上内边框距离，左偏移量
    getEleLeft : function(elem){
        var actLeft = elem.offsetLeft;
        var current = elem.offsetParent;//父元素（元素的引用放在offsetParent
        while(current != null){//父元素存在
            actLeft += current.offsetLeft;//左偏移量叠加
            current = current.offsetParent;//得到上一级的父元素
        }
        return actLeft;
        
    },
    getEleTop : function(elem){
        var actTop = elem.offsetTop;
        var current = elem.offsetParent;//父元素（元素的引用放在offsetParent
        while(current != null){//父元素存在
            actTop += current.offsetTop;//元素的上边框到父元素的上内边框距离
            current = current.offsetParent;//得到上一级的父元素
            
        }
        return actTop;
        
    },
    //得到元素到最外层的盒子的顶部距离和左边距离
    getTop : function(obj){
        var iTop = 0;
        while(obj) {
            iTop += Math.floor(obj.offsetTop);//向下取整
            obj = obj.offsetParent;
        }
        return iTop;
    },
    getLeft : function(obj){
        var ileft = 0;
        while(obj) {
            ileft += Math.floor(obj.offsetLeft);//向下取整
            obj = obj.offsetParent;
        }
        return ileft;
    },
    //获取窗口相对于屏幕左边和上边的距离
    getScreenSize : function(){
        var leftPos =(typeof window.screenLeft == 'number') ? window.screenLeft : window.screenX;
        var topPos =(typeof window.screenTop == 'number') ? window.screenTop : window.screenY;
        var objScreen = {
            'left':leftPos,
            'top':topPos
        };
        return objScreen;
    },
    //获取页面的窗口大小或页面大小(可视口大小)
    getPageSize : function(){
       var pageWidth = window.innerWidth,pageHeight = window.innerHeight;//移动设备上的可见视口
       if(typeof pageWidth != 'number'){
            if(document.compatMode == 'CSS1Compat'){
                pageWidth = document.documentElement.clientWidth;//对于移动的IE不支持可以采用这个属性
                pageHeight = document.documentElement.clientHeight;
                // 其他的浏览器中，这个属性是布局视口，渲染页面的实际大小。跟可视口不同，可见视口只是整个页面中的一小部分。其他的移动浏览器把布局视口的信息保存在document.body.clientWidth中，不会随着页面的变化而变化。

            }else{//兼容IE6
                pageWidth = document.body.clientWidth;
                pageHeight = document.body.clientHeight;
            }
       }
       var pageSize ={
           'pageWidth' : pageWidth,
           'pageHeight' : pageHeight
       };
       return pageSize;
    },
    //得到滚动条的scrollTop,scrollLeft
    getScrollSize : function (){
        var screenInfo = {
            'scrollTop' : document.documentElement.scrollTop || document.body.scrollTop,
            'scrollLeft' : document.documentElement.scrollLeft || document.body.scrollLeft
            
        };
        return screenInfo;
        
    },
    //简便的查询滚动条位置
    getScrollOffsets : function(w){
        w = w || window;
        var obj = {};
        var sLeft,sTop;
        if(w.pageXOffset != null) {
                obj.sLeft = w.pageXOffset;
                obj.sTop = w.pageYOffset;
                return obj;
        }
        if(document.compatMode == "CSS1Compat"){
            obj.sLeft = document.documentElement.scrollLeft == 0 ? document.body.scrollLeft : document.documentElement.scrollLeft;
            obj.sTop = document.documentElement.scrollTop == 0 ? document.body.scrollTop : document.documentElement.scrollTop;
            return obj; 
        }else if(document.compatMode == "BackCompat"){
            obj.sLeft = document.body.scrollLeft;
            obj.sTop = document.body.scrollTop;
           return obj;
        }
    },
    //得到元素的样式值
    getStyle : function(elem,styleName){
        if(elem.style[styleName]){//内联样式
            return elem.style[styleName];
        }
        else if(elem.currentStyle){//IE
            return elem.currentStyle[styleName];
        }
        else if(document.defaultView && document.defaultView.getComputedStyle){//DOM
            styleName = styleName.replace(/([A-Z])/g,'-$1').toLowerCase();
            var s = document.defaultView.getComputedStyle(elem,null);
            return s && s.getPropertyValue(styleName);
        }
        else{//other,for example, Safari
            return null;
        }
    },
    getEleById : function(obj_id){
        return document.getElementById(obj_id);
        
    },
    //通过className得到元素
    getEleByClass : function(className){
            if(document.getElementsByClassName){
                return document.getElementsByClassName(className);
            }else{
                var tag=document.getElementsByTagName("*");
                //遍历className
                var divs=[];
                for(var i=0;i<tag.length;i++){
                    if(tag[i].className == className){
                        divs.push(tag[i]);
                    }
                }
                return divs;
            }
    },
    //得到或设置CSS属性值
    get_set_css : function(obj,attrName,val){
        //判断是否是-的CSS属性
        if(attrName.indexOf("-") != -1){
            var attr=attrName.split("-");//分割为2半
            //margin-top变成marginTop
            attrName=attr[0]+attr[1].substr(0,1).toUpperCase()+attr[1].substring(1);
        }
        
        //存在val就是设置CSS属性
        if(val !== undefined){
            if(val == "float"){   
                 if(document.all){
                    obj.style.styleFloat=val;//IE的浮动属性
                    return;
                 }
                 obj.style.cssFloat=val;//FF
                 return;
            }
            obj.style[attrName]=val;
            return;
        }
        
        //返回获取的CSS属性
        if(document.all){//IE
            return obj.currentStyle[attrName];
        }else{//FF
            return getComputedStyle(obj,null)[attrName];
        }
    },
    //得到所有的子节点
    getAllChilds : function(_obj){
            var childs = _obj.childNodes;
            var childsArr=[];
            for(var i=0,len = childs.length;i<len;i++){
                if(childs[i].nodeType == 3 && /^\s+$/.test(childs[i].nodeValue)){//节点类型3，值是空白
                    continue;
                }else{
                    childsArr.push(childs[i]);
                }
            }
            return childsArr;
     },
    //得到元素节点中的第一个子节点
    getFirstNode : function(_obj){
            var _first = _obj.firstChild;
                while(_first.nodeType == 3){
                    _first = _first.nextSibling;
                    //从第一个从下循环
                }
                return _first;
            
    },
    //获取节点元素的上一个兄弟节点
    getprevNode : function (_obj){
            var _prev = _obj.previousSibling;
            while(_prev.nodeType == 3){//如果是文本继续上一个兄弟节点
                _prev = _prev.previousSibling;
            }
            return _prev;
    },
    //获取节点元素的下一个兄弟节点
    getNextNode : function(_obj){
            var _next = _obj.nextSibling;
            while(_next.nodeType == 3){//如果是文本继续上一个兄弟节点
                _next = _next.nextSibling;
            }
            return _next;
    },
    //获得节点元素中最后一个节点
    getLastNode : function(_obj){
            var _last = _obj.lastChild;
            while(_last.nodeType == 3){//如果是文本继续上一个兄弟节点
                _last = _last.previousSibling;
            }
            return _last;
    },
    //获取和设置内容（不含HTML标签）
    getContent : function(obj,val){
            if(document.all){
                //存在val就是返回内容支持IE
                if(val){
                    obj.innerText=val;//IE
                }else{
                    return obj.innerText;
                }
            }else{
                if(val){
                    obj.textContent=val;//IE
                }else{
                    return obj.textContent;
                }
            }
    },
    //设置元素的属性值
    setAttr : function(obj,attrName,attrVal){
        return obj.setAttribute(attrName,attrVal);
        
    },
    //得到元素的属性值
    getAttr : function(obj,attrName){
        return obj.getAttribute(attrName);
        
    },
    encodeUrl : function(url){
        return encodeURIComponent(url);
        
    },
    decodeUrl : function(url){
      return decodeURIComponent(url);  
        
    },
    //事件监听
    addEvent : function (element, Event_type, handlerFn){
        if (element.addEventListener){
            element.addEventListener(Event_type, handlerFn, false);
        } else if (element.attachEvent){
            element.attachEvent("on" + Event_type, handlerFn);
        } else {
            element["on" + Event_type] = handlerFn;
        }
    },
    //移除事件监听
    removeEvent : function(element, Event_type, handlerFn){
        if (element.removeEventListener){
            element.removeEventListener(Event_type, handlerFn, false);
        } else if (element.detachEvent){
            element.detachEvent("on" + Event_type, handlerFn);
        } else {
            element["on" + Event_type] = null;
        }
    },
    //获取事件对象，事件触发源
    getEvent: function(event){
        return event ? event : window.event;
    },
    
    //得到鼠标按钮，返回0没有按下，1按下主按钮，2次按钮按下
    getButton: function(event){
        var event = event || window.event;
        //支持Dom版的鼠标事件的浏览器可以用hasFeature来检测鼠标按钮
        //0没有按下，1按下了主按钮，2次按钮，3同时按下，4按下了中间的按钮，5主和中间，6次和中间按钮，7三个都按下
        if (document.implementation.hasFeature("MouseEvents", "2.0")){
            return event.button;
        } else {
            switch(event.button){
                case 0:
                case 1:
                case 3:
                case 5:
                case 7:
                    return 0;
                case 2:
                case 6:
                    return 2;
                case 4: return 1;
            }
        }
    },
    //得到键盘码
    getCharCode: function(event){
        var event = event || window.event;
        if (typeof event.charCode == "number"){
            return event.charCode;
        } else {
            return event.keyCode;
        }
    },
    //获取事件触发的目标元素
    getTarget: function(event){
        var event = event || window.event;
        return event.target || event.srcElement;
    },
    //阻止事件的捕获（IE不支持）和冒泡
    stopPropagation: function(event){
        if (event.stopPropagation){
            event.stopPropagation();//取消事件捕获和冒泡
        } else {
            event.cancelBubble = true;//IE中取消事件冒泡（不支持事件捕获）
        }
    },
    //阻止特定事件的默认行为
    preventDefault: function(event){
        if (event.preventDefault){
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    },
    //设置剪切板文本
    setClipboardText: function(event, value){
        if (event.clipboardData){
            event.clipboardData.setData("text/plain", value);
        } else if (window.clipboardData){
            window.clipboardData.setData("text", value);
        }
    },
    //获取剪切板的文本
    getClipboardText: function(event){
        var clipboardData =  (event.clipboardData || window.clipboardData);
        return clipboardData.getData("text");
    },
    //完美移动框架,obj操作的对象，json格式设置规则，fnEnd回调函数
    startMove : function (obj,json,fnEnd){
            clearInterval(obj.timer);
            obj.timer= setInterval(function(){
                var flag = true;//所有的都到达标记
                for(var attr in json){
                    if(json.hasOwnProperty(attr)){
                        var h = 0;//原有的目标值
                        if(attr == "opacity"){
                            h = Math.round(parseFloat(getStyle(obj,attr))*100);
                        }else{
                            h = parseInt(getStyle(obj,attr));
                        }
                        var speed = (json[attr]-h)/6;
                        speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
                        if(h != json[attr]){
                            //有一个没有到达就设置为false
                            flag = false;
                        }
                        if(attr == "opacity"){
                           obj.style.filter = 'alpha(opacity:'+(h+speed)+')';//ie
                           obj.style.opacity = (h+speed)/100;
                        }else{
                            obj.style[attr]=h+speed+"px"; 
                        } 
                    }else{
                        flag = false;
                        //return false;
                    }  
                }
                if(flag){
                    clearInterval(obj.timer);
                    if(fnEnd) fnEnd();//回调函数
                }
            },30);
    },
    //自定义ajax封装函数，{'type':'post','url':'http://www.xx.com','success':fn,'error':fnd,'dataType':'json'}
    myajax : function(obj){
        var r_type = obj.type || 'GET';//请求方式默认GET
        var url = obj.url || '';//请求的URL
        var fnsuccess = obj.success;//成功回调函数
        var fnFailed = obj.error || null;//失败回调函数
        var data_format = obj.dataType || 'json';//返回数据格式默认json
        var data_info = null;//发送的数据
        var tmp_str = '&';
        if(url == ""){
            alert('error:url is empty!');
            return false;
        }
        
        //URL拼接参数
        for(var i in obj.data){
            if(obj.data.hasOwnProperty(i)){
                if(typeof obj.data[i] !== undefined){
                    tmp_str+=i+"="+obj.data[i]+"&";
                }
            }
        }
        
        if(r_type.toUpperCase()=="GET"){
            if(url.indexOf('?') !== -1 && url.indexOf('=') !== -1){
                url +=tmp_str.slice(0,-1);//从第一个字符串开始截取
            }else{
                url +='?'+tmp_str.slice(1,-1);//从第二个开始截取
            }
        }else{//post方式
            data_info = tmp_str.slice(1,-1);//user=zw&age=26的形式
        }
        tmp_str = null;//销毁变量
        //1 创建对象
        var xhr=null;
        if(window.ActiveXObject){
            xhr=new ActiveXObject("Microsoft.XMLHTTP");//IE下
        }else if(window.XMLHttpRequest){
            xhr=new XMLHttpRequest();//FF
        }
        
        //2 打开连接
        //判断是POST,GET发送请求方式
        xhr.open(r_type.toUpperCase(),url,true);
        if(r_type.toUpperCase()=="POST"){
            //设置响应头信息setRequestHeader();
            xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        }
        
        //3 发送请求
        xhr.send(data_info || null);
        //4 服务器处理请求后给客户端，回调函数处理
            xhr.onreadystatechange=function(){
                if(xhr.readyState==4){
                //对象状态码表示完成响应内容解析完成，可以在客户端调用
                //服务器返回状态码
                    if(xhr.status==200){
                        //整个过程请求成功
                        //alert(xhr.responseText);
                        //接收xhr.responseText作为参数
                        if(data_format=="html" || data_format=="json"){
                            fnsuccess && fnsuccess(xhr.responseText);
                        }else{
                            fnsuccess && fnsuccess(xhr.responseXML);
                        }	
                    }else{
                        //请求失败，404表示找不到
                        //alert("error status:"+xhr.status);
                        //失败调用函数
                        if(fnFailed){
                            fnFailed(xhr.status);
                        }
                        
                    }
                }
            
            }
    },
    //移除某个元素
    removeEle : function(obj){
        obj.parentNode.removeChild(obj);
        
    },
    //追加元素
    addEle : function(obj,newObj){
        obj.appendChild(newObj);
    },
    //在元素之前插入一个元素
    insertBeforeEle : function(obj,newNode){
        obj.insertBefore(newNode,obj);//要出入的节点和参照节点
        
    },
    //将json对象转化为对象
    json_to_obj : function(json_obj){
        return eval("("+json_obj+")") || JSON.parse(json_obj); 
    },
    //只能输入数字
    clearNonum : function(_tThis){
        var _v=_tThis.value;//only input num
        _tThis.value=_v.replace(/\D/ig,'').replace(/(^\s*)|(\s*$)/ig,'');
    },
    //去掉空格
    clearEleSpace : function(_vtThis){
        var _v_s=_vtThis.value;//remove emptyspace
        _vtThis.value=_v_s.replace(/(^\s*)|(\s*$)/ig,'');
    },
    //去掉字符串左右两边的空格
    clearTrim : function (_vstr){
        return _vstr.replace(/(^\s*)|(\s*$)/ig,'');
    },
    //手机判别
    is_phone : function (_phone){
        _phone = _phone.replace(/(^\s*)|(\s*$)/ig,'');
        if(_phone == '' || _phone === undefined){
            return false;
        }
        if(!/^((\+?86)|(\(\+86\)))?1(3|4|5|7|8)\d{9}$/.test(_phone)){
            return false;
        }else{
            return true;
        }
        
    },
    //电话判别
    is_tel : function (_phone){
        _phone = _phone.replace(/(^\s*)|(\s*$)/ig,'');
        if(_phone == '' || _phone === undefined){
            return false;
        }
        if(!/^(([0\+]\d{2,3}-?)?(0\d{2,3})-?)(\d{7,8})(-?(\d{3,}))?$/.test(_phone)){
            return false;
        }else{
            return true;
        }
    },
    //省份和城市代码判别
    is_province : function(_province,_is_top){
        _province = _province.replace(/\D/ig,'');
        if(_province == '' || _province === 'undefined'){
            return false;
        }
        var preg=/^[1-8]\d{5}$/;
        if(_is_top){
            preg = /^[1-8]\d{1}0000$/;
        }
        if(!preg.test(_province)){
            return false;
        }else{
            return true;
        }
    },
    //银行卡判别
    is_bank_id : function(_bank_id){
        _bank_id = _bank_id.replace(/(^\s*)|(\s*$)/ig,'');
        if(_bank_id == '' || _bank_id === 'undefined'){
            return false;
        }
        var preg=/^[1-9]\d{3}(\s|-)?\d{4}(\s|-)?\d{4}(\s|-)?\d{4,7}$/;
        if(!preg.test(_bank_id)){
            return false;
        }else{
            return true;
        }
    }
};