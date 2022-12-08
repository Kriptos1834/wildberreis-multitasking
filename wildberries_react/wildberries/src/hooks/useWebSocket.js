import { useRef, useState, useEffect } from 'react';
import ReconnectingWebSocket from 'reconnecting-websocket';

export const useWebSocket = (url, onMessage, onOpen = () => { }, onClose = () => { }) => {
    const socket = useRef()
    const [isSocketConnected, setIsSocketConnected] = useState(false)

    useEffect(() => {
        socket.current = new ReconnectingWebSocket(url)
        socket.current.onopen = () => {
            onOpen()
            setIsSocketConnected(true)
        }
        socket.current.onclose = () => {
            onClose()
            setIsSocketConnected(false)
        }
        socket.current.onmessage = (e) => onMessage(e)

        return () => {
            socket.current.close()
        }
    }, [])

    return [socket, isSocketConnected]
}