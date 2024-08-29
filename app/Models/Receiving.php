<?php

namespace App\Models;

use App\Models\Contact;
use App\Models\Stadium;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Receiving extends Model
{
    use HasFactory;

    protected $table = 'reserving';

    protected $fillable = [
        'stadium_id',
        'contact_id',
        'time_at_id',
        'is_confirmed',
    ];

    public function stadium()
    {
        return $this->belongsTo(Stadium::class);
    }

    public function contact()
    {
        return $this->belongsTo(Contact::class);
    }

    public function timeAt()
    {
        return $this->belongsTo(Time_at::class);
    }
}

