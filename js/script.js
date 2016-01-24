$(document).ready(function(){
	
	//remove preload after loading
	$("body").css({ "opacity" : 0 });
	$("body").animate({ "opacity" : 1}, 500);
	
	//global variables
	var $nav = $("nav ul");
	var navToggled = false;
	
	//assign variable for portfolio info
	if( $(".info").length ){
		var $info = $("header").height();
	}
	
	//for portfolio filtering and initial filter
	if( $("div#filter").length ){
		var $filterType = $("div#filter a.activeFilter").attr("href").substring(1);
		var $showcase = $("ul.showcase");
		var $data = $showcase.clone();
		var $filteredData = $data.find("li[data-type=" + $filterType + "]");
		$showcase.quicksand($filteredData, {
			duration: 0,
			attribute: function(v) {
				return $(v).find("a").attr("href");
			}	
		}, function(v){ //callback
			$showcase.css({ "height" : "auto" });
		});
	}
			
	function sizeControls(){
		var $size = $(".slides li").size() - 2;
		$size = 100 / $size + "%";
		$(".flex-control-nav li").width( $size );
		$("#flex-control-active").width( $size );
	}
	
	function moveControls(){
		if( $(".flex-control-nav").length ) {
			var $move = $(".flex-control-nav .active").offset();
			$("#flex-control-active").css({ "left" : $move.left });
		}
		if( $("div#filter").length ){
			var $distance = $("div#filter .activeFilter").position().left - parseFloat( $("div#filter").css("padding-left") );
			$("div#filter span").css({ "left" : $distance });
		}
	}
					
	function resizeBillboard(){
		var $winW = $(window).width();
		var $winH = $(window).height();
		var $navH = $("nav").height() + parseFloat( $("nav").css("border-top-width") );
		if( $winW <= 640 || ($winW > 640 && $winH < 972) ){
			$("div#billboard").height( 774 );	
		}
		else if( $winW > 640 && $winH > 972 && $winH < 1524 ){
			$("div#billboard").height( $winH - $navH );
		}
		else {
			$("div#billboard").height( 1524 );
		}
	}
	
	// User Interactions
	$(".nav-toggle").click(function(e){
		var $window = $(window).width();
		if( !navToggled ) {
			$("#switch").addClass("switchAnimated");
			$nav.addClass("openNav");
			navToggled = true;
		}
		else {
			$("#switch").removeClass("switchAnimated");
			$nav.removeClass("openNav");
			navToggled = false;
		}
		e.preventDefault();
	});
	
	// Slider Start						
	$(".flexslider").flexslider({
		animation : "slide",
		animationDuration: "750",
		slideshow : false
	});
	
	// Portfolio Filter
	$("div#filter a").click(function(e){
		$("div#filter a").removeClass("activeFilter");
		$(this).addClass("activeFilter");
		var $distance = $(this).position().left - parseFloat( $("div#filter").css("padding-left") );
		$("div#filter span").stop().animate({ "left" : $distance }, 500);
		var $filterType = $(this).attr("href").substring(1);
		var $filteredData = $data.find("li[data-type=" + $filterType + "]");
		$showcase.quicksand($filteredData, {
			adjustHeight: "dynamic",
			attribute: function(v) {
				return $(v).find("a").attr("href");
			}	
		}, function(v){ //callback
			$showcase.css({ "height" : "auto" });
		}
		);
		e.preventDefault();
	});
	
	// Portfolio info
	function infoPanel(){
		if( $(window).width() >= 768 ){
			var $infoD = $(document).scrollTop() - $info;
			if( $(document).scrollTop() > $info && ( ($infoD + $(".info").height() ) <= $(".screenshot").height() )){
				$(".top").css({ "top" : $(window).height() + $infoD - 102 });
				$(".info h2").css({ "height" : "auto" , "opacity" : 1 , "margin" : "0 0 18px" });
				$(".info").css({ "top" : $infoD	});
			}
			else if( $(document).scrollTop() > $info && ( ($infoD + $(".info").height() ) >= $(".screenshot").height() )) {
				$(".info").css({ "top" : $(".screenshot").height() - $(".info").height() });
			}
			else {
				$(".info h2").css({ "height" : 0 , "opacity" : 0 , "margin" : 0 });
				$(".info").css({ "top" : 0 });
			}
			if( parseFloat($(".top").css("top")) >= ( $(".screenshot").height() + 30 ) ) {
				$(".top").css({ "top" : $(".screenshot").height() + 30 });
			}
		}
		else {
			$(".info").css({ "top" : 0 });
		} 
	}

	//Form it up
	$("#sendmail").on("click",function(){
		$(".contact form").validate({
			rules: {
				name: "required",
				mail: {
					required: true,
					email: true
				},
				subject: "required",
				text: "required"
			},
			onkeyup: false,
			submitHandler: function(form) {
				$("#sendmail").val("Sending");
				$("#response").fadeIn();
				$.ajax({
					dataType: "jsonp",
					url: 			"https://getsimpleform.com/messages/ajax?form_api_token=d1a71d450d56576ef68e864c2307029f",
					data: 		$(".contact form").serialize() 
				}).done(function(){
					$("#sendmail").val("Success");
					$("#response").css({ "background-position" : "0 -131px" });
					setTimeout('$("#response").fadeOut()',1000);
					setTimeout('$("#sendmail").val("submit")', 1000);
					setTimeout('$("#response").css({ "background-position" : "0 0" })', 1500);
				});
			}
		});	
	});
	
	// initialize
	sizeControls();
	resizeBillboard();
		 
  $(".top").click(function(e){
		$("html, body").animate({ scrollTop : 0 });
		e.preventDefault();
	});

	// insert year for the footer
	var thisYear = new Date().getFullYear();
	$(".year").html(thisYear);
			
	// Why you like to resize window sizes
	$(window).resize(function(){
		sizeControls();
		moveControls();
		resizeBillboard();
		if( $(".info").length ){
			$info = $("header").height();
		}
		infoPanel();
	});
	
	$(window).scroll(function(e){
		infoPanel();
		if( ($(this).width() >= 768) && ($(this).scrollTop() > $info) ) {
			$(".top").fadeIn();
		} else {
			$(".top").fadeOut();
		}
	});

});
