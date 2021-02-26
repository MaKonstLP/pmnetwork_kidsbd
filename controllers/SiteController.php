<?php
namespace app\modules\arenda\controllers;

use Yii;
use yii\base\InvalidArgumentException;
use yii\web\BadRequestHttpException;
use yii\web\Controller;
use frontend\modules\arenda\models\ElasticItems;
use common\widgets\FilterWidget;
use common\models\elastic\ItemsWidgetElastic;
use common\models\Seo;
use common\models\Filter;
use common\models\Slices;
use common\models\SlicesExtended;

class SiteController extends Controller
{
    //public function getViewPath()
    //{
    //    return Yii::getAlias('@app/modules/svadbanaprirode/views/site');
    //}

    public function actionIndex()
    {
        $elastic_model = new ElasticItems;

        $filter_model = Filter::find()->with('items')->all();
        $slices_model = Slices::find()->all();

        $itemsWidget = new ItemsWidgetElastic;
        $apiMain = $itemsWidget->getMain($filter_model, $slices_model, 'rooms', $elastic_model);

        $seo = new Seo('index', 1, $apiMain['total']);
        $this->setSeo($seo->seo);

        $filter = FilterWidget::widget([
            'filter_active' => [],
            'filter_model' => $filter_model
        ]);

        $slicesForTag = SlicesExtended::find()->where(['type' => 'prazdnik'])->all();
        $slicesForListing = SlicesExtended::find()->where(['alias' => ['banketnyy-zal', 'konferenc-zal', 'tancevalnyy-zal', 'den-rojdeniya', 'vypusknoy', 'aktovye-zaly', 'svadba', 'veranda']])->all();

        // echo '<pre>';
        // print_r($slicesForTag);
        // exit;

        return $this->render('index.twig', [
            'filter' => $filter,
            'widgets' => $apiMain['widgets'],
            'count' => $apiMain['total'],
            'seo' => $seo->seo,
            'slices_for_tag' => $slicesForTag,
            'slices_for_listing' => $slicesForListing,
        ]);
    }

    public function actionError()
    {
        $elastic_model = new ElasticItems;

        $filter_model = Filter::find()->with('items')->all();
        $slices_model = Slices::find()->all();

        $itemsWidget = new ItemsWidgetElastic;
        $apiMain = $itemsWidget->getMain($filter_model, $slices_model, 'rooms', $elastic_model);

        $seo = new Seo('error', 1, 0);
        $this->setSeo($seo->seo);

        $filter = FilterWidget::widget([
            'filter_active' => [],
            'filter_model' => $filter_model
        ]);

        return $this->render('error.twig', [
            'filter' => $filter,
            'widgets' => $apiMain['widgets'],
            'count' => $apiMain['total'],
            'seo' => $seo->seo,
        ]);
    }

    private function setSeo($seo){
        $this->view->title = $seo['title'];
        $this->view->params['desc'] = $seo['description'];
        $this->view->params['kw'] = $seo['keywords'];
    }
}
