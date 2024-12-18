import React, { useContext, useEffect, useState } from 'react'
import myimg from '../assets/icon.png'
import axios from 'axios'
import { context, server } from '../main'
import toast from 'react-hot-toast'
import Todoitem from './Todoitem'
import { Navigate } from 'react-router-dom'

const Home = () => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [loading, setLoading] = useState(false)
  const [tasks, setTasks] = useState([]);
  const [refresh, setRefresh] = useState(false)

   const { isAuthenticated  } = useContext(context)
  const updateHandler = async (id) => {
    try {
      const { data } = await axios.put(`${server}/task/${id}`, {},
        {
          withCredentials: true,
        }
      )
      toast.success(data.message)
      setRefresh(prev => !prev)

    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
  const deleteHandler = async (id) => {
    try {
      const { data } = await axios.delete(`${server}/task/${id}`,
        {
          withCredentials: true,
        }
      )
      toast.success(data.message)
      setRefresh(prev => !prev)


    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      setLoading(true);
      const { data } = await axios.post(`${server}/task/new`, {
        title, description
      },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          }
        })
      toast.success(data.message);
      setLoading(false)
      setTitle("")
      setDescription("")
      setRefresh(prev => !prev)
    } catch (error) {
      toast.error(error.response.data.message)
      setLoading(false)
    }

  }


  useEffect(() => {
    axios
      .get(`${server}/task/mytask`,
        {
          withCredentials: true
        })
      .then((res) => {
        setTasks(res.data.tasks);
      })
      .catch((e) => {
        toast.error(e.response.data.message)
      })
  }, [refresh])

  if (!isAuthenticated) return <Navigate to={'/login'} />


  return (
    <div className='container'>

      <div className="todomain">

        <div className='title'>
          <h2>To-Do List</h2>
          <img src={myimg} alt="" />
        </div>
        <form onSubmit={submitHandler}>
          <div className='todo'>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder='Title' />

            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder='Enter the task' />

            <button disabled={loading} type='submit'>Add</button>
          </div>
        </form>

        <div >
          {tasks.map((i) => (
            <Todoitem title={i.title} description={i.description} isCompleted={i.isCompleted}
              updateHandler={updateHandler}
              deleteHandler={deleteHandler}
              id={i._id}
              key={i._id} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home
