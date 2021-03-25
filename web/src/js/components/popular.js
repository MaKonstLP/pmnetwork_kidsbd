'use strict';

export default class Popular{
  constructor(){
    var self = this;
    var pageYPos = null;
    $('.yet._active').on('click', function(e){
      self.getAllSlices($(this.closest('.popular_block')).data('groupName'));
    });
  }

  init(){

  }

  getAllSlices(blockName){
    var self = this;
    var data = {
      'groupeName': blockName,
    }

    $.ajax({
      type: 'get',
      url: '/popular/ajax-more-slices',
      data: data,
      success: function(response) {
        response = $.parseJSON(response);
        self.pageYPos = window.pageYOffset;
        $(`[data-group-name="${blockName}"`).replaceWith(response.blockUpdate);
        window.scrollTo(0, self.pageYPos);
      },
      error: function(response) {

      }
    });
  }

}