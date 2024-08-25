import { useRef } from "react"
import {io, Socket} from "socket.io-client"
import React from "react"
import socketContext from "./socketContext"
const SocketProvider = ({children, backend_url}: {children? : React.ReactNode, backend_url: string}) => {
    const socketRef = useRef<Socket>(io(backend_url as string))
    return <socketContext.Provider value = {socketRef.current}>
        {children}
    </socketContext.Provider>
    
}
export default SocketProvider