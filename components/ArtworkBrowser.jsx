/********************************************************************************* * 
 * ITE5425 - Mastery Assignment 1: Art Explorer 
 * * I declare that this assignment is my own work in accordance with Humber 
 * * Academic Policy. No part of this assignment has been copied manually or 
 * * electronically from any other source, including websites, or distributed 
 * * to other students. * 
 * * I understand that I may use Generative AI for learning, debugging, and 
 * * brainstorming, but the submitted work must be customized to this Art 
 * * Explorer assignment and I must be able to explain the code and design decisions. *
 *  * Name: __yichunlien_____ Student ID: ___n01745009____ Date: ___2026/10/16___________ *********************************************************************************/


"use client";
import { useEffect, useRef, useState } from "react";
import ArtworkList from "./ArtworkList";
import { searchArtworkIDs, getArtwork } from "@/lib/metApi";
import { useSearchParams } from "next/navigation";

export default function ArtworkBrowser(){
 // TODO: add artworks state, loading state, and error state
const searchParams = useSearchParams();
const q = searchParams.get("q") || "sunflowers";
const titleOnly = searchParams.get("title") === "true";

const [keyword, setKeyword] = useState(q);
const [artworks, setArtworks] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");
const latestRequest = useRef(0);


async function loadArtworks(searchTerm, titleOnly = false) {
  const requestId = ++latestRequest.current; //give this search a number
  setLoading(true);
  setError("");

  try {
    const ids = await searchArtworkIDs(searchTerm, titleOnly);

    const details = [];
    for (let i = 0; i < ids.length; i += 3) {
      const batch = ids.slice(i, i + 3);
      const results = await Promise.allSettled(batch.map(id => getArtwork(id)));
      results.forEach(result => {
        if (result.status === "fulfilled") details.push(result.value);
      });
    }

    if (requestId !== latestRequest.current) return;   // compare requestid
    setArtworks(details);
  } catch (err) {
    if (requestId !== latestRequest.current) return;   
    setError(err.message || "Something wrong. Please try again.");
    setArtworks([]);
  } finally {
    if (requestId === latestRequest.current) setLoading(false);  
  }
}

useEffect(() => {
  setKeyword(q);            
  loadArtworks(q, titleOnly);
}, [q, titleOnly]);

function handleSearch(event) {
  event.preventDefault();         
  if (!keyword.trim()) { // ignore empty search
    setError("Please enter a keyword.");
    return;
  }
  loadArtworks(keyword); // reuse loadArtworks
}

 return <section className="panel">
  <form className="row" onSubmit={handleSearch}>
  <input className="field" aria-label="Artwork keyword" value={keyword} onChange={e => setKeyword(e.target.value)} />
  <button className="button" type="submit">Search</button>
  </form>
    {loading && <p className="muted">Loading artworks...</p>}

    {error && <p className="error">{error}</p>}

    {!loading && !error && artworks.length === 0 && (
      <p className="muted">No artworks found. Try another keyword.</p>
    )}

    {!loading && !error && artworks.length > 0 && (
  <ArtworkList artworks={artworks} />
    )}
    </section>;
}
