import { useAuth0 } from "@auth0/auth0-react"
import { Outlet, useNavigate } from "react-router-dom"

const SecureRoutes = () => {
  const {isAuthenticated} = useAuth0()
  const navigate = useNavigate()
  if(isAuthenticated){
    return <Outlet />
  }
  else 
    navigate("/")
}

export default SecureRoutes