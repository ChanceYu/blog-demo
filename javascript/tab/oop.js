var Tab = (function(){
  //Constructor
  function Tab(options, container){
    //此插件依赖jQuery，如果没有加载jQuery就抛出异常
    if (typeof jQuery === 'undefined') {
      throw new Error('Tab requires jQuery!');
    }

    this.$container = $(container || this.settings.container).first();

    var options = options;

    try{
      //尝试获取将属性 data-options 转换为对象参数
      options = $.parseJSON( this.$container.attr('data-options') );
    }catch(e){
    }

    this.settings = $.extend({}, Tab.defaults, options);

    this.$header = this.$container.find(this.settings.headerClass);
    this.$content = this.$container.find(this.settings.contentClass);

    this.initElements();

    this.init();
  }

  //Defaults
  Tab.defaults = {
    container: '.tab-box',//容器的class
    headerClass: '.tab-header',//按钮父容器class
    btnClass: '.tab-btn',//按钮项class
    btnActiveClass: 'active',//按钮激活的样式
    contentClass: '.tab-content',//内容父容器class
    itemClass: '.tab-item',//内容项class
    itemActiveClass: 'active',//内容激活的样式
    event: 'click'//触法的事件
  };

  //Prototype
  Tab.prototype = {
    /* 初始化 */
    init: function(){
      this.activeTab();
      this.addTab();
      this.removeTab();
    },
    /* 重新获取新的元素(在添加和删除的时候需要) */
    initElements: function(){
      this.$btns = this.$header.find(this.settings.btnClass);
      this.$items = this.$content.find(this.settings.itemClass);
    },
    /* 激活选项卡 */
    activeTab: function(){
      var _self = this;

      _self.$header.on(_self.settings.event, _self.settings.btnClass, function(event) {
        event.preventDefault();
        var btnACls = _self.settings.btnActiveClass;
        var itemACls = _self.settings.itemActiveClass;
        var index = $(this).index();

        _self.$btns.eq(index).addClass( btnACls ).siblings().removeClass( btnACls );
        _self.$items.eq(index).addClass( itemACls ).siblings().removeClass( itemACls );
      });
    },
    /* 添加选项卡 */
    addTab: function(title, content){
      var _self = this;

      _self.$header.find('.tab-add').on('click', function(event) {
        event.preventDefault();
        var title,content;

        title = window.prompt('选项卡标题');

        if(title){
          content = window.prompt('选项卡内容');

          _self.$header.find( _self.settings.btnClass ).last().after('<a class="tab-btn" href="javascript:void(0)">'+ title +'<i>&times;</i></a>');
          _self.$content.find( _self.settings.itemClass ).last().after('<div class="tab-item">'+ content +'</div>');

          _self.initElements();
        }

      });
    },
    /* 删除选项卡 */
    removeTab: function(){
      var _self = this;

      _self.$header.on('click', 'i', function(event) {
        event.preventDefault();
        event.stopPropagation();

        var index = $(this).parent().index();

        _self.$btns.eq(index).remove();
        _self.$items.eq(index).remove();

        _self.initElements();
      });
    }
  };

  return Tab;
}());

$(function(){
  $('.tab-box').each(function() {
    //创建新的选项卡实例
    new Tab(null, this);
  });
});