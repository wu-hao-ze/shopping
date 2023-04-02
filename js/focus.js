window.addEventListener('load', function () {
    var arrow_l = document.querySelector('.arrow-l');
    var arrow_r = document.querySelector('.arrow-r');
    var focus = document.querySelector('.focus');
    var focusWidth = focus.offsetWidth;

    // 鼠标经过focus就显示隐藏左右按钮
    focus.addEventListener('mouseenter', function () {
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
        clearInterval(timer);
        timer = null; // 清除定时器变量
    });
    focus.addEventListener('mouseleave', function () {
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';
        timer = setInterval(function () {
            arrow_r.click(); // 手动调用点击事件
        }, 2000);
    });

    // 动态生成小圆圈，有几张图片，就生成几个小圆圈
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('.circle');
    for (var i = 0; i < ul.children.length; i++) {
        var li = document.createElement('li');
        // 记录当前小圆圈的索引号，通过自定义属性来做 
        // 注意这里按语法格式应该写字符串'值'的形式，但是直接写数字类型的i也可以自动转成字符串，但是一定不要写成'i'
        li.setAttribute('index', i.toString());
        ol.appendChild(li);
        // 小圆圈的排他思想，可以直接在生成小圆圈的同时直接绑定点击事件
        li.addEventListener('click', function () {
            // 把所有的li清除current类名
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            // 当前的li设置current类名
            this.className = 'current';
            // 点击小圆圈移动图片，但是移动的是ul 
            // ul的移动距离：小圆圈的索引号*图片的宽度，注意是负值
            var index = this.getAttribute('index');
            // 一定要注意，得到的index是字符串类型的，所以用加法会把num变成字符串类型的，一定要转类型
            num = parseInt(index) + 1;
            circle = index;
            animate(ul, -index * focusWidth);
        })
    }

    // 把ol里面的第一个li设置类名为current
    ol.children[0].className = 'current';
    // 复制第一张图片(li)放到ul最后面
    // 写到小圆圈下面，使得多加一个li不会增加小圆圈的数量
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);
    var num = 1;
    var circle = 0;
    // flag节流阀：防止轮播图按钮连续点击造成播放过快的问题
    // 节流阀目的：当上一个函数动画内容执行完毕，再去执行下一个函数动画，让事件无法连续触发
    // 利用回调函数，添加一个变量来控制，锁住函数和解锁函数
    var flag = true;

    // 右侧按钮
    arrow_r.addEventListener('click', function () {
        if (flag) {
            flag = false; // 关闭节流阀
            // 如果到了最后复制的一张图片，此时ul要快速复原，left改为0
            // 注意！！！！！！！！！！！！
            // 这里非常重要的一点是此处的动画函数里面用到定时器，那么就是异步任务
            // 在第一次执行到animate之后进入到里面的定时器就先跳过，
            // 所以即使把num++等放到animate的下面也是先执行num++
            // 所以此处的情况不要再把num++放到animate的下面了
            if (num == ul.children.length) {
                ul.style.left = 0;
                num = 1;
            }
            num++;
            animate(ul, -(num - 1) * focusWidth, function () {
                flag = true; // 打开节流阀
            });


            // 点击右侧按钮，小圆圈跟随一起变化，可以再声明一个变量控制小圆圈的播放
            circle++;
            // 如果circle为4，说明走到最后复制的这张图片，就复原
            if (circle == ol.children.length) {
                circle = 0;
            }
            circleChange();
        }
    });

    function circleChange() {
        // 先清除其余小圆圈的current类名
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        // 留下当前的小圆圈的current类名
        ol.children[circle].className = 'current';
    }

    // 左侧按钮
    arrow_l.addEventListener('click', function () {
        if (flag) {
            flag = false;
            if (num == 1) {
                ul.style.left = -(ul.children.length - 1) * focusWidth + 'px';
                num = ul.children.length;
            }
            num--;
            animate(ul, -(num - 1) * focusWidth, function () {
                flag = true;
            });
            // 点击左侧按钮，小圆圈跟随一起变化，可以再声明一个变量控制小圆圈的播放
            circle--;
            // 如果circle<0，说明走到第一张图片，则小圆圈要改为第4个小圆圈
            if (circle < 0) {
                circle = ol.children.length - 1;
            }
            circleChange();
        }
    });



    // 自动播放轮播图
    var timer = setInterval(function () {
        //手动调用点击事件
        arrow_r.click();
    }, 2000);




    function animate(obj, target, callback) {
        clearInterval(obj.timer);
        obj.timer = setInterval(function () {
            var step = (target - obj.offsetLeft) / 10;
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            if (obj.offsetLeft == target) {
                clearInterval(obj.timer);
                // if (callback) {
                //     callback();
                // }
                callback && callback();
            }
            obj.style.left = obj.offsetLeft + step + 'px';
        }, 15);
    }
})