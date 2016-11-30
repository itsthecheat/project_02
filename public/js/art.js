$(document).ready(function() {

console.log('linked');

var getApi = function () {
  $('button').click(function(e) {
    var query = {search: $('.form-control').val()};
    $.get('/rijks', query, function(data) {
    $('.jumbotron').html(data);
    });
  });
}()







});
