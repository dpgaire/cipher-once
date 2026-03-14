import React from "react";

const urlRegex = /(https?:\/\/[^\s]+)/g;

export const ClickableMessage = ({ text }: { text: string }) => {
  const parts = text.split(urlRegex);
  return (
    <p className="line-clamp-6 text-sm leading-relaxed text-[#8a8a9a]">
      {parts.map((part, i) =>
        part.match(urlRegex) ? (
          <a key={i} href={part} target="_blank" rel="noopener noreferrer"
            className="break-all text-[#C9A84C] underline-offset-2 hover:underline">
            {part}
          </a>
        ) : part
      )}
    </p>
  );
};
