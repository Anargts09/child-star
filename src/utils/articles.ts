import { createClient } from "@/utils/supabase/server";
import { Article, ArticleInsert, ArticleUpdate } from "@/types/database";

/**
 * Get all articles
 */
export async function getAllArticles(): Promise<Article[]> {
  const supabase = await createClient();

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
 * Get article by ID
 */
export async function getArticleById(id: string): Promise<Article | null> {
  const supabase = await createClient();

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
 * Get articles by author ID
 */
export async function getArticlesByAuthorId(
  authorId: string
): Promise<Article[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("author_id", authorId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching articles by author:", error);
    return [];
  }

  return data || [];
}

/**
 * Create a new article
 */
export async function createArticle(
  article: Omit<ArticleInsert, "author_id">
): Promise<Article | null> {
  const supabase = await createClient();

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
 * Update an article
 */
export async function updateArticle(
  id: string,
  updates: ArticleUpdate
): Promise<Article | null> {
  const supabase = await createClient();

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
 * Delete an article
 */
export async function deleteArticle(id: string): Promise<void> {
  const supabase = await createClient();

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
