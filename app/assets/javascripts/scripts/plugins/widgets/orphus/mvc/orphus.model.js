/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/4/12
 * Time: 11:06 PM
 * To change this template use File | Settings | File Templates.
 */
define([
    'modules/Model',
    'plugins/widgets/widget.content.model'
], function defineOrphusModel(BaseModel, WidgetContentModel) {

    /**
     * Define Orphus model
     * @extends BaseModel
     * @extends WidgetContentModel
     * @class OrphusModel
     * @constructor
     */
    var OrphusModel = function OrphusModel() {

        /**
         * Define preferences
         * @property OrphusModel
         * @type {{orphusMainScript: {type: string, disabled: boolean, visible: boolean}}}
         */
        this.preferences = {
            orphusMainScript: {
                type: 'textarea',
                disabled: false,
                visible: true,
                value: '!function(){var _1="5.01",_2="!etmaocg@amlic.mo",hq="http://orphus.ru/en/",_4="<!!!>",_5="<!!!>",_6=60,_7=256,_8={alt:"Select spelling error with mouse and press Ctrl+Enter. Let\'s make the language clean!",badbrowser:"Your browser does not support selection handling or IFRAMEs. Probably, you use an obsolete browser.",toobig:"You have selected too large text block!",thanks:"Thank you for your co-operation!",subject:"Spelling error",docmsg:"Document:",intextmsg:"Spelling error in text:",ifsendmsg:"Do you want to send a notice to a webmaster?\nYour browser will NOT be redirected.",gohome:"Do you want to visit Orphus homepage now?",newwin:"Page will be opened in a new window.",name:"Orphus system",author:"Author: Dmitry Koterov.",to:"Orphus user",send:"Send",cancel:"Cancel",entercmnt:"A comment for a webmaster (optional):"},_9="css",_a=0,w=window,d=w.document,de=d.documentElement,b=d.body,_f=null,_10={},_11=!1,_12="",_13=function(){"!"==_2.substr(0,1)&&(_2=_2.substr(1).replace(/(.)(.)/g,"$2$1")),setTimeout(function(){var e=_15();e&&(e.onclick=_16,e.title=e.childNodes[0]&&e.childNodes[0].alt)},100),d.onkeypress=_17,_8.gohome+=" "+_8.newwin},_15=function(){return d.getElementById("orphus")},_16=function(){with(_8)return confirm(name+" v"+_1+".\n"+author+"\n\n"+alt+"\n\n"+gohome)&&w.open(hq,"_blank"),!1},_18=function(){var e=0,t=function(){++e>20||(w.status=e%5?_8.thanks:" ",setTimeout(t,100))};t()},_1b=function(e){e.style.position="absolute",e.style.top="-10000px",b.lastChild?b.insertBefore(e,b.lastChild):b.appendChild(e)},_1d=function(e){var t=d.createElement("DIV");return t.innerHTML=\'<iframe name="\'+e+\'"></iframe>\',_1b(t),d.childNodes[0]},_20=function(e,t,n){var r="orphus_ifr";_f||(_f=_1d(r));var i=d.createElement("FORM");i.style.position="absolute",i.style.top="-10000px",i.action=hq,i.method="post",i.target=r;var o={version:_1,email:_2,to:_8.to,subject:_8.subject,ref:e,c_pre:t.pre,c_sel:t.text,c_suf:t.suf,c_pos:t.pos,c_tag1:_4,c_tag2:_5,charset:d.charset||d.characterSet||"",comment:n};for(var a in o){var l=d.createElement("INPUT");l.type="hidden",l.name=a,l.value=o[a],i.appendChild(l)}_1b(i),i.submit(),i.parentNode.removeChild(i)},_29=function(){var e=0,t=0;"number"==typeof w.innerWidth?(e=w.innerWidth,t=w.innerHeight):de&&(de.clientWidth||de.clientHeight)?(e=de.clientWidth,t=de.clientHeight):b&&(b.clientWidth||b.clientHeight)&&(e=b.clientWidth,t=b.clientHeight);var n=0,r=0;return"number"==typeof w.pageYOffset?(r=w.pageYOffset,n=w.pageXOffset):b&&(b.scrollLeft||b.scrollTop)?(r=b.scrollTop,n=b.scrollLeft):de&&(de.scrollLeft||de.scrollTop)&&(r=de.scrollTop,n=de.scrollLeft),{w:e,h:t,x:n,y:r}};_10.confirm=function(e,t,n){var r=(new Date).getTime(),i=confirm(_8.docmsg+"\n   "+d.location.href+"\n"+_8.intextmsg+\'\n   "\'+e+\'"\n\n\'+_8.ifsendmsg),o=(new Date).getTime()-r;if(i)t("");else if(!n&&50>o){var a=d.onkeyup;d.onkeyup=function(n){n||(n=window.event),17==n.keyCode&&(d.onkeyup=a,_10.confirm(e,t,!0))}}},_10.css=function(e,t){if(!_11){_11=!0;var n=d.createElement("DIV"),r=550;r>b.clientWidth-10&&(r=b.clientWidth-10),n.style.zIndex="10001",n.innerHTML=\'<div style="background:#D4D0C8; width:\'+r+\'px; z-index:10001; border: 1px solid #555; padding:1em; font-family: Arial; font-size: 90%; color:black"><a href="\'+hq+\'" target="_blank"><img style="float:right; margin:0 0 1em 1em" border="0" src="\'+_15().childNodes[0].src+\'"/></a><div style="font-weight:bold; padding-bottom:0.2em">\'+_8.intextmsg+\'</div><div style="padding: 0 0 1em 1em">\'+e.replace(_4,\'<u style="color:red">\').replace(_5,"</u>")+\'</div><div style="padding: 0 0 1em 0">\'+_8.ifsendmsg.replace(/\n/,"<br/>")+\'</div><form style="padding:0; margin:0; border:0"><div>\'+_8.entercmnt+\'</div><input type="text" maxlength="250" style="width:100%; margin: 0.2em 0" /><div style="text-align:right; font-family: Tahoma"><input type="submit" value="\'+_8.send+\'" style="width:9em; font-weight: bold">&nbsp;<input type="button" value="\'+_8.cancel+\'" style="width:9em"></div></form></div>\',_1b(n);var i=n.getElementsByTagName("input"),o=n.getElementsByTagName("form"),a=i[0],l=null,s=[],c=function(){d.onkeydown=l,l=null,n.parentNode.removeChild(n);for(var e=0;e<s.length;e++)s[e][0].style.visibility=s[e][1];_11=!1,_12=a.value},u=function(e){for(var t={x:0,y:0};e.offsetParent;)t.x+=e.offsetLeft,t.y+=e.offsetTop,e=e.offsetParent;return t};setTimeout(function(){var e=n.clientWidth,r=n.clientHeight,_=_29(),f=(_.w-e)/2+_.x;10>f&&(f=10);var h=(_.h-r)/2+_.y-10;if(10>h&&(h=10),n.style.left=f+"px",n.style.top=h+"px",navigator.userAgent.match(/MSIE (\d+)/)&&RegExp.$1<7)for(var g=d.getElementsByTagName("SELECT"),m=0;m<g.length;m++){var p=g[m],v=u(p);v.x>f+e||v.y>h+r||v.x+p.offsetWidth<f||v.y+p.offsetHeight<h||(s[s.length]=[p,p.style.visibility],p.style.visibility="hidden")}a.value=_12,a.focus(),a.select(),l=d.onkeydown,d.onkeydown=function(e){e||(e=window.event),27==e.keyCode&&c()},o[0].onsubmit=function(){return t(a.value),c(),_12="",!1},i[2].onclick=function(){c()}},10)}};var _4e=function(e){return(""+e).replace(/[\r\n]+/g," ").replace(/^\s+|\s+$/g,"")},_50=function(){try{var e=null,t=null;t=w.getSelection?w.getSelection():d.getSelection?d.getSelection():d.selection;if(null!=t){var n="",e=null,r="",i=-1;if(t.getRangeAt){var o=t.getRangeAt(0);e=o.toString();var a=d.createRange();a.setStartBefore(o.startContainer.ownerDocument.body),a.setEnd(o.startContainer,o.startOffset),n=a.toString();var l=o.cloneRange();l.setStart(o.endContainer,o.endOffset),l.setEndAfter(o.endContainer.ownerDocument.body),r=l.toString()}else if(t.createRange){var o=t.createRange();e=o.text;var a=t.createRange();a.moveStart("character",-_6),a.moveEnd("character",-e.length),n=a.text;var l=t.createRange();l.moveEnd("character",_6),l.moveStart("character",e.length),r=l.text}else e=""+t;var s,c=(s=e.match(/^(\s*)/))&&s[0].length,u=(s=e.match(/(\s*)$/))&&s[0].length;return n+=e.substring(0,c),r=e.substring(e.length-u,e.length)+r,e=e.substring(c,e.length-u),""==e?null:{pre:n,text:e,suf:r,pos:i}}return void alert(_8.badbrowser)}catch(u){return null}},_5d=function(){if(!_2||-1!=navigator.appName.indexOf("Netscape")&&eval(navigator.appVersion.substring(0,1))<5)return void alert(_8.badbrowser);var _5e=function(e){alert("Wrong installation (code "+e+"). Please reinstall Orphus.")},_60=_15();if(!_60)return void _5e(1);if(_60.href.replace(/.*\/\/|\/.*/g,"")!=hq.replace(/.*\/\/|\/.*/g,""))return void _5e(2);for(var i=null,n=0;n<_60.childNodes.length;n++)if("IMG"==_60.childNodes[n].tagName){i=_60.childNodes[n];break}if(!i)return void _5e(3);if(!i.alt.match(/orphus/i))return void _5e(4);if(i.width<30&&i.height<10)return void _5e(5);if("none"==_60.style.display||"none"==i.style.display||"hidden"==_60.style.visibility||"hidden"==i.style.visibility)return void _5e(6);var _63=_50();if(_63){with(_63)pre=pre.substring(pre.length-_6,pre.length).replace(/^\S{1,10}\s+/,""),suf=suf.substring(0,_6).replace(/\s+\S{1,10}$/,"");var _64=_4e(_63.pre+_4+_63.text+_5+_63.suf);return _64.length>_7?void alert(_8.toobig):void _10[_9](_64,function(e){_20(d.location.href,_63,e),_18()})}},_17=function(e){var t=0,n=w.event;return n?t=10==n.keyCode||13==n.keyCode&&n.ctrlKey:e&&(t=10==e.which&&2==e.modifiers||0==e.keyCode&&106==e.charCode&&e.ctrlKey||13==e.keyCode&&e.ctrlKey),t?(_5d(),!1):void 0};_13()}();'
            }
        };

        /**
         * Define rules
         * @property OrphusModel
         * @type {{}}
         */
        this.rules = {};
    };

    return OrphusModel.extend('OrphusModel', {

        // Setter

    }, BaseModel.prototype, WidgetContentModel.prototype);
});
