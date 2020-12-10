'use strict';
import Filter from './filter';

export default class Index{
	constructor($block){
		var self = this;
		this.block = $block;
		this.filter = new Filter($('[data-filter-wrapper]'));

		//КЛИК ПО КНОПКЕ "ПОДОБРАТЬ"
		$('[data-filter-button]').on('click', function(){
			self.redirectToListing();
		});
		$('.mobile_button_text').on('click', () => {
        	this.openText();
        })
        $('.mobil_but_off').on('click', () => {
        	this.closeText();
        })
	}

	redirectToListing(){
		this.filter.filterMainSubmit();
		this.filter.promise.then(
			response => {
				//ym(64598434,'reachGoal','filter');
				//gtag('event', 'filter');
				window.location.href = response;
			}
		);
	}
	openText() {
		document.getElementById('mobile_but_all').style.height="auto";
		document.getElementById('mobile_but_all').style.overflow="visible";
		document.getElementById('butt_on').style.display="none";
		document.getElementById('butt_off').style.display="block";
	}
	closeText() {
		document.getElementById('mobile_but_all').style.height="120px";
		document.getElementById('mobile_but_all').style.overflow="hidden";
		document.getElementsByClassName('mobile_button_text')[0].style.display="";
		document.getElementById('butt_off').style.display="none";
	}
}