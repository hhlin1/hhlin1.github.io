    /**
     * Created by thinkpad on 2016/5/19.
     */
    $(function(){
        banner();
        initMobileTabs();
        $('[data-toggle="tooltip"]').tooltip() //初始化tooltip,bootstrap没有初始化
    });
    //轮播图
    function banner(){
        /*
         * 1.准备轮播图的图片数据  模拟
         * 2.判断当前的屏幕  移动端   非移动端   小于768px
         * 3.把我们的数据转化成html  underscore  template
         * 4.把你转化的html渲染在页面当中  html()
         *
         * 5.监听页面尺寸改变  响应当前的尺寸   resize
         * 6.在移动端需要用手势来进行上一张下一张的滑动
         * */

        //1.准备轮播图的图片数据  模拟
        var data = [
            {
                "bac":"images/slide_01_2000x410.jpg",
                "img":"images/slide_01_640x340.jpg"
            },
            {
                "bac":"images/slide_02_2000x410.jpg",
                "img":"images/slide_02_640x340.jpg"
            },
            {
                "bac":"images/slide_03_2000x410.jpg",
                "img":"images/slide_03_640x340.jpg"
            },
            {
                "bac":"images/slide_04_2000x410.jpg",
                "img":"images/slide_04_640x340.jpg"
            }
        ]

    //    渲染
        var render = function() {
            var width = $(window).width();
            var isMobile = false;
            if (width < 768) {
                isMobile = true;
            }

            /*3.把我们的数据转化成html  underscore  template*/
            /*取到模版当中的字符串*/
            var pointTemplateStr = $("#point_template").html();
            var imageTemplateStr = $("#image_template").html();
            console.log(imageTemplateStr)
            //    转化成模版函数
            var pointTemplate = _.template(pointTemplateStr);
            var imageTemplate = _.template(imageTemplateStr);
            console.log(pointTemplate);
            console.log(imageTemplate);

            //    传入数据 解析成 html 字符
            var pointHtml = pointTemplate({model: data});
            var imageHtml = imageTemplate({model: data, isMobile: isMobile});
            //把html字符串渲染在页面当中
            $(".carousel-indicators").html(pointHtml);
            $(".carousel-inner").html(imageHtml);
        }
    //    5.监听页面尺寸改变  响应当前的尺寸   resize|
        $(window).on('resize',function(){
            render();
        }).trigger('resize');

    //    6.在移动端需要用手势来进行上一张下一张的滑动
        var startX= 0,moveX= 0,distanceX= 0,isMove=false;
        //jquery 在绑定移动端touch事件的时候把我们的touchevent事件封装在originalEvent
        $('.carousel-inner').on('touchstart',function(e){
            startX = e.originalEvent.touches[0].clientX;
        }).on('touchmove',function(e){
            moveX = e.originalEvent.touches[0].clientX;
            distanceX = moveX-startX;
            isMove = true;
        }).on('touchend',function(e){
        // 当我们滑动的距离超过了 50 的时候就认为是一个手势
            if(Math.abs(distanceX) > 50 && isMove) {
                if(distanceX > 0){
                    $(".carousel").carousel('prev');
                }else{
                    $('.carousel').carousel('next');
                }
            }
        //    重置参数
            startX= 0,moveX= 0,distanceX = 0,isMove=false;
        });
    }

    //初始移动端tabs组件的功能
    function initMobileTabs(){
        //1.获取到所有页签的宽度的和
        //2.把ul盒子设置的足够宽
        //3.把这个容器设置成一个可以滑动的容器

        var $parent = $(".wjs-product-tabs-parent");
        var $ul = $parent.find('ul');
        var $lis = $ul.find('li');
        var widthSum = 0;

        $lis.each(function(i,item){
            widthSum += $(item).innerWidth();
        })

    //    把ul盒子设置的足够宽
        $ul.width(widthSum);
        //把这个容器设置成一个可以滑动的容器
        itcast.iScroll({
            swipeDom: $parent.get(0),
            swipeType:"x",
            swipeDistance:20
        });
    }