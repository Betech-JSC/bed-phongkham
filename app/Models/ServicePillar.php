<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ServicePillar extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'tagline',
        'description',
        'icon_name',
        'order',
    ];

    public function services(): HasMany
    {
        return $this->hasMany(Service::class)->orderBy('id');
    }
}
