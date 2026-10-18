import { Suspense } from "react";
import ArtworkBrowser from "@/components/ArtworkBrowser";

export default function Artworks() {
  return (
    <>
      <h1>Browse Artworks</h1>
      <p className="muted">Search the Met collection by keyword.</p>
      <Suspense fallback={<p className="muted">Loading search...</p>}>
        <ArtworkBrowser />
      </Suspense>
    </>
  );
}