$.fn.preload = function() {
    this.each(function(){
        $('<img>')[0].src = this;
    });
}
$(document).ready(function() {
	$('.introduction .select > li > span').bind('click', function() {
		$(this).toggleClass('active');
		$(this).parent().children('ul').slideToggle(0);
	});
	$('.introduction [data-option]').bind('click', function() {
		$('.introduction .select > li > span').empty().text($(this).text()).removeClass('active');
		$('.introduction .select > li > ul').hide();
		$('.introduction .bg1, .introduction .bg2').stop(true,true).fadeOut(200);
		$(this).parent().addClass('active').siblings().removeClass('active');
		$('.introduction .bg'+$(this).attr('data-option')).stop(true,true).fadeIn(200);
		$('.introduction .list .honey h5').empty().text($(this).attr('data-honey'));
		$('.introduction .list .honey p span').empty().text($(this).attr('data-honey-prefix'));
		$('.introduction .list .tea h5').empty().text($(this).attr('data-tea'));
		$('.introduction .list .tea p span').empty().text($(this).attr('data-tea-prefix'));
		$('.introduction .list .periodicity h5').empty().text($(this).attr('data-periodicity'));
		$('.introduction .list .periodicity p span').empty().text($(this).attr('data-periodicity-prefix'));
	}).filter(':first').click();
	$('html').click(function() {
		$('.introduction .select > li > ul, .statistics .drop').hide();
	});
	$('.introduction .select > li > ul, .introduction .select > li > span, .statistics .drop, .statistics h5 em').click(function(event){
		event.stopPropagation();
	});
	$('.statistics h5 em').bind('click', function() {
		$(this).toggleClass('active');
		var t = $(this);
		$('.statistics .drop').css({
			'left': $(this).position().left+$(this).outerWidth()/2+'px',
			'top': $(this).position().top+'px'
		}).slideToggle(0);
	});
	$('.statistics [data-option]').bind('click', function() {
		$('.statistics h5 em').empty().text($(this).text()).removeClass('active');
		$('.statistics .drop').hide();
		$(this).parent().addClass('active').siblings().removeClass('active');
		$('.statistics h5 strong').empty().text($(this).attr('data-price'));
		$('.form div input[type="radio"][name="type"]').filter('[value="'+$(this).attr('data-option')+'"]').prop('checked', true);
		$('.form div input[type="radio"][name="type"]').parent().removeClass('checked');
		$('.form div input[type="radio"][name="type"]').filter('[value="'+$(this).attr('data-option')+'"]').parent().addClass('checked');
	}).filter(':first').click();
	$('.form div input[type="text"], .form div select').change(function() {
		if ( $(this).val().length > 0 ) {
			$(this).addClass('valid');
		}
		else {
			$(this).removeClass('valid');
		}
	});
	$('input[type="radio"], input[type="checkbox"]').uniform();
	var clients = $('.clients ul li').size();
	for ( var i = 1; i <= clients; i++ ) {
		$(['./pic/client'+i+'_a.png']).preload();
	}
	$(['./img/bg2.png']).preload();
	$('.description .slider').slides({
		generatePagination: true,
		generateNextPrev: false,
		container: 'container',
		effect: 'slide',
		crossfade: true,
		slideSpeed: 500,
		play: 10000,
		pause: 2500
	});
	$('.sort .slider').slides({
		generatePagination: true,
		generateNextPrev: false,
		container: 'container',
		effect: 'slide',
		crossfade: true,
		slideSpeed: 500,
		play: 10000,
		pause: 2500
	});
	$('.reviews .slider').slides({
		generatePagination: true,
		generateNextPrev: false,
		container: 'container',
		effect: 'slide',
		crossfade: true,
		slideSpeed: 500,
		play: 10000,
		pause: 2500,
		autoHeight: true,
		start: $('.reviews .slider > div > div').size(),
		slidesLoaded: function() {
			$('.reviews .slider li:first-child a').trigger('click');
		}
	});
	$('.clients ul li a').hover(
		function() {
			$(this).find('img').attr('src', $(this).find('img').attr('src').substr(0, $(this).find('img').attr('src').indexOf('.png'))+'_a.png');
		},
		function() {
			$(this).find('img').attr('src', $(this).find('img').attr('src').substr(0, $(this).find('img').attr('src').indexOf('_a.png'))+'.png');
		}
	);
	$('.modal, .popup').append('<span class="close"></span>');
	$('[data-open]').bind('click', function() {
		var e = $('[data-target="'+$(this).attr('data-open')+'"]');
		var t = $(document).scrollTop()+($(window).height()-e.outerHeight())/2;
		if ( t < $(document).scrollTop()+44 ) {
			t = $(document).scrollTop()+44;
		}
		e.css({
			'top': t+'px'
		}).stop(true,true).fadeIn(200);
		$('.fade').stop(true,true).fadeIn(200);
	})
	$('.modal .close, .popup .close, .fade').bind('click', function() {
		$('.modal, .popup, .fade').stop(true,true).fadeOut(200);
	});
	$('.form div textarea').each(function() {
		$(this).parent().find('p').css({
			'top': '8px',
			'margin-top': '0'
		});
	});
	$('.popup .form div select').each(function() {
		$(this).parent().find('p').css({
			'margin-top': '-26px'
		});
	});
	$('.form input:required').keyup(function() {
		var empty = false;
        $(this).parents('.form').find('input:required').each(function() {
            if ($(this).val() == '') {
                empty = true;
            }
        });
        if (empty) {
            $(this).parents('.form').find('button').addClass('disabled');
            $(this).parents('.form').find('h6.tip').css({
				'display': 'none'
			});
        } else {
            $(this).parents('.form').find('button').removeClass('disabled');
            $(this).parents('.form').find('h6.tip').css({
				'display': 'inline-block'
			});
        }
    });
	/*$(window).bind('scroll', function() {
		if ( $(document).scrollTop() > 460 ) {
			$('.total').css({
				'display': 'block',
				'position': 'fixed',
				'top': '20px'
			});
		}
		else {
			$('.total').css({
				'position': 'absolute',
				'top': '480px'
			});
		}
	});*/
	$('input[type="radio"][data-price]').bind('click', function() {
		var p = $(this).attr('data-price');
		var d = $(this).parents('.form').find('input[type="radio"][data-duration]:checked').attr('data-duration');
		var t = eval(d*p);
		if ( d*p == 0 ) {
			$('.total').find('h4 strong').empty().text('бесплатно');
		}
		else {
			$('.total').find('h4 strong').empty().text(eval(d*p)+' руб.');
		}
	});
	$('input[type="radio"][data-duration]').bind('click', function() {
		var d = $(this).attr('data-duration');
		var p = $(this).parents('.form').find('input[type="radio"][data-price]:checked').attr('data-price');
		var t = eval(d*p);
		if ( d*p == 0 ) {
			$('.total').find('h4 strong').empty().text('бесплатно');
		}
		else {
			$('.total').find('h4 strong').empty().text(eval(d*p)+' руб.');
		}
	});
	$('.tariff li button').bind('click', function() {
		var form = $(this).parents('.tariff').next('.form');
		form.find('input[type="radio"][name="type"]').prop('false', true).parent().removeClass('checked');
		form.find('input[type="radio"][name="type"][value="'+$(this).attr('data-type')+'"]').prop('checked', true).parent().addClass('checked');
		form.find('input[type="radio"][name="duration"]').prop('false', true).parent().removeClass('checked');
		form.find('input[type="radio"][name="duration"][value="'+$(this).attr('data-duration')+'"]').prop('checked', true).parent().addClass('checked');
	});
	/*$('.portfolio > div h4 .total').text($('.portfolio > div .container > div').size());
	$('.portfolio > div').slides({
		generatePagination: true,
		generateNextPrev: true,
		container: 'container',
		effect: 'slide',
		slideSpeed: 500,
		play: 10000,
		pause: 2500,
		animationComplete: function() {
			$('.portfolio > div h4 .current').text(eval($('.portfolio > div .pagination li.current').index()+1));
		}
	});
	$('.reviews > div').slides({
		generatePagination: true,
		generateNextPrev: false,
		container: 'container',
		effect: 'slide',
		slideSpeed: 500,
		play: 10000,
		pause: 2500,
		autoHeight: true,
		start: $('.reviews > div > div > div').size(),
		slidesLoaded: function() {
			$('.reviews > div .pagination li:first-child a').trigger('click');
		}
	});
	$('.callback, .modal').append('<span class="close"></span>');
	$('input.phone').mask('+7 (000) 000-00-00', {placeholder: '+7 (___) ___-__-__'});
	$('.introduction .phone span').bind('click', function() {
		$('.callback').stop(true,true).fadeIn(250);
		return false;
	});
	$('.callback .close').bind('click', function() {
		$('.callback').stop(true,true).fadeOut(250);
		return false;
	});
	$('html').click(function() {
		$('.callback').stop(true,true).fadeOut(250);
	});
	$('.callback').click(function(event){
		event.stopPropagation();
	});
	$('[data-target]').bind('click', function() {
		var target = $(this).attr('data-target');
		var top = $(document).scrollTop()+($(window).height()-$('.modal[data-modal="'+target+'"]').outerHeight())/2;
		if ( top < 0 ) {
			top = 0;
		}
		$('.modal[data-modal="'+target+'"]').css({
			'top': top+'px'
		}).stop(true,true).fadeIn(250);
		$('.fade').stop(true,true).fadeIn(250);
		return false;
	});
	$('.modal .close, .fade').bind('click', function() {
		$('.modal, .fade').stop(true,true).fadeOut(250);
		return false;
	});
	$('.footer p a.popup').bind('click', function() {
        window.open($(this).attr('href'), '', 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes, width=640, height=480, left=0, top=0');
		return false;
	});
	$('.secrets ul li:nth-child(3n)').css({
		'margin-right': '-10px'
	});
	$('.modal input:required').keyup(function() {
		var empty = false;
        $(this).parents('.modal').find('input:required').each(function() {
            if ($(this).val() == '') {
                empty = true;
            }
        });
        if (empty) {
            $(this).parents('.modal').find('button').addClass('disabled');
        } else {
            $(this).parents('.modal').find('button').removeClass('disabled');
        }
    });*/
});