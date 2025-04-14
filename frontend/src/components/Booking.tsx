import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

const Booking = () => {
  const { classId } = useParams<{ classId: string }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const backendUrl = import.meta.env.VITE_API_URL;

  console.log(backendUrl, classId);

  const handleBooking = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/bookings');
        return;
      }

      await axios.post(
        `${backendUrl}/api/booking/${classId}/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setIsSuccess(true);
      setTimeout(() => navigate('/bookings'), 2000);
    } catch (err) {
      setError('Failed to book class. Please try again.');
      console.error('Booking error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="text-center py-8">
        <h2 className="text-2xl text-green-600 mb-4">Booking confirmed!</h2>
        <p>Redirecting you back to your bookings...</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Confirm Your Booking</h1>
      
      {error && (
        <div className="border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className=" p-4 rounded-lg mb-6">
        <h2 className="text-lg font-semibold mb-2">You're about to book:</h2>
        <p>Class ID: {classId}</p>
      </div>

      <div className="flex justify-between">
        <button
          onClick={() => navigate(-1)} 
          className=" text-gray-800 py-2 px-4 rounded hover:bg-gray-400"
          disabled={isLoading}
        >
          Cancel
        </button>
        
        <button
          onClick={handleBooking}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:bg-blue-300"
          disabled={isLoading}
        >
          {isLoading ? 'Processing...' : 'Confirm Booking'}
        </button>
      </div>
    </div>
  );
};

export default Booking;