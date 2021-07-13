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
    // 倒计时效果
    var time = document.querySelector('.fl').querySelector('.time');
    var hour = time.querySelector('.hour');
    // console.log(hour);
    var minute = time.querySelector('.minute');
    var second = time.querySelector('.second');
    var inputTime = + new Date('2021-5-16 18:00:00');
    countDown();
    function countDown() {
        var nowTime = + new Date();
        var times = (inputTime - nowTime) / 1000;
        var h = parseInt(times / 60 / 60 % 24);
        hour.innerHTML = h < 10 ? '0' + h : h;
        var m = parseInt(times / 60 % 60);
        minute.innerHTML = m < 10 ? '0' + m : m;
        var s = parseInt(times % 60);
        second.innerHTML = s < 10 ? '0' + s : s;
    }
    setInterval(countDown, 1000);

    // 2. 回到顶部效果
    var header = document.querySelector('.header');
    var headerTop = header.offsetTop;
    // console.log(headerTop);
    // console.log(hs.offsetTop);
    var fixed = document.querySelector('.fixed');
    var fixedTop = fixed.offsetTop - headerTop;
    var seckill = document.querySelector('.seckill');
    seckillTop = seckill.offsetTop;
    var goBack = fixed.querySelector('#goBack');
    // console.log(goBack);
    // 2.1 显示隐藏回到顶部选项
    document.addEventListener('scroll', function (e) {
        var y = window.pageYOffset;
        if (y >= headerTop) {
            fixed.style.position = 'fixed';
            fixed.style.top = fixedTop + 'px';
        } else {
            fixed.style.position = 'absolute';
            fixed.style.top = 120 + 'px';
        }
        if (y >= seckillTop) {
            goBack.style.display = 'block';
        } else {
            goBack.style.display = 'none';
        }
    })
    // 2.2 点击回到顶部，让窗口回到顶部
    goBack.addEventListener('click', function () {
        animate(window, 0);
    })
    // 动画函数
    function animate(obj, target, callback) {
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
    // 3.鼠标经过右侧栏的选项改变图片
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
})