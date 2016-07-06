$(function() {
  var toc     = $('.toc-link'),
      sidebar = $('.sidebar');

  $('.sidebar-tag:first').addClass('active');
  var fisrtFilter = $('.sidebar-tag:first').data('filter');
  toc.hide();
  $('.toc-link[data-tags~=' + fisrtFilter + ']').fadeIn(350);
	  
  $('.sidebar-tags').on('click', '.sidebar-tag', function() {
    var filter = $(this).data('filter');
    if (filter === 'all') {
      toc.fadeIn(350);
    } else {
      toc.hide();
      $('.toc-link[data-tags~=' + filter + ']').fadeIn(350);
    }
    $(this).addClass('active').siblings().removeClass('active');
  });
});
