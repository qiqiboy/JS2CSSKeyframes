# JS2CSSKeyframes
Create CSS3 keyframes animation from javascript.  
使用JS动态创建管理CSS3 Animations。

## 为何使用
随着支持HTML5的普及，页面中使用各种动画的地方越来越多，尤其是一个小型的动画，使用css3来做无疑是既方便又快捷的一个选择。 

但是由于浏览器间差异（主要是 webkit 和 moz），我们目前使用css3动画还必须写上各种浏览器前缀，这样无疑给开发工作增添许多麻烦，添加 修改都是无尽的麻烦。 

JS2CSSKeyframes就是解决这个问题的，它可以自动根据不同浏览器生成其支持的css3动画@keyframes，省去各种前缀。动画中的css3属性也会自动加入前缀，无需单独书写。 

例如：new JS2CSSKeyframes("test", {from:{transform:'translate(0,0);'},to:{transform:'translate(100px,100px);'}}); 

在不同浏览器下将会生成以下三种之一  
* @-webkit-keyframes test { from { -webkit-transform:translate(0,0) } to { -webkit-transform:translate(100px,100px) } }  
* @-moz-keyframes test { from { -moz-transform:translate(0,0) } to { -moz-transform:translate(100px,100px) } }   
* @keyframes test { from { transform:translate(0,0) } to { transform:translate(100px,100px) } }   


## 如何使用
```javascript

/* @description 创建css3动画
 * @Class JS2CSSKeyframes
 * @param String name 名称，可省略该参数，name将随机生成
 * @param String|Object|Array config 动画帧设定
 *
 * @example-1 new JS2CSSKeyframes("test", {
 *              "from":"width:300px;height:100px;",
 *              "50%":"width:30px;height:10px;",
 *              "to":{width:"300px",height:"10px"}
 *           });
 *
 * @example-2 new JS2CSSKeyframes("test1", ["width:300px;height:100px;","width:30px;height:10px;"]);
 *
 * @example-3 new JS2CSSKeyframes("test2", "from {width:300px;height:100px;} to {width:300px;height:100px;}");
 *
 * 注：也可以使用 JS2CSSKeyframes.add(name,config) 来创建动画
 */

//用法一
ani=new JS2CSSKeyframes('ani_1',{
    '0%':{width:0,height:0},
    '50%':{width:'100px',height:'100%'},
    '100%':{width:0,height:0}
});

//用法二
ani=new JS2CSSKeyframes('ani_1',{
    '0%':'width:0;height:0',
    '50%':'width:100px;height:100%;',
    '100%':'width:0;height:0;'
});

//用法三
//均等比例帧可以使用数组省略比例
ani=new JS2CSSKeyframes('ani_1',[
    'width:0;height:0', //0%
    'width:100px;height:100%;', //50%
    'width:0;height:0;' //100%
]);

//用法四
//可以省略名称，name将随机生成，可以通过 .name 来查看生成的名称
ani=new JS2CSSKeyframes([
    'width:0;height:0', //0%
    'width:100px;height:100%;', //50%
    'width:0;height:0;' //100%
]);
console.log(nai.name); //输出 css3Ani_999997712 



//JS2CSSKeyframes实例对象的其它属性及方法说明
//@prop String name 动画名称
console.log(ani.name);

//@prop String cssText 动画内容
console.log(ani.cssText);

//@prop CSSRuleList cssRules 动画帧信息集合
console.dir(ani.cssRules);

//@prop Object keyframes 动画帧对象，键值为比例百分比，0% 50% 等 
console.dir(ani.keyframes);

//@method get(key) 获取指定进度的CSSKeyframeRule帧
ani.get('ani_1')

//@method add(key,value) 增加进度为key，样式为value的帧
ani.get('50%')

//@method remove(key) 删除进度为key的帧
ani.remove('50%');

//@method clear() 删除所有的帧
ani.clear();



JS2CSSKeyframes.CSSKeyframes //Object 获取页面上所有的css3动画

//JS2CSSKeyframes.get(name) //获取页面上名为name的动画
JS2CSSKeyframes.get('ani_1');

//JS2CSSKeyframes.remove(name) //删除页面上名为name的动画
JS2CSSKeyframes.remove'ani_1');

//JS2CSSKeyframes.add(name,config) //增加动画，同 new JS2CSSKeyframes(name,config);
JS2CSSKeyframes.add("test", {
    "from":"width:300px;height:100px;",
    "50%":"width:30px;height:10px;",
    "to":{width:"300px",height:"10px"}
});

JS2CSSKeyframes.vendor //String 当前浏览器前缀 -webkit -moz- 或空字符串

JS2CSSKeyframes.support //Boolean 是否支持css动画，不支持css3动画的浏览器中调用JS2CSSKeyframes其它方法将会报错

````

## DEMO 
http://u.boy.im/css3keyframes
