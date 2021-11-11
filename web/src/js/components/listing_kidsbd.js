'use strict';

import Filter from './filter_kidsbd.js';

class Listing {
	constructor($block) {
        this.block = $block;
        this.filter = new Filter($('[data-filter-wrapper-kidsbd]'));
    }
};

export default Listing;