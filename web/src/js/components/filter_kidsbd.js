'use strict';

class Filter {
	constructor($filter) {
        this.$filter = $filter;

        this.$filter.on('click',(e) => {
            const $el = $(e.currentTarget);
            if ($(e.target).closest('.btn_open_filter')) {
				$el.find('.btn_open_filter').addClass('_hide');
				$el.find('.section_filter').removeClass('_hide');
				return;
			}
        });

        this.$filter.find('.input-range-filter').on('input',(e) => {
            const $el = $(e.currentTarget);
            const val = $el.val();
            $el.css('background', `linear-gradient(to right, #FF685F 0%, #FF855F ${val * 25}%, #5FBCFF ${val * 25}%, #5FBCFF 100%)`);
            const $output = $el.siblings('.output-range-filter');
            const data = Object.values($output.data())[0];
            $output.text(data[val]);
        });
        
    }
};

export default Filter;