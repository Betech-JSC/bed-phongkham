<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TreatmentResult extends Model
{
    use HasFactory;

    protected $fillable = [
        'patient_title',
        'before_image',
        'after_image',
        'diagnosis',
        'outcome',
        'detailed_case',
        'is_featured',
        'meta_title',
        'meta_description',
    ];
}
