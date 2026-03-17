import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nawfbpigrewriunvzqbn.supabase.co';
const supabaseKey = 'sb_publishable_TsYkFMWhR4ypv6PN1_SRlw_1hMSnd4d';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Storage bucket names
export const STORAGE_BUCKETS = {
  IMAGES: 'images',
  VIDEOS: 'videos',
  DOCUMENTS: 'documents',
};

// Upload file to Supabase Storage
export async function uploadFile(
  bucket: string,
  file: File,
  folder: string = ''
): Promise<string | null> {
  const fileName = `${folder}/${Date.now()}_${file.name.replace(/\s/g, '_')}`;

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(fileName, file);

  if (error) {
    console.error('Upload error:', error);
    return null;
  }

  // Get public URL
  const { data: urlData } = supabase.storage
    .from(bucket)
    .getPublicUrl(fileName);

  return urlData.publicUrl;
}

// Delete file from Supabase Storage
export async function deleteFile(bucket: string, fileUrl: string): Promise<boolean> {
  const fileName = fileUrl.split(`/storage/v1/object/public/${bucket}/`)[1];
  if (!fileName) return false;

  const { error } = await supabase.storage
    .from(bucket)
    .remove([fileName]);

  return !error;
}
