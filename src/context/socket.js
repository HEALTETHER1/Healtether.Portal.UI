import socketio from "socket.io-client";
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;
import React from "react";

export let socket;
if(SOCKET_URL!=="") {
    socket = socketio.connect(SOCKET_URL);
    socket.on('connect', () => {
        console.log("Connected socket")
    });
    socket.on('disconnect', () => {
        console.log("Disconnected socket")
    });
}
export const SocketContext = React.createContext();