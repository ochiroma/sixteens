$(function() {

  // TEMP - For UR testing
  // Fix to trim numbers from server side generated basket.
  // Remove when filter api is adjusted.
  $('.filter-selection ul li span.col').each(function(){
    var text = $(this).text();
    if(!isNaN(+text.charAt(0))){
      text = / (.+)/.exec(text)[1];
      $(this).text(text);
    }
  });
  // END - TEMP fix.

  // Selectors
  var checkBox = $('.checkbox__input'),
      addAll = $('input.add-all'),
      removeList = $('.remove-list'),
      addRange = $('.add-range'),
      removeAllRange = $('.remove-all-range'),
      addAllRange = $('input.add-all-range'),
      filterSelectList = $('.filter-selection ul'),
      filterHeader = $('.filter-selection__header'),
      el, id, label, filterSelectItem, removeOne, removeAll, removeAllLink;

  // url
  var urlToPost = $('#filter-form').attr('action'),
      url = window.location.pathname;

  $(document).on('click', '.js-filter', function(){
    el = $(this);
    removeAll = $('.remove-all');
    removeOne = $('.remove-link');

    // Case - Individual checkbox is clicked
    if(el.is(checkBox)){
      // Get the id and label for the addToFilter function
      id = el.attr('name'), label = el.next('label').text();
      // Check the state and amend urlToPost
      if(el.prop('checked')) {
        el.addClass('checked');
        // Run the addToFilter function and pass through the clicked element
        addToFilter(el);
      } else {
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
    if(el.is(removeAll) || el.is(removeAllRange) || el.is(removeOne) || el.is(removeList)) {
      removeFilter(el);
    }

    // Run the postForm function with the appropriate url
    //If we are adding ranges (time select) get the range response
    if(el.is(addRange) || el.is(addAllRange)){
      postRanges(urlToPost, getRanges);
    } else {
      postForm(urlToPost);
    }

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
          '<a class="remove-all js-filter" href="' + urlToPost +
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
      urlToPost = url + '/remove/' + id;
      if(!addRange.length){
        $('.checkbox__input[name="'+id+'"]').prop('checked', false)
        .removeClass('checked');
      }

    // Case - If remove all link clicked
    } else if (el.is(removeAll) || el.is(removeAllRange)){
        urlToPost = url + '/remove-all';
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
       data: $("#filter-form").serialize(),
       error: function(){
         console.log('Post error');
       }
     });
   }

  // Ajax call to the server to get the available ranges (time select)
  function getRanges(){
    if(el.is(addRange)){
      urlToGet = url + '/options.json';
    }
    if(el.is(addAllRange)){
      urlToGet = url + '/all-options.json';
    }

    $.ajax({
       type: "GET",
       url: urlToGet,
       dataType: 'json',
       success: function(data){

         // Loop through the array and add to filter
         function getData(callback){
           $.each(data, function(index, element) {
             id = element.id;
             label = element.label;
             addToFilter();
             callback();
           });
         }

         getData(removeDups);

         function removeDups() {
            var listData = {};
            $('.remove-link').each(function() {
                var listID = $(this).find('a').attr('id');
                if (listData[listID] == true){
                    $(this).parents('li').remove();
                } else {
                    listData[listID] = true;
                }

            });
          }

         if(el.is(addAllRange)){
           urlToPost = url + '/add-all';
           postForm(urlToPost);
           // For UAT - Store the number of values in the response & add to el
           var respLen = data.length;
           el.attr('data-test-range', respLen);
         }

       },
       error: function(){
         console.log('Get error:' + urlToGet);
       }
     });
   }

   // Ajax Post the form in the background to update job with status
   function postRanges(urlToPost, callback){
     $.ajax({
        type: "POST",
        url: urlToPost,
        data: $("#filter-form").serialize(),
        success: function(data){
          callback();
        },
        error: function(){
          console.log('Post error');
        }
      });
    }
 });
