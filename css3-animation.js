/* 定义常用css3动画css类
 * @author qiqiboy
 * @github https://github.com/qiqiboy/JS2CSSKeyframes
 */
;
(function(ROOT, undefined){
    "use strict";
    
    if(!JS2CSSKeyframes.support) return; //确保是支持css3动画的浏览器

    var styleSheet=document.styleSheets.item(0);
    var vendor=JS2CSSKeyframes.vendor;
    
    //生成各类动画
    var css3Ani={
        fadeIn:JS2CSSKeyframes('fadeIn',['opacity:0','opacity:1']),
        fadeOut:JS2CSSKeyframes('fadeOut',['opacity:1','opacity:0']),
        scaleIn:JS2CSSKeyframes('scaleIn',['transform:scale(0)','transform:scale(1)']),
        scaleOut:JS2CSSKeyframes('scaleOut',['transform:scale(1)','transform:scale(0)']),
        flyTop:JS2CSSKeyframes('flyTop',['transform:translate(0,50px);opacity:0','transform:translate(0,0);opacity:1']),
        flyRight:JS2CSSKeyframes('flyRight',['transform:translate(50px,0);opacity:0','transform:translate(0,0);opacity:1']),
        flybottom:JS2CSSKeyframes('flybottom',['transform:translate(0,-50px);opacity:0','transform:translate(0,0);opacity:1']),
        flyLeft:JS2CSSKeyframes('flyLeft',['transform:translate(-50px,0);opacity:0','transform:translate(0,0);opacity:1'])
    };
    
    //x y轴翻转
    "X Y".split(" ").forEach(function(prop){
        css3Ani['flipin'+prop]=JS2CSSKeyframes('flipin'+prop,{
                '0%':'transform:perspective(400px) rotate'+prop+'(90deg)',
                '40%':'transform:perspective(400px) rotate'+prop+'(-10deg)',
                '70%':'transform:perspective(400px) rotate'+prop+'(10deg)',
                '100%':'transform:perspective(400px) rotate'+prop+'(0)'
            });
    });
    
    //生成1s ease曲线执行的css类，如 .flyTop { -webkit-aniamtion: flyTop 1s ease; }
    Object.keys(css3Ani).forEach(function(name){
        styleSheet.insertRule('.'+name+'{ '+vendor+'animation: '+name+' 1s ease }',0);
    });
    
    "200 400 500 1000 1200 1500 2000 3000".split(" ").forEach(function(t){
        styleSheet.insertRule('.delay'+t+'{ '+vendor+'animation-delay: '+t+'ms; '+vendor+'animation-fill-mode: backwards }',0);
    });
    
    ROOT.css3Ani=css3Ani;

})(window);
