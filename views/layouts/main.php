<?php

/* @var $this \yii\web\View */
/* @var $content string */

use yii\helpers\Html;
use common\models\Subdomen;
//use frontend\modules\svadbanaprirode\assets\AppAsset;

frontend\modules\arenda\assets\AppAsset::register($this);
?>
<?php $this->beginPage() ?>
<!DOCTYPE html>
<html lang="<?= Yii::$app->language ?>">
<head>
	<?php //<meta name="robots" content="noindex, nofollow" />?>
    <meta charset="<?= Yii::$app->charset ?>">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="icon" type="image/x-icon" href="/img/zal.ico">
    <link rel="stylesheet" type="text/css" href="http://fonts.fontstorage.com/import/lato.css">
    <link rel="stylesheet" type="text/css" href="http://fonts.fontstorage.com/import/firasans.css">
    <link href="https://allfont.ru/allfont.css?fonts=lora" rel="stylesheet" type="text/css" />
    <title><?php echo $this->title ?></title>
    <?php $this->head() ?>
    <?php if (isset($this->params['desc']) and !empty($this->params['desc'])) echo "<meta name='description' content='".$this->params['desc']."'>";?>
    <?php if (isset($this->params['canonical']) and !empty($this->params['canonical'])) echo "<link rel='canonical' href='".$this->params['canonical']."'>";?>
    <?php if (isset($this->params['kw']) and !empty($this->params['kw'])) echo "<meta name='keywords' content='".$this->params['kw']."'>";?>
    <?= Html::csrfMetaTags() ?>
</head>
<body>
<?php $this->beginBody() ?>

    <div class="main_wrap">
        
        <header>
            <!--Верстка шапки сайта -->
    <div class="top">
        <a href="/">
        <div class="logo_contein">
            
        <img src="/images/logo_img.svg" class="logo">
            <p class="logo_text">Аренда залов</p>
           
        </div>
         </a>
            <div class="city">
                <img src="/images/map.svg" class="map_inc">
                <p class="city_name"><?=Yii::$app->params['subdomen_name']?></p>
                <img src="/images/dropdown_icon.svg" class="dropdown" data-city-dropdown>

            </div>
            <div class="city_select_wrapper">
             <div class="city_select_search_wrapper _hide">

                        <p class="back_to_header_menu">Назад в меню</p>

                        <h4>Выберите город</h4>

                        <?php /*<div class="input_search_wrapper">

                            <input type="search" placeholder="Название города">

                        </div> */?>

                        <div class="city_select_list">

                            <?php
                                $subdomen_list = Subdomen::find()
                                    ->where(['active' => 1])
                                    ->orderBy(['name' => SORT_ASC])
                                    ->all();

                                function createCityNameLine($city){
                                    if($city->alias){
                                        $newLine = "<p><a href='https://$city->alias.arenda.ru'>$city->name</a></p>";
                                    }
                                    else{
                                        $newLine = "<p><a href='https://arenda.ru'>$city->name</a></p>";
                                    }
                                    return $newLine;
                                }

                                function createLetterBlock($letter){
                                    $newBlock = "<div class='city_select_letter_block' data-first-letter=$letter>";
                                    return $newBlock;
                                }

                                function createCityList($subdomen_list){
                                    $citiesListResult = "";
                                    $currentLetterBlock = "";

                                    foreach ($subdomen_list as $key => $subdomen){
                                        $currentFirstLetter = substr($subdomen->name, 0, 2);
                                        if ($currentFirstLetter !== $currentLetterBlock){
                                            $currentLetterBlock = $currentFirstLetter;
                                            $citiesListResult .= "</div>";
                                            $citiesListResult .= createLetterBlock($currentLetterBlock);
                                            $citiesListResult .= createCityNameLine($subdomen);
                                        } else {
                                            $citiesListResult .= createCityNameLine($subdomen);
                                        }
                                    }
                                        
                                    $citiesListResult .= "</div>";
                                    echo substr($citiesListResult, 6);

                                }

                                createCityList($subdomen_list);
                            ?>

                        </div>
                        </div>
                    </div>
        <nav class="header_menu">
             <a href="#" class="<?if(!empty($this->params['menu']) and $this->params['menu'] == 'zaly')echo '_active';?>">Залы</a>
             <a href="#" class="<?if(!empty($this->params['menu']) and $this->params['menu'] == 'loft')echo '_active';?>">Лофт</a>
             <a href="#" class="<?if(!empty($this->params['menu']) and $this->params['menu'] == 'ploschadki')echo '_active';?>">Площадки</a>
             <a href="#" class="<?if(!empty($this->params['menu']) and $this->params['menu'] == 'zavedeniya')echo '_active';?>">Заведения</a>
             <a href="#" class="<?if(!empty($this->params['menu']) and $this->params['menu'] == 'priroda')echo '_active';?>">Природа</a>
             <a href="/popular/" class="<?if(!empty($this->params['menu']) and $this->params['menu'] == 'lutchee')echo '_active';?>">Лучшее</a>
             <a href="#" class="<?if(!empty($this->params['menu']) and $this->params['menu'] == 'vse-kategorii')echo '_active';?>">Все категории</a>
             <a href="/blog/" class="<?if(!empty($this->params['menu']) and $this->params['menu'] == 'blog')echo '_active';?>">Блог</a>
              <div class="city _mobile">
                <!-- <img src="/images/map.svg" class="map_inc"> -->
                <a href="#"><p class="city_name"><?=Yii::$app->params['subdomen_name']?></p></a>
                <img src="/images/dropdown_icon_down.svg" class="dropdown" data-city-dropdown>
            </div>
        </nav>
        <div class="right_block">
        <a href="tel: 8(846)205-78-45" class="head_tel">8 (846) 205-78-45</a>
        <div class="link_form" data-open-popup-form>
        <img src="/images/confetti.svg" class="confetti">
        <p class="for_form _link">Подберите мне зал</p>
        </div>
        </div>
                <div class="header_burger">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
    </div>
    <!--Конец верстки шапки сайта -->

    
        </header>

        <div class="content_wrap forIndex">
            <?= $content ?>
                    <div class="confetti_big"></div>
        <div class="ball_img"></div>
        </div>


        <footer>
            <div class="footer_wrap">
                <div class="footer_row">
                    <div class="footer_block _left">
                        <a href="/" class="footer_logo">
                            <div class="footer_logo_img"></div>
                            <p class="logo_text">Аренда залов</p>
                        </a>
                        <div class="footer_info">
                            <p class="footer_copy">© <?php echo date("Y");?> Аренда залов</p>
                            <a href="/privacy/" target="_blank" class="footer_pc _link">Политика конфиденциальности</a>
                        </div>                        
                    </div>
                    <div class="footer_block _right">
                        <div class="footer_phone">
                            <a href="tel:+79252382671"><p>8 (846) 205-78-45</p></a>
                        </div>
                        <div class="footer_phone_button" data-open-popup-form>
                            <img src="/images/confetti.svg" class="confetti">
                            <p class="_link">Подберите мне зал</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>

    </div>

    <div class="popup_wrap">

        <div class="popup_layout" data-close-popup></div>

        <div class="popup_form">
            <?=$this->render('//components/generic/form.twig')?>
        </div>

    </div>

<?php $this->endBody() ?>
<link href="https://fonts.googleapis.com/css?family=Montserrat:400,500,600&display=swap&subset=cyrillic" rel="stylesheet">
</body>
</html>
<?php $this->endPage() ?>
