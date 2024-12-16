import React, { useState } from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import Modal from '@/Components/Modal';
import Create from './Create';
import Edit from './Edit';

export default function Index({ tasks }) {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);

    const openCreateModal = () => setIsCreateModalOpen(true);
    const closeCreateModal = () => setIsCreateModalOpen(false);

    const openEditModal = (task) => {
        setSelectedTask(task);
        setIsEditModalOpen(true);
    };
    const closeEditModal = () => {
        setSelectedTask(null);
        setIsEditModalOpen(false);
    };

    const openDeleteModal = (task) => {
        setSelectedTask(task);
        setIsDeleteModalOpen(true);
    };
    const closeDeleteModal = () => {
        setSelectedTask(null);
        setIsDeleteModalOpen(false);
    };

    const handleDelete = () => {
        if (!selectedTask) return; // Ensure selectedTask exists
        router.delete(route('tasks.destroy', selectedTask.id), {
            onSuccess: () => closeDeleteModal(),
            onError: (errors) => console.error(errors), // Log errors if any
        });
    };

    return (
        <div className="p-6 bg-white shadow rounded-lg">
            <h1 className="text-2xl font-bold mb-4">Tasks</h1>
            <button
                onClick={openCreateModal}
                className="bg-blue-500 text-white px-4 py-2 rounded"
            >
                Create New Task
            </button>
            <ul className="mt-4">
                {tasks.map((task) => (
                    <li
                        key={task.id}
                        className="flex justify-between items-center border-b py-2"
                    >
                        <span>{task.title}</span>
                        <div className="space-x-2">
                            <button
                                onClick={() => openEditModal(task)}
                                className="text-blue-500"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => openDeleteModal(task)}
                                className="text-red-500"
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

            <Modal show={isCreateModalOpen} onClose={closeCreateModal}>
                <Create onClose={closeCreateModal} />
            </Modal>

            <Modal show={isEditModalOpen} onClose={closeEditModal}>
                {selectedTask ? (
                    <Edit task={selectedTask} onClose={closeEditModal} />
                ) : (
                    <div className="p-6">Loading...</div> // Or a more specific error message
                )}
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal show={isDeleteModalOpen} onClose={closeDeleteModal}>
                <div className="p-6">
                    <h2 className="text-xl font-bold mb-4">Delete Task</h2>
                    <p>Are you sure you want to delete this task?</p>
                    <div className="mt-4 flex justify-end space-x-2">
                        <button
                            onClick={handleDelete}
                            className="bg-red-500 text-white px-4 py-2 rounded"
                        >
                            Yes, Delete
                        </button>
                        <button
                            onClick={closeDeleteModal}
                            className="bg-gray-300 text-black px-4 py-2 rounded"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}