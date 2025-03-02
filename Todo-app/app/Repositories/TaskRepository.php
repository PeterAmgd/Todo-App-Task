<?php
namespace App\Repositories;

use App\Models\Task;

class TaskRepository
{
    public function all($listId) { return Task::where('list_id', $listId)->get(); }
    public function find($id) { return Task::find($id); }
    public function create(array $data) { return Task::create($data); }
    public function update($id, array $data) { return Task::where('id', $id)->update($data); }
    public function delete($id) { return Task::destroy($id); }
}


