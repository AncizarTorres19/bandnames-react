import { createContext } from "react";
import { useSocket } from "../hooks/useSocket";


export const SocketConext = createContext();

export const SocketProvider = ({ children }) => {

    const { socket, online } = useSocket('http://localhost:8080')

    return (
        <SocketConext.Provider
            value={{ socket, online }}
        >
            {children}
        </SocketConext.Provider>
    )
}