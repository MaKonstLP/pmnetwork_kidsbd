<?php
namespace app\modules\arenda\controllers;

use Yii;
use backend\models\Filter;
use common\models\GorkoApiTest;
use common\models\Slices;
use common\models\SlicesExtended;
use frontend\modules\arenda\models\ElasticItems;
use yii\web\Controller;

class TestController extends Controller
{
	public function actionSendmessange()
	{
		$to = ['zadrotstvo@gmail.com'];
		$subj = "Тестовая заявка";
		$msg = "Тестовая заявка";
		$message = $this->sendMail($to,$subj,$msg);
		var_dump($message);
		exit;
	}

	public function actionIndex()
	{
		GorkoApiTest::renewAllData([
			[
				'params' => 'city_id=4400&type_id=1&type=30,11,17,14',
				'watermark' => '/var/www/pmnetwork/pmnetwork/frontend/web/img/watermark.png'
			]			
		]);
	}

	public function actionTest()
	{
		GorkoApiTest::showOne([
			[
				'params' => 'city_id=4400&type_id=1&type=30,11,17,14',
				'watermark' => '/var/www/pmnetwork/pmnetwork/frontend/web/img/watermark.png'
			]
		]);
	}

	public function actionRenewelastic()
	{
		ElasticItems::refreshIndex();
	}

	public function actionSoftrenewelastic()
	{
		ElasticItems::softRefreshIndex();
	}

	public function actionCreateindex()
	{
		ElasticItems::softRefreshIndex();
	}

	public function actionImgload()
	{
		//header("Access-Control-Allow-Origin: *");
		$curl = curl_init();
		$file = '/var/www/pmnetwork/pmnetwork_konst/frontend/web/img/favicon.png';
		$mime = mime_content_type($file);
		$info = pathinfo($file);
		$name = $info['basename'];
		$output = curl_file_create($file, $mime, $name);
		$params = [
			//'mediaId' => 55510697,
			'url'=>'https://lh3.googleusercontent.com/XKtdffkbiqLWhJAWeYmDXoRbX51qNGOkr65kMMrvhFAr8QBBEGO__abuA_Fu6hHLWGnWq-9Jvi8QtAGFvsRNwqiC',
			'token'=> '4aD9u94jvXsxpDYzjQz0NFMCpvrFQJ1k',
			'watermark' => $output,
			'hash_key' => 'svadbanaprirode'
		];
		curl_setopt($curl, CURLOPT_URL, 'https://api.gorko.ru/api/v2/tools/mediaToSatellite');
	    curl_setopt($curl, CURLOPT_RETURNTRANSFER,true);
	    curl_setopt($curl, CURLOPT_ENCODING, '');
	    curl_setopt($curl, CURLOPT_POST, true);
	    curl_setopt($curl, CURLOPT_POSTFIELDS, $params);

	    
		echo '<pre>';
	    $response = curl_exec($curl);

	    print_r(json_decode($response));
	    curl_close($curl);

	    //echo '<pre>';
	    
	    //echo '<pre>';
	}

	public function actionCustom(){
		// $filter_model = Filter::find()->with('items')->asArray()->all();

		// foreach ($filter_model[1]['items'] as $key => $value) {
			// echo 'rest_type ' . $this->translit($value['text']) . ' ' . $value['text'] . ' ' . '{rest_type:' . $value['value'] . '}<br/>';
		// 	echo $this->translit($value['text']) . ' ' . $value['text'] . '<br/>';
		// }
		
		// echo '<pre>';
		// print_r($filter_model[0]['items']);

		// $slices = Slices::find()->all();

		foreach ($slices as $slice){
			// $extended = new SlicesExtended();
			// $extended->alias = $slice->alias;
			// $extended->name = $slice->h1;

			// $extended = SlicesExtended::find()->where(['alias' => $slice->alias])->one();
			// $extended->type = $slice->type;

			// $extended->save();
		}

		exit;
	}

	private function translit($s) {
		$s = (string) $s; // преобразуем в строковое значение
		$s = strip_tags($s); // убираем HTML-теги
		$s = str_replace(array("\n", "\r"), " ", $s); // убираем перевод каретки
		$s = preg_replace("/\s+/", ' ', $s); // удаляем повторяющие пробелы
		$s = trim($s); // убираем пробелы в начале и конце строки
		$s = function_exists('mb_strtolower') ? mb_strtolower($s) : strtolower($s); // переводим строку в нижний регистр (иногда надо задать локаль)
		$s = strtr($s, array('а'=>'a','б'=>'b','в'=>'v','г'=>'g','д'=>'d','е'=>'e','ё'=>'e','ж'=>'j','з'=>'z','и'=>'i','й'=>'y','к'=>'k','л'=>'l','м'=>'m','н'=>'n','о'=>'o','п'=>'p','р'=>'r','с'=>'s','т'=>'t','у'=>'u','ф'=>'f','х'=>'h','ц'=>'c','ч'=>'ch','ш'=>'sh','щ'=>'shch','ы'=>'y','э'=>'e','ю'=>'yu','я'=>'ya','ъ'=>'','ь'=>''));
		$s = preg_replace("/[^0-9a-z-_ ]/i", "", $s); // очищаем строку от недопустимых символов
		$s = str_replace(" ", "-", $s); // заменяем пробелы знаком минус
		return $s; // возвращаем результат
	}

	private function sendMail($to,$subj,$msg) {
        $message = Yii::$app->mailer->compose()
            ->setFrom(['svadbanaprirode@yandex.ru' => 'Свадьба на природе'])
            ->setTo($to)
            ->setSubject($subj)
            //->setTextBody('Plain text content')
            ->setHtmlBody($msg);
        //echo '<pre>';
        //print_r($message);
        //exit;
        if (count($_FILES) > 0) {
            foreach ($_FILES['files']['tmp_name'] as $k => $v) {
                $message->attach($v, ['fileName' => $_FILES['files']['name'][$k]]);
            }
        }
        return $message->send();
    }
}