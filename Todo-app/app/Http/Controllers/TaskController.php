<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\TaskService;
use Illuminate\Support\Facades\Log;

class TaskController extends Controller
{
    //
    protected $service;
    public function __construct(TaskService $service)
    {
        $this->service = $service;
    }

    public function show($listId)
    {
        $tasks = $this->service->getTasks($listId);
        return response()->json($tasks, 200);
    }

    public function store(Request $request)
    {
        try {
            // Validate request
            $data = $request->validate([
                'title'    => 'required|string|max:255',
                'priority' => 'required|in:low,medium,high',
                'description' => 'nullable|string',
                'file'     => 'nullable|file|mimes:pdf|max:2048',
            ]);

            // Handle file upload
            if ($request->hasFile('file')) {
                $file = $request->file('file');
                $data['file_path'] = $file->store('tasks', 'public'); // Save in storage/app/public/tasks
            }

            $data['list_id'] = $request->list_id;
            // Create task via service
            $task = $this->service->createTask($data);

            return response()->json([
                'message' => 'Task created successfully!',
                'task'    => $task
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Something went wrong!',
                'error'   => $e->getMessage()
            ], 500);
        }
    }

    public function updateTask(Request $request, $id)
    {

        $validatedData = $request->validate([
            'list_id'     => 'sometimes|exists:lists,id',
            'title'       => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'priority'    => 'sometimes',
            'file_path'   => 'nullable|file|mimes:pdf|max:2048',
        ]);

        if ($request->hasFile('file_path')) {
            $file = $request->file('file_path');
            $validatedData['file_path'] = $file->store('tasks', 'public');
        }
        $updatedTask = $this->service->updateTask($id, $validatedData);

        return response()->json([
            'message' => 'Task updated successfully',
            'task'    => $updatedTask
        ]);
    }
    public function destroy($id)
    {
        return response()->json($this->service->deleteTask($id));
    }
}
