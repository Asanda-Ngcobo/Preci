import { createClient } from "./server";
// import { supabase } from "./supabase";


/**
 * Fetch a single summary owned by the logged-in user
 */
export async function getSummary(summaryId) {
  
 const supabase = await createClient()


  const { data, error } = await supabase
    .from("summaries")
    .select("*")
    .eq("id", summaryId)
    .single();

  if (error) {
    console.error("Error fetching summary:", error.message);
    return null;
  }

  return data;
}



export async function getSummaries(userId) {
  const supabase =  await createClient();


  const { data, error } = await supabase
    .from("summaries")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Supabase error loading summaries:", error.message);
    throw new Error(
      "We couldn’t load your summaries at this time. Please try again later."
    );
  }

  return data;
}

export async function getBlogs() {
   const supabase = await createClient()
  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw new Error("Could not fetch blogs");

  return data;
}

export async function getBlogBySlug(slug) {
   const supabase = await createClient()
  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) throw new Error("Blog not found");

  return data;
}