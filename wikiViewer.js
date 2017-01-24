var html = '';

function search() {
  searchTerm = $('#s').val();
  $.ajax( {
    url: 'https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&srsearch=' + searchTerm,
    dataType: 'jsonp',
    type: 'POST',
    headers: { 'Api-User-Agent': 'trothaarwork -at- gmail -dot- com' },
    success: function(data) {

      // Clear the div of all previous search results
      $('.results').empty();

      // Then we also clear the array with the results before providing new information.
      //arrResults.length = 0;
      var resArr = data.query.search;

      //For each result, generate the html data for the results div.
      for (var result in resArr) {
        html = '<div id="articles" class="well"><a href="https://en.wikipedia.org/wiki/' + resArr[result].title + '"target="_blank"><h3>' + resArr[result].title + '</h3><p>' + resArr[result].snippet + '</p></a></div>';
        // Display the elements to the page
        $('.results').append(html);
      }
    }
  });

  // This will handle when to display results based on the search bar.
  if ($('#s').val().length > 0) {
    $('.articles').css('display', 'none');

  } else if ($('#s').val().length < 1) {
    // display everything again
    $('.articles').css('display', 'block');
  }

  // This make things tick with each key stroke
  $('#s').unbind('keyup');
  $('#s').keyup(function() {
    search();
  });
}

$('#s').click(function() {
  search();
});
