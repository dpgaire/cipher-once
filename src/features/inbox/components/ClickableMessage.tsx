import React from 'react';

const urlRegex = /(https?:\/\/[^\s]+)/g;

export const ClickableMessage = ({ text }: { text: string }) => {
  const parts = text.split(urlRegex);

  return (
    <p className="text-sm leading-relaxed text-foreground/90 line-clamp-6">
      {parts.map((part, i) => {
        if (part.match(urlRegex)) {
          return (
            <a
              key={i}
              href={part}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              {part}
            </a>
          );
        }
        return part;
      })}
    </p>
  );
};
