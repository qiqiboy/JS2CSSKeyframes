/*
 * @author qiqiboy
 * @github https://github.com/qiqiboy/JS2CSSKeyframes
 */
;
(function(ROOT, struct, undefined){
    "use strict";

    var doc=document,
        slice=[].slice,
        CSSRule=ROOT.CSSRule||{},
        IMPORT_RULE=CSSRule.IMPORT_RULE,
        MEDIA_RULE=CSSRule.MEDIA_RULE,
        KEYFRAMES_RULE=CSSRule.KEYFRAMES_RULE||CSSRule.WEBKIT_KEYFRAMES_RULE||CSSRule.MOZ_KEYFRAMES_RULE||CSSRule.O_KEYFRAMES_RULE,
        divstyle=document.documentElement.style,
        cssVendor=function(){
            var tests="-webkit- -moz- -o- -ms-".split(" "),
                prop;
            while(prop=tests.shift()){
                if(camelCase(prop+'animation') in divstyle){
                    return prop;
                }
            }
            return '';
        }(),
        KEY_REG=new RegExp('@(?:'+cssVendor+')?keyframes','i'),
        animation=fixCSS3('animation'),
        keyframes='@'+animation.replace('animation','keyframes');

    function getSheet(){ //获取可以用的样式以用来插入css3 keyframes
        var n=0,
            sheet,
            style;
        while(sheet=doc.styleSheets.item(n++)){
            try{
                if(sheet.cssRules){
                    return sheet;
                }
            }catch(e){}
        }

        style=doc.createElement('style');
        style.type='text/css';
        doc.getElementsByTagName('head')[0].appendChild(style);
        
        return style.sheet;
    }

    function camelCase(str){
        return (str+'').replace(/^-ms-/, 'ms-').replace(/-([a-z]|[0-9])/ig, function(all, letter){
            return (letter+'').toUpperCase();
        });
    }

    function iterateSheet(callback){
        slice.call(doc.styleSheets).forEach(function getRule(sheet){
            slice.call(sheet.cssRules).forEach(function(rule,i){
                if(rule.type==IMPORT_RULE){//imported css
                    getRule(rule.styleSheet||rule.sheet);
                }else if(rule.type==MEDIA_RULE){
                    getRule(rule);
                }else if(rule.type==KEYFRAMES_RULE){
                    callback(rule,i,sheet);
                }
            });
        });
    }

    function fixCSS3(name){
        var prop=camelCase(name),
            _prop=camelCase(cssVendor+prop);
        return (prop in divstyle) && name || (_prop in divstyle) && cssVendor+name || name;
    }

    function fixKey(key){
        return {from:'0%',to:'100%'}[key]||(key+'').replace('%','')+'%';
    }
    
    function getKeyframesStyle(keys,name){
        var cssText="";
        if(typeof keys=='string'){
            if(KEY_REG.test(keys)){
                return keys.replace(KEY_REG,keyframes);
            }
            cssText=keys.replace(/^\s*{\s*(?={)|}\s*(?=}\s*$)/gi,'');
        }else if(Array.isArray(keys)){
            cssText=keys.map(function(rule,i){
                return (i/(keys.length-1)*100||0)+'%'+' { '+getKeyframesRule(rule)+' }';
            }).join(' ');
        }else if(keys){
            cssText=Object.keys(keys).map(function(key){
                    var ruleText=getKeyframesRule(keys[key]);
                    return splitKey(key).map(function(k){
                        return fixKey(k)+' { '+ruleText+' }';
                    }).join(' ');
                }).join(' ');
        }

        return keyframes+' '+name+' { '+cssText+' }';
    }

    function getKeyframesRule(rule){
        var ruleText="";
        if(typeof rule=='string'){
            ruleText=getKeyframesRule(rule.split(/\s*;\s*/g));
        }else if(Array.isArray(rule)){
            ruleText=getKeyframesRule(rule.reduce(function(obj,text){
                var ret=text.split(/\s*:\s*/);
                if(ret.length>1){
                    obj[ret[0]]=ret[1];
                }
                return obj;
            },{}));
        }else if(rule){
            ruleText=Object.keys(rule).map(function(key){
                return fixCSS3(key)+': '+rule[key]+';';
            }).join(' ');
        }

        return ruleText;
    }

    function splitKey(key){
        return (key+'').trim().split(/\s*[\s,]\s*/);
    }

    struct.prototype={
        constructor:struct,
        init:function(name, keys){
            var ckf; //CSSKeyframes
            if(!struct.support)return this;
            if(typeof name=='object' || KEY_REG.test(name)){
                if(name.cssRules && name.type==KEYFRAMES_RULE){
                    ckf=name;
                }else{
                    keys=name;
                    name=null;
                }
            }

            if(!name){
                name='js2keyframes-'+parseInt(Math.random()*1e10);
            }

            if(!ckf){
                var sheet=getSheet(),
                    id=sheet.insertRule(getKeyframesStyle(keys,name),sheet.cssRules.length);
                ckf=sheet.cssRules[id];
            }

            this.keyframesRule=ckf||{};

            return this.extract();
        },
        extract:function(){
            this.keyframes=slice.call(this.cssRules).reduce(function(obj,rule){
                obj[rule.keyText]=rule;
                return obj;
            },{});

            return this;
        },
        get:function(name){
            return this.keyframes[fixKey(splitKey(name)[0])];
        },
        add:function(name,value){
            var frameRule=this.keyframesRule,
                insert='appendRule' in frameRule?'appendRule':'insertRule',
                ruleText;
            if(typeof name=='object'){
                for(var key in name){
                    this.add(key, name[key]);
                }
            }else{
                ruleText=getKeyframesRule(value);
                splitKey(name).forEach(function(k){
                    this.remove(k);
                    frameRule[insert](fixKey(k)+' { '+ruleText+' }');
                }.bind(this));
            }

            return this.extract();
        },
        remove:function(name){
            var frameRule=this.keyframesRule;
            splitKey(name).forEach(function(k){
                frameRule.deleteRule(fixKey(k));
            });
            return this.extract();
        },
        clear:function(){
            slice.call(this.cssRules).forEach(function(rule){
                this.remove(rule.keyText);
            }.bind(this));
            return this.extract();
        }
    }
            
    var extend={
        vendor:cssVendor,
        get:function(name){
            return this.CSSKeyframes[name];
        },
        add:function(){
            return this.apply(null,arguments);
        },
        remove:function(name){
            iterateSheet(function(rule,i,sheet){
                if(rule.name==(name.name||name))
                    sheet.deleteRule(i);
            });
            return true;
        },
        getSheet:getSheet,
        'animation-css':animation,
        animation:camelCase(animation),
        support:camelCase(animation) in divstyle
    }

    if(typeof Object.defineProperties=='function'){
        
        "name duration timing-function delay iteration-count direction play-state fill-mode".split(" ").forEach(function(prop){
            var name='animation-'+prop,
                caseName=camelCase(name);
            struct[caseName]=camelCase(struct[name]=fixCSS3(name));
        });

        Object.keys(extend).forEach(function(name){
            struct[name]=extend[name];
        });

        "name cssText cssRules".split(" ").forEach(function(prop){
            Object.defineProperty(struct.prototype,prop,{
                get:function(){
                    return (this.keyframesRule||{})[prop];
                },
                enumerable:true
            });
        });

        Object.defineProperty(struct,'CSSKeyframes',{
            get:function(){
                var ret={};
                iterateSheet(function(rule){
                    ret[rule.name]=this(rule);
                }.bind(this));
                return ret;
            },
            enumerable:true
        });

    }

    if(typeof define=='function' && define.amd){
        define('JS2CSSKeyframes',function(){
            return struct;
        });
    }else ROOT.JS2CSSKeyframes=struct;
    
})(window, function(name, keys){
    if(!(this instanceof arguments.callee)){
        return new arguments.callee(name, keys);
    }
    arguments.callee.support&&this.init(name, keys);
});
