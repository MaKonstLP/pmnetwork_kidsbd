"use strict";
import Filter from './filter';

export default class YaMapAll{
	constructor(filter){
		let self = this;
		var fired = false;
		this.filter = filter;
		this.myMap = null;
		this.objectManager = null;
		this.myBalloonContentLayoutForClaster = false;
		this.myBalloonContentLayout = false;
		this.myBalloonLayout = false;

    window.addEventListener('click', () => {
        if (fired === false) {
            fired = true;
            load_other();
      }
    }, {passive: true});
 
    window.addEventListener('scroll', () => {
        if (fired === false) {
            fired = true;
            load_other();
      }
    }, {passive: true});

    window.addEventListener('mousemove', () => {
        if (fired === false) {
            fired = true;
            load_other();
      }
    }, {passive: true});

    window.addEventListener('touchmove', () => {
        if (fired === false) {
            fired = true;
            load_other();
      }
    }, {passive: true});

    setTimeout(() => {
      if (fired === false) {
            fired = true;
            load_other();
      }
    }, 5000);

		function load_other() {
			self.init();
		}

		$('[data-listing-list]').on('click', function(e){
			if ($(e.target).closest('.move_to_map') !== 0) {
				let parent = $(e.target).closest('.item-block');
				var id = parent.attr('id');
				self.getOneItemMap(id);
			}
		})
	}

	script(url) {
	  if (Array.isArray(url)) {
	    let self = this;
	    let prom = [];
	    url.forEach(function (item) {
	      prom.push(self.script(item));
	    });
	    return Promise.all(prom);
	  }

	  return new Promise(function (resolve, reject) {
	    let r = false;
	    let t = document.getElementsByTagName('script')[0];
	    let s = document.createElement('script');

	    s.type = 'text/javascript';
	    s.src = url;
	    s.async = true;
	    s.onload = s.onreadystatechange = function () {
	      if (!r && (!this.readyState || this.readyState === 'complete')) {
	        r = true;
	        resolve(this);
	      }
	    };
	    s.onerror = s.onabort = reject;
	    t.parentNode.insertBefore(s, t);
	  });
	}

	getOneItemMap(id) {
		var self = this;

		self.myMap.setCenter(self.objectManager.objects._objectsById[id].geometry.coordinates, 15);
		self.objectManager.objects.balloon.open(id);
	}

	init() {
		let self = this;
		this.script('//api-maps.yandex.ru/2.1/?lang=ru_RU').then(() => {
			const ymaps = global.ymaps;

			ymaps.ready(function(){
				let map = document.querySelector(".map");
				self.myMap = new ymaps.Map(map, {center: [55.76, 37.64], zoom: 15});
				self.myMap.behaviors.disable('scrollZoom');

				self.myBalloonLayout = ymaps.templateLayoutFactory.createClass(
					`<div class="balloon_layout">
						<a class="close" href="#"></a>
						<div class="arrow"></div>
						<div class="balloon_inner">
							$[[options.contentLayout]]
						</div>
					</div>`, {
					build: function() {
						this.constructor.superclass.build.call(this);

						this._$element = $('.balloon_layout', this.getParentElement());

						this._$element.find('.close')
	                        .on('click', $.proxy(this.onCloseClick, this));

					},

					clear: function () {
						this._$element.find('.close')
								.off('click');

						this.constructor.superclass.clear.call(this);
					},

					onCloseClick: function (e) {
						e.preventDefault();

						this.events.fire('userclose');
					},

					getShape: function () {
						if(!this._isElement(this._$element)) {
								return self.myBalloonLayout.superclass.getShape.call(this);
						}

						var position = this._$element.position();

						return new ymaps.shape.Rectangle(new ymaps.geometry.pixel.Rectangle([
								[position.left, position.top], [
										position.left + this._$element[0].offsetWidth,
										position.top + this._$element[0].offsetHeight + this._$element.find('.arrow')[0].offsetHeight
								]
						]));
					},

					_isElement: function (element) {
						return element && element[0] && element.find('.arrow')[0];
					}
					}
				);

				self.myBalloonContentLayout = ymaps.templateLayoutFactory.createClass(
					`<div class="balloon_wrapper">

						<div class="balloon_content">

							<a href="{{properties.link}}"><img src={{properties.img}}></a>

							<div class="balloon_text">

								<a href="{{properties.link}}"><div class="balloon_header">
									{{properties.organization}}
								</div></a>

								<div class="balloon_address">
									{{properties.address}}
								</div>

							</div>

						</div>

						<div class="balloon_link">
							<button class="balloon_link_button _button"><a href="{{properties.link}}">???????????????????? ??????</a></button>
						</div>
						<a class="close _all" href="#"><img src="/images/Close_icon_map.svg"></a>
					</div>`
				);

				self.myBalloonContentLayoutForClaster  = ymaps.templateLayoutFactory.createClass(
					`<div class="balloon_wrapper _cluster_wrapper">

						<div class="balloon_content">

							<a href="{{properties.link}}"><img src={{properties.img}}></a>

							<div class="balloon_text">

								<a href="{{properties.link}}"><div class="balloon_header">
									{{properties.organization}}
								</div></a>

								<div class="balloon_address">
									{{properties.address}}
								</div>

							</div>

						</div>

						<div class="balloon_link">
							<button class="balloon_link_button _button"><a href="{{properties.link}}">???????????????????? ??????</a></button>
						</div>
						<a class="close _all" href="#"><img src="/images/Close_icon_map.svg"></a>
					</div>`
				);

				self.objectManager = new ymaps.ObjectManager(
					{
						geoObjectBalloonLayout: self.myBalloonLayout, 
						geoObjectBalloonContentLayout: self.myBalloonContentLayout,
						geoObjectHideIconOnBalloonOpen: false,
						geoObjectBalloonOffset: [-28, 17],
						clusterize: true,
						clusterDisableClickZoom: false,
						clusterBalloonItemContentLayout: self.myBalloonContentLayoutForClaster,
						clusterIconColor: "green",
						geoObjectIconColor: "green"
					}
				);

				let serverData = null;
				let data = {
					subdomain_id : $('[data-map-api-subid]').data('map-api-subid'),
					filter : JSON.stringify(self.filter.state)
				};

				$.ajax({
					type: "POST",
					url: "/api/map_all/",
					data: data,
					success: function(response) {
						serverData = response;

						// console.log($.parseJSON(serverData).features);
						self.objectManager.add(serverData);  
						self.myMap.geoObjects.add(self.objectManager);

						if ($.parseJSON(serverData).features.length !== 0){
							var bounds = self.objectManager.getBounds();
							var center = [(bounds[1][0] + bounds[0][0]) / 2, (bounds[1][1] + bounds[0][1]) / 2];
							setTimeout(() => self.myMap.setCenter(center, 8), 100);
						}
						$('[data-map]').addClass('_inited');
					},
						error: function(response) {
					}
				});
			});
		});
	}

	refresh(filter){
    var self = this;
    var data = {
        subdomain_id : $('[data-map-api-subid]').data('map-api-subid'),
        filter : JSON.stringify(filter.state)
    };

    $.ajax({
        type: "POST",
        url: "/api/map_all/",
        data: data,
        success: function(response) {
          var serverData = response;
					// console.log(JSON.parse(response).features.length);
          if (JSON.parse(response).features.length > 0) {

            self.objectManager = new ymaps.ObjectManager(
              {
								geoObjectBalloonLayout: self.myBalloonLayout, 
								geoObjectBalloonContentLayout: self.myBalloonContentLayout,
								geoObjectHideIconOnBalloonOpen: false,
								geoObjectBalloonOffset: [-28, 17],
								clusterize: true,
								clusterDisableClickZoom: false,
								clusterBalloonItemContentLayout: self.myBalloonContentLayoutForClaster,
								clusterIconColor: "green",
								geoObjectIconColor: "green"
	
              }
            );
            self.objectManager.add(serverData);
            self.myMap.geoObjects.removeAll();
            self.myMap.geoObjects.add(self.objectManager);
						var bounds = self.objectManager.getBounds();
						var center = [(bounds[1][0] + bounds[0][0]) / 2, (bounds[1][1] + bounds[0][1]) / 2];
						setTimeout(() => self.myMap.setCenter(center, 8), 100);
				}

        },
        error: function(response) {

        }
    });
  }
}