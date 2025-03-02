<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\TodoListService;

class TodoListController extends Controller
{
    //
    protected $service;
    public function __construct(TodoListService $service)
    {
        $this->service = $service;
    }

    public function index()
    {
        $currentUserId = auth()->id();
        $lists = $this->service->getLists($currentUserId);
        return response()->json($lists);
    }
    //create method

    public function create()
    {
        return view('lists.create');
    }

    public function store(Request $request)
    {
        // dd($request->all());
        $data = $request->validate(['name' => 'required']);
        $data['user_id'] = auth()->id();
        $list = $this->service->createList($data);
        //return list with status code 201
        return response()->json($list, 201);
    }
    public function update(Request $request, $id)
    {
        $data = $request->validate(['name' => 'required']);
        return response()->json($this->service->updateList($id, $data));
    }
    public function destroy($id)
    {
        return response()->json($this->service->deleteList($id));
    }
}
