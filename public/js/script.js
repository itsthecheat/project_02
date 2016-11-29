$(document).ready(function() {

console.log('linked');

$.get( '/article', function(data) {
       $('.jumbotron').append(data.title);
       console.log(data)
     });







});
