'use strict';

export default class Filter{
	constructor($filter){
		let self = this;
		this.$filter = $filter;
		this.state = {};

		this.init(this.$filter);

		//
		this.$filter.find('[data-filter-select-current-clean]').on('click', function(){
			let $parent = $(this).closest('[data-filter-select-block]');
			let content = $parent.find('.filter_p').html();
			if(content != ''){
				let clear = $parent.find('.filter_p').text("");
				let clean = $parent.find('[data-filter-label]').removeClass('_active');
				let onX = $parent.find('[data-filter-select-current]').removeClass('_xActive');
				let cleanQuanty = $parent.find('[data-quantity]').addClass('_none');
				let cleanStr = $parent.find('[data-filter-select-item]').removeClass('_active');
				
			}
			$(this).removeClass('_active');
		});

		//КЛИК ПО БЛОКУ С СЕЛЕКТОМ
		this.$filter.find('[data-filter-select-current]').on('click', function(){
			let $parent = $(this).closest('[data-filter-select-block]');
			self.selectBlockClick($parent);	
			let content = $(this).find('.filter_p').html();
			let cleanButt = $(this).find('[data-filter-select-current-clean]').addClass('_active');
		
		});

		//КЛИК ПО КНОПКЕ СБРОСИТЬ
		$('body').find('[data-clean]').on('click', (e) => {
			let clear = this.$filter.find('[data-filter-select-current] p').text("");
			let clean = this.$filter.find('[data-filter-label]').removeClass('_active');
			let cleanQuanty = this.$filter.find('[data-quantity]').addClass('_none');
			let onX = this.$filter.find('[data-filter-select-current]').removeClass('_xActive');
		});

		//КЛИК ПО СТРОКЕ В СЕЛЕКТЕ
		this.$filter.find('[data-filter-select-item]').on('click', function(){
			$(this).toggleClass('_active');
			self
			self.selectStateRefresh($(this).closest('[data-filter-select-block]'));
		});

		//КЛИК ПО ЧЕКБОКСУ
		this.$filter.find('[data-filter-checkbox-item]').on('click', function(){
			$(this).toggleClass('_checked');
			self.checkboxStateRefresh($(this));
		});

		//ОТКРЫТЬ МОБИЛЬНЫЙ ФИЛЬТР
		$('body').find('[data-filter-open]').on('click', (e) => {
			this.$filter.addClass('_active');
		});

		//ЗАКРЫТЬ МОБИЛЬНЫЙ ФИЛЬТР
		this.$filter.find('[data-filter-close]').on('click', (e) => {
			this.$filter.removeClass('_active');
		});
		// this.$filter.on('click', function(e){
		// 	if(!$(e.target).hasClass('filter_mobile_button') && !$(e.target).hasClass('filter_wrapper') && !$(e.target).closest('.filter_wrapper').length)
		// 		if(self.$filter.hasClass('_active'))
		// 			self.filterClose();
		// });

		//КЛИК ВНЕ БЛОКА С СЕЛЕКТОМ
		$('body').click(function(e) {
		    if (!$(e.target).closest('.filter_select_block').length){
		    	self.selectBlockActiveClose();
		    }
		});

		//КЛИК ПО СТРЕЛОЧКИ В МОБИЛЬНОМ ФИЛЬТРЕ
		this.$filter.find('.filter_label').on('click', function(){
			let parent = $(this).closest('.label_check');
			if ($(parent).hasClass("_active")) {
				$(parent).removeClass("_active");
			$(parent).find('.filter_label').removeClass('_active');
			let chekOn = $('.label_check');
			$(parent).find('.filter_check').removeClass('_active');
			$(parent).find('.clean_this_filter').removeClass('_active');
			}

			else{
			$(parent).addClass("_active");
			$(parent).find('.filter_label').addClass('_active');
			let chekOn = $('.label_check');
			$(parent).find('.filter_check').addClass('_active');
			$(parent).find('.clean_this_filter').addClass('_active');

			}
		});
		//КЛИК ПО КНОПКЕ СБРОСИТЬ В МОБИЛЬНОМ ФИЛЬТРЕ
		this.$filter.find('[data-clean-mobile]').on('click', function(){
			let parent = $(this).closest('.label_check');
			$(parent).find('.filter_check').removeClass('_checked');
		});

		//КЛИК ПО КНОПКЕ "СБРОСИТЬ ФИЛЬТР" В МОБИЛЬНОМ ФИЛЬТРЕ
		 $('body').find('[data-clean]').on('click', (e) => {
			 this.$filter.find('.filter_check').removeClass('_checked');
			 this.$filter.find('.filter_label').removeClass('_active');
			 this.$filter.find('.filter_check').removeClass('_active');
			 this.$filter.find('.clean_this_filter').removeClass('_active');
			
		});

	}

	init(){
		let self = this;

		this.$filter.find('[data-filter-select-block]').each(function(){
			self.selectStateRefresh($(this));
		});

		this.$filter.find('[data-filter-checkbox-item]').each(function(){
			self.checkboxStateRefresh($(this));
		});
	}

	filterClose(){
		this.$filter.removeClass('_active');
	}

	filterListingSubmit(page = 1){
		let self = this;
		self.state.page = page;

		let data = {
			'filter' : JSON.stringify(self.state)
		}

		this.promise = new Promise(function(resolve, reject) {
			self.reject = reject;
			self.resolve = resolve;
	    });		

		$.ajax({
            type: 'get',
            url: '/ajax/filter/',
            data: data,
            success: function(response) {
            	response = $.parseJSON(response);
                self.resolve(response);
            },
            error: function(response) {

            }
        });
	}

	filterMainSubmit(){
		let self = this;
		let data = {
			'filter' : JSON.stringify(self.state)
		}

		this.promise = new Promise(function(resolve, reject) {
			self.reject = reject;
			self.resolve = resolve;
	    });

		$.ajax({
            type: 'get',
            url: '/ajax/filter-main/',
            data: data,
            success: function(response) {
            	if(response){
            		//console.log(response);
            		self.resolve('/catalog/'+response);
            	}
            	else{
            		//console.log(response);
            		self.resolve(self.filterListingHref());
            	}
            },
            error: function(response) {

            }
        });
	}

	selectBlockClick($block){
		if($block.hasClass('_active')){
			this.selectBlockClose($block);
		}
		else{
			this.selectBlockOpen($block);			
		}
	}

	selectBlockClose($block){
		$block.removeClass('_active');
	}

	selectBlockOpen($block){
		this.selectBlockActiveClose();
		$block.addClass('_active');
	}

	selectBlockActiveClose(){
		this.$filter.find('[data-filter-select-block]._active').each(function(){
			$(this).removeClass('_active');
		});
	}

	selectStateRefresh($block){
		let self = this;
		let blockType = $block.data('type');		
		let $items = $block.find('[data-filter-select-item]._active');
		let selectText = '';

		if($items.length > 0){
			self.state[blockType] = '';
			$items.each(function(){
				if(self.state[blockType] !== ''){
					self.state[blockType] += ','+$(this).data('value');
					// selectText = 'Выбрано ('+$items.length+')';
					selectText += ',' + $(this).text();
					$block.find('[data-quantity]').removeClass('_none');
					$block.find('[data-quantity]').text($items.length);
					$block.find('[data-filter-select-current]').addClass('_xActive');

				}
				else{
					self.state[blockType] = $(this).data('value');
					selectText = $(this).text();
					console.log(1);
					$block.find('[data-filter-label]').addClass('_active');
					$block.find('[data-quantity]').addClass('_none');
					$block.find('[data-filter-select-current]').addClass('_xActive');

				}
			});
		}
		else{
			delete self.state[blockType];
		}
		if(selectText == ""){
			$block.find('[data-filter-label]').removeClass('_active');
			$block.find('[data-quantity]').addClass('_none');
			$block.find('[data-filter-select-current]').removeClass('_xActive');
		}

		$block.find('[data-filter-select-current] p').text(selectText);
	}

	checkboxStateRefresh($item){
		let blockType = $item.closest('[data-type]').data('type');
		if($item.hasClass('_checked')){
			this.state[blockType] = 1;
		}
		else{
			delete this.state[blockType];
		}
	}

	filterListingHref(){
		if(Object.keys(this.state).length > 0){
			var href = '/catalog/?';
			$.each(this.state, function(key, value){
				href += '&' + key + '=' + value;
			});
		}
		else{
			var href = '/catalog/';
		}			
		return href;
	}
}