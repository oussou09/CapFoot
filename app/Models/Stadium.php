<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Stadium extends Model
{
    use HasFactory;

    protected $table = 'stadiums';

    protected $fillable = [
        'stadium_name',
        'path',
        'stadium_many',
    ];

    public function reservations()
    {
        return $this->hasMany(Receiving::class);
    }
}

