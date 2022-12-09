<?php
namespace app\modules\kidsbd\controllers;

use Yii;
use yii\base\InvalidParamException;
use yii\web\BadRequestHttpException;
use yii\web\Controller;
use yii\filters\VerbFilter;
use yii\filters\AccessControl;
use common\models\Rooms;
use common\models\Seo;
use common\models\elastic\ItemsWidgetElastic;
use common\models\elastic\ItemsFilterElastic;
use app\modules\kidsbd\models\ItemSpecials;
use frontend\components\Declension;
use frontend\modules\kidsbd\models\ElasticItems;
use frontend\modules\kidsbd\components\Breadcrumbs;

class ItemController extends Controller
{
	public function actionIndex($id)
	{
		$elastic_model = new ElasticItems;

        $item = ElasticItems::find()->query([
            'bool' => [
                'must' => [
                    ['match' => ['id' => $id]],
                ],
            ]
        ])->one();

//        if (empty($item)) {
//            throw new NotFoundHttpException();
//        }

//		$item = $elastic_model::get($id);

		$seo = new Seo('item', 1, 0, $item);
		$seo = $seo->seo;
		$this->setSeo($seo);

//		echo '<pre>';
//        print_r($item);
//		die();


		$seo['h1'] = [0 => $item->name, 1 => $item->restaurant_name];
		$seo['breadcrumbs'] = Breadcrumbs::getItemCrumb($item);
		$seo['address'] = $item->restaurant_address;
		$seo['desc'] = $item->restaurant_name;
		
		$changedStrings = ItemSpecials::getChangedStrings($item);
		
		$special_obj = new ItemSpecials($item->restaurant_special);
		$item->restaurant_special = $special_obj->special_arr;
//		$parking = $item->restaurant_parking . ' ' . Declension::get_num_ending($item->restaurant_parking, array('машина', 'машины', 'машин'));
		
		$itemsWidget = new ItemsWidgetElastic;
		$other_rooms = $itemsWidget->getOther($item->restaurant_id, $item->id, $elastic_model);
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
		// print_r($seo['breadcrumbs']);
		// exit;

		return $this->render('index.twig', array(
			'item' => $item,
			'queue_id' => $item->id,
			'seo' => $seo,
			'changedStrings' => $changedStrings,
			'parking' => '',
			'other_rooms' => $other_rooms,
			'similar_rooms' => $similar_rooms
		));
	}

	private function setSeo($seo){
		$this->view->title = $seo['title'];
		$this->view->params['desc'] = $seo['description'];
		$this->view->params['kw'] = $seo['keywords'];
	}
}