(function(root) {
    var API = API || {};

    /*
     * 输入框内容长度计算器
     */
    var StringCounter = function(options) {
      this.options = $.extend({}, StringCounter.defaults, options);

      this.$element = $(this.options.element);

      if (this.$element.data('StringCounter')) {
        return this.$element.data('StringCounter');
      }

      this.options.max = this.$element.attr('maxlength') || this.options.max;
      this.options.min = this.options.min || 0;

      this.init();
      this.$element.data('StringCounter', this);
      return this;
    };

    StringCounter.defaults = {
      max: 20,
      min: 0,
      size: 0,
      remains: 20,
      onchange: null
    };

    StringCounter.prototype.init = function() {
      var self = this;

      self.$element.attr('maxlength', self.options.max);

      self.$element.off('keyup.StringCounter blur.StringCounter').on('keyup.StringCounter blur.StringCounter', function(event) {
        if(/^\s/g.test($(this).val() )){
          var val = $.trim($(this).val());
          
          $(this).val(val);
        }

        self.calculate();
      });
    };

    StringCounter.prototype.calculate = function() {
      var self = this;
      var val = self.$element.val();
      var len = val.length;

      if (len < self.options.min) {
        self.$element.val('');
      }

      if (len > self.options.max) {
        self.$element.val(val.substr(0, self.options.max));
      }

      this.size = self.$element.val().length;
      this.remains = self.options.max - this.size;

      if (self.options && typeof self.options.onchange === 'function') {
        self.options.onchange.call(this);
      }
    };

    API.StringCounter = function(options) {
      return new StringCounter(options);
    };

    $(document).ready(function() {
      $(document).on('click.StringCounter', '.J_StringCounter', function(event) {
        event.preventDefault();

        new StringCounter({
          element: this,
          onchange: function() {
            var elem = this.$element;

            elem.next('.num').find('.vary-num').text(this.size);
          }
        });
      });
    });

    root.API = API;
  }(this));