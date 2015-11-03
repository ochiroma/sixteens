/**
 * Created by crispin on 28/10/2015.
 */


//Toggles between showing and hiding content on click. Possible replacement for accordion.js in the future.

// Credit goes to Heydon Pickering (http://heydonworks.com/practical_aria_examples/#progressive-collapsibles)


$('.js-show-hide .js-show-hide__title').each(function (){
	var $this = $(this);

	// create unique id for a11y relationship
	var id = 'collapsible-' + $this.index();

	if ($this.hasClass('is-shown')) {
		var bool = false;
	} else {
		var bool = true;
	}

	// wrap the content and make it focusable
	$this.nextUntil('.js-show-hide__title').attr({id: id, 'aria-hidden': bool});
	var panel = $this.next();


	// inverse the boolean value
	bool = !bool;

	// Add the button inside the title so both the heading and button semantics are read
	$this.wrapInner('<button aria-expanded="' + bool +'" aria-controls="' + id + '">');
	var button = $this.children('button');

	// Toggle the state properties on click
	button.on('click', function() {
		var state = $(this).attr('aria-expanded') === 'false' ? true : false;
		$(this).attr('aria-expanded', state);
		panel.attr('aria-hidden', !state);
	});
});


