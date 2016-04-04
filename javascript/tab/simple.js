$(function(){
  //先获取所有的元素
  var $tab = $('.tab-box');
  var $btns = $tab.find('.tab-btn');
  var $items = $tab.find('.tab-item');

  //给按钮加事件
  $btns.on('click', function(event) {
    event.preventDefault();
    //取得点击的索引
    var index = $(this).index();

    //激活对应的样式
    $(this).addClass('active').siblings().removeClass('active');
    $items.eq(index).addClass('active').siblings().removeClass('active');
  });
});