import React, { useContext, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { context, server } from '../main'
import toast from 'react-hot-toast'
import axios from 'axios'


const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { isAuthenticated, setIsAuthenticated } = useContext(context)


    const submitHandler = async (e) => {
        e.preventDefault();
        console.log(email, password);
        try {
            const { data } = await axios.post(`${server}/users/login`, {
                email, password
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
        } catch (error) {
            toast.error(error.response.data.message);
            setIsAuthenticated(false)
        }

    }
    if (isAuthenticated) return <Navigate to={'/'} />
    return (
        <>
            <div className='container'>
                <div className="login">
                    <p className='title'>Login Here...</p>
                    <form onSubmit={submitHandler}>


                        <div className='inp'>
                            <div className='email'>
                                <p>Email</p>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required />
                            </div>
                            <div className='password'>
                                <p>Password</p>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required />
                            </div>
                        </div>
                        <button>Login</button>

                        <p className='acc'>don't have an account?</p>
                        <Link to={'/new'}>Sign up here</Link>
                    </form>
                </div>
            </div>

        </>
    )
}

export default Login
