$(function(){

    $(".header-inner_item a,.menu-wrapper_link,.price-slider_item a,.header-inner_btn").on("click", function (event) {
		event.preventDefault();

		//забираем идентификатор бока с атрибута href
		var id  = $(this).attr('href'),

		//узнаем высоту от начала страницы до блока на который ссылается якорь
			top = $(id).offset().top;
		
		//анимируем переход на расстояние - top за 1500 мс
		$('body, html').animate({scrollTop: top}, 1500);
	});

    $('.menu-btn').on('click', function() {
        $('.header-inner_list').toggleClass('header-inner_list--active');
    });

    $('.header-inner_link').on('click', function() {
        $('.header-inner_list').removeClass('header-inner_list--active');
    });

    $('.price-slider').slick({
        slidesToScroll: 1,
        slidesToShow: 3,
        infinite: false,
        swipe: false,
        arrows: true,
        nextArrow: '<button type="button" class="slick-next"><img src="images/right-arrow.svg" alt="" class="slider-img2"></button>',
        prevArrow: '<button type="button" class="slick-prev"><img src="images/right-arrow.svg" alt="" class="slider-img2"></button>',
        responsive: [
            {
                breakpoint: 1500,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 1220,
                settings: {
                    slidesToShow: 1,
                }
            },
            {
                breakpoint: 900,
                settings: {
                    slidesToShow: 1,
                    swipe: true,
                    arrows: false,
                    autoplay: true,
                }
            }
        ]
    });


});

document.addEventListener('DOMContentLoaded', () => {
    const feedbackFirst = document.getElementById('feedback-first');
   
    const messageFirst = document.getElementById('message-first');

    feedbackFirst.addEventListener('submit', (e) => {
        e.preventDefault();

        (async () => {
            const rawResponse = await fetch(`${window.location.origin}/server/feedback.php`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: e.target[0].value,
                    phone: e.target[1].value
                })
            });
            const content = await rawResponse.json();

            if (content.status === true) {
                document.location.href = '/success.html';
            } else {
                messageFirst.innerHTML = content.message;
            }
        })();
    });
});


