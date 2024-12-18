import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import Signup from './components/Signup'
import Home from './components/Home'
import Header from './components/Header'
import Profile from './components/Profile'
import { Toaster } from 'react-hot-toast'
import { useContext, useEffect } from 'react'
import axios from 'axios'
import { context, server } from './main'

function App() {
  const { setUser, setIsAuthenticated ,setLoading} = useContext(context)

  console.log(server)

  useEffect(() => {
    setLoading(true)
    axios.get(`${server}/users/me`, {
      withCredentials: true
    })
      .then(res => {
        setUser(res.data.user);
        setIsAuthenticated(true)
        setLoading(false)
      })
      .catch((e) => {
        setUser({})
        setIsAuthenticated(false)
        setLoading(false)
      })

  }, [])

  return (
    <>
      <Router>
        <Header />
        <Routes>
          < Route path='/' element={<Home />} />
          < Route path='/login' element={<Login />} />
          < Route path='/profile' element={<Profile />} />
          < Route path='/new' element={<Signup />} />
        </Routes>
        <Toaster />
      </Router>
    </>
  )
}

export default App
