import { useNavigate } from 'react-router-dom'
import React, { useState } from 'react'
import axios from 'axios'

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    const backendUrl = import.meta.env.VITE_API_URL
    console.log(backendUrl)

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            const res = await axios.post(`${backendUrl}/api/auth/login/`, {
                email,
                password,
            })
            setMessage('Login successful')
            console.log(res.data)
            const token = res.data.tokens.access 
            localStorage.setItem('token', token)
            setTimeout(() => {
                navigate('/fitness')
            }, 3000)
        } catch(error: any){
            setMessage(error.response?.data?.message || 'Login failed')
        } finally {
            setIsLoading(false)
        }
    }
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
        {message && <p className=' p-5'>{message}</p>}
        <form onSubmit={handleLogin} className='flex flex-col p-5'>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='border border-gray-300 p-2 mb-4'
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='border border-gray-300 p-2 mb-4'
            />
            <button type="submit" disabled={isLoading} className='bg-blue-500 text-white p-2'>
                {isLoading ? 'Logging in...' : 'Login'}
            </button>
        </form>
        <div>
            <p>Don't have an account? <a href="/signup" className='text-blue-500'>Sign up</a></p>
        </div>
    </div>
  )
}

export default Login