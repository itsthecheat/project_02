$(document).ready(function() {

console.log('linked');

var getApi = function () {
  $('button').click(function(e) {
    var query = {search: $('.form-control').val()};
    $.get('/rijks', query, function(data) {
    }).done(function(data){
      $('.table').empty();
      appendData(data)
    });
  });
}()
// var $table = $('<tbody class="table"></tbody>');
//           $('#results').append($table)


var appendData = function(data){
// create a row for each art object found
  $.each(data.artObjects, function(index, object) {

      var $row = $('<tr class="clearfix">'+'<th>Image</th>'+'<th>Artist</th>'+'<th>Title</th>'+'</tr>'
      +'<tr class="clearfix" class="thumbnail"><td>'
      +'<img src='+object.webImage.url.replace('s0', 's128')+'>'
      +'</td><td class="child">'
      + object.principalOrFirstMaker
      +'</td><td class="child">'
      + object.title
      +'</td></tr>').appendTo('.table');

       $row.on("click", function() {
              document.location = object.links.web;
            });

      });
      }




});
