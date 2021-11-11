<?php

namespace frontend\modules\kidsbd\models;

use Yii;

/**
 * This is the model class for table "slices".
 *
 * @property int $id
 * @property int $value
 * @property string $text
 * @property string $alias
 */
class RestaurantsTypes extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'restaurants_types';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['text', 'alias'], 'string'],
            [['id', 'value'], 'integer']
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [

        ];
    }
}