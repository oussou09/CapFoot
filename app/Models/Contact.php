<?php

namespace App\Models;

use App\Models\Receiving;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    use HasFactory;

    protected $table = 'contacts';

    protected $fillable = [
        'fullname',
        'phone',
    ];

    public function reservations()
    {
        return $this->hasMany(Receiving::class);
    }
}

