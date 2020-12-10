import $ from 'jquery';

import Listing from './components/listing';
import Item from './components/item';
import Main from './components/main';
import Index from './components/index';
import Widget from './components/widget';
import Form from './components/form';
import YaMap from './components/map';
import Errorpage from './components/error';
// import CalendarCustom from './components/calendarCustom';
import Callback from './components/callback';
import Article from './components/article';
import datepicker from 'js-datepicker';

window.$ = $;

(function($) {
  	$(function() {

  		if ($('[data-page-type="listing"]').length > 0) {
	    	var listing = new Listing($('[data-page-type="listing"]'));
	    }

	    if ($('[data-page-type="item"]').length > 0) {
	    	var item = new Item($('[data-page-type="item"]'));
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
	    
		// if ($('.calendar').length > 0) {
		// 	var cal_arr = [];
		// 	for(let cal of ($('.calendar'))){
		// 		cal_arr.push(new CalendarCustom(cal));
		// 	}
		// 	console.log(cal_arr);
		// }
		if ($('[data-page-type="item"]').length > 0) {
	    	var callback = new Callback();
	    }
	    if ($('[data-page-type="listing"]').length > 0) {
	    	var callbackk = new Callback();
	    }
	    if ($('[data-page-type="article"]').length > 0) {
	    	var article = new Article($('[data-page-type="article"]'));
	    }

	    
	    var callback = new Callback();
	    var main = new Main();
	    var form = [];

	    $('form').each(function(){
	    	form.push(new Form($(this)))
	    });

const start = datepicker('.popup_form .form_wrapper .hidden_input',{  startDay : 1 ,    
  customDays : [ 'ВС' , 'ПН' , 'ВТ' , 'СР' , 'ЧТ' , 'ПТ' , 'СБ' ],
  customMonths : [ ' Январь ' , ' Февраль ' , ' Март ' , ' Апрель ' , ' Май ' , ' Июнь ' , ' Июль ' , ' Август ' , ' Сентябрь ' , ' Октябрь ' , ' Ноябрь ' , ' Декабрь ' ],
  formatter: (input, date, instance) => {
    const value = date.toLocaleDateString()
    input.value = value // => '1/1/2099'
  },
  showAllDates: true,
  disableYearOverlay : true,
  position : 'br',
  id: 2,         
});
const end = datepicker('.popup_form .form_wrapper .hidden_input_two',{  startDay : 1 ,    
  customDays : [ 'ВС' , 'ПН' , 'ВТ' , 'СР' , 'ЧТ' , 'ПТ' , 'СБ' ],
  customMonths : [ ' Январь ' , ' Февраль ' , ' Март ' , ' Апрель ' , ' Май ' , ' Июнь ' , ' Июль ' , ' Август ' , ' Сентябрь ' , ' Октябрь ' , ' Ноябрь ' , ' Декабрь ' ],
  formatter: (input, date, instance) => {
    const value = date.toLocaleDateString()
    input.value = value // => '1/1/2099'
  },
  showAllDates: true,
  disableYearOverlay : true,
  position : 'br',
  id: 2,         
});
		start.getRange(); // { start: <JS date object>, end: <JS date object> }
		end.getRange(); // Gives you the same as above!


const datapicker = datepicker('.content_block .form_wrapper .hidden_input',{  startDay : 1 ,    
  customDays : [ 'ВС' , 'ПН' , 'ВТ' , 'СР' , 'ЧТ' , 'ПТ' , 'СБ' ],
  customMonths : [ ' Январь ' , ' Февраль ' , ' Март ' , ' Апрель ' , ' Май ' , ' Июнь ' , ' Июль ' , ' Август ' , ' Сентябрь ' , ' Октябрь ' , ' Ноябрь ' , ' Декабрь ' ],
  formatter: (input, date, instance) => {
    const value = date.toLocaleDateString()
    input.value = value // => '1/1/2099'
  },
  showAllDates: true,
  disableYearOverlay : true,
  position : 'br',
  id: 1,         
});
const dataend = datepicker('.content_block .form_wrapper .hidden_input_two',{  startDay : 1 ,    
  customDays : [ 'ВС' , 'ПН' , 'ВТ' , 'СР' , 'ЧТ' , 'ПТ' , 'СБ' ],
  customMonths : [ ' Январь ' , ' Февраль ' , ' Март ' , ' Апрель ' , ' Май ' , ' Июнь ' , ' Июль ' , ' Август ' , ' Сентябрь ' , ' Октябрь ' , ' Ноябрь ' , ' Декабрь ' ],
  formatter: (input, date, instance) => {
    const value = date.toLocaleDateString()
    input.value = value // => '1/1/2099'
  },
  showAllDates: true,
  disableYearOverlay : true,
  position : 'br',
  id: 1,         
});
// 		// const start = datepicker('#date', { id: 1 });
// 		// const end = datepicker('.open_calendar_button', { id: 1 });
		datapicker.getRange(); // { start: <JS date object>, end: <JS date object> }
		dataend.getRange(); // Gives you the same as above!

  	});
})($);