'use client'
import { useState } from 'react'
import axios from 'axios'

const TodoList = ({ onAddTodo }) => {
  const [todo, setTodo] = useState('')
  const [errors, setErrors] = useState([])

  const addTodo = async () => {
    if (!todo.trim()) return

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/lists`,
        { name: todo },
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
          },
          withCredentials: true,
          xsrfCookieName: 'XSRF-TOKEN',
          xsrfHeaderName: 'X-XSRF-TOKEN',
        }
      )

      if (response.status === 201) {
        onAddTodo(response.data) // Pass the new todo back to the parent
        

        setTodo('') // Reset the todo input
      } else {
        console.error('Failed to add todo')
      }
    } catch (error) {
      setErrors([error.message || 'An error occurred'])
      console.error('Error adding todo:', error)
    }
  }

  return (
    <div className="max-w-xl mx-auto mt-10 bg-gray-100 p-8 rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold text-center mb-4">Todo List</h2>
      {errors.length > 0 && (
        <div className="bg-red-100 text-red-700 p-4 rounded-md mb-4">
          <ul>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}
      <div className="flex mb-4">
        <input
          type="text"
          className="border border-gray-300 p-2 rounded-l-md w-full"
          placeholder="Add a new task"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <button
          onClick={addTodo}
          className="bg-blue-500 text-white p-2 rounded-r-md hover:bg-blue-600"
        >
          Add
        </button>
      </div>
    </div>
  )
}

export default TodoList
