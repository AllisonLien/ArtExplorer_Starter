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


// The starter intentionally supplies just ONE simple API helper.
export async function getArtwork(id) {
  const response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`);
  if (!response.ok) throw new Error("Could not load artwork");
  return response.json();
}

// Search by keyword using v1.1/search and return at most 6 object IDs.
export async function searchArtworkIDs(keyword, titleOnly = false) {
  const params = new URLSearchParams({ q: keyword.trim(), limit: "6" });
  if (titleOnly) params.set("title", "true");   // NEW
  const response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1.1/search?${params}`);
  if (!response.ok) throw new Error("Search request failed");
  const data = await response.json();
  return (data.objectIDs || []).slice(0, 6);
}