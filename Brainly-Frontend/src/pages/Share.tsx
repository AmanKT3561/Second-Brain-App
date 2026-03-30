import "../index.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Card } from "../componenents/card";

type Content = {
  _id: string;
  type: "twitter" | "youtube";
  link: string;
  title: string;
};

export function SharePage() {
  const { shareLink } = useParams<{ shareLink: string }>();

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [contents, setContents] = useState<Content[]>([]);

  useEffect(() => {
    if (!shareLink) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          `https://second-brain-app-qoob.onrender.com/api/v1/brain/shareLink/${shareLink}`,
          {
            headers: token ? { Authorization: token } : undefined,
          }
        );

        setUsername(res.data.username);
        setContents(res.data.content || []);
      } catch (err: unknown) {
        console.error("Failed to load share", err);

        if (axios.isAxiosError(err)) {
          setError(
            err.response?.data?.message || "Failed to load share"
          );
        } else {
          setError("Failed to load share");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [shareLink]);

  const copyShareUrl = async () => {
    const url = window.location.href;

    try {
      await navigator.clipboard.writeText(url);
      alert("Share URL copied to clipboard");
    } catch {
      alert("Could not copy URL — please copy it manually");
    }
  };

  if (loading) return <div className="p-8">Loading...</div>;

  if (error)
    return <div className="p-8 text-red-600">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl font-semibold">
              {username}'s Brain
            </h1>
            <p className="text-sm text-gray-600">
              Shared collection of links
            </p>
          </div>

          <button
            onClick={copyShareUrl}
            className="bg-purple-600 text-white px-3 py-1 rounded"
          >
            Copy Share URL
          </button>
        </div>

        {contents.length === 0 ? (
          <div className="text-gray-600">
            No shared content found.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {contents.map((c) => (
              <Card
                key={c._id}
                type={c.type}
                link={c.link}
                title={c.title}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SharePage;