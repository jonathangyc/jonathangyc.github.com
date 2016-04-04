$(document).ready(function(){

  // setup breakpoints for screen sizes;
  var breakMobile = 500,
      breakTablet = 768,
      breakDesktop = 1000;

  // setup for upscroll sticky nav
  var scrolled,
      lastST = 0,
      delta = 10,
      iHeight = $(".intro").outerHeight(),
      wWidth = $(window).width(),
      wHeight = $(window).height(),
      nHeight = $(".nav-sticky").height();

  // set up for showcases if .tidbits exists aka inside showcase
  if($(".tidbits").length){
    var wt = $(this).scrollTop(), // distance from top of windows
        cw = $(".tidbits .container").width(), // container width for resets
        co = [], // container offset from top
        ltp = parseFloat($(".tidbits").css("padding-top")), // default padding-top .tidbits
        // lt = [], // default .left offset from TOP // do i need this ?
        lh = [], // .left HEIGHT
        lw = [], // .left WIDTH
        ld = [], // .left DISTANCE
        th = [], // .tidbits HEIGHT
        to = [], // .tidbits OFFSET TOP
        sd = []; // screen DISTANCE

    for(i=0; i < $(".tidbits").length; i++){
      // get the values for each existing .tidbits and .left
      th[i] = $(".tidbits").eq(i).height();
      to[i] = $(".tidbits").eq(i).offset().top;
      co[i] = $(".tidbits .container").eq(i).offset().top - ltp;
      lh[i] = $(".left").eq(i).height();
      lw[i] = $(".left")[i].getBoundingClientRect().width;
      // set corresponsding limits and distance
      sd[i] = th[i] - lh[i];
      ld[i] = sd[i] + to[i];
    }
  }

  // why do people do this?
  function resetWindow(){
    iHeight = $(".intro").outerHeight(),
    wWidth = $(window).width(),
    wHeight = $(window).height();
    // check if .tidbits exist aka inside showcase
    if($(".tidbits").length){
      // reset the values for stickyInfo
      for(i=0; i < $(".tidbits").length; i++){
        // get the values for each existing .tidbits and .left
        co[i] = $(".tidbits .container").eq(i).offset().top - ltp;
        th[i] = $(".tidbits").eq(i).height();
        to[i] = $(".tidbits").eq(i).offset().top;
        lh[i] = $(".left").eq(i).height();
        lw[i] = $(".left")[i].getBoundingClientRect().width;
        // set corresponsding limits and distance
        sd[i] = th[i] - lh[i];
        ld[i] = sd[i] + to[i];
        // reset values for .tidbits .left and .right
        if(wWidth < breakTablet) {
          $(".left").eq(i).css({ "position": "relative", "top": 0, "width": "100%" })
          $(".right").eq(i).css({ "margin-left" : 0 });
        } else{
          if(wWidth >= breakTablet && wWidth < breakDesktop) {
            $(".left").eq(i).css({ "width": "35%" })
            $(".right").eq(i).css({ "margin-left" : 0 });
          }
          if(wWidth >= breakDesktop) {
            $(".left").eq(i).css({ "width": "30%" })
            $(".right").eq(i).css({ "margin-left" : 0 });
          }
        }
      }
    }
  }

  // let's stick that info .left
  function stickyInfo() {
    // only run stickyInfo is screen is wide and tall enough
    if(wWidth >= breakTablet){
      wt = $(this).scrollTop();
      cw = $(".container").width(); // container width for resets
      for(i=0; i < $(".tidbits").length; i++){
        $(".left").eq(i).css({ "width": cw*.35 }); // reset left width for screens larger than 768px
        if(wWidth >= breakDesktop){ // reset left width for screens larger than 1000px
          $(".left").eq(i).css({ "width": cw*.30 });
        }
        lw[i] = $(".left")[i].getBoundingClientRect().width;
        if(wt >= co[i] && wt <= ld[i]){
          $(".left").eq(i).css({ "position": "fixed", "top": ltp, "width": lw[i] });
          $(".right").eq(i).css({ "margin-left" : lw[i] });
        }
        else if(wt > ld[i]) {
          $(".left").eq(i).css({ "position": "relative", "top": sd[i] });
          $(".right").eq(i).css({ "margin-left" : 0 });
        }
        else {
          $(".left").eq(i).css({ "position": "relative", "top": 0 });
          $(".right").eq(i).css({ "margin-left" : 0 });
        }
      }
    }
  }

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
        $("nav").css({ "opacity": 1 });
        $('.nav-sticky').css({ "top": -nHeight });
    } 
    else {
        // else show the navigation on scroll up
        if(wWidth > breakMobile && st + $(window).height() < $(document).height()) {
          $("nav").css({ "opacity": 0 });
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
      $("html, body").stop().animate({ scrollTop: iHeight - 50 }, 750); // this is a little cheat because i know what the height is
    } else {
      $("html, body").stop().animate({ scrollTop: iHeight }, 750);
    }
    $(this).fadeOut();
  });

  // listen for scroll events here
  $(window).scroll(function(event){
    scrolled = true;
    if($(".tidbits").length){
      stickyInfo();
    }
  });

  // why are you resizing your window
  $(window).on("resize", function(event){
    // reset the window width, height values
    resetWindow();
    if($(".tidbits").length){
      stickyInfo();
    }
  })

  setInterval(function() {
    if (scrolled) {
        hasScrolled();
        scrolled = false;
    }
  }, 350);

  // initialize with conditions
  if($(".tidbits").length){
    stickyInfo();
  }
  // only run imgCover if elements exist
  if( $(".portfolio-list").length ){
    for(i=0; i < $(".portfolio-list img").length; i++){
      imgCoverEffect( $(".portfolio-list img")[i], {
        alignX: "center",
        alignY: "middle"
      })
    }
  }

});