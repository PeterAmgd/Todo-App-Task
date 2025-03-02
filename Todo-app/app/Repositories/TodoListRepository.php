<?php
namespace App\Repositories;

use App\Models\TodoList;

class TodoListRepository
{
    public function all($userId) { return TodoList::where('user_id', $userId)->get(); }
    public function find($id) { return TodoList::find($id); }
    public function create(array $data) { return TodoList::create($data); }
    public function update($id, array $data) { return TodoList::where('id', $id)->update($data); }
    public function delete($id) { return TodoList::destroy($id); }
}

