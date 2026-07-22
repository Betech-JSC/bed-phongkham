<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Doctor extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'specialty',
        'experience',
        'avatar',
        'bio',
        'detailed_bio',
        'order',
        'is_featured',
        'meta_title',
        'meta_description',
    ];

    public function schedules()
    {
        return $this->hasMany(DoctorSchedule::class);
    }
}
