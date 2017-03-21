    /**
     * Created by thinkpad on 2016/5/19.
     */
    $(function(){
        banner();
        initMobileTabs();
        $('[data-toggle="tooltip"]').tooltip() //��ʼ��tooltip,bootstrapû�г�ʼ��
    });
    //�ֲ�ͼ
    function banner(){
        /*
         * 1.׼���ֲ�ͼ��ͼƬ����  ģ��
         * 2.�жϵ�ǰ����Ļ  �ƶ���   ���ƶ���   С��768px
         * 3.�����ǵ�����ת����html  underscore  template
         * 4.����ת����html��Ⱦ��ҳ�浱��  html()
         *
         * 5.����ҳ��ߴ�ı�  ��Ӧ��ǰ�ĳߴ�   resize
         * 6.���ƶ�����Ҫ��������������һ����һ�ŵĻ���
         * */

        //1.׼���ֲ�ͼ��ͼƬ����  ģ��
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

    //    ��Ⱦ
        var render = function() {
            var width = $(window).width();
            var isMobile = false;
            if (width < 768) {
                isMobile = true;
            }

            /*3.�����ǵ�����ת����html  underscore  template*/
            /*ȡ��ģ�浱�е��ַ���*/
            var pointTemplateStr = $("#point_template").html();
            var imageTemplateStr = $("#image_template").html();
            console.log(imageTemplateStr)
            //    ת����ģ�溯��
            var pointTemplate = _.template(pointTemplateStr);
            var imageTemplate = _.template(imageTemplateStr);
            console.log(pointTemplate);
            console.log(imageTemplate);

            //    �������� ������ html �ַ�
            var pointHtml = pointTemplate({model: data});
            var imageHtml = imageTemplate({model: data, isMobile: isMobile});
            //��html�ַ�����Ⱦ��ҳ�浱��
            $(".carousel-indicators").html(pointHtml);
            $(".carousel-inner").html(imageHtml);
        }
    //    5.����ҳ��ߴ�ı�  ��Ӧ��ǰ�ĳߴ�   resize|
        $(window).on('resize',function(){
            render();
        }).trigger('resize');

    //    6.���ƶ�����Ҫ��������������һ����һ�ŵĻ���
        var startX= 0,moveX= 0,distanceX= 0,isMove=false;
        //jquery �ڰ��ƶ���touch�¼���ʱ������ǵ�touchevent�¼���װ��originalEvent
        $('.carousel-inner').on('touchstart',function(e){
            startX = e.originalEvent.touches[0].clientX;
        }).on('touchmove',function(e){
            moveX = e.originalEvent.touches[0].clientX;
            distanceX = moveX-startX;
            isMove = true;
        }).on('touchend',function(e){
        // �����ǻ����ľ��볬���� 50 ��ʱ�����Ϊ��һ������
            if(Math.abs(distanceX) > 50 && isMove) {
                if(distanceX > 0){
                    $(".carousel").carousel('prev');
                }else{
                    $('.carousel').carousel('next');
                }
            }
        //    ���ò���
            startX= 0,moveX= 0,distanceX = 0,isMove=false;
        });
    }

    //��ʼ�ƶ���tabs����Ĺ���
    function initMobileTabs(){
        //1.��ȡ������ҳǩ�Ŀ�ȵĺ�
        //2.��ul�������õ��㹻��
        //3.������������ó�һ�����Ի���������

        var $parent = $(".wjs-product-tabs-parent");
        var $ul = $parent.find('ul');
        var $lis = $ul.find('li');
        var widthSum = 0;

        $lis.each(function(i,item){
            widthSum += $(item).innerWidth();
        })

    //    ��ul�������õ��㹻��
        $ul.width(widthSum);
        //������������ó�һ�����Ի���������
        itcast.iScroll({
            swipeDom: $parent.get(0),
            swipeType:"x",
            swipeDistance:20
        });
    }