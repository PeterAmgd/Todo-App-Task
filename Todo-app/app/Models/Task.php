<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;
    protected $fillable = ['list_id', 'title','description', 'priority', 'file_path'];
    public function list()
    {
        return $this->belongsTo(TodoList::class);
    }
}
