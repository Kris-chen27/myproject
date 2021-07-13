// var text = document.querySelector('.search').querySelector('.text');
// text.addEventListener('focus', function () {
//     if (this.value === '请输入搜索内容...') {
//         this.value = '';
//     }
// })
// text.addEventListener('blur', function () {
//     if (this.value === '') {
//         this.value = '请输入搜索内容...';
//     }
//     this.style.color = '#ccc';
// })
window.addEventListener('load', function () {
    var text = document.querySelector('.search').querySelector('.text');
    text.addEventListener('focus', function () {
        if (this.value === '请输入搜索内容...') {
            this.value = '';
        }
        this.style.color = '#333';
    })
    text.addEventListener('blur', function () {
        if (this.value === '') {
            this.value = '请输入搜索内容...';
        }
        this.style.color = '#ccc';
    })
    // console.log(1);
    // 重点：一、轮播图做法
    var main = document.querySelector('.main');
    var prex = main.querySelector('.prex');
    var next = main.querySelector('.next');
    // 1. 鼠标经过轮播图就显示左右按钮
    main.addEventListener('mouseenter', function () {
        prex.style.display = 'block';
        next.style.display = 'block';
        // 10.1 鼠标经过就停止定时器
        clearInterval(timer);
        timer = null;
    })
    // 鼠标离开轮播图就隐藏左右按钮
    main.addEventListener('mouseleave', function () {
        prex.style.display = 'none';
        next.style.display = 'none';
        // 10.2 鼠标离开后开启定时器
        timer = setInterval(function () {
            // 手动调用右侧的点击事件
            // next.clcik();
            next.click();
        }, 2000)
        // clearInterval(timer);
    })
    // 2．动态生成小圆圈有几张图片，我就生成几个小圆圈
    var ul = main.querySelector('ul');
    var ol = main.querySelector('ol');
    // 图片宽度应为全局变量，写在外面
    var mainWidth = main.offsetWidth;
    // console.log(ul);
    for (var i = 0; i < ul.children.length; i++) {
        // 依据ul里面有多少个li就创建小li节点
        var li = document.createElement('li');
        // 生成小li同时 记录当前小圆圈的索引号  通过自定义属性来做
        li.setAttribute('index', i);
        // 将创建li添加到ol中
        ol.appendChild(li);
        // 4. 小圆圈的排他思想  我们可以直接在生成小圆圈的同时直接绑定点击事件
        li.addEventListener('click', function () {
            // 先清除掉所有li的类名
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            // 保留当前点击小li的类名
            this.className = 'current';
            // 5．点击小圆圈，移动图片  当然移动的是ul
            // u1 的移动距离   小圆圈的索引号 乘以 图片的宽度  注意是负值
            // var mainWidth = main.offsetWidth;
            // console.log(mainWidth);
            // 当我们点击了某个小li  就拿到当前小1i的索引号
            var index = this.getAttribute('index');
            // 第一个bug 当我们点击了某个小li就要把这个li的索引号给num
            num = index;
            // 当我们点击了某个小li就要把这个li的索引号给  circle
            circle = index;
            // num = circle = index;
            // 移动的距离
            var step = -index * mainWidth;
            // console.log(index);
            animate(ul, step);
        })
    }
    // 3. 把o1里面的第一个小li设置类名为current
    ol.children[0].className = 'current';
    // 6. 克隆第一张图片  放在ul的最后面
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);
    // 7．点击右侧按钮，图片滚动一张
    // circle控制小圆点的播放
    var circle = 0;
    // 声明一个变量num，点击一次，自增1，让这个变量 乘以 图片宽度，就是ul的滚动距离。
    var num = 0;
    // flag  节流阀设置的变量 防止轮播图按钮连续点击造成播放过快。
    // 节流阀目的:当上一个函数动画内容执行完毕，再去执行下一个函数动画，让事件无法连续触发。
    // 核心实现思路∶利用回调函数，添加一个变量来控制，锁住函数和解锁函数。
    // 开始设置一个变量 var flag = true;
    var flag = true;
    next.addEventListener('click', function () {
        if (flag) {
            flag = false; // 关闭节流阀
            // console.log(1);
            // 图片无缝滚动原理
            // 把ul第一个li复制一份，放到ul的最后面
            // 当图片滚动到克隆的最后―张图片时, 让ul快速的、不做动画的跳到最左侧:left 为0
            // 同时num赋值为0，可以从新开始滚动图片了
            // 如果走到了最后复制的一张图片，此时我们的ul 要快速复原left 改为0
            if (num == ul.children.length - 1) {
                ul.style.left = 0;
                num = 0;
            }
            num++;
            animate(ul, -num * mainWidth, function () {
                flag = true;  // 打开节流阀
            });
            // 8．点击右侧按钮，小圆圈跟随一起变化 可以再声明一个变量控制小圆圈的播放
            // 最简单的做法是再声明一个变量circle，每次点击自增1，注意，左侧按钮也需要这个变量，因此要声明全局变量。
            // 但是图片有5张，我们小圆圈只有4个少一个，必须加一个判断条件
            // 如果circle == 4就从新复原为0
            circle++;
            // if (circle == ol.children.length) {
            //     circle = 0;
            // }
            circle = circle == ol.children.length ? 0 : circle;
            // 调用小圆点样式函数
            circleChange();
        }
    })
    // 9. 左侧按钮的做法
    prex.addEventListener('click', function () {
        if (flag) {
            flag = false;
            // console.log(1);
            // 图片无缝滚动原理
            // 把ul第一个li复制一份，放到ul的最后面
            // 当图片滚动到克隆的最后―张图片时, 让ul快速的、不做动画的跳到最左侧:left 为0
            // 同时num赋值为0，可以从新开始滚动图片了
            // 如果走到了最后复制的一张图片，此时我们的ul 要快速复原left 改为0
            if (num == 0) {
                num = ul.children.length - 1;
                ul.style.left = -num * mainWidth + 'px';
                // num = ol.children.length - 1;
            }
            num--;
            animate(ul, -num * mainWidth, function () {
                flag = true;
            });
            // 8．点击右侧按钮，小圆圈跟随一起变化 可以再声明一个变量控制小圆圈的播放
            // 最简单的做法是再声明一个变量circle，每次点击自增1，注意，左侧按钮也需要这个变量，因此要声明全局变量。
            // 但是图片有5张，我们小圆圈只有4个少一个，必须加一个判断条件
            // //如果circle < 0 说明第一张图片，则小圆圈要改为第4个小圆圈
            circle--;
            // if (circle < 0) {
            //     circle = ol.children.length - 1;
            // }
            circle = circle < 0 ? ol.children.length - 1 : circle;
            // 调用小圆点样式函数
            circleChange();
        }
    })
    function circleChange() {
        // 先清除其余小圆圈的current类名
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        // 留下当前的小圆圈的current类名
        ol.children[circle].className = 'current';
    }
    // 10. 自动播放轮播图功能
    var timer = setInterval(function () {
        // 手动调用右侧的点击事件
        // next.click();
        next.click();
    }, 2000)

    // 二、右侧固定栏
    var header = document.querySelector('.header');
    var headerTop = header.offsetTop;
    // console.log(headerTop);
    var fixed = document.querySelector('.fixed');
    var fixedTop = fixed.offsetTop - headerTop;
    // console.log(fixedTop);
    var recommend = document.querySelector('.recommend');
    var recommendTop = recommend.offsetTop;
    // console.log(recommendTop);
    var goBack = fixed.querySelector('#goBack');
    // 1. 窗口滚动改变右侧栏未固定定位
    // bug1  当页面刷新右侧栏会消失，解决办法，封装一函数，页面开始时就调用
    toggleFixed();
    function toggleFixed() {
        var y = window.pageYOffset;
        if (y >= headerTop) {
            fixed.style.position = 'fixed';
            fixed.style.top = fixedTop + 'px';
        } else {
            fixed.style.position = 'absolute';
            fixed.style.top = 120 + 'px';
        }
        // 2. 窗口滚动到recommend的位置显示回到顶部按钮
        if (y >= recommendTop) {
            goBack.style.display = 'block';
        } else {
            goBack.style.display = 'none';
        }
    }
    document.addEventListener('scroll', function (e) {
        // 封装调用，防止刷新页面右侧栏消失
        toggleFixed();
        // var y = window.pageYOffset;
        // if (y >= headerTop) {
        //     fixed.style.position = 'fixed';
        //     fixed.style.top = fixedTop + 'px';
        // } else {
        //     fixed.style.position = 'absolute';
        //     fixed.style.top = 120 + 'px';
        // }
        // // 2. 窗口滚动到recommend的位置显示回到顶部按钮
        // if (y >= recommendTop) {
        //     goBack.style.display = 'block';
        // } else {
        //     goBack.style.display = 'none';
        // }
    })
    // 3. 点击回到顶部，回到窗口顶部
    goBack.addEventListener('click', function () {
        // window.scroll(x, y);   x 和 y 是不跟单位的，直接写
        // window.scroll(0, 0);
        // 窗口滚动，对象则为window
        animate1(window, 0);
    });

    // 动画函数
    function animate1(obj, target, callback) {
        // console.log(callback);
        clearInterval(obj.timer);
        obj.timer = setInterval(function () {
            // 求步长值设置在定时器内
            // 把步长值改为整数，不要留小数点
            // var step = Math.ceil((target - obj.offsetLeft) / 10);
            var step = (target - window.pageYOffset) / 10;
            // 1．如果是正值，则步长往大了取整
            // 2. 如果是负值，则步长向小了取整
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            if (window.pageYOffset == target) {
                clearInterval(obj.timer);
                // 回调函数写在定时器结束后
                // if (callback) {
                //     callback();
                // }
                callback && callback();
            } else {
                // (目标值-现在的位置)/ 10  做为每次移动的距离步长  
                // obj.style.top = window.pageYOffset + step + 'px';
                window.scroll(0, window.pageYOffset + step);
            }
        }, 20)
    }

    // 4. 鼠标经过各项改变图片
    var first = fixed.querySelector('#first');
    var img = first.querySelector('img');
    // console.log(img);
    // 3.1 手机APP项
    first.addEventListener('mouseenter', function () {
        img.src = 'images/con1-1.png';
    })
    first.addEventListener('mouseleave', function () {
        img.src = 'images/con1.png';
    })
    // 3.2 个人中心项
    var two = fixed.querySelector('#two');
    var img_2 = two.querySelector('img');
    // console.log(img_2);
    two.addEventListener('mouseenter', function () {
        img_2.src = 'images/con2-2.png';
    })
    two.addEventListener('mouseleave', function () {
        img_2.src = 'images/con2.png';
    })
    // 3.3 售后服务项
    var third = fixed.querySelector('#third');
    var img_3 = third.querySelector('img');
    // console.log(img_3);
    third.addEventListener('mouseenter', function () {
        img_3.src = 'images/con3-3.png';
    })
    third.addEventListener('mouseleave', function () {
        img_3.src = 'images/con3.png';
    })
    // 3.4 人工客服项
    var fourth = fixed.querySelector('#fourth');
    var img_4 = fourth.querySelector('img');
    // console.log(img_4);
    fourth.addEventListener('mouseenter', function () {
        img_4.src = 'images/con4-4.png';
    })
    fourth.addEventListener('mouseleave', function () {
        img_4.src = 'images/con4.png';
    })
    // 3.5 购物车项
    var fifth = fixed.querySelector('#fifth');
    var img_5 = fifth.querySelector('img');
    // console.log(img_5);
    fifth.addEventListener('mouseenter', function () {
        img_5.src = 'images/con5-5.png';
    })
    fifth.addEventListener('mouseleave', function () {
        img_5.src = 'images/con5.png';
    })
    // 3.6 回到顶部项
    var img_6 = goBack.querySelector('img');
    // console.log(img_6);
    goBack.addEventListener('mouseenter', function () {
        img_6.src = 'images/con6-6.png';
    })
    goBack.addEventListener('mouseleave', function () {
        img_6.src = 'images/con6.png';
    })

    // 5. 左侧电梯
    // 5.5 当我们点击了小li 此时不需要执行页面滚动事件里面的li的背景选择 添加current
    // 需要用到节流阀
    var flag = true;
    // 5.1 滚动指定位置显示左侧电梯
    // 页面开始时便调用一次
    toggleTool();
    var recommendTop = $('.recommend').offset().top;
    // console.log(recommendTop);
    // bug 封装函数，防止页面刷新会消失
    function toggleTool() {
        if ($(document).scrollTop() >= recommendTop) {
            $('.fixedtool').fadeIn();
        } else {
            $('.fixedtool').fadeOut();
        }
    }
    $(window).scroll(function () {
        // console.log(11);
        // console.log($(document).scrollTop());
        // var y = $(document).scrollTop();
        // if ($(document).scrollTop() >= recommendTop) {
        //     $('.fixedtool').fadeIn();
        // } else {
        //     $('.fixedtool').fadeOut();
        // }
        // 封装调用，防止页面刷新左侧栏消失
        toggleTool();

        // 5.4 当我们页面滚动到内容区域某个模块，左侧电梯导航，相对应的小li模块，也会添加current类，否则移除
        // 触发的事件是页面滚动，因此这个功能要写到页面滚动事件里面。
        // 需要用到each，遍历内容区域大模块。each里面能拿到内容区域每一个模块元素和索引号
        // 判断的条件︰被卷去的头部大于等于内容区域里面每个模块的offset().top
        if (flag) {
            $('.floor').each(function (i, ele) {
                if ($(document).scrollTop() >= $(ele).offset().top) {
                    // console.log(i);
                    $('.fixedtool li').eq(i).addClass('current').siblings('li').removeClass();
                }
            })
        }
    })
    // 5.2 点击其中一个小li，页面滚动到相应的模块中去
    // 核心算法∶因为电梯导航模块和内容区模块——对应的
    // 当我们点击电梯导航某个小模块，就可以拿到当前小模块的索引号
    // 就可以把animate要移动的距离求出来:当前索引号内容区模块它的offset().top
    $('.fixedtool li').click(function () {
        // 每次点击小li flag为false  这样页面滚动事件的添加类事件便不会执行
        flag = false;
        // console.log($(this).index());
        // 当我们每次点击小li就需要计算出页面要去往的位置
        // 选出对应索引号的内容区的盒子  计算它的.offset().top
        var yTop = $('.floor').eq($(this).index()).offset().top;
        $('body,html').stop().animate({
            scrollTop: yTop,
        }, function () {
            flag = true;  // 当页面滚动时就重新打开节流阀，即重新执行页面滚动时到达哪个小li就添加类current
        })
        // 5.3 点击当前电梯添加current类
        $(this).addClass('current').siblings('li').removeClass('current');
    })

    // 图片懒加载
    // lazyLoadInit({
    //     // coverColor: "white",
    //     // coverDiv: "<h1>test</h1>",
    //     // offsetBottom: 0,
    //     // offsetTopm: 0,
    //     showTime: 1100,
    //     onLoadBackEnd: function (i, e) {
    //         console.log("onLoadBackEnd:" + i);
    //     }
    //     , onLoadBackStart: function (i, e) {
    //         console.log("onLoadBackStart:" + i);
    //     }
    // });
})
