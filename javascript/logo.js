// Changing the opacity of the logo when the mouse hovers over it.
$(document).ready(function() {
	$('img.logo').css({opacity: 1}); // only applied to the "logo" class.
	$('img.logo').each(function() { // only applied to the "logo" class.
		$(this).hover(function() {
				$(this).stop().animate({opacity: 0.7}, 400); // 400ms to 70% opacity.
			},
			function() {
				$(this).stop().animate({opacity: 1}, 400); // 400ms back to full opacity.
			})
	});
});