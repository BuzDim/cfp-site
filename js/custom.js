$(document).ready(function(){
	//nav toggle
	$('.header').on('click', '.nav__show', function(){
		$('.navigation').toggleClass('nav-show');
	});
	$('.nav__link').click( function(){
		var scroll_el = $(this).attr('href');
		if ($(scroll_el).length != 0) {
			$('html, body').animate({ scrollTop: $(scroll_el).offset().top - 120 }, 1000);
		};
		$('.navigation').removeClass('nav-show');
		return false;
	});

	//Scroll To top
	$(window).scroll(function(){
		if ($(this).scrollTop() >= 125) {
			$('.navigation').addClass('nav-fixed');
		} else {
			$('.navigation').removeClass('nav-fixed');
		}
	});

	//fancybox
	$('.documents__link, .phone__btn, .nav__btn, .btn__order, .shema__btn, .questions__btn').fancybox({
		"showNavArrows": true,
		"showCloseButton": true,
		"overlayOpacity": 0,
		"margin": 30,
		"padding": 0
	});

	//quetions
	$('.questions').on('click', '.questions__ask', function(){
		$(this).toggleClass('questions_active');
		return false;
	});

	//slider
	$('#feedback__slider').bxSlider({
		minSlides: 1,
		maxSlides: 1,
		/*slideWidth: 730,*/
		pager: false,
		nextText: ' ',
		prevText: ' ',
		nextSelector: '#feedback__prev',
		prevSelector: '#feedback__next',
		moveSlides: 1,
	});

	//carousel
	if ($('.carousel').innerWidth() >= 990){
		var carouselBtn = $('.carousel__box-links').find('.carousel__link'),
			carouselBox = $('.carousel__box-main').find('.carousel__slide'),
			countCarousel = 0,
			lenghtCarousel = carouselBtn.length,
			timeBetween = 5000,
			timeCarousel = false;

		$(carouselBtn[0]).addClass('active');
		$(carouselBox[0]).find('.carousel__slide-desc').addClass('animated fadeIn');
		$(carouselBox[0]).find('.carousel__slide-text').addClass('animated fadeIn');
		$(carouselBox[0]).find('.carousel__box-img').addClass('animated zoomIn');

		timeCarousel = setTimeout(carousel, timeBetween);

		//push links carousel
		$('.carousel__box-links').on('click', '.carousel__link', function(){
			//отменяем двойной клик по одной кнопке
			if($(this).attr('disabled') == 'disabled' || $(this).hasClass('active')){
				return false;
			}else{
				$(this).attr('disabled', 'disabled');
			}
			
			countCarousel = $(this).index() - 1;
			clearTimeout(timeCarousel);
			//timeCarousel = false;
			carousel();
		});
	} 
	

	function carousel(){
		countCarousel++;
		console.log(countCarousel);


		//сбрасываем счетчик при макс номере
		if(countCarousel == lenghtCarousel) countCarousel = 0;

		$(carouselBox).find('.carousel__slide-desc').addClass('fadeOut').removeClass('fadeIn');
		$(carouselBox).find('.carousel__slide-text').addClass('fadeOut').removeClass('fadeIn');
		$(carouselBox).find('.carousel__box-img').addClass('fadeOut').removeClass('zoomIn');

		setTimeout(function(){
			$(carouselBtn).removeClass('active').removeAttr('disabled');
			$(carouselBtn[countCarousel]).addClass('active');

			$(carouselBox).find('.carousel__slide-desc').removeClass('animated fadeOut');
			$(carouselBox).find('.carousel__slide-text').removeClass('animated fadeOut');
			$(carouselBox).find('.carousel__box-img').removeClass('animated fadeOut');

			$(carouselBox[countCarousel]).find('.carousel__slide-desc').addClass('animated fadeIn');
			$(carouselBox[countCarousel]).find('.carousel__slide-text').addClass('animated fadeIn');
			$(carouselBox[countCarousel]).find('.carousel__box-img').addClass('animated zoomIn');

		timeCarousel = setTimeout(carousel, timeBetween);
		}, 1200);
	};

	$('form').on('submit', function(e){
		e.preventDefault();
		
		var form = $(this),
			 submit = $(form).find('button[type=submit]');
		$(form).find('input[required]').removeClass('alert');
		$(submit).attr('disabled', 'disabled');
		//console.log(data);
		
		$.ajax({
			type: 'post', 
			url:  $(form).attr('action'),
			data: $(form).serialize(),
			success: function(dataJson){
				$(submit).removeAttr('disabled');
				
				dataObj = JSON.parse(dataJson);
				data = dataObj.code;
				console.log(dataObj);
				
				if (data == "100"){
					$(form).find('input[type=text]').val('');
					$.fancybox({
						href: '#modal-thanks',
						padding: 0
					});
					setTimeout(function(){$.fancybox.close();}, 5000);
				};
				if (data == "101"){
					$(form).find('input[type=text]').val('');
					alert('Ошибка сервера! Попробуйте позже');
				};
				if (data == "102"){
					$(form).find('input[required]').each(function(i){
						//console.log(i);
						if($(this).val() == '') $(this).addClass('alert');
					});
					//var message = 'Заполните обязательные поля';
				};
				if (data == "103"){
					$(form).find('input[name=email]').addClass('alert');
					$(form).find('input[name=phone]').addClass('alert');
					//var message = 'Неправильный email';
				};
				
				//$('#alert').html(message);
			}
		});
	});
});