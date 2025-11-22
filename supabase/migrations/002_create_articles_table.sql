-- Create articles table
CREATE TABLE IF NOT EXISTS public.articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  body TEXT NOT NULL,
  thumbnail_url TEXT,
  category VARCHAR(100),
  author_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;

-- Create policies for articles table
-- Users can read all articles
CREATE POLICY "Anyone can view articles"
  ON public.articles
  FOR SELECT
  USING (true);

-- Users can create articles (only authenticated users)
CREATE POLICY "Authenticated users can create articles"
  ON public.articles
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Users can update their own articles
CREATE POLICY "Users can update own articles"
  ON public.articles
  FOR UPDATE
  USING (auth.uid() = author_id);

-- Users can delete their own articles
CREATE POLICY "Users can delete own articles"
  ON public.articles
  FOR DELETE
  USING (auth.uid() = author_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_articles_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc'::text, NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to update updated_at
CREATE TRIGGER update_articles_updated_at
  BEFORE UPDATE ON public.articles
  FOR EACH ROW EXECUTE FUNCTION public.handle_articles_updated_at();

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_articles_author_id ON public.articles(author_id);
CREATE INDEX IF NOT EXISTS idx_articles_category ON public.articles(category);
CREATE INDEX IF NOT EXISTS idx_articles_created_at ON public.articles(created_at DESC);

