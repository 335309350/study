//闭包和引用
function Counter(start){
    var counter = start;
    //返回incr,get方法，当我们调用incr时候counter可以在incr,get中被访问
    return {
        incr : function(){
            counter++;
            
        },
        get : function(){
            return counter;
            
        }
        
    }
    
}
var foo =Counter(4);
foo.incr();//增长
console.log(foo.get());
foo.incr();//再次增长
console.log(foo.get());//访问外部函数中的变量counter
console.log(counter); //外部无法访问counter变量