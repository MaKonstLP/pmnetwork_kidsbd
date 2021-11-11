'use strict';

class Main {
	constructor() {
		this.$selectorBtnBurger = '.burger_menu_header';		
		this.$selectorOpenCityWindows = '.city_header';
		this.$selectorOpenCityWindowsClone = '.city_header_clone';
		this.$selectorCloseCityWindows = '.city_select_close';
		this.$selectorOpenReservationHall = '.btn_popup_max_form';
		this.$selectorOpenReservationHallClone = '.btn_popup_max_form_clone';
		this.$selectorOpenRequestCall = '.btn_popup_min_form';
		this.$selectorCloseFormPopup = '.form_close_popup';
		this.$cityWindows = document.querySelector('.city_select_wrapper');
		this.$elementsBurgerMenuHide = document.querySelectorAll('.element_burger_hide');
		this.$listCities = document.querySelectorAll('.city_select_letter_block');
		this.$popup = document.querySelector('.popup_wrap');
		this.$formRequestCall = document.querySelector('.popup_form_requestCall');
		this.$formReservationHall = document.querySelector('.popup_form_reservationHall');
		this.citiesArr = this.initCitiesArr(this.$listCities);

		document.querySelector('body').addEventListener('click', event => this.handlerClick(event));
		document.querySelector('.city_select_imput').addEventListener('input', event => this.searchInput(event));

		this.handlerClick = this.handlerClick.bind(this);
		this.searchInput = this.searchInput.bind(this);
	}

	handlerClick(event) {
		if (event.target.closest(this.$selectorOpenCityWindows) || event.target.closest(this.$selectorOpenCityWindowsClone)) {			
			this.$cityWindows.classList.add('_hide');
		};
		if (event.target.closest(this.$selectorCloseCityWindows)) {
			this.$cityWindows.classList.remove('_hide');
		};
		if (event.target.closest(this.$selectorBtnBurger)) {
			event.preventDefault();
			this.$elementsBurgerMenuHide.forEach(item => item.classList.toggle('_active'));
		};
		if (event.target.closest(this.$selectorOpenReservationHall) || event.target.closest(this.$selectorOpenReservationHallClone)) {
			this.$popup.classList.add('_active');
			this.$formReservationHall.classList.add('_active');
		};
		if (event.target.closest(this.$selectorOpenRequestCall)) {
			this.$popup.classList.add('_active');
			this.$formRequestCall.classList.add('_active');
		};
		if (event.target === this.$popup || event.target.closest(this.$selectorCloseFormPopup)) {
			this.$popup.classList.remove('_active');
			if (this.$formRequestCall.classList.contains('_active')) this.$formRequestCall.classList.remove('_active');
			if (this.$formReservationHall.classList.contains('_active')) this.$formReservationHall.classList.remove('_active');
		};

		// console.log(event.target.dataset)
	}

	initCitiesArr(arr) {
		const citiesArr = {};
		arr.forEach(item => {
			const key = item.dataset.firstLetter;
			const cities = [];
			for (let elem of item.children) {
				cities.push({city: elem, cityName: elem.dataset.firstLetter, cityDisplayed: true});
			}

			citiesArr[key] = {
				listCitiesName: key,
				listCities: item,
				listCitiesDisplayed: true,
				cities: cities,
			};
		});
		return citiesArr;
	}

	displayedListCities(elem, value = true) {
		elem.listCitiesDisplayed = value;
		elem.listCities.style.display = value ? "block" : "none";
	}

	displayedCiti(elem, search = '') {
		elem.cityDisplayed = search.toUpperCase() === elem.cityName.slice(0, search.length).toUpperCase() ? true : false;
		elem.city.style.display = elem.cityDisplayed ? "block" : "none";
		return elem.cityDisplayed;
	}

	searchInput(e) {
		e.preventDefault();
		const lengthSearch = e.target.value.length;
		if (!lengthSearch) {
			for (let key in this.citiesArr) {
				this.displayedListCities(this.citiesArr[key]);
			}
		}
		if (lengthSearch === 1) {
			for (let key in this.citiesArr) {
				this.displayedListCities(this.citiesArr[key], this.citiesArr[key].listCitiesName.toUpperCase() === e.target.value[0].toUpperCase());
			};
			this.citiesArr[e.target.value[0].toUpperCase()].cities.forEach(item => this.displayedCiti(item));
		}
		if (lengthSearch > 1) {
			let count = 0;
			const listCities = this.citiesArr[e.target.value[0].toUpperCase()]
			this.displayedListCities(listCities);
			listCities.cities.forEach(item => {
				if (this.displayedCiti(item, e.target.value)) count++;
			});
			if (!count) this.displayedListCities(listCities, false);
		}
	}
}

export default Main;

















// export default class Main{
// 	constructor(){

		

// 		$('body').on('click', '[data-seo-control]', function(){
// 			$(this).closest('[data-seo-text]').addClass('_active');
// 		});

// 		$('body').on('click', '[data-open-popup-form]', function(){
// 			$('.popup_wrap').addClass('_active');
// 			//ym(64598434,'reachGoal','header_button');
// 			//gtag('event', 'header_button');
// 		});

// 		$('body').on('click', '[data-close-popup]', function(){
// 			$('.popup_wrap').removeClass('_active');
// 		});

// 		// $('.header_burger').on('click', function(){
// 		// 	$('.header_menu').toggleClass('_active');
// 		// 	$('.header_burger').toggleClass('_active');
// 		// 	// $('.city_mobile').toggleClass('_active');
// 		// });




// 		// $('body').on('click', '.city', function(){			
// 		// 	let cityList = $('.city_select_search_wrapper._hide')[0];
// 		// 	if(cityList!=undefined){
// 		// 		$('.city_select_search_wrapper').removeClass('_hide');
// 		// 		$('[data-city-dropdown]').addClass('_active');
// 		// 		$('.header_menu').toggleClass('_active');
// 		// 		$('.header_burger').toggleClass('_active');
// 		// 	}
// 		// 	else {
// 		// 		$('.city_select_search_wrapper').addClass('_hide');
// 		// 		$('[data-city-dropdown]').removeClass('_active');
// 		// 	}
// 		// });
// 		$('.back_to_header_menu').on('click', function(){
// 			$('.city_select_search_wrapper').addClass('_hide');
// 			$('[data-city-dropdown]').removeClass('_active');
// 			$('.header_menu').toggleClass('_active');
// 			$('.header_burger').toggleClass('_active');
// 		});



// 	$(document).on('click', function(e) {
//   if (!$(e.target).closest(".city_select_wrapper").length && !$(e.target).closest(".city").length) {
//     $('.city_select_search_wrapper').addClass('_hide'); // скрываем его
// 	$('[data-city-dropdown]').removeClass('_active');
//   }
//   e.stopPropagation();
// });
// 	}
// }