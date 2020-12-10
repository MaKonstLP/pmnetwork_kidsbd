<?php

namespace frontend\modules\arenda\models;

use Yii;

class Breadcrumbs {
	public static function get_breadcrumbs($level) {
		switch ($level) {
			case 1:	
				$breadcrumbs=[
					'/' => 'Свадьба на природе',
				];
				break;
			case 2:
				$breadcrumbs=[
					'/' => 'Свадьба на природе',
					'/catalog/' => 'Банкетные залы',
				];
				break;
			case 3:
				$breadcrumbs=[
					'/blog/' => 'Статьи блога'
				];
		}
		return $breadcrumbs;
	}
}