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
    var pos=0;

    while(styleSheet.cssRules.item(pos) && styleSheet.cssRules.item(pos).type!=1){
        pos++;
    }

    //生成各类动画
    var css3Ani={
        fadeIn:JS2CSSKeyframes('fadeIn',['opacity:0','opacity:1']), //渐显
        fadeOut:JS2CSSKeyframes('fadeOut',['opacity:1','opacity:0']), //渐隐
        scaleIn:JS2CSSKeyframes('scaleIn',['transform:scale(0)','transform:scale(1)']), //渐大显示
        scaleOut:JS2CSSKeyframes('scaleOut',['transform:scale(1)','transform:scale(0)']), //渐小消失
        flyTop:JS2CSSKeyframes('flyTop',['transform:translate(0,-50px);opacity:0','transform:translate(0,0);opacity:1']), //上淡入
        flyRight:JS2CSSKeyframes('flyRight',['transform:translate(50px,0);opacity:0','transform:translate(0,0);opacity:1']), //右淡入
        flybottom:JS2CSSKeyframes('flybottom',['transform:translate(0,50px);opacity:0','transform:translate(0,0);opacity:1']), //下淡入
        flyLeft:JS2CSSKeyframes('flyLeft',['transform-origin:center center;transform:translate(-50px,0);opacity:0','transform:translate(0,0);opacity:1']), //左淡入
        rotateIn:JS2CSSKeyframes('rotateIn',['transform-origin:center center;transform:rotate(-200deg);opacity:0','transform:rotate(0);opacity:1']), //转入
        rotateOut:JS2CSSKeyframes('rotateOut',['transform-origin:center center;transform:rotate(0);opacity:1','transform:rotate(200deg);opacity:0']), //转出
        bounce:JS2CSSKeyframes('bounce',{  //弹跳
            '0%,20%,50%,80%,100%':'transform:translateY(0)',
            '40%':'transform:translateY(-30px)',
            '60%':'transform:translateY(-15px)'
        }),
        bounceIn:JS2CSSKeyframes('bounceIn',{  //弹入
            '0%':'transform:scale(0.3);opacity:0',
            '50%':'transform:scale(1.05);opacity:1',
            '70%':'transform:scale(0.9)',
            '100%':'transform:scale(1)'
        }),
        bounceOut:JS2CSSKeyframes('bounceOut',{  //弹出
            '100%':'transform:scale(0.3);opacity:0',
            '50%':'transform:scale(1.1);opacity:1',
            '25%':'transform:scale(0.96)',
            '0%':'transform:scale(1)'
        }),
        flash:JS2CSSKeyframes('flash',{  //闪烁
            '0%,50%,100%':'opacity:1;',
            '25%,75%':'opacity:0;'
        }),
        shake:JS2CSSKeyframes('shake',{  //震颤
            '0%,100%':'transform:translateX(0)',
            '10%,30%,50%,70%,90%':'transform:translateX(-10px)',
            '20%,40%,60%,80%':'transform:translateX(10px)'
        }),
        swing:JS2CSSKeyframes('swing',[  //摇摆
            'transform:rotate(0)',
            'transform:rotate(15deg)',
            'transform:rotate(-10deg)',
            'transform:rotate(5deg)',
            'transform:rotate(-5deg)',
            'transform:rotate(0)'
        ]),
        wobble:JS2CSSKeyframes('wobble',[  //摇晃
            'transform:translateX(0)',
            'transform:translateX(-100px) rotate(-5deg)',
            'transform:translateX(80px) rotate(3deg)',
            'transform:translateX(-65px) rotate(-3deg)',
            'transform:translateX(40px) rotate(2deg)',
            'transform:translateX(-20px) rotate(-1deg)',
            'transform:translateX(0)'
        ]),
        ring:JS2CSSKeyframes('ring',{  //振铃
            '0%':'transform:scale(1)',
            '10%,20%':'transform:scale(0.9) rotate(-3deg)',
            '30%,50%,70%,90%':'transform:scale(1.1) rotate(3deg)',
            '40%,60%,80%':'transform:scale(1.1) rotate(-3deg)',
            '100%':'transform:scale(1) rotate(0)'
        }),
        flip:JS2CSSKeyframes('flip',{  //翻转
            '0%':'transform:perspective(400px) rotateY(0);animation-timing-function:ease-out',
            '40%':'transform:perspective(400px) translateZ(150px) rotateY(170deg);animation-timing-function:ease-out',
            '50%':'transform:perspective(400px) translateZ(150px) rotateY(190deg) scale(1);animation-timing-function:ease-in',
            '80%':'transform:perspective(400px) rotateY(360deg) scale(0.95);animation-timing-function:ease-in',
            '100%':'transform:perspective(400px) scale(1);animation-timing-function:ease-in'
        })
    };
    
    //x y轴翻转显隐
    "X Y".split(" ").forEach(function(prop){
        css3Ani['flipin'+prop]=JS2CSSKeyframes('flipin'+prop,{
                '0%':'transform:perspective(400px) rotate'+prop+'(90deg);opacity:0',
                '40%':'transform:perspective(400px) rotate'+prop+'(-10deg)',
                '70%':'transform:perspective(400px) rotate'+prop+'(10deg)',
                '100%':'transform:perspective(400px) rotate'+prop+'(0);opacity:1'
            });

        css3Ani['flipout'+prop]=JS2CSSKeyframes('flipout'+prop,{
                '0%':'transform:perspective(400px) rotate'+prop+'(0);opacity:1',
                '100%':'transform:perspective(400px) rotate'+prop+'(90deg);opacity:0'
            });
    });
    
    //生成1s ease曲线执行的css类，如 .flyTop { -webkit-aniamtion: flyTop 1s ease; }
    Object.keys(css3Ani).forEach(function(name){
        styleSheet.insertRule('.a-'+name+'{ '+vendor+'animation: '+name+' 1s ease }',pos);
    });
    
    "200 400 500 1000 1200 1500 2000 3000".split(" ").forEach(function(t){
        styleSheet.insertRule('.delay'+t+'{ '+vendor+'animation-delay: '+t+'ms; '+vendor+'animation-fill-mode: backwards }',pos);
    });
    
    ROOT.css3Ani=css3Ani;

})(window);
