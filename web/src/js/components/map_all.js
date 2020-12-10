"use strict";
import Filter from './filter';

export default class YaMapAll{
	constructor(filter){
		let self = this;
		var fired = false;
		this.filter = filter;
		// console.log(this.filter);

		$('.btn_list._right').on('click', function(){
			let mapPage = document.getElementsByClassName('ymaps-2-1-77-map')[0];
			if(!mapPage){
			load_other();
			}
		});

		$('.btn_list._left').on('click', function(){
			let mapPage = document.getElementsByClassName('ymaps-2-1-77-map')[0];
			mapPage.remove();
		});
		$('body').on('click', '.address_map', function(){
			let parent = $(this).closest('.item-block');
			let latitude = $(this).attr('data-latitude');
			let longitude = $(this).attr('data-longitude');
			let organizationsName = $(this).attr('data-name');
			let organizationsAddress = $(this).attr('data-address');
			let imgBalloon = parent.find('[data-images]').attr('src');
			let linkBlock = $(this).attr('data-url');
			// console.log($(this));
			// console.log(latitude);
			// console.log(longitude);
			// console.log(imgBalloon);
			self.initer(latitude,longitude,organizationsName,organizationsAddress,imgBalloon,linkBlock);
		})
		

		function load_other() {
			setTimeout(function() {
				self.init();
			}, 100);
			
		}
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

			initer(latitude,longitude,organizationsName,organizationsAddress,imgBalloon,linkBlock) {
		let self = this;
		this.script('//api-maps.yandex.ru/2.1/?lang=ru_RU').then(() => {
	      	const ymaps = global.ymaps;

			ymaps.ready(function(){
				let map = document.querySelector(".map");
				let myMap = new ymaps.Map(map, {center: [latitude, longitude], zoom: 15});
				myMap.behaviors.disable('scrollZoom');


				let myBalloonLayout = ymaps.templateLayoutFactory.createClass(
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
								return myBalloonLayout.superclass.getShape.call(this);
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

				let myBalloonContentLayout = ymaps.templateLayoutFactory.createClass(
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
							<button class="balloon_link_button _button"><a href="{{properties.link}}">Посмотреть зал</a></button>
						</div>
						<a class="close _all" href="#"><img src="/images/Close_icon_map.svg"></a>
					</div>`
				);


				let objectManager = new ymaps.ObjectManager(
					{
						geoObjectBalloonLayout: myBalloonLayout, 
						geoObjectBalloonContentLayout: myBalloonContentLayout,
						geoObjectHideIconOnBalloonOpen: false,
						geoObjectBalloonOffset: [-360, 17],
						clusterize: true,
						clusterDisableClickZoom: false,
						clusterBalloonItemContentLayout: myBalloonContentLayout,
						clusterIconColor: "green",
						geoObjectIconColor: "green"
					}
				);
				let balloon = myMap.balloon.open(myMap.getCenter(), { content: `<div class="balloon_single_address"><div class="balloon_wrapper">

						<div class="balloon_content">

							<a href="`+ linkBlock +`"><img src="`+ imgBalloon +`"></a>

							<div class="balloon_text">

								<a href="`+ linkBlock +`"><div class="balloon_header">` +
									organizationsName 
									+
									`
								</div></a>

								<div class="balloon_address">` +
									organizationsAddress
									+
								`</div>

							</div>

						</div>

						<div class="balloon_link">
							<button class="balloon_link_button _button"><a href="{{properties.link}}">Посмотреть зал</a></button>
						</div>
						<a class="close _all" href="#"><img src="/images/Close_icon_map.svg"></a>
					</div></div>`  }, { closeButton: true });

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

		    //         	console.log(1111);
						// console.log(2222);
						objectManager.add(serverData);  
						// console.log(`objectManager length: ${objectManager.objects.getLength()}`);
						myMap.geoObjects.add(objectManager);
						// console.log(`objectManager: ${objectManager.getBounds()}`);
						myMap.objectManager.getBounds();
		            },
		            error: function(response) {

		            }
		        });
				/*let serverResponse = fetch("/api/map_all/", {
					    method: 'post',
					    mode:    'cors',
					    headers: {
					      'Content-Type': 'application/json',  // sent request
					      'Accept':       'application/json'   // expected data sent back
					    },
					    body: JSON.stringify(data),
					})
					.then(function(response) {
						if (response.ok) { 
							let json = response.json();
							return json;
						} else {
							alert("Ошибка HTTP: " + response.status);
						}
					})
					.then(function(json) {
						serverData = json;
						
						objectManager.add(serverData);  
						//console.log(`objectManager length: ${objectManager.objects.getLength()}`);
						myMap.geoObjects.add(objectManager);
						//console.log(`objectManager: ${objectManager.getBounds()}`);
						myMap.setBounds(objectManager.getBounds());
					});*/
			// 		 function getVisibleObjects() {
   //    return objectManager.objects.getAll()
   //    .filter(function (obj, index) {
   //        return ymaps.util.bounds.containsPoint(
   //          myMap.getBounds(),
   //          obj.geometry.coordinates
   //        )
   //    })
   //  }
			// myMap.events.add('boundschange', function () {
   //          var objects = getVisibleObjects();
   //              console.log('total objects: ', objects.length);
   //              objects.forEach(function (obj) {
   //              console.log('objectId: ', obj.id);
   //              console.log('objectId: ', obj.id ==763);
   //              console.log(obj.geometry.coordinates);
   //              console.log(obj);

   //              });
   //          });

			});
	    });
	}


	init() {
		let self = this;
		this.script('//api-maps.yandex.ru/2.1/?lang=ru_RU').then(() => {
	      	const ymaps = global.ymaps;

			ymaps.ready(function(){
				let map = document.querySelector(".map");
				let myMap = new ymaps.Map(map, {center: [55.76, 37.64], zoom: 15});
				myMap.behaviors.disable('scrollZoom');

				let myBalloonLayout = ymaps.templateLayoutFactory.createClass(
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
								return myBalloonLayout.superclass.getShape.call(this);
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

				let myBalloonContentLayout = ymaps.templateLayoutFactory.createClass(
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
							<button class="balloon_link_button _button"><a href="{{properties.link}}">Посмотреть зал</a></button>
						</div>
						<a class="close _all" href="#"><img src="/images/Close_icon_map.svg"></a>
					</div>`
				);

				let objectManager = new ymaps.ObjectManager(
					{
						geoObjectBalloonLayout: myBalloonLayout, 
						geoObjectBalloonContentLayout: myBalloonContentLayout,
						geoObjectHideIconOnBalloonOpen: false,
						geoObjectBalloonOffset: [-360, 17],
						clusterize: true,
						clusterDisableClickZoom: false,
						clusterBalloonItemContentLayout: myBalloonContentLayout,
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

		    //         	console.log(1111);
						// console.log(2222);
						objectManager.add(serverData);  
						// console.log(`objectManager length: ${objectManager.objects.getAll()}`);
						myMap.geoObjects.add(objectManager);
						// console.log(`objectManager: ${objectManager.getBounds()}`);
						myMap.setBounds(objectManager.getBounds());
		            },
		            error: function(response) {

		            }


		        });
				/*let serverResponse = fetch("/api/map_all/", {
					    method: 'post',
					    mode:    'cors',
					    headers: {
					      'Content-Type': 'application/json',  // sent request
					      'Accept':       'application/json'   // expected data sent back
					    },
					    body: JSON.stringify(data),
					})
					.then(function(response) {
						if (response.ok) { 
							let json = response.json();
							return json;
						} else {
							alert("Ошибка HTTP: " + response.status);
						}
					})
					.then(function(json) {
						serverData = json;
						
						objectManager.add(serverData);  
						//console.log(`objectManager length: ${objectManager.objects.getLength()}`);
						myMap.geoObjects.add(objectManager);
						//console.log(`objectManager: ${objectManager.getBounds()}`);
						myMap.setBounds(objectManager.getBounds());
					});*/
				// 	 function getVisibleObjects() {
    //   return objectManager.objects.getAll()
    //   .filter(function (obj, index) {
    //       return ymaps.util.bounds.containsPoint(
    //         myMap.getBounds(),
    //         obj.geometry.coordinates
    //       )
    //   })
    // }
			// myMap.events.add('boundschange', function () {
   //          var objects = getVisibleObjects();
   //              console.log('total objects: ', objects.length);
   //              objects.forEach(function (obj) {
   //              console.log('objectId: ', obj.id);
   //              console.log('objectId: ', obj.id ==763);
   //              console.log(obj.geometry.coordinates);
   //              console.log(obj);
   //              // let myMap = new ymaps.Map(map, {center: [55.76, 37.64], zoom: 15});

   //              });
   //          });

			});
	    });
	}





}