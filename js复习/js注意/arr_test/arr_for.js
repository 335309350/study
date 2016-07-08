//数组的遍历
var arr=[1,23,45,54,89,90,8];
var start_date = new Date();
var star_time = start_date.getTime();
/*
for(var i =0,len = 100000;i<len;i++){//局部缓存arr的长度
    console.log(i);//100000
}
*/
//for(var i =0,len = arr.length;i<len;i++){//局部缓存arr的长度
for(var i =0;i<arr.length;i++){//局部缓存arr的长度
    console.log(arr[i]);
}
var end_date = new Date();
var end_time = end_date.getTime();
//console.log('this arr for cost'+Math.floor((end_time-star_time)/1000)+'s');//7s

console.log('this arr for cost'+(end_time-star_time)+'ms');//采用局部缓存12-14ms,不采用大概是14-15ms


