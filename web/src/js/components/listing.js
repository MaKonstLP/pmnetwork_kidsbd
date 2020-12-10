'use strict';
import Filter from './filter';
import Swiper from 'swiper';
import YaMapAll from './map_all';
import 'slick-carousel';

export default class Listing{
	constructor($block){
		self = this;
		this.block = $block;
		this.filter = new Filter($('[data-filter-wrapper]'));	
		this.yaMap = new YaMapAll(this.filter);		


		//Клик по адресу
		


		//КЛИК ПО КНОПКЕ "ПОДОБРАТЬ"
		$('[data-filter-button]').on('click', function(){
			self.reloadListing();
		});

		//КЛИК ПО ПАГИНАЦИИ
		$('body').on('click', '[data-pagination-wrapper] [data-listing-pagitem]', function(){
			self.reloadListing($(this).data('page-id'));
			self.getSwiper();

		});
		console.log(this);

			var galleryList = new Swiper('.listing_slider', {
	            spaceBetween: 0,
	            slidesPerView: 1,
	            navigation: {
	                nextEl: '._listing_next',
	                prevEl: '._listing_prev',
	            },
	        });

        $('.btn_list._left').on('click', () => {
        	this.viewListing('left');
        })

        $('.btn_list._right').on('click', () => {
        	this.viewListing('right');
        })
        $('body').on('click', '.address_map', () => {
        	this.viewListing('right');
        })


	}

	getSwiper(){

			var galleryList = new Swiper('.listing_slider', {
            spaceBetween: 0,
            slidesPerView: 1,
            navigation: {
                nextEl: '._listing_next',
                prevEl: '._listing_prev',
            },
        })
	}

	viewListing(id){
		if (id == "left") {
			document.getElementById('left').className += " active";
			document.getElementById('right').classList.remove("active");
			document.getElementById('listing_on').className += " active";
			document.getElementById('map_on').classList.remove("active");
			document.getElementsByClassName('items_pagination')[0].style.display = "flex";
			document.getElementById('pag').style.display = "";
			document.getElementsByClassName('head_block')[0].style.marginBottom = '46px';

		}
		if (id == "right") {
			document.getElementById('right').className += " active";
			document.getElementById('left').classList.remove("active");
			document.getElementById('map_on').className += " active";
			document.getElementById('listing_on').classList.remove("active");
			document.getElementsByClassName('items_pagination')[0].style.display = "none";
			document.getElementById('pag').style.display = "none";
			document.getElementsByClassName('head_block')[0].style.marginBottom = '13px';
		}
	}

	reloadListing(page = 1){
		let self = this;
		self.filter.filterClose();
		self.block.addClass('_loading');
		self.filter.filterListingSubmit(page);
		self.filter.promise.then(
			response => {
				//ym(64598434,'reachGoal','filter');
				//gtag('event', 'filter');
				//console.log(response);
				$('[data-listing-list]').html(response.listing);
				let galleryList = new Swiper('.listing_slider', {
	            spaceBetween: 0,
	            slidesPerView: 1,
	            navigation: {
	                nextEl: '._listing_next',
	                prevEl: '._listing_prev',
	            },
	        });
				$('[data-listing-title]').html(response.title);
				$('[data-listing-text-top]').html(response.text_top);
				$('[data-listing-text-bottom]').html(response.text_bottom);
				$('[data-pagination-wrapper]').html(response.pagination);
				document.title = response.seo_title;
				self.block.removeClass('_loading');
				$('html,body').animate({scrollTop:0}, 400);
				history.pushState({}, '', '/catalog/'+response.url);
			}
		);
	}
}