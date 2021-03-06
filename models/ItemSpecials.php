<?php

namespace app\modules\kidsbd\models;

use yii\base\BaseObject;
use Yii;
use common\models\Pages;

class ItemSpecials extends BaseObject{

	public $special_arr;

	public function __construct($special){

		$rev_arr = [
			'Welcome-зона' => 'Велком зона',
		];

		$this->special_arr = explode(',', $special);


		foreach ($this->special_arr as $key => $text) {
			$text = trim($text);
			$check_key = array_search($text, $rev_arr);
			if(!($check_key === false)){
				$this->special_arr[$key] = $check_key;
			}
		}

	}

	public static function getChangedStrings($item) {
		$itemPay = explode(', ', $item->restaurant_payment);
    $payOptionsString = '';
		
    foreach ($itemPay as $pay) {

      if ($pay === 'Наличный') {
        $payOptionsString .= 'Наличными, ';
      } elseif ($pay === 'Безналичный') {
        $payOptionsString .= 'безналичным способом, ';
      } elseif ($pay === 'Банковская карта') {
        $payOptionsString .= 'банковской картой (терминал), ';
      }
    }

    return substr($payOptionsString, 0, -2);;
  }

}