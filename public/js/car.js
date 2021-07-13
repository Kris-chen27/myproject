$(function () {
    // 1. 全选  全不选功能模块
    // 就是把全选按钮（checkall）的状态赋值给三个小的按钮（j-checkbox）就可以了
    // 事件可以使用change
    $('.checkall').change(function () {
        // console.log($(this).prop('checked'));
        $('.j-checkbox, .checkall').prop('checked', $(this).prop('checked'))
        // 7. 选中的商品添加背景颜色
        if ($(this).prop('checked')) {
            // 所有商品添加 check-cart-item 这个类
            $('.cart-item').addClass('check-cart-item');
        } else {
            // 所有商品删除 check-cart-item这个类
            $('.cart-item').removeClass('check-cart-item');
        }
    })
    // 2. 如果小复选框被选中的个数等于3就应该把全选按钮选上，否则全选按钮不选。
    $('.j-checkbox').change(function () {
        // console.log($('j-checkbox:checked').length);
        // $(".j-checkbox").length 这个是所有的小复选框的个数
        if ($('.j-checkbox:checked').length === $('.j-checkbox').length) {
            $('.checkall').prop('checked', true);
        } else {
            $('.checkall').prop('checked', false);
        }
        // 7. 选中的商品添加背景颜色
        if ($(this).prop('checked')) {
            // 当前选中的商品添加 check-cart-item 这个类
            $(this).parents('.cart-item').addClass('check-cart-item');
        } else {
            // 未选中的商品删除 check-cart-item这个类
            $(this).parents('.cart-item').removeClass('check-cart-item');
        }
    })

    // 3．增减商品数量模块首先声明一个变量，当我们点击+号(increment)，就让这个值++，然后赋值给文本框。
    $('.increment').click(function () {
        var n = $(this).siblings('.itxt').val();
        // console.log(n);
        n++;
        $(this).siblings('.itxt').val(n);

        // 3．计算小计模块根据文本框的值 乘以 当前商品的价格 就是商品的小计
        // console.log($(this).parent().parent().siblings('.p-price').text());
        // var p = $(this).parent().parent().siblings('.p-price').text();
        // parents()  返回指定的祖先元素
        var p = $(this).parents('.p-num').siblings('.p-price').text();
        // console.log(p);
        p = p.substr(1);
        // console.log(p);
        // 最后计算的结果如果想要保留2位小数通过 toFixed(2)方法
        p = (n * p).toFixed(2);
        p = '￥' + p;
        // p = '￥' + p;
        // console.log(p);
        // $(this).parent().parent().siblings('.p-sum').text(p);
        $(this).parents('.p-num').siblings('.p-sum').text(p);
        getSum();
    })
    $('.decrement').click(function () {
        var n = $(this).siblings('.itxt').val();
        // console.log(n);
        // 判断当 n == 1 时，下面的程序便不再执行
        if (n == 1) {
            return false;
        }
        n--;
        $(this).siblings('.itxt').val(n);

        var p = $(this).parent().parent().siblings('.p-price').text();
        // var p = $(this).parents('p-num').siblings('.p-price').text();
        // 将￥12.60 的 ￥ 截取掉
        p = p.substr(1);
        // p = '￥' + n * p;
        // 最后计算的结果如果想要保留2位小数通过 toFixed(2)方法
        p = (n * p).toFixed(2);
        p = '￥' + p;
        $(this).parent().parent().siblings('.p-sum').text(p);
        // $(this).parents('.p-num').siblings('.p-sum').text(p);
        getSum();
    })

    // 4. 用户也可以直接修改表单里面的值，同样要计算小计。
    // 用表单change事件用最新的表单内的值乘以单价即可但是还是当前商品小计
    $('.itxt').change(function () {
        // 先得到文本框的里面的值 乘以 当前商品的单价
        var n = $(this).val();
        var p = $(this).parents('.p-num').siblings('.p-price').text();
        // console.log(p);
        p = p.substr(1);
        p = (n * p).toFixed(2);
        p = '￥' + p;
        $(this).parents('.p-num').siblings('.p-sum').text(p);
        getSum();
    })

    // 5. 计算总计和总额
    // 5.1 核心思路︰把所有文本框里面的值相加就是总计数量。总额同理
    // 5.2 文本框里面的值不相同，如果想要相加需要用到each遍历。声明一个变量，相加即可
    // 5.3 点击 + 号 - 号，会改变总计和总额，如果用户修改了文本框里面的值同样会改变总计和总额
    // 5.4 因此可以封装一个函数求总计和总额的，以上2个操作调用这个函数即可。
    // 5.5 注意1:总计是文本框里面的值相加用val(),总额是普通元素的内容用text()
    getSum();  // 未改变时就调用一次，页面一刷新就开始计算了
    function getSum() {
        var count = 0;  // 计算总计数
        var money = 0;  // 计算总价钱
        $('.itxt').each(function (i, ele) {
            count += parseInt($(ele).val());
        });
        $('.amount-sum em').text(count);

        $('.p-sum').each(function (i, ele) {
            money += parseFloat($(ele).text().substr(1));
            // money = money.toFixed(2);
            // money = '￥' + money;
        })
        $('.price-sum em').text('￥' + money.toFixed(2));
    }

    // 6. 删除商品模块
    // (1) 商品后面的删除
    $('.p-action a').click(function () {
        $(this).parents('.cart-item').remove();
        getSum();
    })
    // (2) 选中的商品删除
    $('.remove-batch').click(function () {
        // if ($('j-checkbox:checked').checked === true) {

        // }
        $('.j-checkbox:checked').parents('.cart-item').remove();
        getSum();
    })
    // (3) 删除购物车
    $('.clear-all').click(function () {
        $('.cart-item').remove();
        getSum();
    })
})