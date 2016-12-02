$(document).ready(function() {

console.log('linked');


//pull independent api
var getApi = function(){
$.get('/article', function(news) {
     }).done(function(news){
      getData(news);
     });
}()

//pull data from independent article
var getData = function(news) {
  var title = news.title;
  var image = news.urlToImage;
  var link = news.url;
  var description = news.description;
  appendData(title, image, link, description)
}

//append stuff to page
$('#ind-left').append("<img class='ind' src='img/Independent_logo.png'>");

var appendData = function(title, image, link, description){
  $('#ind-head').append(title);
  $('#ind-desc').append(description);
  $('#ind-img').attr('src', image);
  $('#ind-link').attr('href', link);
}


//pull buzzfeed api
var getBuzz = function(){
  $.get('/buzzfeed', function(buzz) {
  }).done(function(buzz){
      getDataBuzz(buzz)
  })
}()

//pull data from buzzfeed
var getDataBuzz = function(buzz) {
  var title = buzz.title;
  var image = buzz.urlToImage;
  var link = buzz.url;
  var description = buzz.description;
  appendDataB(title, image, link, description)
}

//append buzzfeed to page
$('#buzz-left').append("<img class='buzz' src='img/buzzfeed.svg'>");

var appendDataB = function(title, image, link, description){
  $('#buzz-head').append(title);
  $('#buzz-desc').append(description);
  $('#buzz-img').attr('src', image);
  $('#buzz-link').attr('href', link);
}

//pull nymag api
var getN = function(){
  $.get('/nymag', function(nymag) {
  }).done(function(nymag){
      getDataN(nymag)
  })
}()

//pull data from nymag
var getDataN = function(nymag) {
  var title = nymag.title;
  var image = nymag.urlToImage;
  var link = nymag.url;
  var description = nymag.description;
  appendDataN(title, image, link, description)
}

//append nymagto page
$('#ny-left').append("<img class='nymag' src='img/ny_logo.png'>");

var appendDataN = function(title, image, link, description){
  $('#ny-head').append(title);
  $('#ny-desc').append(description);
  $('#ny-img').attr('src', image);
  $('#ny-link').attr('href', link);
}


var events = function(){
$('.ind').click(function(){
        $('#ind-media').slideToggle('slow');
    });
$('.buzz').click(function(){
        $('#buzz-media').slideToggle('slow');
    });
$('.nymag').click(function(){
        $('#ny-media').slideToggle('slow');
    });
}()


});
