import { useEffect, useRef, useState } from "react";
import { ShareIcon } from "./ui/icons/Shareicon";
import axios from "axios";

interface CardProps {
  id?: string;
  title?: string;
  tittle?: string;
  link: string;
  type: "twitter" | "youtube";
}

export const Card = ({ id, title, tittle, link, type }: CardProps) => {
  const displayTitle = title ?? tittle ?? "";
  const tweetRef = useRef<HTMLQuoteElement | null>(null);
  const [deleting, setDeleting] = useState(false);

  const sanitizeTweetUrl = (url: string) => {
    try {
      const normalized = url.replace("x.com", "twitter.com");
      return normalized.split("?")[0];
    } catch {
      return url;
    }
  };

  useEffect(() => {
    if (type !== "twitter") return;

    const twttr = (window as unknown as { twttr?: { widgets?: { load: (el: HTMLElement | Document) => void } } }).twttr;
    if (twttr?.widgets?.load) {
      twttr.widgets.load(tweetRef.current ?? document);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://platform.twitter.com/widgets.js";
    script.async = true;
    script.onload = () => {
      const tw = (window as unknown as { twttr?: { widgets?: { load: (el: HTMLElement | Document) => void } } }).twttr;
      if (tw?.widgets?.load) tw.widgets.load(tweetRef.current ?? document);
    };
    document.body.appendChild(script);

    return () => {
      // no cleanup required for the twitter script
    };
  }, [link, type]);

  return (
    <div>
      <div className="bg-white shadow-md rounded-md border-gray-200 border p-4 max-w-72 min-h-48 min-w-72">
        <div className="flex justify-between">
          <div className="flex items-center text-sm">{displayTitle}</div>

          <div className="flex items-center gap-3">
            <button
              title="Share"
              className="text-gray-500"
              onClick={async () => {
                try {
                  if (navigator.share) {
                    await navigator.share({ title: displayTitle, url: link });
                    return;
                  }
                } catch {
                  // ignore and fallback to clipboard
                }

                try {
                  await navigator.clipboard.writeText(link);
                  alert("Link copied to clipboard");
                } catch {
                  window.open(link, "_blank");
                }
              }}
            >
              <ShareIcon size="md" />
            </button>

            <button
              title="Delete"
              className="text-gray-500"
              disabled={deleting}
              onClick={async () => {
                if (!id) return;
                if (!confirm("Delete this content?")) return;
                const token = localStorage.getItem("token");
                if (!token) {
                  alert("You must be signed in to delete content");
                  return;
                }
                try {
                  setDeleting(true);
                  await axios.delete("https://second-brain-app-qoob.onrender.com/api/v1/content", {
                    data: { contentId: id },
                    headers: { Authorization: `Bearer ${token}` },
                  });
                  window.dispatchEvent(new Event("content:deleted"));
                } catch (err) {
                  console.error("Delete failed", err);
                  alert("Failed to delete content");
                } finally {
                  setDeleting(false);
                }
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M6 2a1 1 0 00-.894.553L4 4H2a1 1 0 100 2h1v9a2 2 0 002 2h8a2 2 0 002-2V6h1a1 1 0 100-2h-2l-1.106-1.447A1 1 0 0014 2H6zm2 5a1 1 0 112 0v7a1 1 0 11-2 0V7z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="pt-3">
          {type === "youtube" && (
            <iframe
              className="w-full"
              src={link.replace("watch", "embed")}
              title="YouTube video player"
              frameBorder={0}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          )}

          {type === "twitter" && (
            <blockquote className="twitter-tweet" ref={tweetRef}>
              <a href={sanitizeTweetUrl(link)}>{sanitizeTweetUrl(link)}</a>
            </blockquote>
          )}
        </div>
      </div>
    </div>
  );
};