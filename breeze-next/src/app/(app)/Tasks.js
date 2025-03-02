'use client'
import { useEffect, useState } from 'react'
import axios from 'axios'

const Tasks = ({ listId , tasksUpdated }) => {
    const [tasks, setTasks] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [editingTask, setEditingTask] = useState(null)
    const [formData, setFormData] = useState({ title: '', priority: 'low', description: '', file: null })

    useEffect(() => {
        if (!listId) return
        fetchTasks()
    }, [listId , tasksUpdated])

    const fetchTasks = async () => {
        setLoading(true)
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/list-tasks/${listId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                withCredentials: true,
            })
            setTasks(response.data)
        } catch (err) {
            setError('Failed to fetch tasks')
        }
        setLoading(false)
    }

    const handleDelete = async (taskId) => {
        if (!confirm('Are you sure you want to delete this task?')) return
        try {
            await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/list-tasks/${taskId}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'multipart/form-data',
                    'X-Requested-With': 'XMLHttpRequest',
                },
                withCredentials: true,
                xsrfCookieName: 'XSRF-TOKEN',
                xsrfHeaderName: 'X-XSRF-TOKEN',
            })
            setTasks(tasks.filter(task => task.id !== taskId))
        } catch (err) {
            alert('Error deleting task')
        }
    }

    const handleEdit = (task) => {
        setEditingTask(task.id)
        setFormData({
            title: task.title,
            priority: task.priority,
            description: task.description,
            file: task.file || null
        })
    }
    const handleUpdate = async (taskId) => {
        const formDataToSend = new FormData()

        formDataToSend.append('title', formData.title)
        formDataToSend.append('priority', formData.priority)
        formDataToSend.append('description', formData.description)
        if (formData.file) formDataToSend.append('file_path', formData.file)

        try {
            await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/list-tasks/update-task/${taskId}`, formDataToSend, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'multipart/form-data',
                    'X-Requested-With': 'XMLHttpRequest',
                },
                withCredentials: true,
                xsrfCookieName: 'XSRF-TOKEN',
                xsrfHeaderName: 'X-XSRF-TOKEN',
            })
            fetchTasks()
            setEditingTask(null)
        } catch (err) {

            alert('Error updating task')
        }
    }



    return (
        <div className="mt-4 max-h-[60vh] overflow-y-auto">
            {loading && <p>Loading tasks...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {tasks.map((task) => (
                <div key={task.id} className="flex items-center border p-2 rounded-md mb-2 space-x-4">

                    {/* Task Details (Editable Form) */}
                    {editingTask === task.id ? (
                        <div className="flex-1">
                            <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="border p-2 rounded-md w-full" />
                            <select value={formData.priority} onChange={(e) => setFormData({ ...formData, priority: e.target.value })} className="border p-2 rounded-md w-full mt-2">
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>

                            <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="border p-2 rounded-md w-full mt-2" rows="2"></textarea>
                            <input type="file" onChange={(e) => setFormData({ ...formData, file: e.target.files[0] })} className="border p-2 rounded-md w-full mt-2" />

                            <button onClick={() => handleUpdate(task.id)} className="bg-green-500 text-white px-3 py-1 rounded-md mt-2">Save</button>
                            <button onClick={() => setEditingTask(null)} className="bg-gray-500 text-white px-3 py-1 rounded-md ml-2">Cancel</button>
                        </div>
                    ) : (
                        <div className="flex-1 flex items-center gap-4">
                            <h3 className="font-semibold w-1/3">{task.title}</h3>
                            <span className="text-sm text-blue-500 w-1/6 ">{task.priority}</span>
                            <p className="text-sm text-gray-600 w-1/3 truncate text-center">{task.description}</p>

                        </div>
                    )}

                    {/* File Display */}
                    {task.file_path && (
                        <a
                            href={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/`+task.file_path}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 underline w-1/6 text-center"
                        >
                            View File
                        </a>
                    )}

                    {/* Actions */}
                    <div className="flex space-x-2">
                        {editingTask !== task.id && (
                            <button onClick={() => handleEdit(task)} className="bg-yellow-500 text-white px-2 py-1 rounded-md">
                                Edit
                            </button>
                        )}
                        <button onClick={() => handleDelete(task.id)} className="bg-red-500 text-white px-2 py-1 rounded-md">
                            Delete
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Tasks
