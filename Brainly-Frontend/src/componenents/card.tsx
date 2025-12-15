import { ShareIcon } from "./ui/icons/shareicon";
import React, { useEffect, useRef } from "react";
interface CardProps {
  tittle: string;
  link: string;
  type: "twitter" | "youtube";
}
export const Card = ({ tittle, link, type }: CardProps) => {
  const tweetRef = useRef<HTMLElement | null>(null);
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
            <div className="text-gray-500 pr-2">
              <ShareIcon size="md" />
            </div>
            {tittle}
          </div>

          <div className="flex items-center">
            <div className="text-gray-500 pr-2">
              <a href={link} target="_blank" rel="noreferrer">
                <ShareIcon size="md" />
              </a>
            </div>
            <div className="text-gray-500 pr-2">
              <ShareIcon size="md" />
            </div>
          </div>
        </div>

        <div className="pt-3">

          {type === "youtube" && (
            <iframe
              className="w-full "
              src = {link.replace( "watch" , "embed" )}
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
            ></iframe>
          )}

          {type === "twitter" && (
            <blockquote className="twitter-tweet" ref={tweetRef as any}>
              <a href={link.replace("x.com", "twitter.com")}></a>
            </blockquote>
          )}

        </div>
      </div>
    </div>
  );
};
