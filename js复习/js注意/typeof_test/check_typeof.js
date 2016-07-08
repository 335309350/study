//检测类型
function check_typeof(obj,type){
    //为了获取对象的 [[Class]]，我们需要使用定义在 Object.prototype 上的方法 toString 作用对象的时候就是[Object String]，[Object Array]等
    //JavaScript 标准文档中定义: [[Class]] 的值只可能是下面字符串中的一个： Arguments, Array, Boolean, Date, Error, Function, JSON, Math, Number, Object, RegExp, String.
    //这里我转化为小写
    
    var my_class = Object.prototype.toString.call(obj).slice(8,-1).toLowerCase();
    //返回String,Number,Object等
    return obj !== undefined && obj !== null && my_class === type.toLowerCase();
}
console.log(check_typeof('fefefe','string'));//true
console.log(check_typeof(null,'null'));//false
console.log(check_typeof([1,2,4],'array'));//true
console.log(check_typeof({'zhuwei':'fefe'},'object'));//true
console.log(check_typeof({"zhuwei":"fefe"},'json'));//false

function get_obj_type(obj){
    return Object.prototype.toString.call(obj).slice(8,-1).toLowerCase();//arguments,array,boolean,date,error,function,json,math,number,object,regxp,null,string,null
}

