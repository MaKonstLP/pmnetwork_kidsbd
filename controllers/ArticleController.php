<?php
namespace app\modules\arenda\controllers;

use Yii;
use yii\base\InvalidParamException;
use yii\web\BadRequestHttpException;
use yii\web\Controller;
use yii\filters\VerbFilter;
use yii\filters\AccessControl;
use frontend\modules\arenda\models\Breadcrumbs;

class ArticleController extends Controller
{

	public function actionIndex()
	{

		$seo['breadcrumbs'] = Breadcrumbs::get_breadcrumbs(3);

		return $this->render('index.twig', array(
			'items' => $items->items,
			'filter' => $filter,
			'pagination' => $pagination,
			'seo' => $seo,
			'count' => $items->total
		));
	}
}