$(function () {
    // 全选，全不选功能模块
    // 把全选按钮(checkall)的状态赋值给三个小的按钮(j-checkbox)
    // 事件可以使用change判断全选按钮的改变
    $(".checkall").change(function () {
        $(".j-checkbox, .checkall").prop("checked", $(this).prop("checked"));
        if ($(this).prop("checked")) {
            // 让所有的商品添加check-cart-item类名
            $(".cart-item").addClass("check-cart-item");
        } else {
            // 移除check-cart-item类名
            $(".cart-item").removeClass("check-cart-item");
        }
    });

    // 如果小复选框被选中的个数等于3，就应该把全选按钮选上，否则全选按钮不选。
    $(".j-checkbox").change(function () {
        // :checked选择器 :checked查找被选中的表单元素
        if ($(".j-checkbox:checked").length === $(".j-checkbox").length) {
            $(".checkall").prop("checked", true);
        } else {
            $(".checkall").prop("checked", false);
        }
        if ($(this).prop("checked")) {
            // 让当前的商品添加check-cart-item 类名
            $(this).parents(".cart-item").addClass("check-cart-item");
        } else {
            // 移除check-cart-item类名
            $(this).parents(".cart-item").removeClass("check-cart-item");
        }
    });

    // 计算总计和总额模块
    function getSum() {
        var count = 0; // 计算总件数 
        var money = 0; // 计算总价钱
        $(".itxt").each(function (i, ele) {
            count += parseInt($(ele).val());
        });
        $(".amount-sum em").text(count);
        $(".p-sum").each(function (i, ele) {
            money += parseFloat($(ele).text().substr(1));
        });
        $(".price-sum em").text("￥" + money.toFixed(2));
    }
    getSum();

    // 增减商品数量模块
    $(".increment").click(function () {
        var n = $(this).siblings(".itxt").val();
        n++;
        $(this).siblings(".itxt").val(n);
        // 小计模块 
        var p = $(this).parents(".p-num").siblings(".p-price").html();
        p = p.substr(1); // 截取字符串，去掉￥
        var price = (p * n).toFixed(2); // toFixed(2)可以让我们保留2位小数
        $(this).parents(".p-num").siblings(".p-sum").html("￥" + price);
        getSum();
    });
    $(".decrement").click(function () {
        var n = $(this).siblings(".itxt").val();
        if (n == 1) {
            return false;
        }
        n--;
        $(this).siblings(".itxt").val(n);
        // 小计模块 
        var p = $(this).parents(".p-num").siblings(".p-price").html();
        p = p.substr(1);
        $(this).parents(".p-num").siblings(".p-sum").html("￥" + (p * n).toFixed(2));
        getSum();
    });

    // 用户修改文本框的值改变小计
    $(".itxt").change(function () {
        var n = $(this).val();
        var p = $(this).parents(".p-num").siblings(".p-price").html();
        p = p.substr(1);
        $(this).parents(".p-num").siblings(".p-sum").html("￥" + (p * n).toFixed(2));
        getSum();
    });

    // 删除商品模块
    // 商品后面的删除按钮
    $(".p-action a").click(function () {
        $(this).parents(".cart-item").remove();
        getSum();
    });

    // 删除选中的商品
    $(".remove-batch").click(function () {
        // 删除的是小复选框选中的商品
        $(".j-checkbox:checked").parents(".cart-item").remove();
        getSum();
    });

    // 清空购物车，删除全部商品
    $(".clear-all").click(function () {
        $(".cart-item").remove();
        getSum();
    })
})