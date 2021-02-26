<?php

namespace frontend\modules\arenda\components;

use Yii;

class Breadcrumbs {
	public static function get_breadcrumbs($level) {
		switch ($level) {
			case 1:	
				$breadcrumbs=[
					'/' => 'Аренда зала',
				];
				break;
			case 2:
				$breadcrumbs=[
					'/' => 'Аренда зала',
					'/catalog/' => 'Банкетные залы',
				];
				break;
			case 3:
				$breadcrumbs=[
					'/blog/' => 'Статьи блога'
				];
				break;
			case 'item':
				$breadcrumbs=[
					self::get_breadcrumbs(1)['/'],
					'/catalog/' => 'Правильные площадки Москвы'
				];
				break;
		}
		return $breadcrumbs;
	}
}