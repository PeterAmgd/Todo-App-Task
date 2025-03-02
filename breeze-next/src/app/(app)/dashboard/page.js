'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import TodoList from '@/app/(app)/TodoList'
import UserList from '@/app/(app)/UserList'

const Dashboard = () => {
    const [lists, setLists] = useState([])
    const [loading, setLoading] = useState(true)
    const [errors, setErrors] = useState([])

    const handleAddTodo = (newTodo) => {
        setLists((prevLists) => [...prevLists, newTodo])
    }

    const handleUpdateTodo = (index, updatedName) => {
        const updatedLists = [...lists]
        updatedLists[index].name = updatedName  // Update the name of the selected todo
        setLists(updatedLists)  // Update the state
    }

    const handleDeleteTodo = (index) => {
        const updatedLists = lists.filter((_, i) => i !== index)  // Remove the selected todo from the list
        setLists(updatedLists)  // Update the state
    }

    const fetchLists = async () => {
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/lists`, // Fetch User Lists from the backend
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`, // Add token-based auth
                    },
                    withCredentials: true,
                }
            )
            setLists(response.data)  // Update the list with the fetched data
        } catch (error) {
            setErrors([error.message || 'An error occurred while fetching lists'])
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchLists()  // Fetch the lists when the component is mounted
    }, [])

    return (
        <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 bg-white border-b border-gray-200">
                        <TodoList onAddTodo={handleAddTodo} />  {/* Pass the handleAddTodo function to TodoList */}
{console.log("List87979s: ", lists)}
                        <UserList
                            lists={lists}
                            loading={loading}
                            errors={errors}
                            onUpdateTodo={handleUpdateTodo}
                            onDeleteTodo={handleDeleteTodo}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
