<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    use HasFactory;

    protected $fillable = [
        'slug',
        'title',
        'category',
        'excerpt',
        'content',
        'image',
        'author',
        'read_time',
        'date',
        'is_published',
    ];

    protected $casts = [
        'is_published' => 'boolean',
    ];
}
