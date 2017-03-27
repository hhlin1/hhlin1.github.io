/**
 * ITCAST WEB
 * Created by zhousg on 2016/5/13.
 */
/*公用方法的js*/
/*function transitionEnd(){

 }*/
/*命名空间  itcast*/
window.itcast = {};
/*transitionEnd*/
itcast.transitionEnd = function(dom,callback){
    /*基本判断*/
    if(typeof  dom == 'object'){
        dom.addEventListener('webkitTransitionEnd',function(){
            /* if(callback){
             callback();
             }*/
            /*短路与*/
            callback && callback();
        });
        dom.addEventListener('transitionEnd',function(){
            callback && callback();
        });
    }
}
/*tap*/
itcast.tap = function(dom,callback){
    if(typeof  dom == 'object'){
        var startTime = 0;
        var isMove = false;
        dom.addEventListener('touchstart',function(e){
            startTime = Date.now();/*时间戳*/
        });
        dom.addEventListener('touchmove',function(e){
            isMove = true;
        });
        dom.addEventListener('touchend',function(e){
            if(!isMove && (Date.now()-startTime) < 150 ){
                /*符合tap  才执行callback*/
                callback && callback(e);
            }
            /*重置*/
            startTime = 0;
            isMove = false;
        });
    }
}



