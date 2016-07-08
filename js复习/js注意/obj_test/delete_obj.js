//删除对象的属性
var my={
    bar : 1,
    foo : 2,
    baz : 123
};
//设置属性为 undefined 或者 null 并不能真正的删除属性， 而仅仅是移除了属性和值的关联
my.bar=undefined;
my.foo=null;
delete my.baz;//删除对象中的属性，唯一方法
for(var i in my){
    if(my.hasOwnProperty(i)){
        console.log(i,' '+my[i]);
        
    }
    
}