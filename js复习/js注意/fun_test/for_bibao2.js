//循环中的闭包
/*
for(var i =0;i<10;i++){
    setTimeout(function(){
        console.log(i);
    },1000);
    
}
*/
//连续输出10，因为在调用console.log(i)时候，匿名函数function保持着外部i的引用，当for结束后i=10
//利用闭包保存匿名函数对外部i的引用
/*
for(var i =0;i<10;i++){
    (function(num){
        setTimeout(function(){
            console.log(num);
        },2000);
        
    })(i);//每次都是传递一个新的参数i，在两秒后输出结果。
    //外部的匿名函数会立即执行，并把 i 作为它的参数，此时函数内 num 变量就拥有了 i 的一个拷贝。
    //外部的匿名函数会立即执行，不会收到循环的影响
    
}
*/
//解决方法二，每次返回一个闭包函数调用i
for(var i =0;i<10;i++){
        setTimeout(
        (function(e){
            return function(){
                console.log(e);
                
            }
        })(i),1000);

    
}

