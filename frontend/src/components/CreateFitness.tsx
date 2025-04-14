import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface FitnessClass {
    name: string;
    description: string;
    coach: string;
    date: string;
    max_participants: number;
    duration: string;
}

const CreateFitness = () => {
    const [formData, setFormData] = useState<FitnessClass>({
        name: '',
        description: '',
        coach: '',
        date: '',
        max_participants: 0,
        duration: '01:00:00' // Default duration
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const backendUrl = import.meta.env.VITE_API_URL;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'max_participants' ? parseInt(value) || 0 : value
        }));
    };

    const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const hours = e.target.value.padStart(2, '0');
        setFormData(prev => ({
            ...prev,
            duration: `${hours}:00:00`
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/');
                return;
            }

            // Format the data exactly as shown in Postman
            const requestData = {
                name: formData.name,
                description: formData.description,
                coach: formData.coach,
                date: formData.date,
                max_participants: formData.max_participants,
                duration: formData.duration
            };

            await axios.post(`${backendUrl}/api/fitness/`, requestData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            navigate('/fitness'); // Redirect after successful creation
        } catch (err) {
            setError('Failed to create fitness class');
            console.error('Error creating fitness class:', err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Create New Fitness Class</h1>
            
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1">Class Name*</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>

                <div>
                    <label className="block mb-1">Description*</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        rows={3}
                        required
                    />
                </div>

                <div>
                    <label className="block mb-1">Coach*</label>
                    <input
                        type="text"
                        name="coach"
                        value={formData.coach}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>

                <div>
                    <label className="block mb-1">Date and Time*</label>
                    <input
                        type="datetime-local"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>

                <div>
                    <label className="block mb-1">Max Participants*</label>
                    <input
                        type="number"
                        name="max_participants"
                        value={formData.max_participants}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        min="1"
                        required
                    />
                </div>

                <div>
                    <label className="block mb-1">Duration (hours)*</label>
                    <input
                        type="number"
                        min="1"
                        max="24"
                        value={parseInt(formData.duration.split(':')[0]) || 1}
                        onChange={handleTimeChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                    <p className="text-sm text-gray-500 mt-1">
                        Selected duration: {formData.duration}
                    </p>
                </div>

                <div className="flex justify-end space-x-4">
                    <button
                        type="button"
                        onClick={() => navigate('/fitness')}
                        className="bg-gray-300 text-gray-800 py-2 px-4 rounded hover:bg-gray-400"
                        disabled={isLoading}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:bg-blue-300"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Creating...' : 'Create Class'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateFitness;