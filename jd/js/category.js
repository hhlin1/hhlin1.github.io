/**
 * ITCAST WEB
 * Created by zhousg on 2016/5/14.
 */
window.onload = function(){
    leftSwipe();
    /*右侧内容的滑动*/
    itcast.iScroll({
        swipeDom:document.querySelector('.jd_cate_right'),
        swipeType:'y',
        swipeDistance:200
    });
};
/*左侧的分类栏*/
function leftSwipe(){
    /*
     * 1.滑动起来  （touch  Y）
     * 2.往下滑动的时候到达一定的距离之后不能滑动
     * 3.往上滑动的时候到达一定的距离之后不能滑动
     * 4.当滑动超过了最大的定位的时候  把他定位最大定位点
     * 5.当滑动超过了最小的定位的时候  把他定位最小定位点
     *
     * 6.点击的时候改变当前样式
     * 7.点击的时候 滑动到最顶部 在定位区间方位内
     * 8.如果没在  保持动
     * */

    /*获取dom*/
    var parentBox = document.querySelector('.jd_cate_left');
    /*做滑动*/
    var childBox = parentBox.querySelector('ul');

    /*获取高度*/
    var parentHeight = parentBox.offsetHeight;
    var childHeight = childBox.offsetHeight;


    /*定位区间*/
    var maxPosition = 0;
    var minPosition = parentHeight-childHeight;

    /*缓冲的距离*/
    var distance = 100;

    /*滑动区间*/
    var maxSwipe = maxPosition + distance;
    var minSwipe = minPosition - distance;

    /*公用的方法*/
    /*加过渡*/
    var addTransition = function(){
        childBox.style.webkitTransition = "all .2s";
        childBox.style.transition = "all .2s";
    };
    /*清除过渡*/
    var removeTransition = function(){
        childBox.style.webkitTransition = "none";
        childBox.style.transition = "none";
    };
    /*设置定位*/
    var setTranslateY = function(translateY){
        childBox.style.webkitTransform = "translateY("+translateY+"px)";
        childBox.style.transform = "translateY("+translateY+"px)";
    };


    /*记录当前的定位*/
    var currY = 0;
    /*绑定事件*/
    var startY = 0;
    var moveY = 0;
    var distanceY = 0;

    childBox.addEventListener('touchstart',function(e){
        startY = e.touches[0].clientY;
    });
    childBox.addEventListener('touchmove',function(e){
        moveY = e.touches[0].clientY;
        distanceY = moveY - startY;/*Y轴移动的坐标的距离*/
        /*删除过渡*/
        removeTransition();
        /*定位  滑动*/
        /*判断我们将要去做定位的位子是否在滑动区间范围之内*/
        if((currY + distanceY) < maxSwipe && (currY + distanceY) > minSwipe){
            /*做滑动*/
            setTranslateY(currY + distanceY);
        }
    });

    /* window  因为在模拟器上  会存在事件丢失  在真机上测试是没有问题*/

    window.addEventListener('touchend',function(e){
        /*当滑动超过了最大的定位的时候  把他定位最大定位点*/
        if((currY + distanceY) > maxPosition){
            currY = maxPosition;
            addTransition();
            setTranslateY(currY);
        }
        /*当滑动超过了最小的定位的时候  把他定位最小定位点*/
        else if((currY + distanceY) < minPosition){
            currY = minPosition;
            addTransition();
            setTranslateY(currY);
        }
        /*正常*/
        else{
            currY = currY + distanceY;/*下一次做滑动的时候是以它做基准*/
        }

        /*重置*/
        startY = 0;
        moveY = 0;
        distanceY = 0;

    });


    /*
    * 6.点击的时候改变当前样式
    * 7.点击的时候 滑动到最顶部 在定位区间方位内
    * 8.如果没在  保持动
    * */

    var lis = childBox.querySelectorAll('li');/*所有的li*/

    itcast.tap(childBox,function(e){
        var currLi = e.target.parentNode;/*当前点击的LI*/
        /*清除所有li的当前样式*/
        for(var i = 0 ; i < lis.length ; i ++){
            lis[i].className = " ";
            lis[i].index = i;
        }
        currLi.className = "now";

        var liIndex = currLi.index;

        /*我们可以通过li的索引得到你需要去移动的距离*/

        var translateY = - liIndex * 50; /*往上移动*/

        /*判断 translateY 是否在定位区间内*/
        if(translateY > minPosition){
            /*设置当前的currY*/
            currY = translateY;
        }else{
            currY = minPosition;
        }

        addTransition();
        setTranslateY(currY);
    });


}
