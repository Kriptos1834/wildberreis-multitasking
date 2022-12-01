import { useRef, useState, useEffect } from 'react';

export const useWebSocket = (url, onMessage, onOpen = () => { }, onClose = () => { }) => {
    const socket = useRef()
    const [isSocketConnected, setIsSocketConnected] = useState(false)

    useEffect(() => {
        socket.current = new WebSocket(url)
        socket.current.onopen = () => {
            onOpen()
            setIsSocketConnected(true)
        }
        socket.current.onclose = () => {
            onClose()
            setTimeout(() => {
                socket.current = new WebSocket(url)
            }, 1000)
            setIsSocketConnected(false)
        }
        socket.current.onmessage = (e) => onMessage(e)

        return () => {
            socket.current.close()
        }
    }, [])

    return [socket, isSocketConnected]
}