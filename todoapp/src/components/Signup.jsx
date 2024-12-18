import React, { useContext, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import axios from 'axios';
import { server, context } from '../main';
import toast from 'react-hot-toast'

const Signup = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { isAuthenticated, setIsAuthenticated,loading,setLoading } = useContext(context)


    const submitHandler = async (e) => {
        e.preventDefault();
        console.log(name, email, password);
        setLoading(true)
        try {
            const { data } = await axios.post(`${server}/users/new`, {
                name, email, password
            },
                {
                    // content-type thi json ma data pass thay je na apiye to pan chale bydefault a j hoy
                    headers: {
                        "Content-Type": "application/json",
                    },
                    // withcredentials true thi cookies send thay baki nahi thay
                    withCredentials: true,
                }
            )
            toast.success(data.message)
            setIsAuthenticated(true)
            setLoading(false)
        } catch (error) {
            toast.error(error.response.data.message);
            setIsAuthenticated(false)
            setLoading(false)
        }
        
    }
    if (isAuthenticated) return  <Navigate to={'/'}/>
    return (
        <div>
            <div className='container'>
                <div className="signup">
                    <p className='title'>Signup Here...</p>
                    <form action="" onSubmit={submitHandler}>

                        <div className='inp' >
                            <div className='email'>
                                <p>Name</p>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required />
                            </div>
                            <div className='password'>
                                <p>Email</p>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required />
                            </div>
                            <div className='password2'>
                                <p>Password</p>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required />
                            </div>
                        </div>
                        <button type='submit' disabled={loading}>Sign Up</button>
                    </form>

                    <p className='acc'>already have an account?</p>
                    <Link to={'/login'}>Login here</Link>
                </div>
            </div>

        </div >
    )
}

export default Signup
