import axios from 'axios';
import React from 'react'
import { useNavigate } from 'react-router-dom'

interface SignupFormData {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const Signup:React.FC = () => {
    const [formData, setFormData] = React.useState<SignupFormData>({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const [isLoading, setisLoading] = React.useState(false)
    const [message, setMessage] = React.useState('')

    const backendUrl = import.meta.env.VITE_API_URL

    const navigate = useNavigate()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setisLoading(true)

        if (formData.confirmPassword !== formData.password){
            setMessage('Passwords should be matching')
        }
        try {
            const response = await axios.post(`${backendUrl}/api/auth/register/`, {
                first_name: formData.firstName,
                last_name: formData.lastName,
                username: formData.username,
                email: formData.email,
                password: formData.password,
                confirm_password: formData.confirmPassword
            })
            setMessage('Signup successful')
            console.log(response.data)
            setTimeout(() => {
                navigate('/')
            }, 3000)
        } catch(error:any){
            setMessage(error.response?.data?.message || "signup failed")
        } finally {
            setisLoading(false)
        }
    }
  return (

    <div className=' flex flex-col items-center justify-center'>
        {message && <p className=' p-5'>{message}</p>}

        <form onSubmit={handleSubmit} className='flex flex-col p-5'>
            <div className=' flex flex-row'>
                <div className='p-5 flex flex-col '>
                    <label htmlFor="firstName">First Name</label>
                    <input type="text" name='firstName' value={formData.firstName} onChange={handleChange} className='border border-gray-300 p-2 rounded' />
                </div>
                <div className='p-5 flex flex-col '>
                    <label htmlFor="lastName">Last Name</label>
                    <input type="text" name='lastName' value={formData.lastName} onChange={handleChange} className='border border-gray-300 p-2 rounded' />
                </div>
            </div>
            <div className='flex flex-row'>
                <div className='p-5 flex flex-col '>
                    <label htmlFor="username">Username</label>
                    <input type="text" name='username' value={formData.username} onChange={handleChange} className='border border-gray-300 p-2 rounded' />
                </div>
                <div className='p-5 flex flex-col '>
                    <label htmlFor="email">Email</label>
                    <input type="email" name='email' value={formData.email} onChange={handleChange} className='border border-gray-300 p-2 rounded' />
                </div>
            </div>
            <div>
                <div className='p-5 flex flex-col '>
                    <label htmlFor="password">Password</label>
                    <input type="password" name='password' value={formData.password} onChange={handleChange} className='border border-gray-300 p-2 rounded' />
                </div>
                <div className='p-5 flex flex-col '>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input type="password" name='confirmPassword' value={formData.confirmPassword} onChange={handleChange} className='border border-gray-300 p-2 rounded' />
                </div>
            </div>

            <button type="submit" disabled={isLoading} className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                {isLoading ? 'Loading...' : 'Signup'}
            </button>
        </form>
        <div>
            <p>Already have an account? <a href="/" className='text-blue-500'>Login</a></p>
        </div>
    </div>
  )
}

export default Signup