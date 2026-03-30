import { useEffect, useState } from "react";
import axios from "axios";


export function useContent() {
    const [contents , setContent] = useState([])
    useEffect(() => {
        let mounted = true;
        const fetchContent = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                console.warn("No auth token found in localStorage - user may need to sign in");
                return;
            }
            try {
                const res = await axios.get(`https://second-brain-app-qoob.onrender.com/api/v1/content`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (mounted) setContent(res.data);
            } catch (err) {
                console.error('Failed to fetch content', err);
            }
        };

        fetchContent();

        const handler = () => fetchContent();
        window.addEventListener('content:added', handler);
        window.addEventListener('content:deleted', handler);

        return () => {
            mounted = false;
            window.removeEventListener('content:added', handler);
            window.removeEventListener('content:deleted', handler);
        };
    }, [])

    return { contents };
}
