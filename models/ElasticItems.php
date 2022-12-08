<?php
namespace frontend\modules\kidsbd\models;

use Yii;
use common\models\Restaurants;
use common\models\RestaurantsTypes;
use yii\helpers\ArrayHelper;
use common\models\Subdomen;
use common\models\RestaurantsSpec;
use common\models\RestaurantsSpecial;
use common\models\RestaurantsExtra;
use common\models\RestaurantsLocation;
use common\models\ImagesModule;
use common\components\AsyncRenewImages;
use common\widgets\ProgressWidget;

class ElasticItems extends \yii\elasticsearch\ActiveRecord
{
    public function attributes()
    {
        return [
            'restaurant_id',
            'restaurant_city_id',
            'restaurant_gorko_id',
            'restaurant_price',
            'restaurant_min_capacity',
            'restaurant_max_capacity',
            'restaurant_district',
            'restaurant_parent_district',
            'restaurant_alcohol',
            'restaurant_firework',
            'restaurant_name',
            'restaurant_slug',
            'restaurant_address',
            'restaurant_cover_url',
            'restaurant_latitude',
            'restaurant_longitude',
            'restaurant_own_alcohol',
            'restaurant_cuisine',
            'restaurant_parking',
            'restaurant_extra_services',
            'restaurant_payment',
            'restaurant_special',
            'restaurant_phone',
            'restaurant_location',
            'restaurant_types',
            'restaurant_spec',
            'restaurant_commission',
            'restaurant_cake',
            'restaurant_photographer',
            'restaurant_host',
            'restaurant_own_non_alcoholic',
            'restaurant_rating',
            'id',
            'gorko_id',
            'restaurant_id',
            'price',
            'capacity_reception',
            'capacity',
            'type',
            'rent_only',
            'banquet_price',
            'bright_room',
            'separate_entrance',
            'type_name',
            'name',
            'slug',
            'features',
            'cover_url',
            'images',
            'description'
        ];
    }

    public static function index() {
        return 'pmn_kidsbd_rooms';
    }
    
    public static function type() {
        return 'items';
    }

    /**
     * @return array This model's mapping
     */
    public static function mapping()
    {
        return [
            static::type() => [
                'properties' => [
                    'restaurant_id'                    => ['type' => 'integer'],
                    'restaurant_gorko_id'              => ['type' => 'integer'],
                    'restaurant_city_id'               => ['type' => 'integer'],
                    'restaurant_price'                 => ['type' => 'integer'],
                    'restaurant_min_capacity'          => ['type' => 'integer'],
                    'restaurant_max_capacity'          => ['type' => 'integer'],
                    'restaurant_district'              => ['type' => 'integer'],
                    'restaurant_parent_district'       => ['type' => 'integer'],
                    'restaurant_alcohol'               => ['type' => 'integer'],
                    'restaurant_firework'              => ['type' => 'integer'],
                    'restaurant_cake'                  => ['type' => 'integer'],
                    'restaurant_photographer'          => ['type' => 'integer'],
                    'restaurant_host'                  => ['type' => 'integer'],
                    'restaurant_own_non_alcoholic'     => ['type' => 'integer'],
                    'restaurant_rating'             => ['type' => 'integer'],
                    'restaurant_name'                  => ['type' => 'text'],
                    'restaurant_address'               => ['type' => 'text'],
                    'restaurant_slug'                  => ['type' => 'keyword'],
                    'restaurant_cover_url'             => ['type' => 'text'],
                    'restaurant_latitude'              => ['type' => 'text'],
                    'restaurant_longitude'             => ['type' => 'text'],
                    'restaurant_own_alcohol'           => ['type' => 'text'],
                    'restaurant_cuisine'               => ['type' => 'text'],
                    'restaurant_parking'               => ['type' => 'text'],
                    'restaurant_extra_services'        => ['type' => 'text'],
                    'restaurant_payment'               => ['type' => 'text'],
                    'restaurant_special'               => ['type' => 'text'],
                    'restaurant_phone'                 => ['type' => 'text'],
                    'restaurant_types'              => ['type' => 'nested', 'properties' =>[
                        'id'                            => ['type' => 'integer'],
                        'name'                          => ['type' => 'text'],
                    ]],
                    'restaurant_spec'                 => ['type' => 'nested', 'properties' => [
                        'id'                             => ['type' => 'integer'],
                        'name'                           => ['type' => 'text'],
                    ]],
                    'restaurant_location'              => ['type' => 'nested', 'properties' =>[
                        'id'                            => ['type' => 'integer'],
                    ]],
                    'restaurant_commission'            => ['type' => 'integer'],
                    'id'                    => ['type' => 'integer'],
                    'gorko_id'              => ['type' => 'integer'],
                    'restaurant_id'         => ['type' => 'integer'],
                    'price'                 => ['type' => 'integer'],
                    'capacity_reception'    => ['type' => 'integer'],
                    'capacity'              => ['type' => 'integer'],
                    'type'                  => ['type' => 'integer'],
                    'rent_only'             => ['type' => 'integer'],
                    'banquet_price'         => ['type' => 'integer'],
                    'bright_room'           => ['type' => 'integer'],
                    'separate_entrance'     => ['type' => 'integer'],
                    'type_name'             => ['type' => 'text'],
                    'name'                  => ['type' => 'text'],
                    'slug'                  => ['type' => 'keyword'],
                    'features'              => ['type' => 'text'],
                    'cover_url'             => ['type' => 'text'],
                    'description'           => ['type' => 'text'],
                    'images'                => ['type' => 'nested', 'properties' =>[
                        'id'                => ['type' => 'integer'],
                        'sort'              => ['type' => 'integer'],
                        'realpath'          => ['type' => 'text'],
                        'subpath'           => ['type' => 'text'],
                        'waterpath'         => ['type' => 'text'],
                        'timestamp'         => ['type' => 'text'],
                    ]]
                ]
            ],
        ];
    }

    /**
     * Set (update) mappings for this model
     */
    public static function updateMapping()
    {
        $db = static::getDb();
        $command = $db->createCommand();
        $command->setMapping(static::index(), static::type(), static::mapping());
    }

    /**
     * Create this model's index
     */
    public static function createIndex()
    {
        $db = static::getDb();
        $command = $db->createCommand();
        $command->createIndex(static::index(), [
            'settings' => [
                'number_of_replicas' => 0,
                'number_of_shards' => 1,
            ],
            'mappings' => static::mapping(),
        ]);
    }

    /**
     * Delete this model's index
     */
    public static function deleteIndex()
    {
        $db = static::getDb();
        $command = $db->createCommand();
        $command->deleteIndex(static::index(), static::type());
    }

    public static function refreshIndex($params) {
        $res = self::deleteIndex();
        $res = self::updateMapping();
        $res = self::createIndex();
        $res = self::updateIndex($params);
    }

    public static function updateIndex($params) {
        $connection = new \yii\db\Connection($params['main_connection_config']);
        $connection->open();
        Yii::$app->set('db', $connection);

        $restaurants_types = RestaurantsTypes::find()
            ->limit(100000)
            ->asArray()
            ->all();
        $restaurants_types = ArrayHelper::index($restaurants_types, 'value');

        $restaurants_specials = RestaurantsSpecial::find()
            ->limit(100000)
            ->asArray()
            ->all();
        $restaurants_specials = ArrayHelper::index($restaurants_specials, 'value');

        $restaurants_extra = RestaurantsExtra::find()
            ->limit(100000)
            ->asArray()
            ->all();
        $restaurants_extra = ArrayHelper::index($restaurants_extra, 'value');

        $restaurants_spec = RestaurantsSpec::find()
            ->limit(100000)
            ->asArray()
            ->all();
        $restaurants_spec = ArrayHelper::index($restaurants_spec, 'id');

        $restaurants_location = RestaurantsLocation::find()
            ->limit(100000)
            ->asArray()
            ->all();
        $restaurants_location = ArrayHelper::index($restaurants_location, 'value');

        $restaurants = Restaurants::find()
            ->with('rooms')
            ->with('imagesext')
            ->with('subdomen')
            ->where(['active' => 1, 'commission' => 2])
            ->limit(100000)
            ->all();

        $connection = new \yii\db\Connection($params['site_connection_config']);
        $connection->open();
        Yii::$app->set('db', $connection);

        $images_module = ImagesModule::find()
            ->limit(500000)
            ->asArray()
            ->all();
        $images_module = ArrayHelper::index($images_module, 'gorko_id');

        $rest_count = count($restaurants);
        $rest_iter = 0;
        foreach ($restaurants as $restaurant) {
            foreach ($restaurant->rooms as $room) {
                $res = self::addRecord($room, $restaurant, $restaurants_types, $restaurants_spec, $restaurants_specials ,$restaurants_extra, $restaurants_location, $images_module, $params);
            }
            echo ProgressWidget::widget(['done' => $rest_iter++, 'total' => $rest_count]);
        }
        echo 'Обновление индекса '. self::index().' '. self::type() .' завершено<br>';
    }

    public static function softRefreshIndex() {
        $restaurants = Restaurants::find()
            ->with('rooms')
            ->limit(100000)
            ->where(['in_elastic' => 0, 'active' => 1])
            ->all($connection);

        foreach ($restaurants as $restaurant) {
            foreach ($restaurant->rooms as $room) {
                $res = self::addRecord($room, $restaurant);
            }  

            $restaurant->in_elastic = 1;
            $restaurant->save();
        }
        echo 'Обновление индекса '. self::index().' '. self::type() .' завершено<br>';
    }

    public static function getTransliterationForUrl($name)
    {
        $latin = array('-', "Sch", "sch", 'Yo', 'Zh', 'Kh', 'Ts', 'Ch', 'Sh', 'Yu', 'ya', 'yo', 'zh', 'kh', 'ts', 'ch', 'sh', 'yu', 'ya', 'A', 'B', 'V', 'G', 'D', 'E', 'Z', 'I', 'Y', 'K', 'L', 'M', 'N', 'O', 'P', 'R', 'S', 'T', 'U', 'F', '', 'Y', '', 'E', 'a', 'b', 'v', 'g', 'd', 'e', 'z', 'i', 'y', 'k', 'l', 'm', 'n', 'o', 'p', 'r', 's', 't', 'u', 'f', '', 'y', '', 'e');
        $cyrillic = array(' ', "Щ", "щ", 'Ё', 'Ж', 'Х', 'Ц', 'Ч', 'Ш', 'Ю', 'я', 'ё', 'ж', 'х', 'ц', 'ч', 'ш', 'ю', 'я', 'А', 'Б', 'В', 'Г', 'Д', 'Е', 'З', 'И', 'Й', 'К', 'Л', 'М', 'Н', 'О', 'П', 'Р', 'С', 'Т', 'У', 'Ф', 'Ь', 'Ы', 'Ъ', 'Э', 'а', 'б', 'в', 'г', 'д', 'е', 'з', 'и', 'й', 'к', 'л', 'м', 'н', 'о', 'п', 'р', 'с', 'т', 'у', 'ф', 'ь', 'ы', 'ъ', 'э');
        return trim(
            preg_replace(
                "/(.)\\1+/",
                "$1",
                strtolower(
                    preg_replace(
                        "/[^a-zA-Z0-9-]/",
                        '',
                        str_replace($cyrillic, $latin, $name)
                    )
                )
            ),
            '-'
        );
    }

    public static function addRecord($room, $restaurant, $restaurants_types, $restaurants_spec, $restaurants_specials ,$restaurants_extra, $restaurants_location, $images_module, $params){
        if(!$restaurant->commission){
            return 'Не платный';
        }
        
        $restaurant_spec_white_list = [9];
        $restaurant_spec_rest = explode(',', $restaurant->restaurants_spec);
        if (count(array_intersect($restaurant_spec_white_list, $restaurant_spec_rest)) === 0) {
            return 'Неподходящий тип мероприятия';
        }

        $isExist = false;
        
        try{
            $record = self::get($room->gorko_id);
            if(!$record){
                $record = new self();
                $record->setPrimaryKey($room->gorko_id);
            }
            else{
                $isExist = true;
            }
        }
        catch(\Exception $e){
            $record = new self();
            $record->setPrimaryKey($room->gorko_id);
        }        

        $record->id  = $room->id;        
        $record->restaurant_id = $restaurant->id;
        $record->restaurant_city_id = $restaurant->city_id;
        $record->restaurant_gorko_id = $restaurant->gorko_id;
        $record->restaurant_price = $restaurant->price;
        $record->restaurant_min_capacity = $restaurant->min_capacity;
        $record->restaurant_max_capacity = $restaurant->max_capacity;
        $record->restaurant_district = $restaurant->district;
        $record->restaurant_parent_district = $restaurant->parent_district;
        $record->restaurant_alcohol = $restaurant->alcohol;
        $record->restaurant_firework = $restaurant->firework;
        $record->restaurant_name = $restaurant->name;
        $record->restaurant_address = $restaurant->address;
        $record->restaurant_cover_url = $restaurant->cover_url;
        $record->restaurant_latitude = $restaurant->latitude;
        $record->restaurant_longitude = $restaurant->longitude;
        $record->restaurant_own_alcohol = $restaurant->own_alcohol;
        $record->restaurant_cuisine = $restaurant->cuisine;
        $record->restaurant_parking = $restaurant->parking;
        $record->restaurant_extra_services = $restaurant->extra_services;
        $record->restaurant_payment = $restaurant->payment;
        $record->restaurant_special = $restaurant->special;
        $record->restaurant_phone = $restaurant->phone;
        $record->restaurant_commission = $restaurant->commission;
        $restaurant->rating ? $record->restaurant_rating = $restaurant->rating : $record->restaurant_rating = 90;
        
        //Отдельные сервисы для фильтрации
        $extra_services_ids = explode(',', $restaurant->extra_services_ids);
        $record->restaurant_cake = (int)in_array(3, $extra_services_ids);
        $record->restaurant_photographer = (int)in_array(1, $extra_services_ids);
        $record->restaurant_host = (int)in_array(7, $extra_services_ids);
        $special_ids = explode(',', $restaurant->special_ids);
        $record->restaurant_own_non_alcoholic = (int)in_array(39, $special_ids);

        //Тип помещения
        $restaurant_types = [];
        $restaurant_types_rest = explode(',', $restaurant->type);
        foreach ($restaurant_types_rest as $key => $value) {
            $restaurant_types_arr = [];
            $restaurant_types_arr['id'] = $value;
            $restaurant_types_arr['name'] = isset($restaurants_types[$value]['text']) ? $restaurants_types[$value]['text'] : '';
            array_push($restaurant_types, $restaurant_types_arr);
        }
        $record->restaurant_types = $restaurant_types;

        //Тип мероприятия
        $restaurant_spec = [];

        foreach ($restaurant_spec_rest as $key => $value) {
            $restaurant_spec_arr = [];
            $restaurant_spec_arr['id'] = $value;
            $restaurant_spec_arr['name'] = isset($restaurants_spec[$value]['name']) ? $restaurants_spec[$value]['name'] : '';
            array_push($restaurant_spec, $restaurant_spec_arr);
        }

        $record->restaurant_spec = $restaurant_spec;

        //Тип локации
        $restaurant_location = [];
        $restaurant_location_rest = explode(',', $restaurant->location);
        foreach ($restaurant_location_rest as $key => $value) {
            $restaurant_location_arr = [];
            $restaurant_location_arr['id'] = $value;
            array_push($restaurant_location, $restaurant_location_arr);
        }
        $record->restaurant_location = $restaurant_location;
        
        $record->id = $room->id;
        $record->gorko_id = $room->gorko_id;
        $record->restaurant_id = $room->restaurant_id;
        $record->price = $room->price;
        $record->capacity_reception = $room->capacity_reception;
        $record->capacity = $room->capacity;
        $record->type = $room->type;
        $record->rent_only = $room->rent_only;
        $record->banquet_price = $room->banquet_price;
        $record->bright_room = $room->bright_room;
        $record->separate_entrance = $room->separate_entrance;
        $record->type_name = $room->type_name;
        $record->name = $room->name;
        $record->features = $room->features;
        $record->cover_url = $room->cover_url;

        //Картинки залов
        $images = [];
        $group = array();
        foreach ($restaurant->imagesext as $value) {
            $group[$value['room_id']][] = $value;
        }
        $images_sorted = array();
        $room_ids = array();
        foreach ($group as $room_id => $images_ext) {
            $room_ids[] = $room_id;
            foreach($images_ext as $image){
                $images_sorted[$room_id][$image['event_id']][] = $image;    
            }       
        }
        $specs = [0, 1];
        $image_flag = false;
        foreach ($specs as $spec) {
            for ($i=0; $i < 20; $i++) {
                if(isset($images_sorted[$room->gorko_id]) && isset($images_sorted[$room->gorko_id][$spec]) && isset($images_sorted[$room->gorko_id][$spec][$i])){
                    $image = $images_sorted[$room->gorko_id][$spec][$i];
                    $image_arr = [];
                    $image_arr['id'] = $image['gorko_id'];
                    $image_arr['sort'] = $image['sort'];
                    $image_arr['realpath'] = $image['path'];
                    if(isset($images_module[$image['gorko_id']]) && $images_module[$image['gorko_id']]['subpath']){
                        $image_arr['subpath']   = $images_module[$image['gorko_id']]['subpath'];
                        $image_arr['waterpath'] = $images_module[$image['gorko_id']]['waterpath'];
                        $image_arr['timestamp'] = $images_module[$image['gorko_id']]['timestamp'];
                    }
                    else{
                        $queue_id = Yii::$app->queue->push(new AsyncRenewImages([
                            'gorko_id'      => $image['gorko_id'],
                            'params'        => $params,
                            'rest_flag'     => false,
                            'rest_gorko_id' => $restaurant->gorko_id,
                            'room_gorko_id' => $room->gorko_id,
                            'elastic_index' => static::index(),
                            'elastic_type'  => 'room',
                        ]));
                    }                
                    array_push($images, $image_arr);
                }
                if(count($images) > 19){
                    $image_flag = true;
                    break;
                }
            }
            if($image_flag) break;
        }
        if(count($images) == 0)
            return "Нет картинок";

        $record->images = $images;

        // restaurant slug
        if ($row = (new \yii\db\Query())->select('slug')->from('restaurant_slug')->where(['gorko_id' => $restaurant->gorko_id])->one()) {
            $record->restaurant_slug = $row['slug'];
        } else {
            $record->restaurant_slug = self::getTransliterationForUrl($restaurant->name);
            \Yii::$app->db->createCommand()->insert('restaurant_slug', ['gorko_id' => $restaurant->gorko_id, 'slug' =>  $record->restaurant_slug])->execute();
        }

        // room slug
        if ($row = (new \yii\db\Query())->select('slug')->from('restaurant_slug')->where(['gorko_id' => $room->gorko_id])->one()) {
            $record->slug = $row['slug'];
        } else {
            $slug = self::getTransliterationForUrl($room->name);
            $slug .= '-' . $restaurant->id;
            $record->slug = $slug;
            \Yii::$app->db->createCommand()->insert('restaurant_slug', ['gorko_id' => $room->gorko_id, 'slug' =>  $record->slug])->execute();
        }
        
        try{
            if(!$isExist){
                $result = $record->insert();
            }
            else{
                $result = $record->update();
            }
        }
        catch(\Exception $e){
            $result = false;
        }
        
        return $result;
    }

    public static function updateDocument($data, $id, $options = [])
    {
        $db = static::getDb();
        $command = $db->createCommand();
        if ($command->exists(static::index(), static::type(), $id)) {
            $options['retry_on_conflict'] = 3;
            $command->update(static::index(), static::type(), $id, $data, $options);
        }

        gc_collect_cycles();
    }

}