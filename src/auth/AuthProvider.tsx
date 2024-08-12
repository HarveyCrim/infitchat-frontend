import { Auth0Provider, User} from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

const AuthProvider = ({children }: {children? : React.ReactNode}) => {
    const navigate = useNavigate()
    return <Auth0Provider 
    domain= {import.meta.env.VITE_AUTH0_DOMAIN}
    clientId= {import.meta.env.VITE_CLIENT_ID}
    authorizationParams={{
      redirect_uri: import.meta.env.VITE_FRONTEND_URL
    }}
    onRedirectCallback={(_, user : User | undefined) => {
        if(user){
            navigate("/auth-callback")
        }
    }}
        >
        {children}
    </Auth0Provider>
}

export default AuthProvider