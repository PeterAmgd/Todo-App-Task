<?php
namespace App\Services;

use App\Repositories\TodoListRepository;

class TodoListService
{
    protected $repository;
    public function __construct(TodoListRepository $repository) { $this->repository = $repository; }
    public function getLists($userId) { return $this->repository->all($userId); }
    public function createList($data) { return $this->repository->create($data); }
    public function updateList($id, $data) { return $this->repository->update($id, $data); }
    public function deleteList($id) { return $this->repository->delete($id); }
}
