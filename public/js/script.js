$(document).ready(function() {

console.log('linked');

var getApi = function(){
$.get('/article', function(news) {
       console.log(news);
     }).done(function(news){
      getData(news);
     });
}()

var getData = function(news) {
  var title = news.title;
  var image = news.urlToImage;
  var link = news.url;
  var description = news.description;
  appendData(title, image, link, description)
}

var appendData = function(title, image, link, description){
  $('.media-heading').append(title);
  $('.description').append(description);
  $('.img-responsive').attr('src', image);
  $('.leave').attr('href', link);
}








});
