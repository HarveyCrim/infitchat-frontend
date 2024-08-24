import { lazy, Suspense,  } from "react"
import { BrowserRouter, Routes, Route} from "react-router-dom"
import Loaders from "./components/Loaders"
import SecureRoutes from "./pages/SecureRoutes"
import AuthCallback from "./components/AuthCallback"
import AuthProvider from "./auth/AuthProvider"
import Profile from "./pages/Profile"
import { Toaster } from 'sonner';
import AddMenu from "./components/AddMenu"
import { useSelector } from "react-redux"
import { IRootState } from "./redux/store"
import NotificationMenu from "./components/NotificationMenu"
const Chat = lazy(() => import("./pages/Chat"))
const Groups = lazy(() => import("./pages/Groups"))
const Home = lazy(() => import("./pages/Home"))

function App() {
  const addMenu = useSelector<IRootState, boolean>( state => state.appStateReducer.addFriendMenu)
  const notificationMenu = useSelector<IRootState, boolean>(state => state.appStateReducer.notificationMenu)
 
  return (
   
    <div className="min-h-[100vh] relative">
    { addMenu && <AddMenu />}
    {notificationMenu && <NotificationMenu />}
    <Toaster position="top-center"/>
    <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path = "/" element = {<Suspense fallback = {<Loaders />}><Home /></Suspense>} />
        <Route path = "/auth-callback" element = {<AuthCallback />} />
        <Route element = {<SecureRoutes />} >
            <Route path = "/profile" element = {<Profile />} />
            <Route path = "/chat/:chatId" element = {<Suspense fallback={<Loaders />}><Chat/></Suspense>} />
            <Route path = "/groups" element = {<Suspense fallback={<Loaders />}><Groups/></Suspense>} />
        </Route>
      </Routes>
      </AuthProvider>
    </BrowserRouter>
    </div>
    
  )
}

export default App
