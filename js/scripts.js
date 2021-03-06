//Statistics
// let statistics = document.querySelectorAll('.statistics .value > span');
// document.addEventListener('DOMContentLoaded', function() {
//     statistics.forEach(function(element) {
//         let start = +(element.dataset.start);
//         console.log(start)
//         let end = +(element.dataset.end);
//         console.log(end)
//         counter(element, start, end);
//     })
// })
//
// function counter(element, start, end) {
//     let current = start;
//     let range = end - start;
//     let increment = end > start ? 1 : -1;
//     let stepTime = Math.abs(Math.floor(2000 / range));
//     let timer = setInterval(function() {
//         current += increment;
//         element.innerHTML = current;
//         if (current == end) {
//             clearInterval(timer);
//         }
//     }, stepTime)
// }

//Search Filter
$(document).ready(function(){

    //Update Total
    var total = $('div').find('[data-search]').children('.item').length;
    $('.count span').text(total);

    //Update on Keypress
    $('#search-filter').keyup(function(){
        var filter = $(this).val(), count = 0;
        var content = $('[data-search]').children('.item');
        $(content).each(function(){
            var searchable = $(this).find('.name').text();
            if (searchable.search(new RegExp(filter, "i")) < 0) {
                $(this).fadeOut();

            } else {
                $(this).fadeIn();
                count++;
            }
        });

        //Update Count
        $('.count span').text(count);

        //No Results
        if (count <= 0) {$('.noresults').fadeIn();}
        else{$('.noresults').fadeOut();}
    });
});

//Fixed Header
const nav = document.querySelector('.headerWrap');
const navOffset = nav.offsetTop;
const navHeight = nav.clientHeight;
console.log(navOffset)
console.log(navHeight)

function fixedNav () {
    if (window.scrollY >= navOffset + navHeight / 2) {
        //document.body.style.paddingTop = nav.offsetHeight+'px';
        document.body.classList.add('fixed-nav');
    } else {
        //document.body.style.paddingTop = 0;
        document.body.classList.remove('fixed-nav');
    }
}

window.addEventListener('scroll', fixedNav);

// Links return false
$('a:not(.force), button:not(.force), input[type="submit"]:not(.force)').click(function() {
    return false
})

//Search
const searcher = document.getElementById('searcher');
const search = document.getElementById('search');
const searchContainer = document.querySelector('.search_wrap');

searcher.addEventListener('click', function() {
    if (searcher.classList.contains('active')) {
        searcher.classList.remove('active');
        searchContainer.classList.remove('active');
    } else {
        searcher.classList.add('active');
        searchContainer.classList.add('active');
        search.focus();
    }
})

//Scroll to Top
$('body').append('<a href="" onclick="event.preventDefault()" class="event_track" data-cat="Extra" data-label="Back To Top"><i aria-hidden="true" class="far fa-arrow-alt-circle-up scrollToTop" title="Scroll Up"></i></a>');
$(window).scroll(function(){
	if ($(this).scrollTop() > 100) {
		$('.scrollToTop').fadeIn(100);
	} else {
		$('.scrollToTop').fadeOut(100);
	}
});
$('.scrollToTop').click(function(){
	$('html, body').animate({scrollTop : 0},800);
});

//Responsive iFrame
$('iframe[src*="youtube"]').wrap('<div class="responsiveIframe"/>');

//Nav
    //$( ".nav > .drop_trigger, .mobile_nav > .drop_trigger" ).each(function(){$( this ).children('a:first').attr( "onclick", "return false" );});

    $('.nav .drop_menu').each(function() {
       if ($(this).find(".item").length >= 8) {
           $(this).addClass('column_nav');
       }
    });

	$('.navicon').click(function() {
	    if($('.mobile_nav').is(':visible')){
    	    $('.mobile_nav').fadeOut(100).attr('aria-hidden', 'true').attr('aria-expanded', 'false');
    		$('body,html').css({'overflow':'auto','height':'auto'});
    		$('.headerWrap').css({'position':'relative','z-index':'0'});
    		$('.navicon').find('i').attr( "class", "fal fa-bars");
    		$('button.navicon').attr( "aria-label", "Open Mobile Menu");
	    }else{
	        $('.mobile_nav').fadeIn(400).attr('aria-hidden', 'false').attr('aria-expanded', 'true');
	        $('body,html').css({'overflow':'hidden','height':'0'});
	        $('.headerWrap').css({'position':'fixed','z-index':'9999'});
	        $('.navicon').find('i').attr( "class", "fal fa-times");
	        $('button.navicon').attr( "aria-label", "Close Mobile Menu");
	    }
	});

	//$('.mobile_nav .exit').click(function() {
		//$('.mobile_nav').hide().attr('aria-hidden', 'true');
		//$('.mobile_screen').attr('aria-hidden','true').hide();
		//$("body").css({'overflow':'auto','height':'auto'});
	//});

	var hoverTimeout;
    $('.nav .drop_trigger').hover(function() {
        clearTimeout(hoverTimeout);
        $(this).addClass('open').find('.drop_menu').attr('aria-hidden', 'true').attr('aria-expanded', 'false');
        $('.drop_trigger').not(this).removeClass("open");
    }, function() {
        var $self=$(this);
        hoverTimeout = setTimeout(function() {
            $self.removeClass('open').find('.drop_menu').attr('aria-hidden', 'true').attr('aria-expanded', 'false');
        }, 250);
    });

    $('.nav .drop_trigger > a').focusin(function() {
        var parent = $(this).parent();
        parent.addClass('open').find('.drop_menu').attr('aria-hidden','false').attr('aria-expanded', 'true');
        $('.drop_trigger').not(parent).removeClass("open");
    });

    $('.nav .drop_menu a:last,.nav .drop_menu input').focusout(function() {
        var parent = $(this).parents().find('.drop_trigger');
        parent.removeClass('open').find('.drop_menu').attr('aria-hidden','true').attr('aria-expanded', 'false');
    });

    $('.mobile_nav > .drop_trigger > *').click(function(){
        var parent = $(this).closest('.drop_trigger');
        var icon = parent.find('.drop_trigger_icon');
        var aonclick = parent.find('a:first').is('[onclick]');
        if($(this).is('a')){
            if(aonclick === true){
            	$('.drop_trigger').not(parent).removeClass("open").find('i').attr( "class", "fal fa-plus");
            	parent.toggleClass("open");
                if(parent.hasClass('open')){
                    $(icon).find('i').attr( "class", "fal fa-minus");
                }else{
                    $(icon).find('i').attr( "class", "fal fa-plus");
                }
            }
        }
        if($(this).hasClass('drop_trigger_icon')){
            parent.toggleClass("open");
    		$('.mobile_nav > .drop_trigger').not(parent).removeClass("open").find('i').attr( "class", "fal fa-plus");
            if(parent.hasClass('open')){
                $(icon).find('i').attr( "class", "fal fa-minus");
                $('.open > .drop_menu').attr('aria-hidden','false');
            }else{
                $(icon).find('i').attr( "class", "fal fa-plus");
                $('.drop_menu').attr('aria-hidden','true');
            }
        }
    });

	$('button.mobile_closer').click(function(){
	    $('.mobile_nav').fadeOut(100).attr('aria-hidden', 'true').attr('aria-expanded', 'false');
		$('body,html').css({'overflow':'auto','height':'auto'});
		$('.headerWrap').css({'position':'relative','z-index':'0'});
		$('.navicon').find('i').attr( "class", "fal fa-bars");
		$('button.navicon').attr( "aria-label", "Open Mobile Menu");
	});

//Slideshow
$('.slideshow').slick({
  autoplay: true,
  autoplaySpeed: 5000,
  dots: true,
  infinite: true,
  fade: true,
  speed: 300,
  slidesToShow: 1,
  slidesToScroll: 1,
  prevArrow:'<button class="prev" title="Previous Slide"><i class="fal fa-chevron-left"></i></button>',
  nextArrow:'<button class="next" title="Next Slide"><i class="fal fa-chevron-right"></i></button>'
});

$(window).on('load resize orientationchange', function() {
    $('.mobile_slider').each(function(){
    var $carousel = $(this);
        if ($(window).width() > 600) {
            if ($carousel.hasClass('slick-initialized')) {
                $carousel.slick('unslick');
            }
        }
        else{
            if (!$carousel.hasClass('slick-initialized')) {
                $carousel.slick({
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    mobileFirst: true,
                    prevArrow:'<button class="slide_nav prev" title="Previous Slide"><i class="fal fa-chevron-left"></i></button>',
                    nextArrow:'<button class="slide_nav next" title="Next Slide"><i class="fal fa-chevron-right"></i></button>'
                });
            }
        }
    });
});

$('.slide').each(function(){
    $(this).removeAttr("aria-describedby");
});
