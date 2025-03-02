'use client'
import { useState } from 'react'
import axios from 'axios'
import Tasks from './Tasks'

const TaskModal = ({ isOpen, closeModal, list }) => {
    if (!isOpen) return null


    // States for form fields
    const [title, setTitle] = useState('')
    const [priority, setPriority] = useState('medium') // Default priority
    const [description, setDescription] = useState('')
    const [file, setFile] = useState(null)
    const [loading, setLoading] = useState(false)
    const [tasksUpdated, setTasksUpdated] = useState(false)
    // Handle file selection
    const handleFileChange = (e) => {
        setFile(e.target.files[0])
    }

    // Handle form submission using Axios
    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!title || !priority || !description || !file) {
            console.log("Title: ", title, "Priority: ", priority, "Description: ", description, "File: ", file);

            alert('Please fill in all fields!')
            return
        }

        setLoading(true)


        const formData = new FormData()
        formData.append('list_id', list.id) // Send the list ID
        formData.append('title', title)
        formData.append('priority', priority)
        formData.append('description', description)
        formData.append('file', file)

        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/list-tasks`,
                formData,
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'multipart/form-data',
                    },
                    withCredentials: true,
                }
            )

            if (response.status === 201) {
                alert('Task added successfully!')
                setTitle('')
                setPriority('medium')
                setDescription('')
                setFile(null)
                setTasksUpdated((prev) => !prev)
            }
        } catch (error) {

            alert('Something went wrong!')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white w-[80vw] max-h-[80vh] p-6 rounded-lg shadow-lg overflow-y-auto relative">

                {/* Close Button Positioned at the Top-Right Inside the Modal */}
                <button
                    type="button"
                    onClick={closeModal}
                    className="absolute top-2 right-2 bg-gray-500 text-white px-3 py-1 rounded-md"
                >
                    ✕
                </button>
                <h2 className="text-xl font-bold mb-4">Add Task</h2>
                <form className="flex flex-wrap items-center gap-4" onSubmit={handleSubmit}>
                    <div className="flex-1">
                        <label className="block font-semibold">Task Title:</label>
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="border p-2 rounded-md w-full" required />
                    </div>

                    <div className="flex-1">
                        <label className="block font-semibold">Priority:</label>
                        <select value={priority} onChange={(e) => setPriority(e.target.value)} className="border p-2 rounded-md w-full" required>
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>

                    <div className="flex-1 mt-[0.5%]">
                        <label className="block font-semibold">Description:</label>
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="border p-2 rounded-md w-full" rows="1" required></textarea>
                    </div>

                    <div className="flex-1">
                        <label className="block font-semibold">Upload File:</label>
                        <input
                            type="file"
                            onChange={handleFileChange}
                            className="border p-2 rounded-md w-full"
                            key={file ? file.name : 'file-input'}

                        />
                        {file && <p className="text-sm text-gray-600">Selected: {file.name}</p>}
                    </div>

                    <div className="flex justify-end w-full mt-4">

                        <button type="submit" disabled={loading} className={`px-4 py-2 rounded-md text-white ${loading ? 'bg-gray-400' : 'bg-blue-500'}`}>{loading ? 'Adding...' : 'Add Task'}</button>
                    </div>
                </form>
                <Tasks listId={list.id} tasksUpdated={tasksUpdated} />
                <div className="flex justify-end w-full mt-4">

                    <button type="button" onClick={closeModal} className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2">Close</button>
                </div>
            </div>
        </div>

    )
}

export default TaskModal
