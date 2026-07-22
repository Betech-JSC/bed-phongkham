<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PatientVital extends Model
{
    use HasFactory;

    protected $fillable = [
        'patient_name',
        'phone',
        'systolic',
        'diastolic',
        'heart_rate',
        'notes',
        'is_flagged',
    ];

    protected $casts = [
        'is_flagged' => 'boolean',
        'systolic' => 'integer',
        'diastolic' => 'integer',
        'heart_rate' => 'integer',
    ];
}
