import { useAuth0 } from '@auth0/auth0-react'
import Loaders from './Loaders'
import { useEffect } from 'react'
import { createUserRequest } from '../api/userApi'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner';
const AuthCallback = () => {
  const {isLoading, user} = useAuth0()
  const {userData, createUserFn} = createUserRequest()
  const navigate = useNavigate()
  useEffect(() => {
    if(userData){
        toast.success("Login successful.")
        console.log("in here")
        navigate("/")
    }
    if(user){
        createUserFn({name: user.name!, email: user.email!})
    }
  }, [user, isLoading, userData])

  if(isLoading || !userData){
    return <Loaders />
  }
  return <></>
}

export default AuthCallback