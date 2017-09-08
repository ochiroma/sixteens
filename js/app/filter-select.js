$(function() {

  // Selectors
  var checkBox = $('.checkbox__input'),
      addAll = $('input.add-all'),
      removeList = $('.remove-list'),
      filterSelectList = $('.filter-selection ul'),
      filterHeader = $('.filter-selection__header'),
      // Config
      url = window.location.pathname,
      urlToPost = url + '/update',
      el, id, label, filterSelectItem, removeOne, removeAll, removeAllLink;

  $(document).on('click', '.js-filter', function(){

    el = $(this);
    // These are appended to the DOM as need to bind on the click event
    removeAll = $('.remove-all');
    removeOne = $('.remove-link');

    // Case - Individual checkbox is clicked
    if(el.is(checkBox)){
      // Get the id and label for the addToFilter function
      id = el.attr('name'), label = el.next('label').text();
      // Check the state and amend urlToPost
      if(el.prop('checked')) {
        urlToPost =  url + '/update';
        el.addClass('checked');
        // Run the addToFilter function and pass through the clicked element
        addToFilter(el);
      } else {
        urlToPost =  url + '/remove/' + id;
        el.removeClass('checked');
        // Run the removeFilter function and pass through the clicked element
        removeFilter(el);
      }
    }

    // Case - Add all link is clicked
    if(el.is(addAll)) {
      // Check all check boxes
      checkBox.prop('checked', true);
      // It adds in reverse order so correct when looping through
      $(checkBox.get().reverse()).each(function(i, el){
        el = $(this), id = el.attr('name'), label = el.next('label').text();
        // Run the addToFilter function for each of the elements required
        if (!el.hasClass('checked')) { // Avoid creating duplicates
          addToFilter(el);
          el.addClass('checked');
        }
      });
    }

    // Case - Remove link is clicked
    if(el.is(removeAll) || el.is(removeOne) || el.is(removeList)) {
      removeFilter(el);
    }

    // Run the postForm function with the appropriate url
    postForm(urlToPost);

    // Checkboxes need to return true to select/deselect
    if(!el.is(checkBox)) {
      return false;
    }

  });

  // Add the selected item/s to the filter selection block (cart)
  function addToFilter(el) {
      // Build list element
      filterSelectItem =
          '<li><span class="col col--md-6 col--lg-12">' + label +
          '</span><span class="remove-link js-filter">' +
          '<a href="' + url + '/remove/' + id + '" id="' + id + '">Remove</a></li>';
      // Build remove all link
      removeAllLink =
          '<a class="remove-all js-filter" href="' + url +
          '/remove-all">Remove all</a>'
      // Append elements
      filterSelectList.prepend(filterSelectItem);
      if($('.remove-all').length == 0){ // Append only once
        filterHeader.prepend(removeAllLink);
      }
      // Calculate count
      countFilters();
  }

  // Remove selected filters from filter selection block (cart)
  function removeFilter(el){
    // Case - if checkbox is clicked
    if(el.is(checkBox)){
      filterSelectList.find('a#'+id).parents('li').remove();
      el.removeClass('checked');

    // Case - if single remove linked clicked
    } else if (el.is(removeOne)) {
      id = el.find('a').attr('id');
      el.parents('li').remove();
      $('.checkbox__input[name="'+id+'"]').prop('checked', false)
      .removeClass('checked');

    // Case - If remove all link clicked
    } else if (el.is(removeAll)){
      $('.checkbox__input').removeClass('checked').prop('checked', false);
      filterSelectList.empty();

    // Case - If remove all from list clicked
    } else if (el.is(removeList)){
      $('.checkbox__input').removeClass('checked').prop('checked', false);
      checkBox.each(function(){
        id = $(this).attr('name');
        filterSelectList.children('li').each(function(){
          $(this).find('a#'+id).parents('li').remove();
        });
      });
    }

    // Remove the remove all link if there is no contents
    if(filterSelectList.children('li').length === 0) {
      removeAll.remove();
    }

    // Calculate count
    countFilters();
  }

  // Count the selected filters and update the count shown
  function countFilters() {
    var countChildren = filterSelectList.children().length;
    $('span', filterHeader).text(countChildren);
  }

  // Ajax Post the form in the background to update job with status
  function postForm(urlToPost){
    $.ajax({
       type: "POST",
       url: urlToPost,
       data: $("#hierarchy-form").serialize(),
       error: function(){
         console.log('error');
       }
     });
   }

 });
