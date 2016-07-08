//原型
function Foo(){
    this.value = 34;
}
Foo.prototype={
    method : function(){}  
}
function Bar(){
    
    
}
// 设置Bar的prototype属性为Foo的实例对象
Bar.prototype=new Foo();
Bar.prototype.foo='zhuwei';
//修正Bar.prototype.constructor为Bar本身
Bar.prototype.constructor=Bar;
var test = new Bar();
console.log(test.foo);//zhuwei
console.log(test.value);//34

var test2 = new Bar();
console.log(test2.foo);
console.log(test2.value);

/**
 *  上面的例子中，test 对象从 Bar.prototype 和 Foo.prototype 继承下来；因此， 它能访问 Foo 的原型方法 method。同时，它也能够访问那个定义在原型上的 Foo 实例属性 value。 需要注意的是 new Bar() 不会创造出一个新的 Foo 实例，而是 重复使用它原型上的那个实例；因此，所有的 Bar 实例都会共享相同的 value 属性。
 */
 
/**
 *  // 原型链
*test [Bar的实例]
*    Bar.prototype [Foo的实例] 
*       { foo: 'Hello World' }
*        Foo.prototype
*            {method: ...};
*            Object.prototype
*                //{toString: ... };
*/
 