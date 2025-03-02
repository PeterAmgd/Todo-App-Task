'use client'

import { useState } from 'react'
import axios from 'axios'
import TaskModal from './TaskModal'  // Import the TaskModal component

const UserList = ({ lists, loading, errors, onUpdateTodo, onDeleteTodo }) => {
    console.log("Selected List:111111", lists);

  const [editIndex, setEditIndex] = useState(null)
  const [newName, setNewName] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)  // Modal state
  const [selectedList, setSelectedList] = useState(null) // Store the selected list data

  // Handle edit functionality
  const handleEdit = (index, name) => {
    setEditIndex(index)
    setNewName(name)
  }

  // Handle update after editing
  const handleUpdate = async () => {
    if (newName.trim()) {
      try {
        const listId = lists[editIndex].id
        await axios.put(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/lists/${listId}`,
          { name: newName },
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
        onUpdateTodo(editIndex, newName)
        setEditIndex(null)
        setNewName('')
      } catch (error) {
        console.error('Error updating list:', error)
      }
    }
  }

  // Handle delete functionality
  const handleDelete = async (index) => {
    try {
      const listId = lists[index].id
      await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/lists/${listId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
        withCredentials: true,
        xsrfCookieName: 'XSRF-TOKEN',
        xsrfHeaderName: 'X-XSRF-TOKEN',
      })
      onDeleteTodo(index)
    } catch (error) {
      console.error('Error deleting list:', error)
    }
  }

  // Handle click to open modal with list data
  const handleOpenModal = (list) => {
    console.log("Selected List:000000", list)
    setSelectedList(list)
    setIsModalOpen(true)
  }


  // Handle closing the modal
  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedList(null)
  }

  return (
    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 py-6">
      {errors.length > 0 && (
        <div className="bg-red-100 text-red-700 p-4 rounded-md mb-4">
          <ul>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      {loading ? (
        <div className="text-center text-gray-500">Loading lists...</div>
      ) : (
        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
          <div className="p-6 bg-white border-b border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Lists</h2>
            <ul className="space-y-3">
              {lists.length === 0 ? (
                <div className="text-center text-gray-500">No lists available</div>
              ) : (
                lists.map((list, index) => (
                    <li
                    key={index}
                    className="flex justify-between items-center p-3 border border-gray-300 rounded-md cursor-pointer"
                    onClick={() => handleOpenModal(list)}
                  >
                    {editIndex === index ? (
                      <div className="flex space-x-2">
                        <input
                          type="text"
                          value={newName}
                          onClick={(e) => {
                            e.stopPropagation() // Prevents opening the modal
                           
                          }}
                          onChange={(e) => setNewName(e.target.value)}
                          className="border rounded-md px-2 py-1"
                        />
                        <button
                          onClick={(e) => {
                            e.stopPropagation() // Prevents opening the modal
                            handleUpdate()
                          }}
                          className="bg-blue-500 text-white px-4 py-2 rounded-md"
                        >
                          Update
                        </button>
                      </div>
                    ) : (
                      <span>{list.name}</span>
                    )}
                    <div className="space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation() // Prevents opening the modal
                          handleEdit(index, list.name)
                        }}
                        className="bg-yellow-500 text-white px-4 py-2 rounded-md"
                      >
                        Edit
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation() // Prevents opening the modal
                          handleDelete(index)
                        }}
                        className="bg-red-500 text-white px-4 py-2 rounded-md"
                      >
                        Delete
                      </button>
                    </div>
                  </li>

                ))
              )}
            </ul>
          </div>
        </div>
      )}


      <TaskModal
        isOpen={isModalOpen}
        closeModal={handleCloseModal}
        list={selectedList}  // Pass the selected list to the modal
      />
    </div>
  )
}

export default UserList
