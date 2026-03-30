import { useState } from "react";
import axios from "axios";
import { CrossIcon } from "./icons/CrossIcon";
import { Button } from "../Buttons";

const contentType = {
  youtube: "youtube",
  twitter: "twitter",
} as const;

type ContentType = (typeof contentType)[keyof typeof contentType];

interface CreateContentModalProps {
  open: boolean;
  onClose: () => void;
}

export function CreateContentModal({
  open,
  onClose,
}: CreateContentModalProps) {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [type, setType] = useState<ContentType>(contentType.youtube);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function addContent() {
    if (!title || !link) {
      alert("Please provide both title and link.");
      return;
    }

    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("You must be signed in to add content.");
        return;
      }

      await axios.post(
        "https://second-brain-app-qoob.onrender.com/api/v1/content",
        {
          title,
          link,
          type,
        },
        {
          headers: { Authorization: token },
        }
      );

      window.dispatchEvent(new Event("content:added"));
      onClose();
    } catch (err: unknown) {
      console.error("Create content failed", err);

      if (axios.isAxiosError(err)) {
        alert(
          err.response?.data?.message ||
            "Failed to create content"
        );
      } else {
        alert("Failed to create content");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!open) return null;

  return (
    <div>
      {/* Overlay */}
      <div className="w-screen h-screen bg-slate-500 fixed top-0 left-0 opacity-60 flex justify-center"></div>

      {/* Modal */}
      <div className="fixed top-0 left-0 w-screen h-screen flex justify-center">
        <div className="flex flex-col justify-center">
          <span className="bg-white rounded-md shadow-lg p-4 w-full max-w-sm flex flex-col">
            
            {/* Close */}
            <div className="flex justify-end">
              <div onClick={onClose} className="cursor-pointer">
                <CrossIcon />
              </div>
            </div>

            {/* Inputs (FIXED HERE) */}
            <div>
              <input
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border rounded mb-2"
              />

              <input
                placeholder="Link"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                className="w-full px-3 py-2 border rounded"
              />
            </div>

            {/* Type */}
            <h1 className="mt-3">Select Type</h1>

            <div className="flex gap-2 p-4 justify-center pb-4">
              <Button
                text="Youtube"
                variant={
                  type === contentType.youtube
                    ? "Primary"
                    : "Secondary"
                }
                size="md"
                onClick={() => setType(contentType.youtube)}
              />
              <Button
                text="Twitter"
                variant={
                  type === contentType.twitter
                    ? "Primary"
                    : "Secondary"
                }
                size="md"
                onClick={() => setType(contentType.twitter)}
              />
            </div>

            {/* Submit */}
            <div className="flex justify-center">
              <Button
                onClick={addContent}
                variant="Primary"
                text="Submit"
                size="sm"
                Loading={isSubmitting}
              />
            </div>
          </span>
        </div>
      </div>
    </div>
  );
}