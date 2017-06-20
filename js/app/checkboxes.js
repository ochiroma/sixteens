$(function() {
    var selectEl = $('.js--select-all-none').find('span'),
   		checkBoxGroup = $('.checkbox-group'),
   		checkBox = $('input', checkBoxGroup);

    selectEl.on('click', function(){
    	var el = $(this),
    		selectVal = el.attr('data-select'),
    		selectID = el.attr('ID'),
    		selectWrap = el.parent();

    	if(selectVal == 'true') {
    		if(selectID == 'select-all'){
    			selectWrap.next(checkBoxGroup).find('input').prop('checked', true);
    		}
    		if(selectID == 'select-none'){
    			selectWrap.next(checkBoxGroup).find('input').prop('checked', false);
    		}
    		checkCheckBoxes();
    	}
    });

    checkBox.on('click', function(){
		checkCheckBoxes();
    });

    function checkCheckBoxes(){
    	checkBoxGroup.each(function(){
    		var relatedSelector = $(this).prev(),
    			selectAll = relatedSelector.find('#select-all'),
    			selectNone = relatedSelector.find('#select-none');

	    	if ($('input:checked', this).length == $('input', this).length) {
				selectAll.attr('data-select', 'false');
				selectNone.attr('data-select', 'true');
			} else if ($('input:checked', this).length == 0) {
				selectNone.attr('data-select', 'false');
				selectAll.attr('data-select', 'true');
			} else {
				selectEl.attr('data-select', 'true');
			}
		});
	}
	checkCheckBoxes();
});
