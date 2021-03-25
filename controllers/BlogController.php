<?php
namespace app\modules\arenda\controllers;

use Yii;
use yii\base\InvalidParamException;
use yii\web\BadRequestHttpException;
use yii\web\Controller;
use yii\filters\VerbFilter;
use yii\filters\AccessControl;

// use common\models\FilterItems;
use frontend\modules\arenda\models\ElasticItems;

class BlogController extends Controller
{

	public function actionIndex()
	{
		// foreach (FilterItems::find()->where(['filter_id' => 2])->all() as $item){
		// 	echo $item->value . ' => ' . $item->text . ',</br>';
		// }

		// ElasticItems::refreshIndex();
		// echo 'конец';
		// exit;

		return $this->render('index.twig', array(

		));
	}
}