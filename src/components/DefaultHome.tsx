import { useAuth0 } from "@auth0/auth0-react"

const DefaultHome = () => {
    const {loginWithRedirect} = useAuth0()
  return (
    <div className="flex flex-col justify-center h-[calc(100vh-90px)] border-2 items-center space-y-5 bg-gradient-to-r from-slate-100 to-blue-100">
        <div className="flex"><h1 className = "text-6xl font-semibold ">InfiChat is the new way to socialize</h1><span className="text-6xl text-red-400">.</span></div>
        <h2 className="text-xl font-semibold text-gray-400">What is better than being a social media zombie with diminishing
            social skills you ask? Use yet another chatting app.
        </h2>
        <p onClick = {() => loginWithRedirect()} className="underline font-medium cursor-pointer">Sign up Now!</p>
    </div>
  )
}

export default DefaultHome