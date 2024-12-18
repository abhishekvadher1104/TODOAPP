import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { context, server } from '../main'
import axios from 'axios'
import toast from 'react-hot-toast'

const Header = () => {

  const { isAuthenticated, setIsAuthenticated , loading, setLoading} = useContext(context)


  const logoutHandler = async () => {
    setLoading(true)
    try {
        await axios.get(`${server}/users/logout`,
            {               
                // withcredentials true thi cookies send thay baki nahi thay
                withCredentials: true,
            }
            
          )
          toast.success("Logout Successfully")
          setLoading(false)
        setIsAuthenticated(false)
    } catch (error) {
        toast.error(error.response.data.message);
        setIsAuthenticated(true)
        setLoading(false )

    }

}

  return (
    <nav className='header'>
      <div>
        <h2>Todo App</h2>
      </div>
      <article>
        <Link className='customLink' to={'/'}>Home</Link>
        <Link className='customLink' to={'/profile'}>Profile</Link>
        {
          isAuthenticated ? (<Link className='customLink' disabled={loading} onClick={logoutHandler}>Logout</Link>) :
            (
              <Link className='customLink' to={'/login'}>Login</Link>
            )
        }
      </article>


    </nav>
  )
}

export default Header
