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
	}

	redirectToListing(){
		this.filter.filterMainSubmit();
		this.filter.promise.then(
			response => {
				ym(64598434,'reachGoal','filter');
				gtag('event', 'filter');
				window.location.href = response;
			}
		);
	}
}