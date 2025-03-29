import { useEffect, useState } from "react";

// const WS_URL = "ws://localhost:8080";
const WS_URL = import.meta.env.VITE_WS_URL;

export function useSocket() {
    const [socket, setSocket] = useState<WebSocket | null>(null);

    useEffect(() => {
        const ws = new WebSocket(WS_URL);
        ws.onopen = () => {
            setSocket(ws);
        }

        ws.onclose = () => {
            setSocket(null);
        }

        return () => {
            ws.close();
        }
    }, []);


    return socket;
}