//= require jquery
//= require vide/dist/jquery.vide.min.js
//= require fancybox/source/jquery.fancybox.pack.js

var playVideo, progressHandler, video;

$(document).ready(function () {

  $('body').addClass('loaded');
  $('.fancybox').fancybox();

  if ($(".imagem").length) {
    video = $(".imagem").data("vide").getVideoObject();
    progressHandler = function(e) {
      var percent;
      if (video.duration) {
        percent = parseInt(video.buffered.end(0) / video.duration * 100);
        console.log("Loading video: " + percent + "%");
        if (percent >= 100) {
          console.log("Video loaded!");
        }
        video.currentTime++;
      }
    };
    playVideo = function(e) {
      $('body').addClass('loaded');
      setTimeout(function() {
        return video && video.play();
      }, 1000);
    };
    video.addEventListener("progress", progressHandler, false);
    video.addEventListener("canplaythrough", playVideo, false);
  }

  $('.header a').click(function(e) {
    var href = this.href;
    var body = $('html, body');
    e.preventDefault();

    if(href != window.location) {
      $('body').addClass('unloading').removeClass('loaded');
      setTimeout(function() {
        window.location = href;
      }, 1000);
    }
  });
});
