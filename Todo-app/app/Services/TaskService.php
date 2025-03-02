<?php
namespace App\Services;

use App\Repositories\TaskRepository;

class TaskService
{
    protected $repository;
    public function __construct(TaskRepository $repository) { $this->repository = $repository; }
    public function getTasks($listId) { return $this->repository->all($listId); }
    public function createTask($data) { return $this->repository->create($data); }
    public function updateTask($id, $data) { return $this->repository->update($id, $data); }
    public function deleteTask($id) { return $this->repository->delete($id); }
}
