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
                // leave contents as empty array until user signs in
                return;
            }
            try {
                const res = await axios.get(`http://localhost:3000/api/v1/content`, {
                    headers: { Authorization: token },
                });
                if (mounted) setContent(res.data);
            } catch (err) {
                console.error('Failed to fetch content', err);
            }
        };

        fetchContent();

        // re-fetch when content is added or deleted
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
