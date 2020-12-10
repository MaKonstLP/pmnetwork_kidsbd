'use strict';
import Swiper from 'swiper';

export default class Widget{
	constructor(){
		self = this;
		this.swiperArr = [];

		if($(window).width() <= 1920){
			$('[data-widget-wrapper]').each(function(){
				self.initSwiper($(this).find('[data-listing-wrapper]'));
			});
		}

		$(window).on('resize', function(){
			console.log(self.swiperArr.length);
			if($(window).width() <= 1920){
				if(self.swiperArr.length == 0){
					$('[data-widget-wrapper]').each(function(){
						self.initSwiper($(this).find('[data-listing-wrapper]'));
					});
				}					
			}
			else{
				$.each(self.swiperArr, function(){
					this.destroy(true, true);
				});
				self.swiperArr = [];
			}
		});
		var galleryList = new Swiper('.listing_slider', {
            spaceBetween: 0,
            slidesPerView: 1,
            navigation: {
                nextEl: '._listing_next',
                prevEl: '._listing_prev',
            },
        });	
	}

	initSwiper($container){
		let swiper = new Swiper($container, {
	        slidesPerView: 4,
	        spaceBetween: 16,
	        navigation: {
              nextEl: '._next',
              prevEl: '._prev',
            },
            pagination: {
              el: '.listing_widget_pagination',
              type: 'bullets',
            },
	        breakpoints: {
	        	1440:{
	        		slidesPerView: 3,
	        	},
	        	767:{
	        		slidesPerView: 1,
	        	              }
	        }
	    });
	    

	    let swiper_var = $container.swiper;
		this.swiperArr.push(swiper);
	}
}