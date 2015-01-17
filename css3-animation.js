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
            '20%,50%,80%':'transform:none',
            '40%':'transform:translateY(-30px)',
            '60%':'transform:translateY(-15px)'
        },
        bounceIn:{
            '0%':'transform:scale(0.3);opacity:0',
            '50%':'transform:scale(1.05);opacity:1',
            '75%':'transform:scale(0.9)'
        },
        bounceOut:{
            '100%':'transform:scale(0.3);opacity:0',
            '50%':'transform:scale(1.1);opacity:1',
            '25%':'transform:scale(0.96)'
        },
        flash:{
            '50%':'opacity:1;',
            '25%,75%':'opacity:0;'
        },
        shake:{
            '10%,30%,50%,70%,90%':'transform:translateX(-10px)',
            '20%,40%,60%,80%':'transform:translateX(10px)'
        },
        rubberBand:{
            '30%':'transform:scale(1.25,0.75)',
            '40%':'transform:scale(0.75,1.25)',
            '50%':'transform:scale(1.15,0.85)',
            '65%':'transform:scale(.95,1.05)',
            '75%':'transform:scale(1.05,.95)'
        },
        tada:{
            '10%,20%':'transform:scale(.9) rotate(-3deg)',
            '30%,50%,70%,90%':'transform:scale(1.1) rotate(3deg)',
            '40%,60%,80%':'transform:scale(1.1) rotate(-3deg)'
        },
        hinge:{
            '0%':'transform-origin:0 0',
            '20%,60%':'transform-origin:0 0;transform:rotate(30deg)',
            '40%,80%':'transform-origin:0 0;transform:rotate(60deg);opacity:1',
            '100%':'transform-origin:0 0;transform:translateY(200%);opacity:0',
        },
        pulse:{
            '50%':'transform:scale3d(1.05,1.05,1.05)'
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
            'transform:none'
        ],
        swing:[
            'transform:none',
            'transform:rotate(15deg)',
            'transform:rotate(-10deg)',
            'transform:rotate(5deg)',
            'transform:rotate(-5deg)',
            'transform:none'
        ],
        wobble:[
            'transform:none',
            'transform:translateX(-100px) rotate(-5deg)',
            'transform:translateX(80px) rotate(3deg)',
            'transform:translateX(-65px) rotate(-3deg)',
            'transform:translateX(40px) rotate(2deg)',
            'transform:translateX(-20px) rotate(-1deg)',
            'transform:none'
        ],
        ring:{
            '10%,20%':'transform:scale(0.9) rotate(-3deg)',
            '30%,50%,70%,90%':'transform:scale(1.1) rotate(3deg)',
            '40%,60%,80%':'transform:scale(1.1) rotate(-3deg)'
        },
        flip:{
            '40%':'transform:perspective(400px) translateZ(150px) rotateY(170deg);animation-timing-function:ease-out',
            '50%':'transform:perspective(400px) translateZ(150px) rotateY(190deg) scale(1);animation-timing-function:ease-in',
            '80%':'transform:perspective(400px) rotateY(360deg) scale(0.95);animation-timing-function:ease-in',
            '100%':'transform:perspective(400px) scale(1);animation-timing-function:ease-in'
        }
    };

    "X Y".split(" ").forEach(function(prop){
        CONFIG['flipin'+prop]={
                '0%':'transform:perspective(400px) rotate'+prop+'(90deg);opacity:0',
                '40%':'transform:perspective(400px) rotate'+prop+'(-10deg)',
                '70%':'transform:perspective(400px) rotate'+prop+'(10deg)',
                '100%':'transform:perspective(400px) rotate'+prop+'(0);opacity:1'
            };

        CONFIG['flipout'+prop]={
                '0%':'transform:perspective(400px) rotate'+prop+'(0);opacity:1',
                '100%':'transform:perspective(400px) rotate'+prop+'(90deg);opacity:0'
            };
    });

    "In Out".split(" ").forEach(function(prop,i){
        var call=i?'reverse':'slice';
        CONFIG['fade'+prop]=['opacity:0','opacity:1'][call]();
        CONFIG['roll'+prop]=['opacity:0;transform:translateX(-100px) rotate(-120deg)','opacity:1;transform:none'][call]();
        CONFIG['scale'+prop]=['transform:scale(0);opacity:0','opacity:1'][call]();
        CONFIG['zoom'+prop]=['transform:scale(2);opacity:0','opacity:1'][call]();
        CONFIG['flyTop'+prop]=['transform:translateY(-50px);opacity:0','opacity:1'][call]();
        CONFIG['flyRight'+prop]=['transform:translateX(50px);opacity:0','opacity:1'][call]();
        CONFIG['flyBottom'+prop]=['transform:translateY(50px);opacity:0','pacity:1'][call]();
        CONFIG['flyLeft'+prop]=['transform:translateX(-50px);opacity:0','opacity:1'][call]();
        CONFIG['rotate'+prop]=['transform-origin:50% 50%;transform:rotate(-200deg);opacity:0','opacity:1'][call]();
        CONFIG['lightSpeed'+prop]=['transform:translateX(100%) skewX(-30deg);opacity:0','opacity:1'][call]();
    });
    
    Object.keys(CONFIG).forEach(function(name){
        css3Ani[name]=JS2CSSKeyframes(name,CONFIG[name]);

        //生成1s ease曲线执行的css类，如 .a-flyTopIn { -webkit-animation: flyTopIn 1s ease }
        styleSheet.insertRule('.a-'+name+' { '+vendor+'animation: '+name+' 1s ease }',styleSheet.cssRules.length);
    });

    
    "100 200 300 400 500 600 800 1000 1200 1500 2000 3000 4000 5000 6000 7000 8000 9000 10000".split(" ").forEach(function(t){
        styleSheet.insertRule('.delay'+t+'{ '+vendor+'animation-delay: '+t+'ms; '+vendor+'animation-fill-mode: backwards }',styleSheet.cssRules.length);
    });
    
    ROOT.css3Ani=css3Ani;

})(window);
