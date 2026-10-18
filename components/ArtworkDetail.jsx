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

export default function ArtworkDetail({ artwork }) {
  return (
    <article className="panel">
      <h1>{artwork.title || "Untitled"}</h1>
      <p>{artwork.artistDisplayName || "Unknown artist"}</p>

      {artwork.primaryImage ? (
        <img
          src={artwork.primaryImage}
          alt={`${artwork.title || "Artwork"} by ${artwork.artistDisplayName || "Unknown artist"}`}
          style={{ maxWidth: "100%", maxHeight: "500px", borderRadius: "8px" }}
        />
      ) : (
        <div className="placeholder">No image available</div>
      )}

      {artwork.objectDate && <p><strong>Date:</strong> {artwork.objectDate}</p>}
      {artwork.artistDisplayBio && <p><strong>Artist bio:</strong> {artwork.artistDisplayBio}</p>}
      {artwork.medium && <p><strong>Medium:</strong> {artwork.medium}</p>}
      {artwork.dimensions && <p><strong>Dimensions:</strong> {artwork.dimensions}</p>}
      {artwork.department && <p><strong>Department:</strong> {artwork.department}</p>}
      {artwork.creditLine && <p><strong>Credit line:</strong> {artwork.creditLine}</p>}

       {artwork.objectURL && (
        <p>
           <a href={artwork.objectURL} target="_blank" rel="noopener noreferrer">
           View on The Met website ↗
           </a>
         </p>
        )}
    </article>
  );
}