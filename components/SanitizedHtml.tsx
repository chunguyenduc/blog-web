"use client";

import DOMPurify from "dompurify";

interface SanitizedHtmlProps {
  html: string;
  className?: string;
}

export default function SanitizedHtml({
  html,
  className,
}: SanitizedHtmlProps) {
  const sanitize = (dirty: string) => {
    if (typeof window === "undefined") {
      return dirty;
    }

    return DOMPurify.sanitize(dirty, {
      ALLOWED_TAGS: [
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "p",
        "b",
        "i",
        "em",
        "strong",
        "a",
        "ul",
        "ol",
        "li",
        "blockquote",
        "pre",
        "code",
        "img",
        "figure",
        "figcaption",
      ],
      ALLOWED_ATTR: ["href", "src", "alt", "title"],
    });
  };

  const sanitizedHtml = sanitize(html);

  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
    />
  );
}
