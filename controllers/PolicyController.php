<?php
namespace app\modules\kidsbd\controllers;

use Yii;
use yii\base\InvalidParamException;
use yii\web\BadRequestHttpException;
use yii\web\Controller;
use yii\filters\VerbFilter;
use yii\filters\AccessControl;

class PolicyController extends Controller
{

	public function actionIndex()
	{
		return $this->render('index.twig', array(

		));
	}
}