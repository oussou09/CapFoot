<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Time_at extends Model
{
    use HasFactory;

    protected $table = 'time_at';

    protected $fillable = [
        'time_day',
        'time_hour',
    ];

    public function reservations()
    {
        return $this->hasMany(Receiving::class);
    }
}

