<?php

namespace frontend\modules\kidsbd\models\api;

use Yii;
use yii\base\BaseObject;
use yii\helpers\ArrayHelper;
use common\models\Restaurants;
use common\models\elastic\ItemsFilterElastic;

class MapAll extends BaseObject{

	public $coords;

	public function __construct($elastic_model, $subdomain_id, $filter = [], $type = 'restaurants', $url = '/ploshhadki/', $link_type = 'id') {

		$items = new ItemsFilterElastic($filter, 9000, 1, false, $type, $elastic_model, false, false, $subdomain_id);
		$this->coords = [
			'type' => 'FeatureCollection',
			'features' => [],
			'filter' => $filter
		];

		foreach ($items->items as $key => $item) {
			switch ($type) {
				case 'restaurants':
					foreach ($item->restaurant_images as $key => $image) {
						$map_preview = $image['subpath'];
						break;
					}
					array_push($this->coords['features'], [
						'type' => "Feature",
			            'id' => $item->id,
			            'geometry' => [
			              'type' => "Point",
			              'coordinates' => [$item->restaurant_latitude, $item->restaurant_longitude]
			            ],
			            'properties' => [
			              'balloonContent' => $item->restaurant_address,
			              'organization' => $item->restaurant_name,
			              'address' => $item->restaurant_address,
			              'img' => $map_preview,
			              'clusterCaption' => $item->restaurant_name,
			              'link' => $link_type == 'id' ? $url.$item->id.'/' : $url.$item->restaurant_slug.'/',
			            ]
					]);
					break;
				case 'rooms':
					foreach ($item->images as $key => $image) {
						$map_preview = $image['subpath'];
						break;
					}
					array_push($this->coords['features'], [
						'type' => "Feature",
			            'id' => $item->id,
			            'geometry' => [
			              'type' => "Point",
			              'coordinates' => [$item->restaurant_latitude, $item->restaurant_longitude]
			            ],
			            'properties' => [
			              'balloonContent' => $item->restaurant_address,
			              'organization' => $item->restaurant_name.', '.$item->name,
			              'address' => $item->restaurant_address,
			              'img' => $map_preview,
			              'clusterCaption' => $item->name,
			              'link' => '/catalog/hall-'.$item->slug.'/',
			            ]
					]);
					break;
			}			
		}		
	}

}