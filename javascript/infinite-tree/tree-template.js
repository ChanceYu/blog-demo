$(document).on('click', '.tree-collapse', function() {
  $(this).parent().toggleClass('hide-node');
});

var tpl = new Simplite({
  target: 'treeRoot',
  template: 'treeTemplate'
});

tpl.render(treeData);
