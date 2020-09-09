'use strict';
import Swiper from 'swiper';
import 'slick-carousel';
import * as Lightbox from '../../../node_modules/lightbox2/dist/js/lightbox.js';

export default class Item{
	constructor($item){
		var self = this;
		
		$('[data-action="show_phone"]').on('click', function(){
			$('.object_book_hidden').addClass('_active');
            ym(64598434,'reachGoal','show_phone');
            gtag('event', 'show_phone');
            if($(this).data('commission')){
                ym(64598434,'reachGoal','show_phone_comm');
                gtag('event', 'show_phone_comm');
            }

		});

        $('[data-title-address]').on('click', function(){
            let map_offset_top = $('#map').offset().top;
            let map_height = $('#map').height();
            let header_height = $('header').height();
            let window_height = $(window).height();
            let scroll_length = map_offset_top - header_height - ((window_height - header_height)/2) + map_height/2;
            $('html,body').animate({scrollTop:scroll_length}, 400);
        });

        $('[data-book-button]').on('click', function(){
            let form = $('[data-type="item"]').closest('.form_wrapper');
            let form_offset_top = form.offset().top;
            let header_height = $('header').height();
            let scroll_length = form_offset_top - header_height - 50;
            $('html,body').animate({scrollTop:scroll_length}, 400);
            ym(64598434,'reachGoal','scroll_form');
            gtag('event', 'scroll_form');
            console.log('scroll_form');
        });

		var galleryThumbs = new Swiper('.item_thumb_slider', {
            spaceBetween: 5,
            slidesPerView: 5,
            freeMode: true,
            watchSlidesVisibility: true,
            watchSlidesProgress: true,
            breakpoints: {
                767: {
                  slidesPerView: 'auto',
                  spaceBetween: 5
                }
            }
        });
        var galleryTop = new Swiper('.item_top_slider', {
            spaceBetween: 0,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            thumbs: {
                swiper: galleryThumbs
            }
        });	
	}
}