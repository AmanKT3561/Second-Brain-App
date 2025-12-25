import { ShareIcon } from "./ui/icons/Shareicon";
import React, { useEffect, useRef, useState } from "react";
import axios from 'axios'

interface CardProps {
  id?: string;
  tittle: string;
  link: string;
  type: "twitter" | "youtube";
}
export const Card = ({ id, tittle, link, type }: CardProps) => {
  const tweetRef = useRef<HTMLElement | null>(null);
  const [deleting, setDeleting] = useState(false);
  const sanitizeTweetUrl = (url: string) => {
    // normalize x.com -> twitter.com and strip query params
    try {
      const normalized = url.replace("x.com", "twitter.com");
      return normalized.split("?")[0];
    } catch (e) {
      return url;
    }
  };
  useEffect(() => {
    if (type === "twitter") {
      const twttr = (window as any).twttr;
      if (twttr?.widgets?.load) {
        // re-scan the newly added blockquote for Twitter widgets
        twttr.widgets.load(tweetRef.current ?? document);
      } else {
        // Dynamically add the widgets script if it isn't present yet
        const script = document.createElement("script");
        script.src = "https://platform.twitter.com/widgets.js";
        script.async = true;
        script.onload = () => {
          const tw = (window as any).twttr;
          if (tw?.widgets?.load) tw.widgets.load(tweetRef.current ?? document);
        };
        document.body.appendChild(script);
      }
    }
  }, [link, type]);
  return (
    <div>
      <div className="bg-white shadow-md rounded-md border-gray-200 border p-4 max-w-72 min-h-48 min-w-72">
        <div className="flex justify-between">
          <div className="flex items-center font-sm">
            {tittle}
          </div>

          <div className="flex items-center gap-3">
            <button onClick={async () => {
              // share this card's link
              try {
                if (navigator.share) {
                  await navigator.share({ title: tittle, url: link })
                  return
                }
              } catch (err) {
                // ignore and fallback to clipboard
              }
              try {
                await navigator.clipboard.writeText(link)
                alert('Link copied to clipboard')
              } catch (err) {
                // final fallback: open the link in new tab
                window.open(link, '_blank')
              }
            }} title="Share" className="text-gray-500">
              <ShareIcon size="md" />
            </button>

            <button disabled={deleting} onClick={async () => {
                if (!id) return;
                if (!confirm('Delete this content?')) return;
                const token = localStorage.getItem('token');
                if (!token) { alert('You must be signed in to delete content'); return }
                try {
                  setDeleting(true);
                  await axios.delete('http://localhost:3000/api/v1/content', { data: { contentId: id }, headers: { Authorization: token } })
                  // notify to re-fetch
                  window.dispatchEvent(new Event('content:deleted'))
                } catch (err) {
                  console.error('Delete failed', err)
                  alert('Failed to delete content')
                } finally { setDeleting(false) }
              }} title="Delete" className="text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-.894.553L4 4H2a1 1 0 100 2h1v9a2 2 0 002 2h8a2 2 0 002-2V6h1a1 1 0 100-2h-2l-1.106-1.447A1 1 0 0014 2H6zm2 5a1 1 0 112 0v7a1 1 0 11-2 0V7z" clipRule="evenodd" />
                </svg>
            </button>
          </div>
        </div>

        <div className="pt-3">

          {type === "youtube" && (
            <iframe
              className="w-full "
              src={link.replace("watch", "embed")}
              title="YouTube video player"
              frameBorder={0}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          )}

          {type === "twitter" && (
            <blockquote className="twitter-tweet" ref={tweetRef as any}>
              <a href={sanitizeTweetUrl(link)}>{sanitizeTweetUrl(link)}</a>
            </blockquote>
          )}

        </div>
      </div>
    </div>
  );
};
