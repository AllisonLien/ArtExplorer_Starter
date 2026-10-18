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

"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

export default function SearchForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const router = useRouter();

  function submit(data) {
    const params = new URLSearchParams({ q: data.keyword.trim() });
    if (data.titleOnly) params.set("title", "true");
    router.push(`/artwork?${params}`);  
}

  return (
    <form onSubmit={handleSubmit(submit)}>
      <label>Keyword <input className="field" {...register("keyword", { 
          required: "Keyword required",
          minLength: { value: 3, message: "Keyword must be at least 3 characters" },})} /></label>
      {errors.keyword && <p className="error">{errors.keyword.message}</p>}
       <p>
         <label>
             <input type="checkbox" {...register("titleOnly")} /> Search title only
         </label>
       </p>
      <button className="button" type="submit">Search</button>
    </form>
  );
}