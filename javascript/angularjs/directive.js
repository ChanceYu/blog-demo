angular.module('app', [])
.directive('myProgress', function(){
  return {
    restrict: 'EA',
    replace: true,
    scope: {
      type: '@',
      percent: '='
    },
    template: [
            '<div class="progress">',
              '<div class="progress-bar progress-bar-{{type}}" ng-style="{width: percent + \'%\'}">{{percent}}%',
              '</div>',
            '</div>'
              ].join('')
  }
});