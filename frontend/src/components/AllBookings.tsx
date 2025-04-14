import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

interface FitnessClass {
    id: string;
    name: string;
    description: string;
    duration: string;
    date: string;
    location: string;
    coach: string;
    max_participants: number;
}

interface Booking {
    booking_id: string;
    fitness_class: string; 
    created_at: string;
    status: string;
}

const AllBookings = () => {
    const [bookings, setBookings] = useState<Booking[]>([])
    const [classDetails, setClassDetails] = useState<Record<string, FitnessClass>>({})
    const [, setIsAuthenticated] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate()

    const token = localStorage.getItem('token')
    const backendUrl = import.meta.env.VITE_API_URL

    useEffect(() => {
        if (token) {
            setIsAuthenticated(true)
        } else {
            setIsAuthenticated(false)
            navigate('/')
        }
    }, [token])

    const fetchClassDetails = async (classId: string) => {
        try {
            const response = await axios.get(`${backendUrl}/api/fitness/${classId}/`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setClassDetails(prev => ({
                ...prev,
                [classId]: response.data.fitness_class
            }))
            console.log(response.data.fitness_class)
        } catch (error) {
            console.error(`Error fetching class ${classId}:`, error)
        }
    }

    const fetchBookings = async () => {
        try {
            const response = await axios.get(`${backendUrl}/api/bookings/`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setBookings(response.data.bookings)
            console.log(response.data.bookings)
            response.data.bookings.forEach((booking: Booking) => {
                fetchClassDetails(booking.fitness_class)
            })
        } catch (error) {
            console.error('Error fetching bookings:', error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if (token) {
            fetchBookings()
        }
    }, [token])

    if (isLoading) {
        return <div className="text-center py-8">Loading your bookings...</div>
    }

    return (
        <div>
            <div>
                <h1 className='text-center text-2xl font-bold'>My Bookings</h1>
                <div className='flex flex-row justify-between p-5'>
                    {bookings.length === 0 ? (
                        <div>
                            <h2 className='text-center text-xl'>No bookings yet</h2>
                        </div>
                    ) : (
                        bookings.map((booking) => {
                            const fitnessClass = classDetails[booking.fitness_class]
                            
                            return (
                                <div key={booking.booking_id} className='border shadow-2xl rounded-2xl p-4 flex flex-col justify-between gap-0.5'>
                                    {fitnessClass ? (
                                        <>
                                            <h2 className='font-bold text-2xl'>{fitnessClass.name}</h2>
                                            <p className='italic'>{fitnessClass.description}</p>
                                            <p>Duration: {fitnessClass.duration}</p>
                                            <p>Date: {fitnessClass.date}</p>
                                            <p>Location: {fitnessClass.location}</p>
                                            <p>Coach: {fitnessClass.coach}</p>
                                            <p>Max Participants: {fitnessClass.max_participants}</p>
                                        </>
                                    ) : (
                                        <p>Loading class details...</p>
                                    )}
                                    <p>Booked on: {new Date(booking.created_at).toLocaleString()}</p>
                                    <p className='pb-2'>Status: {booking.status}</p>
                                    <button 
                                        className='bg-red-500 text-white p-2'
                                        onClick={() => console.log('Cancel booking', booking.booking_id)}
                                    >
                                        Cancel Booking
                                    </button>
                                </div>
                            )
                        })
                    )}
                </div>
                <p className='text-center mt-4'>
                    Go back to <button onClick={() => navigate('/fitness')} className='text-blue-500 hover:underline'>classes</button>
                </p>
            </div>
        </div>
    )
}

export default AllBookings