/**
 * ITCAST WEB
 * Created by zhousg on 2016/5/16.
 */
window.onload = function(){
    deleteFuc();
};

/*弹出提示框*/
function deleteFuc(){
    /*
    * 1.点击删除按钮 需要弹出提示  （弹出层显示）
      * 把盖子打开 （旋转盖子）
    * 2.点击取消的时候  关闭提示  （弹出层隐藏）
    * 把盖子盖上 （取消改变的属性）
    * */

    /*弹出层*/
    var jdWin = document.querySelector('.jd_win');
    /*弹出盒子*/
    var jdWinBox = jdWin.querySelector('.jd_win_box');
    /*找到所有的删除盒子*/
    var deleteBtnList = document.querySelectorAll('.delete_btn');

    /*记录当前点击的删除盖子*/
    var currUp = null;

    /*给所有的盒子加上点击事件  click*/
    for(var i = 0 ; i < deleteBtnList.length ; i ++){
        deleteBtnList[i].onclick = function(){
            /*需要弹出提示 */
            jdWin.style.display = "block";
            /*弹出盒子需要动画*/
            jdWinBox.classList.add('myBounceInDown');
            /*把盖子打开*/
            /*找到盖子*/
            var up = currUp = this.querySelector('.delete_up');
            /*加过渡*/
            up.style.webkitTransition = "all 1s";
            up.style.transition = "all 1s";
            /*定义旋转原地*/
            up.style.webkitTransformOrigin = "0 5px";/*left bottom*/
            up.style.transformOrigin = "0 5px";/*left bottom*/
            /*改变  角度*/
            up.style.webkitTransform = "rotate(-30deg) translateY(2px)";
            up.style.transform =  "rotate(-30deg) translateY(2px)";
        }
    }

    /*点击取消的时候*/
    jdWinBox.querySelector('.cancel').onclick = function(){
        /*关闭提示*/
        jdWin.style.display = "none";
        /*把盖子盖上  ???   当前是那个盖子打开*/
        if(currUp){
            currUp.style.webkitTransform = "none";
            currUp.style.transform =  "none";
        }
    }

}