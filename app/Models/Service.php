<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Service extends Model
{
    use HasFactory;

    protected $fillable = [
        'service_pillar_id',
        'slug',
        'title',
        'pillar_title',
        'tagline',
        'description',
        'detailed_description',
        'includes',
        'candidates',
        'price',
        'estimated_time',
        'is_featured',
        'image',
        'meta_title',
        'meta_description',
    ];

    protected $casts = [
        'includes' => 'array',
        'candidates' => 'array',
        'is_featured' => 'boolean',
    ];

    public function pillar(): BelongsTo
    {
        return $this->belongsTo(ServicePillar::class, 'service_pillar_id');
    }
}
