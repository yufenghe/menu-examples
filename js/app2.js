
	// The rate at which the menu expands revealing child elements on click
	$.menu_speed = 235;

	/*
	 * APP DOM REFERENCES
	 * Description: Obj DOM reference, please try to avoid changing these
	 */	
	$.root_ = $('body');
	$.left_panel = $('#left-panel');

/*
 * DOCUMENT LOADED EVENT
 * Description: Fire when DOM is ready
 */

$(document).ready(function() {
	// INITIALIZE LEFT NAV
	$('nav ul').jarvismenu({
		accordion : true,
		speed : $.menu_speed,
		closedSign : '<em class="fa fa-expand-o"></em>',
		openedSign : '<em class="fa fa-collapse-o"></em>'
	});

	// COLLAPSE LEFT NAV
	$('.minifyme').click(function(e) {
		$('body').toggleClass("minified");
		//$(this).effect("highlight", {}, 500);
		if($('.minifyme>i').hasClass('fa-arrow-circle-left')) {
			$('.minifyme>i').removeClass('fa-arrow-circle-left');
			$('.minifyme>i').addClass('fa-arrow-circle-right')
		}
		else if($('.minifyme>i').hasClass('fa-arrow-circle-right')) {
			$('.minifyme>i').removeClass('fa-arrow-circle-right');
			$('.minifyme>i').addClass('fa-arrow-circle-left')
		}
		e.preventDefault();
	});
});

/* ~ END: NAV OR #LEFT-BAR RESIZE DETECT */
/*
 * CUSTOM MENU PLUGIN
 */

$.fn.extend({

	//pass the options variable to the function
	jarvismenu : function(options) {

		var defaults = {
			accordion : 'true',
			speed : 200,
			closedSign : '[+]',
			openedSign : '[-]'
		};

		// Extend our default options with those provided.
		var opts = $.extend(defaults, options);
		//Assign current element to variable, in this case is UL element
		var $this = $(this);

		//add a mark [+] to a multilevel menu
		$this.find("li").each(function() {
			if ($(this).find("ul").size() != 0) {
				//add the multilevel sign next to the link
				$(this).find("a:first").append("<b class='collapse-sign'>" + opts.closedSign + "</b>");

				//avoid jumping to the top of the page when the href is an #
				if ($(this).find("a:first").attr('href') == "#") {
					$(this).find("a:first").click(function() {
						return false;
					});
				}
			}
		});

		//open active level
		$this.find("li.active").each(function() {
			$(this).parents("ul").slideDown(opts.speed);
			$(this).parents("ul").parent("li").find("b:first").html(opts.openedSign);
			$(this).parents("ul").parent("li").addClass("open")
		});

		$this.find("li a").click(function() {
			
			if ($(this).parent().find("ul").size() != 0) {

				if (opts.accordion) {
					//Do nothing when the list is open
					if (!$(this).parent().find("ul").is(':visible')) {
					console.info("1111", $(this).parent().find("ul"))
						parents = $(this).parent().parents("ul");
						visible = $this.find("ul:visible");
						visible.each(function(visibleIndex) {
							var close = true;
							parents.each(function(parentIndex) {
								if (parents[parentIndex] == visible[visibleIndex]) {
									close = false;
									return false;
								}
							});
							if (close) {
								if ($(this).parent().find("ul") != visible[visibleIndex]) {
									$(visible[visibleIndex]).slideUp(opts.speed, function() {
										$(this).parent("li").find("b:first").html(opts.closedSign);
										$(this).parent("li").removeClass("open");
									});

								}
							}
						});
					}
				}// end if
				if ($(this).parent().find("ul:first").is(":visible") && !$(this).parent().find("ul:first").hasClass("active")) {
					$(this).parent().find("ul:first").slideUp(opts.speed, function() {
						$(this).parent("li").removeClass("open");
						$(this).parent("li").find("b:first").delay(opts.speed).html(opts.closedSign);
					});

				} else {
					$(this).parent().find("ul:first").slideDown(opts.speed, function() {
						/*$(this).effect("highlight", {color : '#616161'}, 500); - disabled due to CPU clocking on phones*/
						$(this).parent("li").addClass("open");
						$(this).parent("li").find("b:first").delay(opts.speed).html(opts.openedSign);
					});
				} // end else
			} // end if
		});
	} // end function
});

/* ~ END: CUSTOM MENU PLUGIN */
