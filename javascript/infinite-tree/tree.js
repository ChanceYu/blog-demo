$(document).on('click', '.tree-collapse', function() {
  $(this).parent().toggleClass('hide-node');
});

var getTree = function(node) {
  var i = 0;
  var len = node.length;
  var html = '';

  for(; i < len; i++){
    if (node[i].children && node[i].children.length > 0) {
      html += ['<li class="hide-node">',
        '<a class="tree-collapse" href="javascript:void(0)">' + node[i].name + '</a>',
        '<ul class="tree-group">',
        getTree(node[i].children),
        '</ul>',
        '</li>'
      ].join('');
    } else {
      html += ['<li>',
        '<a href="javascript:void(0)">' + node[i].name + '</a>',
        '</li>'
      ].join('');
    }
  }

  return html;
};

var tpl = getTree(treeData);

$('#treeRoot').html(tpl);
