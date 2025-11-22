-- Create storage bucket for article thumbnails
INSERT INTO storage.buckets (id, name, public)
VALUES ('article-thumbnails', 'article-thumbnails', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage policies
-- Allow authenticated users to upload images
CREATE POLICY "Authenticated users can upload images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'article-thumbnails');

-- Allow authenticated users to update their own images
CREATE POLICY "Users can update own images"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'article-thumbnails' AND (storage.foldername(name))[1] = auth.uid()::text);

-- Allow authenticated users to delete their own images
CREATE POLICY "Users can delete own images"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'article-thumbnails' AND (storage.foldername(name))[1] = auth.uid()::text);

-- Allow public to read images
CREATE POLICY "Public can view images"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'article-thumbnails');


