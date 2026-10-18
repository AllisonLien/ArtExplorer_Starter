/********************************************************************************* * 
 * ITE5425 - Mastery Assignment 1: Art Explorer 
 * * I declare that this assignment is my own work in accordance with Humber 
 * * Academic Policy. No part of this assignment has been copied manually or 
 * * electronically from any other source, including websites, or distributed 
 * * to other students. * 
 * * I understand that I may use Generative AI for learning, debugging, and 
 * * brainstorming, but the submitted work must be customized to this Art 
 * * Explorer assignment and I must be able to explain the code and design decisions. *
 *  * Name: __yichunlien_____ Student ID: ___n01745009____ Date: ___2026/10/18__________ *********************************************************************************/

import Link from "next/link";
import { getArtwork } from "@/lib/metApi";
import ArtworkDetail from "@/components/ArtworkDetail";

export default async function ArtworkDetailPage({ params }) {
  const { id } = await params;

  let artwork = null;

  // Only id is a number
  if (/^\d+$/.test(id)) {
    try {
      artwork = await getArtwork(id);
    } catch (err) {
      artwork = null;  
    }
  }

  if (!artwork) {
    return (
      <section className="panel">
        <h1>Artwork not found</h1>
        <p className="muted">No artwork ID "{id}".</p>
        <Link className="button" href="/artwork">← Back to Artworks</Link>
      </section>
    );
  }
  return (
    <>
      <Link href="/artwork">← Back to Artworks</Link>
      <ArtworkDetail artwork={artwork} />
    </>
    );
}