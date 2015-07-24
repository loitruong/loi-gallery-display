/* Gallery Display 1.0
 * http://loitruong.us/
 *
 * Copyright 2015 Loi Truong;
 * Licensed under the MIT license
 */
function loiGalleryDisplay($data){
		/*
			Gallery swapout
		 */
		/* initialize data start here */
		var gallery = [];
		var unSwapGallery = [];
		var rows;
		var columns;
		var numberShowingImage;
		var myInterval;
		var itemCoverWidth, itemCoverHeight;
		var animateOption = "fade";
		var nextButton = ">";
		var prevButton = "<";
		var preloadersvg = '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" x="0" y="0" viewBox="0 0 500 500" xml:space="preserve" enable-background="new 0 0 500 500"><path d="M250 0c14 0 24 10 24 24v94c0 14-10 25-24 25s-25-11-25-25V24C225 10 236 0 250 0z" fill="#010002"/><path d="M137 53l55 76c12 16 0 39-20 39 -8 0-14-3-19-10L98 82c-8-11-6-26 5-34S129 42 137 53z" fill="#010002"/><path d="M28 204c-13-4-20-18-16-31s18-20 31-16l89 29c13 4 20 18 16 31 -3 10-14 17-24 17 -3 0-4-1-7-2L28 204z" fill="#010002"/><path d="M148 283c4 13-3 27-16 31l-89 29c-3 1-5 1-8 1 -10 0-20-7-23-17 -4-13 3-27 16-31l89-29C130 263 144 270 148 283z" fill="#010002"/><path d="M187 337c11 8 13 23 5 34l-55 76c-5 7-12 10-20 10 -20 0-31-23-19-39l55-76C161 331 176 329 187 337z" fill="#010002"/><path d="M250 357c14 0 24 11 24 25v93c0 14-10 25-24 25s-25-11-25-25v-93C225 368 236 357 250 357z" fill="#010002"/><path d="M347 342l55 76c12 16 0 39-20 39 -8 0-14-3-19-10l-55-76c-8-11-6-26 5-34S339 331 347 342z" fill="#010002"/><path d="M472 296c13 4 20 18 16 31 -3 10-14 17-24 17 -3 0-4 0-7-1l-89-29c-13-4-20-18-16-31s18-20 31-16L472 296z" fill="#010002"/><path d="M352 217c-4-13 3-27 16-31l89-29c13-4 27 3 31 16s-3 27-16 31l-89 28c-3 1-5 2-8 2C365 234 355 227 352 217z" fill="#010002"/><path d="M327 168c-20 0-31-23-19-39l55-76c8-11 23-13 34-5s13 23 5 34l-55 76C342 165 335 168 327 168z" fill="#010002"/></svg>';
		if ($data['nextButton'] != null || $data['nextButton'] != undefined) {
			nextButton = $data['nextButton'];
		};
		if ($data['prevButton'] != null || $data['prevButton'] != undefined) {
			prevButton = $data['prevButton'];
		};
		$("#loiGalleryDisplay").append("<div class='loiModal'><div class='content'><div class='next'>"+ nextButton +"</div><div class='prev'>"+ prevButton +"</div><div class='header-cover'><div class='header'><div class='title'></div><div class='close'>X Close</div></div></div></div><div class='layoutbackground'></div><div class='preloader'>"+ preloadersvg +"</div></div>");
		if($data['responsive'] != null || $data['responsive'] != undefined){
			responsive();
		}else {
			rows = parseInt($data['displayRows']);
			columns = parseInt($data['displayColumns']);
			numberShowingImage = rows * columns;
		}
		/* end of initialize data */
		/* start loading gallery */
		//$("#loiGalleryDisplay .item").load(function(){
			starting();
		//});
		$(window).resize(function(){
			if($data['responsive'] != null || $data['responsive'] != undefined){
				responsive();
			}else {
				rows = parseInt($data['displayRows']);
				columns = parseInt($data['displayColumns']);
				numberShowingImage = rows * columns;
			}
			starting();
		});
		function starting(){
			itemCoverWidth = 100/columns + "%";
			itemCoverHeight = $(window).width()/columns;
			clearInterval(myInterval);
			//initial item cover
			$("#loiGalleryDisplay .item-cover").css({
				"width" : itemCoverWidth,
				"height" : itemCoverHeight,
				"float" : "left",
				"overflow" : "hidden",
				"display" : "inline-block"
			});

			$("#loiGalleryDisplay .item").each(function(index){
				var imagesrc = $(this).attr("data-imagesrc");
				var title = $(this).attr("data-title");
				gallery.push(this);
				unSwapGallery.push({
					"imagesrc" : imagesrc,
					"title"    : title
				});
				if($(this).css("background-image") == "none"){
					var backgroundImage = "url('" + $(this).find("img").attr("src") + "')";
					$(this).css("background-image", backgroundImage);
					$(this).empty();
				};
				$(this).attr("data-currentIndex", index);
				//initial each item
				$($(this)).css({
					"width" : "100%",
					"height" : "100%",
					"background-repeat" : "no-repeat",
					"background-position" : "center",
					"background-size" : "cover",
					"cursor"	: "pointer",
					"display"	: "inline-block",
					"opacity"	: 1
				});
				if(index >= numberShowingImage){
					$(this).parent(".item-cover").hide();
				}
				if(index == $("#loiGalleryDisplay .item").length -1 ){
					$("#loiGalleryDisplay .galleryPreloader").remove();
					myInterval = setInterval(swapImage, 5000);
				}
			});
		}
		function responsive(){
			var sorted = $data['responsive'];
			sorted.sort(function(a, b){
			 return a.breakpoint-b.breakpoint
			});
			var found;
			for(var i =  0; i < sorted.length ; i++){
				if($(window).width() + 15 < sorted[i].breakpoint){
					found = i;
					break;
				}
			}
			if(found == undefined){
				rows = parseInt($data['displayRows']);
				columns = parseInt($data['displayColumns']);
				numberShowingImage = rows * columns;
			}else{
				rows = parseInt(sorted[found].settings.displayRows);
				columns = parseInt(sorted[found].settings.displayColumns);
				numberShowingImage = rows * columns;
			}
		}
		function swapImage(){
			var num1 = getRandomInt(0,numberShowingImage-1);
			var num2 = getRandomInt(numberShowingImage,$("#loiGalleryDisplay .item").length -1);
			if(animateOption == "fade"){
				$(gallery[num1]).animate({
				    opacity: 0,
				}, 1000, function() {
					for(var i = 0; i < gallery[num1].attributes.length; i++){
						var nodeName = gallery[num1].attributes[i].nodeName;
						if(nodeName != "class"){
							var a = gallery[num1].attributes[i].nodeValue;
							var b = gallery[num2].attributes[i].nodeValue;
							$(gallery[num1]).attr(nodeName , b);
							$(gallery[num2]).attr(nodeName , a);
						}
					}
					$(gallery[num1]).css("opacity", 0);
				}).animate({
				    opacity: 1,
				}, 1000, function() {
					$(this).css("opacity", 1);
				});
			}
		}
		function getRandomInt(min, max) {
		    return Math.floor(Math.random() * (max - min + 1)) + min;
		}
		/*
			Gallery Modal
		*/
		//==== open gallery event
		$("#loiGalleryDisplay .item-cover").on("click", function(){
			var imagesrc = $(this).find(".item").attr("data-imagesrc");
			var title = $(this).find(".item").attr("data-title");
			var grabIndex = $(this).find(".item").attr("data-currentIndex");
			displayModalImage(imagesrc, title, grabIndex);
		});
		$("#loiGalleryDisplay .loiModal .layoutbackground, #loiGalleryDisplay .loiModal .close ").on("click", function(){
			$("#loiGalleryDisplay .loiModal").fadeOut(500);
		});
		$("#loiGalleryDisplay .loiModal .next, #loiGalleryDisplay .loiModal .prev").on("click", function(){
			var grabIndex = $(this).parent(".content").attr("data-currentIndex");
			if($(this).hasClass("next")){
				if (unSwapGallery.length -1 == $(this).parent(".content").attr("data-currentIndex")){
					grabIndex = 0;
				}else{
					grabIndex++;
				}
			}else{
				if (grabIndex == 0){
					grabIndex = unSwapGallery.length -1;
				}else{
					grabIndex--;
				}
			}
			var imagesrc = unSwapGallery[grabIndex].imagesrc;
			var title = unSwapGallery[grabIndex].title;
			displayModalImage(imagesrc, title, grabIndex);
		});
		function displayModalImage($imgsrc, $title, $grabIndex){
			$("#loiGalleryDisplay .loiModal .preloader").css("display", "block");
			$("#loiGalleryDisplay .loiModal .header-cover, #loiGalleryDisplay .loiModal .next, #loiGalleryDisplay .loiModal .prev").css("display", "none");
			$("#loiGalleryDisplay .loiModal .content").find("img").remove();
			$("#loiGalleryDisplay .loiModal .content").attr("data-currentIndex", $grabIndex);
			$("#loiGalleryDisplay .loiModal .content").append("<img src='" + $imgsrc + "'>");
			$("#loiGalleryDisplay .loiModal .title").text($title);
			$("#loiGalleryDisplay .loiModal").fadeIn(500);
			$("#loiGalleryDisplay .loiModal .content img").on("load",function(){
				$("#loiGalleryDisplay .loiModal .preloader").css("display", "none");
				$("#loiGalleryDisplay .loiModal .header-cover, #loiGalleryDisplay .loiModal .next, #loiGalleryDisplay .loiModal .prev").css("display", "block");
				$("#loiGalleryDisplay .loiModal .content img").fadeIn(500);
				$("#loiGalleryDisplay .loiModal .title").css("width", responseImageWidth($("#loiGalleryDisplay .loiModal .content img")));
			});
		}
		function responseImageWidth($image){
			var ratio = $image.width() / $image.height();
			if($image.height()+ 50 > $(window).height()){
				$image.css("width", ratio*($(window).height()-50));
				return ratio*($(window).height()-50);
			}else{
				return $image.width();
			}
		}

};