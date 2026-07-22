<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    use HasFactory;

    protected $fillable = ['patient_name', 'service_name', 'rating', 'comment', 'is_approved'];

    protected $casts = [
        'is_approved' => 'boolean',
        'rating' => 'integer',
    ];
}
