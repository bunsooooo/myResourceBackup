export default function Edit({ task, onClose }) {
    if (!task) {
        return <div className="p-6">Loading...</div>; // Fallback if task is not provided
    }

    const { data, setData, put, errors } = useForm({
        title: task?.title || '',
        description: task?.description || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('tasks.update', task.id), {
            onSuccess: () => onClose(),
        });
    };

    return (
        <div className="p-6 bg-white shadow rounded-lg">
            <h1 className="text-2xl font-bold mb-4">Edit Task</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                        type="text"
                        value={data.title}
                        onChange={(e) => setData('title', e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                    {errors.title && (
                        <div className="text-red-500 text-sm">{errors.title}</div>
                    )}
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                    {errors.description && (
                        <div className="text-red-500 text-sm">{errors.description}</div>
                    )}
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                    Update Task
                </button>
            </form>
        </div>
    );
}
