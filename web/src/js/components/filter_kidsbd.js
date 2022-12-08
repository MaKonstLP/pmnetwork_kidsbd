'use strict';

class Filter {
	constructor($filter) {
        const $inputs = $filter.find('input');
        this.state = {
            params: {},
            type: 'home',
            search: false,
        };

        this.initState($inputs);
        $inputs.on('input',e => this.handlerInput(e));
    }

    initState($inputs) {
        $inputs.each((index, val) => {
            const key = val.name;
            switch(val.type) {
                case 'hidden':
                    const value = JSON.parse(val.value);
                    if (value.length) {
                        this.state.params[key] = String(value);
                        this.state.type = 'slice';
                    };
                    break;
                case 'range':
                    if (val.value != val.max) this.state.params[key] = val.value;
                    break;
                case 'checkbox':
                    if (val.checked) this.state.params[key] = '1';
                    break;
                default:
                    break;
            };
        });
    }
    handlerInput(event) {
        const $input = $(event.currentTarget);
        const key = $input[0].name;
        switch($input[0].type) {
            case 'range':
                const $output = $input.siblings('.output_range_filter');
                const data = Object.values($output.data())[0];
                const max = $input[0].max;
                const value = $input.val();
                $input.css('background', `linear-gradient(to right, #FF685F 0%, #FF855F ${value * 100 / max}%, #5FBCFF ${value * 100 / max}%, #5FBCFF 100%)`);                $output.text(data[value]);
                value === max ? delete this.state.params[key] : this.state.params[key] = value;
                break;
            case 'checkbox':
                $input[0].checked ? this.state.params[key] = '1' : delete this.state.params[key];
                break;
            default:
                break;
        };
    }
    handlerClick(event) {
        this.state.search = false;
        const $el = $(event.target);
        if ($el.closest('.btn_open_filter').length) {
            console.log($el.closest('.btn_open_filter'));
			// $el.find('.btn_open_filter').addClass('_hide');
			// $el.find('.section_filter').removeClass('_hide');
			// return;
		} else if ($el.closest('.btn_search_filter').length) {
            this.state.search = true;
            const data = {'filter': JSON.stringify(this.state.params)};
            const url = '/ajax/filter/';
			this.promise = new Promise((resolve, reject) => this.resolve = resolve);
			$.ajax({
				type: 'get',
				url: url,
				data: data,
				success: response => this.resolve(JSON.parse(response)),
			});
        };
    }
};

export default Filter;