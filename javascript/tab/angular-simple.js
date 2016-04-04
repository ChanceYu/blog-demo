var tabApp = angular.module('tabApp', []);

tabApp.directive('uiTab', function(){
  //指令uiTab
  return {
    scope: {
      uiTab: '=?'
    },
    replace: true,
    template: '<div class="tab-box">'
                +'<div class="tab-header">'
                  +'<a ng-repeat="tab in uiTab.items" ng-class="{active: title == tab.title}" class="tab-btn" href="javascript:void(0)">{{tab.title}}</a>'
                +'</div>'
                +'<div class="tab-content">'
                  +'<div ng-repeat="tab in uiTab.items" ng-class="{active: title == tab.title}" class="tab-item">{{tab.content}}</div>'
                +'</div>'
              +'</div>',
    link: function(scope, element, attr){
      scope.title = scope.uiTab.items[0].title;

      element.on(scope.uiTab.event || 'click', '.tab-btn', function(event) {
        event.preventDefault();

        scope.$apply(function(){
          scope.title = angular.element(event.currentTarget).scope().tab.title;
        });
      });
    }
  }
});

tabApp .controller('tabDemoController', ['$scope', function($scope){
  //选项卡一
  $scope.tabOptions1 = {
    event: 'click',
    items: [{
      title: '选项一',
      content: '内容一'
    },{
      title: '选项二',
      content: '内容二'
    },{
      title: '选项三',
      content: '内容三'
    }]
  };

  //选项卡二
  $scope.tabOptions2 = {
    event: 'mouseenter',
    items: [{
      title: '新闻一',
      content: '新闻内容一'
    },{
      title: '新闻二',
      content: '新闻内容二'
    },{
      title: '新闻三',
      content: '新闻内容三'
    }]
  };
}]);