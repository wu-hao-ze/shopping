$(function () {
    // 当我们点击了li就会触发页面滚动，从而执行滚动函数，但是不希望此时仍然执行其中的改变li的背景选择(添加删除current)
    // 所以使用节流阀(互斥锁) 
    var flag = true;

    // 显示隐藏电梯导航
    var toolTop = $(".recom").offset().top;
    function toggleTool() {
        if ($(document).scrollTop() >= toolTop) {
            $(".fixedtool").fadeIn();
        } else {
            $(".fixedtool").fadeOut();
        };
    }
    toggleTool();

    // 页面滚动到某个内容区域，左侧电梯导航li相应添加和删除current类名
    $(window).scroll(function () {
        toggleTool();
        if (flag) {
            $(".floor .w").each(function (i, ele) {
                if ($(document).scrollTop() >= $(ele).offset().top) {
                    $(".fixedtool li").eq(i).addClass("current").siblings().removeClass();
                }
            })
        }
    });

    // 点击电梯导航页面可以滚动到相应内容区域
    $(".fixedtool li").click(function () {
        flag = false;
        // 选出对应索引号的内容区的盒子，获取它的.offset().top
        var current = $(".floor .w").eq($(this).index()).offset().top;
        // 页面动画滚动效果
        $("body, html").stop().animate({
            scrollTop: current
        }, function () {
            // 滚动结束后，重新赋值true
            flag = true;
        });
        // 点击之后，让当前的li添加current类名，其余兄弟移除current类名
        $(this).addClass("current").siblings().removeClass();
    })
})