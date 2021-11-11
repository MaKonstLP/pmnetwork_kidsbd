<?php
namespace app\modules\kidsbd\controllers;

use Yii;
use yii\base\InvalidParamException;
use yii\web\BadRequestHttpException;
use yii\web\Controller;
use yii\filters\VerbFilter;
use yii\filters\AccessControl;
use common\models\Seo;
use common\models\SlicesExtended;

class PopularController extends Controller
{

	public function actionIndex()
	{
		$seo = (new Seo('popular'))->seo;
		$this->setSeo($seo);

		$groupNamesList = explode(',', "Площадки,Лофт,Залы,Природа");
		
		$popularBlocks = SlicesExtended::getPopularBlocks($groupNamesList);

		// echo '<pre>';
		// print_r($seo);
		// exit;

		return $this->render('index.twig', array(
			'popularBlocks' => $popularBlocks,
			'seo' => $seo,
		));
	}

	public function actionAjaxMoreSlices(){
		$groupName = $_GET['groupeName'];
		
		return json_encode([
			'blockUpdate' => $this->renderPartial('/popular/block.twig', array(
				'key' => $groupName,
				'popularBlock' => SlicesExtended::getSlicesByGroupName($groupName)
			)),
		]);
	}

	private function setSeo($seo)
	{
		$this->view->title = $seo['title'];
		$this->view->params['desc'] = $seo['description'];
		$this->view->params['kw'] = $seo['keywords'];
	}

}