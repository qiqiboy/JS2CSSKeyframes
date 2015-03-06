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
    var css3Ani={};
    var CONFIG={
        bounce:{
            '20%,50%,80%':'transform:translate(0)',
            '40%':'transform:translateY(-30px)',
            '60%':'transform:translateY(-15px)'
        },
        bounceIn:{
            '0%':'transform:scale(0.3);opacity:0',
            '50%':'transform:scale(1.05);opacity:1',
            '75%':'transform:scale(0.9)',
            '100%':'transform:scale(1)'
        },
        bounceOut:{
            '100%':'transform:scale(0.3);opacity:0',
            '50%':'transform:scale(1.1);opacity:1',
            '25%':'transform:scale(0.96)'
        },
        flash:{
            '50%,100%':'opacity:1;',
            '25%,75%':'opacity:0;'
        },
        shake:{
            '10%,30%,50%,70%,90%':'transform:translateX(-10px)',
            '20%,40%,60%,80%':'transform:translateX(10px)',
            '100%':'transform:translateX(0)'
        },
        rubberBand:{
            '30%':'transform:scale(1.25,0.75)',
            '40%':'transform:scale(0.75,1.25)',
            '50%':'transform:scale(1.15,0.85)',
            '65%':'transform:scale(.95,1.05)',
            '75%':'transform:scale(1.05,.95)',
            '100%':'transform:scale(1,1)'
        },
        tada:{
            '10%,20%':'transform:scale(.9) rotate(-3deg)',
            '30%,50%,70%,90%':'transform:scale(1.1) rotate(3deg)',
            '40%,60%,80%':'transform:scale(1.1) rotate(-3deg)',
            '100%':'transform:scale(1) rotate(0)'
        },
        hinge:{
            '0%':'transform-origin:0 0',
            '20%,60%':'transform-origin:0 0;transform:rotate(30deg)',
            '40%,80%':'transform-origin:0 0;transform:rotate(60deg);opacity:1',
            '100%':'transform-origin:0 0;transform:translateY(200%);opacity:0'
        },
        pulse:{
            '50%':'transform:scale(1.05)'
        },
        wiggle:[
            'transform:skewX(-10deg)',
            'transform:skewX(9deg)',
            'transform:skewX(-8deg)',
            'transform:skewX(7deg)',
            'transform:skewX(-6deg)',
            'transform:skewX(5deg)',
            'transform:skewX(-4deg)',
            'transform:skewX(3deg)',
            'transform:skewX(-2deg)',
            'transform:skewX(1deg)',
            'transform:skewX(0)'
        ],
        swing:[
            '',
            'transform:rotate(15deg)',
            'transform:rotate(-10deg)',
            'transform:rotate(5deg)',
            'transform:rotate(-5deg)',
            'transform:rotate(0)'
        ],
        wobble:[
            '',
            'transform:translateX(-100px) rotate(-5deg)',
            'transform:translateX(80px) rotate(3deg)',
            'transform:translateX(-65px) rotate(-3deg)',
            'transform:translateX(40px) rotate(2deg)',
            'transform:translateX(-20px) rotate(-1deg)',
            'transform:translateX(0) rotate(0)'
        ],
        ring:{
            '10%,20%':'transform:scale(0.9) rotate(-3deg)',
            '30%,50%,70%,90%':'transform:scale(1.1) rotate(3deg)',
            '40%,60%,80%':'transform:scale(1.1) rotate(-3deg)',
            '0%,100%':'transform:scale(1) rotate(0)'
        },
        rotate360:['','transform:rotate(360deg)']
    };

    "X Y".split(" ").forEach(function(prop){
        var dir=prop=='X'?'Y':'X';
        CONFIG['flip'+prop]={
                '50%':'transform:perspective(400px) translateZ(150px) rotate'+dir+'(170deg)',
                '60%':'transform:perspective(400px) translateZ(150px) rotate'+dir+'(190deg)',
                '100%':'transform:perspective(400px) rotate'+dir+'(360deg)'
            };

        CONFIG['flipin'+prop]={
                '0%':'transform:perspective(400px) rotate'+prop+'(90deg);opacity:0',
                '40%':'transform:perspective(400px) rotate'+prop+'(-10deg);opacity:1',
                '70%':'transform:perspective(400px) rotate'+prop+'(10deg)',
                '100%':'transform:perspective(400px) rotate'+prop+'(0)'
            };

        CONFIG['flipout'+prop]={
                '50%':'opacity:1',
                '100%':'transform:perspective(400px) rotate'+prop+'(90deg);opacity:0'
            };
    });

    "In Out ".split(" ").forEach(function(prop,i){
        var call=i?'reverse':'slice',
            out=prop?'opacity:0;':'';
        prop && (CONFIG['fade'+prop]=['opacity:0',''][call]());
        CONFIG['roll'+prop]=[out+'transform:translateX(-100px) rotate(-120deg)',''][call]();
        CONFIG['scale'+prop]=[out+'transform:scale(0)',''][call]();
        CONFIG['zoom'+prop]=[out+'transform:scale(2)',''][call]();
        CONFIG['flyTop'+prop]=[out+'transform:translateY(-50px)',''][call]();
        CONFIG['flyRight'+prop]=[out+'transform:translateX(50px)',''][call]();
        CONFIG['flyBottom'+prop]=[out+'transform:translateY(50px)',''][call]();
        CONFIG['flyLeft'+prop]=[out+'transform:translateX(-50px)',''][call]();
        CONFIG['rotate'+prop]=[out+'transform-origin:50% 50%;transform:rotate(-200deg)',''][call]();
        CONFIG['lightSpeed'+prop]=[out+'transform:translateX(100%) skewX(-30deg)',''][call]();
        CONFIG['slideX'+prop]=[out+'width:0',''][call]();
        CONFIG['slideY'+prop]=[out+'height:0',''][call]();
    });
    
    Object.keys(CONFIG).forEach(function(name){
        css3Ani[name]=JS2CSSKeyframes(name,CONFIG[name]);

        //生成1s ease曲线执行的css类，如 .a-flyTopIn { -webkit-animation: flyTopIn 1s ease }
        styleSheet.insertRule('.a-'+name+' { '+vendor+'animation: '+name+' 1s ease }',styleSheet.cssRules.length);
    });

    
    var delay=100;
    while(delay<10000){
        styleSheet.insertRule('.delay'+delay+'{ '+vendor+'animation-delay: '+delay+'ms !important; '+vendor+'animation-fill-mode: backwards !important }',styleSheet.cssRules.length);
        delay+=delay<3000?100:1000;
    }
    
    ROOT.css3Ani=css3Ani;

})(window);
