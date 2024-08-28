import { useAuth0 } from '@auth0/auth0-react'
import Loaders from './Loaders'
import { useEffect} from 'react'
import { createUserRequest } from '../api/userApi'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner';
import { useSocketContext } from '../context/socketContext'
const AuthCallback = () => {
  const {isLoading, user} = useAuth0()
  const {userData, createUserFn, creatingUser} = createUserRequest()
  const socket = useSocketContext()
  const navigate = useNavigate()
  console.log("dat", userData)
  useEffect(() => {
    if(userData){
        socket?.emit("connectionMade", userData?._id)
        toast.success("Login successful.")
        navigate("/chat/home")
    }
    
  }, [userData])
  useEffect(() => {
    if(creatingUser || userData)
        return
    createUserFn({name: user?.name!, email: user?.email!})
  }, [user])
  if(isLoading || !userData){
    return <Loaders />
  }
  return <></>
}

export default AuthCallback