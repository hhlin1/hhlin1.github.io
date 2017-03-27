/**
 * ITCAST WEB
 * Created by zhousg on 2016/5/14.
 */
/*在页面加载完成*/
window.onload = function(){
    /*去执行我们需要执行的代码*/
    search();
    banner();
    downTime();
};
/*搜索栏js效果*/
function search(){
    /*
     * 1.当我们滑动页面的时候   不超过轮播图的高度的时候  颜色需要爱随着高度区去改变的
     * 2.当我们超过的时候  是不需需要去改变的
     * */


    /*搜索栏*/
    var search = document.querySelector('.jd_header_box');
    /*banner*/
    var banner = document.querySelector('.jd_banner');
    /*获取高度限制*/
    var height = banner.offsetHeight;


    /*透明度*/
    var opacity = 0;

    window.onscroll = function(){
        /*IE document.documentElement.scrollTop*/
        //console.log(document.body.scrollTop);
        var top = document.body.scrollTop;
        /*超过的时候  */
        if(top > height){
            opacity = 0.85;
        }
        /*不超过的时候*/
        else{
            opacity = 0.85 * (top/height);
        }

        /*操作dom*/
        search.style.background = "rgba(201,21,35,"+opacity+")";
    }
}
/*轮播图*/
function banner(){
    /*
     * 1.自动轮播       （定时器  过渡）
     * 2.小圆点随着图片滚动  （监听图片显示的当前索引  设置当前样式）
     * 3.图片能滑动  （touch）
     * 4.滑动不超过一定的距离  吸附回去   左右都是一样  (过渡  定位的位子不一样)
     * 5.滑动超过了一定的距离  滚动到  上一张  下一张  （过渡）
     * */

    /*获取dom*/
    var banner = document.querySelector(".jd_banner");
    /*获取宽度*/
    var width = banner.offsetWidth;
    /*图片盒子*/
    var imageBox = banner.querySelector('ul:nth-child(1)');
    /*点盒子*/
    var pointBox = banner.querySelector('ul:last-child');
    /*获取到所有的点*/
    var points = pointBox.querySelectorAll('li');

    /*公用的方法*/
    /*加过渡*/
    var addTransition = function(){
        imageBox.style.webkitTransition = "all .2s";
        imageBox.style.transition = "all .2s";
    };
    /*清除过渡*/
    var removeTransition = function(){
        imageBox.style.webkitTransition = "none";
        imageBox.style.transition = "none";
    };
    /*设置定位*/
    var setTranslateX = function(translateX){
        imageBox.style.webkitTransform = "translateX("+translateX+"px)";
        imageBox.style.transform = "translateX("+translateX+"px)";
    };


    /*1.自动轮播  */

    //当前索引
    var index = 1;
    //定时器
    var timer = setInterval(function(){
        index ++ ;
        /*动画的去滚动图片*/
        /*加过渡*/
        addTransition();
        /*定位*/
        setTranslateX(-index*width);
    },2000);

    itcast.transitionEnd(imageBox,function(){
        if(index >= 9){
            index = 1;
            /*清楚过渡*/
            removeTransition();
            /*瞬间定位*/
            setTranslateX(-index*width);
        }else if(index  <= 0){
            index = 8;
            /*清楚过渡*/
            removeTransition();
            /*瞬间定位*/
            setTranslateX(-index*width);
        }
        /*通过以上判断的时候 index  1-8*/
        setPoint();
    });

    /*2.小圆点随着图片滚动*/
    var setPoint = function(){
        /*清除所有点的当前样式*/
        for(var i = 0 ; i < points.length ; i ++){
            points[i].className = " ";
           /* points[i].classList.remove('now');*/
        }
        /*给当前对应这图片的那个点加上class now*/
        points[index-1].className = "now";
    };

    /*3.图片能滑动*/
    var startX = 0;//记录刚刚触摸屏幕时候的坐标x
    var moveX = 0; //记录滑动时候的坐标x
    var distanceX = 0; //移动的距离
    var isMove = false;//是否滑动过
    imageBox.addEventListener('touchstart',function(e){
        /*清除定时器*/
        clearInterval(timer);
        startX = e.touches[0].clientX;
    });
    imageBox.addEventListener('touchmove',function(e){
        moveX = e.touches[0].clientX;
        distanceX = moveX - startX;
        isMove = true;
        /*当前的位子 加上  你改变的位子  就是 你将要定位的那个位子*/
        var translateX = -index*width + distanceX;

        /*没有过渡的定位就是我们的滑动效果*/
        removeTransition();

        setTranslateX(translateX);

        console.log(distanceX);
    });
    imageBox.addEventListener('touchend',function(e){
        /*
        * 4.滑动不超过一定的距离  吸附回去   左右都是一样  (过渡  定位的位子不一样)
        * 5.滑动超过了一定的距离  滚动到  上一张  下一张  （过渡） 1/3
        * */

        if(Math.abs(distanceX) > width/3 && isMove){
            /*滑动超过了一定的距离*/
            /*往右  正  往左  负*/
            if(distanceX > 0){
                index --;
            }else{
                index ++;
            }
            addTransition();
            setTranslateX(-index*width);
        }else{
            /*滑动不超过一定的距离*/
            addTransition();
            setTranslateX(-index*width);
        }

        /*重置*/
        startX = 0;//记录刚刚触摸屏幕时候的坐标x
        moveX = 0; //记录滑动时候的坐标x
        distanceX = 0; //移动的距离
        isMove = false;//是否滑动过


        /*加上过渡*/
        clearInterval(timer);
        timer = setInterval(function(){
            index ++ ;
            /*动画的去滚动图片*/
            /*加过渡*/
            addTransition();
            /*定位*/
            setTranslateX(-index*width);
        },5000);
    });
   /* /!*怎么样去监听过渡结束*!/
    imageBox.addEventListener('webkitTransitionEnd',function(){
        console.log('transitionEnd');
        if(index >= 9){
            index = 1;
            /!*清楚过渡*!/
            removeTransition();
            /!*瞬间定位*!/
            setTranslateX(-index*width);
        }else if(index  <= 0){
            index = 8;
            /!*清楚过渡*!/
            removeTransition();
            /!*瞬间定位*!/
            setTranslateX(-index*width);
        }
    });
    imageBox.addEventListener('transitionEnd',function(){
        console.log('transitionEnd');
        if(index >= 9){
            index = 1;
            /!*清楚过渡*!/
            removeTransition();
            /!*瞬间定位*!/
            setTranslateX(-index*width);
        }else if(index  <= 0){
            index = 8;
            /!*清楚过渡*!/
            removeTransition();
            /!*瞬间定位*!/
            setTranslateX(-index*width);
        }
    });*/
}
/*倒计时*/
function downTime(){
    /*
    * 1.需要倒计时的时间  自己可以定义
    * 2.倒计时    定时器
    * 3.把时间渲染到6个盒子当中
    * */

    var skTime = document.querySelector('.sk_time');
    var spans = skTime.querySelectorAll('span');

    var time = 5 * 60 * 60;
    var timer = setInterval(function(){

        if(time <= 0){
            clearInterval(timer);
            return false;
        }

        time --;

        /*格式化*/
        var h = Math.floor(time/3600);
        var m = Math.floor((time%3600)/60);
        var s = time%60;


        spans[0].innerHTML = Math.floor(h/10);
        spans[1].innerHTML = h%10;

        spans[3].innerHTML = Math.floor(m/10);
        spans[4].innerHTML = m%10;

        spans[6].innerHTML = Math.floor(s/10);
        spans[7].innerHTML = s%10;



    },1000);

}
