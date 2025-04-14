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

const Fitness = () => {
    const  [classes, setClasses] = useState<FitnessClass[]>([])
    const [,setIsAuthenticated] = useState(false)
    const navigate = useNavigate()

    const token = localStorage.getItem('token')

    useEffect(() => {
        if (token) {
            setIsAuthenticated(true)
        } else {
            setIsAuthenticated(false)
            navigate('/')
        }
    }, [token])

    const backendUrl = import.meta.env.VITE_API_URL

    const fetchData = async () => {
        try {
            const token = localStorage.getItem('token')
            console.log(token)
            const response = await axios.get(`${backendUrl}/api/fitness/`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }) 
            setClasses(response.data.fitness_classes)
            console.log(response.data.fitness_classes)
        } catch (error) {
            console.error('Error fetching data:', error)
        }
    }

    useEffect(()=> {
        fetchData()
    }, [])

  return (
    <div>
        <div>
            <h1 className='text-center text-2xl font-bold'>Fitness Classes</h1>
            <div className=' flex flex-row justify-between p-5'>
                {classes.length === 0 ? (
                    <div>
                        <h2 className='text-center text-xl'>No classes available</h2>
                    </div>
                ):(
                    classes?.map((fitnessClass: any) => (
                        <div key={fitnessClass.id} className=' border shadow-2xl rounded-2xl p-4 flex flex-col justify-between gap-0.5'>
                            <h2 className=' font-bold text-2xl'>{fitnessClass.name}</h2>
                            <p className=' italic'>{fitnessClass.description}</p>
                            <p>Duration: {fitnessClass.duration}</p>
                            <p>Date: {fitnessClass.date}</p>
                            <p>Location: {fitnessClass.location}</p>
                            <p>Coach: {fitnessClass.coach}</p>
                            <p className='pb-2'>Max Participants: {fitnessClass.max_participants}</p>
                            <button className='bg-blue-500 text-white p-2' onClick={() => navigate(`/booking/${fitnessClass.id}`)}>Join Class</button>
                        </div>
                    )
                ))}
            </div>
            {/* create fitness class button */}
            <div className='flex justify-center'>
                <button className='bg-green-500 text-white p-2' onClick={() => navigate('/create-fitness')}>Create Fitness Class</button>
            </div>
        </div>
    </div>
  )
}

export default Fitness