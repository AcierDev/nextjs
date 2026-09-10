"use client";

import { useEffect, useState } from "react";

const PDF_CONTENT_TYPE = "application/pdf";

export function CombinedLabelPreview({
  urls,
  height,
  orderId,
}: {
  urls: string[];
  height: string;
  orderId: string;
}) {
  const sources = JSON.stringify(urls);
  const [preview, setPreview] = useState<{ sources: string; url: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    let objectUrl: string | undefined;
    setError(null);

    async function prepare() {
      const sourceUrls: string[] = JSON.parse(sources);
      if (!sourceUrls.length) return;
      try {
        const { PDFDocument } = await import("pdf-lib");
        const documents = await Promise.all(sourceUrls.map(async (url) => {
          const response = await fetch(url, { signal: controller.signal });
          if (!response.ok) throw new Error("Labels could not be loaded.");
          return PDFDocument.load(await response.arrayBuffer());
        }));
        const merged = await PDFDocument.create();
        for (const document of documents) {
          const pages = await merged.copyPages(document, document.getPageIndices());
          pages.forEach((page) => merged.addPage(page));
        }
        const bytes = await merged.save();
        if (controller.signal.aborted) return;
        objectUrl = URL.createObjectURL(new Blob([new Uint8Array(bytes)], { type: PDF_CONTENT_TYPE }));
        setPreview({ sources, url: objectUrl });
      } catch (cause) {
        if (!controller.signal.aborted) {
          setError(cause instanceof Error ? cause.message : "Labels could not be loaded.");
        }
      }
    }
    void prepare();
    return () => {
      controller.abort();
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [sources]);

  if (!urls.length) return null;
  if (error) return <p role="alert">{error}</p>;
  if (preview?.sources !== sources) return <p>Loading labels…</p>;
  return (
    <iframe
      src={preview.url}
      width="100%"
      height={height}
      style={{ height }}
      className="rounded-xl border-0"
      title={`Shipping labels for Order ${orderId}`}
    />
  );
}
