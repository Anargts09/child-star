import { createClient } from "@/utils/supabase/client";
import { Article, ArticleInsert, ArticleUpdate } from "@/types/database";

/**
 * Get all articles (client-side)
 */
export async function getAllArticles(): Promise<Article[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching articles:", error);
    return [];
  }

  return data || [];
}

/**
 * Get article by ID (client-side)
 */
export async function getArticleById(id: string): Promise<Article | null> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching article:", error);
    return null;
  }

  return data;
}

/**
 * Create a new article (client-side)
 */
export async function createArticle(
  article: Omit<ArticleInsert, "author_id">
): Promise<Article | null> {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const { data, error } = await supabase
    .from("articles")
    // @ts-expect-error - Supabase type inference issue with insert method
    .insert({
      ...article,
      author_id: user.id,
    } as unknown as ArticleInsert)
    .select()
    .single();

  if (error) {
    console.error("Error creating article:", error);
    throw error;
  }

  return data;
}

/**
 * Update an article (client-side)
 */
export async function updateArticle(
  id: string,
  updates: ArticleUpdate
): Promise<Article | null> {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  // Check if user is the author
  const { data: article } = await supabase
    .from("articles")
    .select("author_id")
    .eq("id", id)
    .single();

  if (!article || (article as { author_id: string }).author_id !== user.id) {
    throw new Error("Unauthorized");
  }

  const { data, error } = await supabase
    .from("articles")
    // @ts-expect-error - Supabase type inference issue with update method
    .update(updates as unknown as ArticleUpdate)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating article:", error);
    throw error;
  }

  return data;
}

/**
 * Delete an article (client-side)
 */
export async function deleteArticle(id: string): Promise<void> {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  // Check if user is the author
  const { data: article } = await supabase
    .from("articles")
    .select("author_id")
    .eq("id", id)
    .single();

  if (!article || (article as { author_id: string }).author_id !== user.id) {
    throw new Error("Unauthorized");
  }

  const { error } = await supabase.from("articles").delete().eq("id", id);

  if (error) {
    console.error("Error deleting article:", error);
    throw error;
  }
}

/**
 * Upload image to Supabase Storage
 */
export async function uploadImage(
  file: File,
  path: string
): Promise<string | null> {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const { data, error } = await supabase.storage
    .from("article-thumbnails")
    .upload(`${user.id}/${path}`, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    console.error("Error uploading image:", error);
    throw error;
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from("article-thumbnails").getPublicUrl(data.path);

  return publicUrl;
}

/**
 * Delete image from Supabase Storage
 */
export async function deleteImage(path: string): Promise<void> {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const { error } = await supabase.storage
    .from("article-thumbnails")
    .remove([path]);

  if (error) {
    console.error("Error deleting image:", error);
    throw error;
  }
}
