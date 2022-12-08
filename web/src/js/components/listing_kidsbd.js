'use strict';

import Filter from './filter_kidsbd.js';

class Listing {
	constructor($block) {
        const $filter = $('[data-filter-wrapper-kidsbd]');
        this.filterObj = new Filter($filter);

        $filter.on('click',e => {
            this.filterObj.handlerClick(e);
            if (this.filterObj.state.search) {
                this.filterObj.promise.then(
                    response => {console.log(response)}
                );
            };
        });



    }
};

export default Listing;