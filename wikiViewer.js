
$(document).ready(function() {
  $("#getResult").click(function() {
    // Clear the results div and array
    $('.results').empty();
    var resArr = [];
    var search = $("#search").val();
    $.ajax({
      type: 'GET',
      url: 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=' + search,
      dataType: 'jsonp',
      success: function(result) {
        resArr = result.query.pages;
        console.log(resArr);
        for (var result in resArr) {
          html = '<div id="articles" class="well"><a href="https://en.wikipedia.org/wiki/' + resArr[result].title + '"target="_blank"><h3>' + resArr[result].title + '</h3><p>' + resArr[result].extract + '</p></a></div>';
          // Display the elements to the page
          $('.results').append(html);
        }
      }
    });
  });

  // Start search when user presses enter or clicks on the search button
  $("#search").keypress(function(e) {
    if (e.which == 13) {
      $("#getResult").click();
    }
  });

  // Remove button outline upon click
  $('#getResult, #randomResult').click(function() {
    $(this).blur();
  });
});
