import { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "../card";

type Content = {
  _id: string;
  type: "twitter" | "youtube";
  link: string;
  title: string;
};

interface ShareModalProps {
  open: boolean;
  onClose: () => void;
  initialUrl?: string;
}

export function ShareModal({
  open,
  onClose,
  initialUrl,
}: ShareModalProps) {
  const [url, setUrl] = useState<string>(initialUrl || "");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [contents, setContents] = useState<Content[]>([]);

  useEffect(() => {
    setUrl(initialUrl || "");
  }, [initialUrl]);

  async function fetchShare(shareUrl: string) {
    setError(null);
    setLoading(true);
    setUsername(null);
    setContents([]);

    try {
      // extract hash from URL or accept hash directly
      let hash = shareUrl.trim();

      try {
        const u = new URL(shareUrl);
        hash = u.pathname.split("/").pop() || hash;
      } catch {
        // ignore invalid URL parsing
      }

      const token = localStorage.getItem("token");

      const res = await axios.get(
        `https://second-brain-app-qoob.onrender.com/api/v1/brain/shareLink/${hash}`,
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
  }

  // Auto-fetch when modal opens with an initial URL
  useEffect(() => {
    if (open && url) {
      fetchShare(url);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-start justify-center pt-20 z-50">
      <div
        className="absolute inset-0 bg-black opacity-40"
        onClick={onClose}
      ></div>

      <div className="relative bg-white rounded shadow p-6 w-full max-w-3xl z-50">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Share Link</h2>
          <button onClick={onClose} className="text-gray-600">
            Close
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-700 mb-1">
            Share URL
          </label>

          <div className="flex gap-2">
            <input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Paste share URL or hash here"
              className="flex-1 px-3 py-2 border rounded"
            />

            <button
              onClick={() => {
                try {
                  navigator.clipboard.writeText(url);
                  alert("Copied");
                } catch {
                  alert("Could not copy");
                }
              }}
              className="bg-gray-100 px-3 rounded"
            >
              Copy
            </button>

            <button
              onClick={() => fetchShare(url)}
              className="bg-purple-600 text-white px-3 rounded"
            >
              Preview
            </button>
          </div>
        </div>

        {loading && <div>Loading...</div>}

        {error && <div className="text-red-600">{error}</div>}

        {!loading && !error && username && (
          <div>
            <div className="mb-4">
              <h3 className="text-md font-medium">
                {username}'s shared Brain
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {contents.map((c) => (
                <Card
                  key={c._id}
                  id={c._id}
                  type={c.type}
                  link={c.link}
                  title={c.title}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ShareModal;