import { useAuth0 } from '@auth0/auth0-react'
import Loaders from './Loaders'

const AuthCallback = () => {
  const {isLoading, user} = useAuth0()
  console.log(user)
  //register using email
  if(isLoading){
    return <Loaders />
  }

  return (
    <div>AuthCallback</div>
  )
}

export default AuthCallback