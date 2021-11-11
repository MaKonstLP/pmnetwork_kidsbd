import $ from 'jquery';

import Listing from './components/listing';
import Item from './components/item';


import Main from './components/main';
import ListingNew from './components/listing_kidsbd';

import Index from './components/index';
import Widget from './components/widget';
import Form from './components/form';
import YaMap from './components/map';
import Errorpage from './components/error';
// import CalendarCustom from './components/calendarCustom';
import Callback from './components/callback';
import Article from './components/article';
import datepicker from 'js-datepicker';
import Popular from './components/popular';

window.$ = $;

(function($) {
  	$(function() {
		// if ($('[data-page-type="listing"]').length > 0) {
		// 	var listing = new Listing($('[data-page-type="listing"]'));
		// }
		if ($('[data-page-type="listing"]').length > 0) {
			var listing = new ListingNew($('[data-page-type="listing"]'));
		}




		if ($('[data-page-type="item"]').length > 0) {
			var item = new Item($('[data-page-type="item"]'));
		}

		if ($('[data-page-type="popular"]').length > 0) {
			var popular = new Popular();
		}

		if ($('[data-page-type="index"]').length > 0) {
			var index = new Index($('[data-page-type="index"]'));
		}

		if ($('[data-widget-wrapper]').length > 0) {
			var widget = new Widget();
		}

		if ($('[data-page-type="item"] .map').length > 0) {
			var yaMap = new YaMap();
		}

		if ($('[data-page-type="error"]').length > 0) {
			var error = new Errorpage();
		}
		
		if ($('[data-side-callback-form]').length > 0) {
			var callbackk = new Callback();
		}

		if ($('[data-page-type="article"]').length > 0) {
			var article = new Article($('[data-page-type="article"]'));
		}
			
		var main = new Main();
		// mainInit();

		var form = [];

		$('form').each(function(){
			form.push(new Form($(this)))
		});    // Так можно? form.push(new Form($('form')))

		//const start = datepicker('.popup_form .form_wrapper .hidden_input', {
		//	startDay : 1,    
		//	customDays : [ 'ВС' , 'ПН' , 'ВТ' , 'СР' , 'ЧТ' , 'ПТ' , 'СБ' ],
		//	customMonths : [ ' Январь ' , ' Февраль ' , ' Март ' , ' Апрель ' , ' Май ' , ' Июнь ' , ' Июль ' , ' Август ' , ' Сентябрь ' , ' Октябрь ' , ' Ноябрь ' , ' Декабрь ' ],
		//	formatter: (input, date, instance) => {
		//		const value = date.toLocaleDateString()
		//		input.value = value // => '1/1/2099'
		//	},
		//	showAllDates: true,
		//	disableYearOverlay : true,
		//	position : 'br',
		//	id: 2,         
		//});

		// const end = datepicker('.popup_form .form_wrapper .hidden_input_two', {
		// 	startDay : 1 ,    
		// 	customDays : [ 'ВС' , 'ПН' , 'ВТ' , 'СР' , 'ЧТ' , 'ПТ' , 'СБ' ],
		// 	customMonths : [ ' Январь ' , ' Февраль ' , ' Март ' , ' Апрель ' , ' Май ' , ' Июнь ' , ' Июль ' , ' Август ' , ' Сентябрь ' , ' Октябрь ' , ' Ноябрь ' , ' Декабрь ' ],
		// 	formatter: (input, date, instance) => {
		// 		const value = date.toLocaleDateString()
		// 		input.value = value // => '1/1/2099'
		// 	},
		// 	showAllDates: true,
		// 	disableYearOverlay : true,
		// 	position : 'br',
		// 	id: 2,         
		// });

		// start.getRange(); // { start: <JS date object>, end: <JS date object> }
		// end.getRange(); // Gives you the same as above!


		//const datapicker = datepicker('.content_block .form_wrapper .hidden_input', {
		//	startDay : 1 ,    
		//	customDays : [ 'ВС' , 'ПН' , 'ВТ' , 'СР' , 'ЧТ' , 'ПТ' , 'СБ' ],
		//	customMonths : [ ' Январь ' , ' Февраль ' , ' Март ' , ' Апрель ' , ' Май ' , ' Июнь ' , ' Июль ' , ' Август ' , ' Сентябрь ' , ' Октябрь ' , ' Ноябрь ' , ' Декабрь ' ],
		//	formatter: (input, date, instance) => {
		//		const value = date.toLocaleDateString()
		//		input.value = value // => '1/1/2099'
		//	},
		//	showAllDates: true,
		//	disableYearOverlay : true,
		//	position : 'br',
		//	id: 1,         
		//});

		// const dataend = datepicker('.content_block .form_wrapper .hidden_input_two', {
		// 	startDay : 1 ,    
		// 	customDays : [ 'ВС' , 'ПН' , 'ВТ' , 'СР' , 'ЧТ' , 'ПТ' , 'СБ' ],
		// 	customMonths : [ ' Январь ' , ' Февраль ' , ' Март ' , ' Апрель ' , ' Май ' , ' Июнь ' , ' Июль ' , ' Август ' , ' Сентябрь ' , ' Октябрь ' , ' Ноябрь ' , ' Декабрь ' ],
		// 	formatter: (input, date, instance) => {
		// 		const value = date.toLocaleDateString()
		// 		input.value = value // => '1/1/2099'
		// 	},
		// 	showAllDates: true,
		// 	disableYearOverlay : true,
		// 	position : 'br',
		// 	id: 1,         
		// });

		// // const start = datepicker('#date', { id: 1 });
		// // const end = datepicker('.open_calendar_button', { id: 1 });

		// datapicker.getRange(); // { start: <JS date object>, end: <JS date object> }
		// dataend.getRange(); // Gives you the same as above!

	});
})($);