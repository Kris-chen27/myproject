function animate(obj, target, callback) {
    // console.log(callback);
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        // 求步长值设置在定时器内
        // 把步长值改为整数，不要留小数点
        // var step = Math.ceil((target - obj.offsetLeft) / 10);
        var step = (target - obj.offsetLeft) / 10;
        // 1．如果是正值，则步长往大了取整
        // 2. 如果是负值，则步长向小了取整
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        if (obj.offsetLeft == target) {
            clearInterval(obj.timer);
            // 回调函数写在定时器结束后
            // if (callback) {
            //     callback();
            // }
            callback && callback();  // 第二种写法
        } else {
            // (目标值-现在的位置)/ 10  做为每次移动的距离步长  
            obj.style.left = obj.offsetLeft + step + 'px';
        }
    }, 20)
}