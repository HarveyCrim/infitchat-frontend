import { createContext, useContext} from "react";
import {  Socket } from "socket.io-client";
const socketContext = createContext<Socket | null>(null)


export const useSocketContext = () => {
    return useContext(socketContext)
}

export default socketContext
