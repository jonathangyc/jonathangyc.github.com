$(document).ready(function(){

  var scrolled,
      lastST = 0,
      delta = 10,
      iHeight = $(".intro").outerHeight(),
      wWidth = $(window).width(),
      nHeight = $(".nav-sticky").height();

  // show stickynav on scroll up on wider screens
  function hasScrolled() {
    var st = $(this).scrollTop();
    // make sure the scroll event is larger than delta
    if (Math.abs(lastST - st) <= delta){
        return;
      }
    // if scrolling down or if above half the intro size
    // hide the sticky nav
    if (st > lastST || st < nHeight*2){
        $('.nav-sticky').css({ "top": -nHeight });
    } else {
        // else show the navigation on scroll up
        if($(window).width() > 500 && st + $(window).height() < $(document).height()) {
             $('.nav-sticky').css({ "top": 0 });
        }
    }
    // set last scroll top
    lastST = st;
  }

  // setup parallax effects for the latest projects if available
  $(".nomic").parallax({imageSrc: "/img/nomic.jpg"});
  $(".buildingconnected").parallax({imageSrc: "/img/buildingconnected.jpg"});
  $(".davidandmelanie").parallax({imageSrc: "/img/davidandmelanie.jpg"});
  $(".jonathanchen").parallax({imageSrc: "/img/jonathanchen.jpg"});
  $(".gsp").parallax({imageSrc: "/img/gsp.jpg"});
  $(".londonmetro").parallax({imageSrc: "/img/p-lmdp.jpg"});

  $("a.scrolldown").click( function(e){
    e.preventDefault();
    if($("nav").css("position") == "fixed"){ // if sticky nav then scroll past it
      $("html, body").stop().animate({ scrollTop: iHeight - nHeight }, 750);
    } else {
      $("html, body").stop().animate({ scrollTop: iHeight }, 750);
    }
    $(this).fadeOut();
  });

  // only run imgCover if elements exist
  if( $(".portfolio-list").length ){
    for(i=0; i < $(".portfolio-list img").length; i++){
      imgCoverEffect( $(".portfolio-list img")[i], {
        alignX: "center",
        alignY: "middle"
      })
    }
  }

  // listen for scroll events here
  $(window).scroll(function(event){
    scrolled = true;
  });

  // why are you resizing your window
  $(window).on("resize", function(event){
    // reset the height for the scroll value
    iHeight = $(".intro").outerHeight();
  })

  setInterval(function() {
    if (scrolled) {
        hasScrolled();
        scrolled = false;
    }
  }, 300);

});