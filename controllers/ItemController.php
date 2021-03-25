<?php
namespace app\modules\arenda\controllers;

use Yii;
use yii\base\InvalidParamException;
use yii\web\BadRequestHttpException;
use yii\web\Controller;
use yii\filters\VerbFilter;
use yii\filters\AccessControl;
use common\models\Rooms;
use common\models\Seo;
use app\modules\arenda\models\ItemSpecials;
use frontend\modules\arenda\models\ElasticItems;
use frontend\modules\arenda\components\Breadcrumbs;
use common\models\elastic\ItemsWidgetElastic;
use common\models\elastic\ItemsFilterElastic;

class ItemController extends Controller
{

	public function actionIndex($id)
	{
		$elastic_model = new ElasticItems;
		$item = $elastic_model::get($id);
		
		$seo = new Seo('item', 1, 0, $item);
		$seo = $seo->seo;
		$this->setSeo($seo);
		
		
		$seo['h1'] = $item->name;
		$seo['breadcrumbs'] = Breadcrumbs::getItemCrumb($item);
		$seo['address'] = $item->restaurant_address;
		$seo['desc'] = $item->restaurant_name;
		
		$changedStrings = ItemSpecials::getChangedStrings($item);
		
		
		$special_obj = new ItemSpecials($item->restaurant_special);
		$item->restaurant_special = $special_obj->special_arr;
		
		
		$itemsWidget = new ItemsWidgetElastic;
		$other_rooms = $itemsWidget->getOther($item->restaurant_id, $id, $elastic_model);
		$similar_rooms = ElasticItems::find()->limit(10)->query([
			'bool' => [
				'must' => [
					['match' => ['restaurant_district' => $item->restaurant_district]],
					['match' => ['restaurant_city_id' => \Yii::$app->params['subdomen_id']]],
				],
				'must_not' => [
					['match' => ['restaurant_id' => $item->restaurant_id]]
				],
			],
		])->all();
		shuffle($similar_rooms);
		$similar_rooms = array_slice($similar_rooms, 0, 3);

		// echo '<pre>';
		// print_r($item);
		// exit;

		return $this->render('index.twig', array(
			'item' => $item,
			'queue_id' => $id,
			'seo' => $seo,
			'changedStrings' => $changedStrings,
			'other_rooms' => $other_rooms,
			'similar_rooms' => $similar_rooms
		));
	}

	public function actionAjaxMoreOtherHalls(){
		$elastic_model = new ElasticItems;
		$item = $elastic_model::get($id);

		$itemsWidget = new ItemsWidgetElastic;
		$similar_rooms = $itemsWidget->getSimilar($item, 'rooms', $elastic_model);

		return json_encode([
			'other_rooms' => $this->renderPartial('/components/generic/listing.twig', array(
				'items' => $similar_rooms,
				'type' => 'similar',
			)),
		]);
  }

	private function setSeo($seo){
		$this->view->title = $seo['title'];
		$this->view->params['desc'] = $seo['description'];
		$this->view->params['kw'] = $seo['keywords'];
	}
}