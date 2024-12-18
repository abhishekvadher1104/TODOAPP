import React, { useContext } from 'react'
import { context } from '../main'
import Loader from '../components/Loader';

const Profile = () => {

  const { isAuthenticated, loading, user } = useContext(context)


  return (
    loading ? <Loader /> : (
      <div>
        <h1>{user?.name}</h1>
        <p>{user?.email}</p>
      </div>
    )
  );
}

export default Profile
