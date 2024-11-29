import { supabase } from './supabase';
import { nanoid } from 'nanoid';

export interface Website {
  id: string;
  name: string;
  url: string;
  user_id: string;
  created_at: string;
}

export const uploadWebsiteFiles = async (
  files: File[],
  userId: string
): Promise<Website> => {
  const websiteId = nanoid(10);
  const websiteName = files[0].name.split('.')[0].toLowerCase().replace(/[^a-z0-9]/g, '-');
  const basePath = `websites/${userId}/${websiteId}`;
  
  try {
    // Upload each file with the correct content type
    const uploadPromises = files.map(async (file) => {
      const filePath = `${basePath}/${file.name}`;
      const fileExtension = file.name.split('.').pop()?.toLowerCase();
      
      // Set appropriate content type based on file extension
      const contentType = getContentType(fileExtension);

      // Read file content and create a blob with the correct content type
      const content = await file.arrayBuffer();
      const blob = new Blob([content], { type: contentType });

      // Upload file with correct content type and caching headers
      const { error: uploadError } = await supabase.storage
        .from('websites')
        .upload(filePath, blob, {
          cacheControl: '3600',
          upsert: true,
          contentType
        });
      
      if (uploadError) throw uploadError;
      return filePath;
    });

    await Promise.all(uploadPromises);

    // Create the website URL using the websiteId
    const websiteUrl = `/sites/${websiteId}`;

    // Insert the website record into the database
    const { data: website, error: insertError } = await supabase
      .from('websites')
      .insert([{
        id: websiteId,
        user_id: userId,
        name: websiteName,
        url: websiteUrl,
        created_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (insertError) throw insertError;
    return website;
  } catch (error) {
    // Clean up uploaded files if any failure occurs
    await cleanupFiles(basePath);
    throw error;
  }
};

export const deleteWebsite = async (websiteId: string, userId: string) => {
  const basePath = `websites/${userId}/${websiteId}`;
  try {
    // Fetch list of files in the directory
    const { data: files, error: listError } = await supabase.storage
      .from('websites')
      .list(`${basePath}`);

    if (listError) throw listError;
    
    // Delete all files individually
    if (files && files.length > 0) {
      const filePaths = files.map(file => `${basePath}/${file.name}`);
      const { error: deleteError } = await supabase.storage
        .from('websites')
        .remove(filePaths);
      
      if (deleteError) throw deleteError;
    }

    // Delete the database record
    const { error: dbError } = await supabase
      .from('websites')
      .delete()
      .match({ id: websiteId, user_id: userId });

    if (dbError) throw dbError;
  } catch (error) {
    console.error('Error deleting website:', error);
    throw error;
  }
};


export const getWebsiteFile = async (websiteId: string, filePath: string = 'index.html') => {
  try {
    // First, get the website details to verify it exists and get the user_id
    const { data: website, error: websiteError } = await supabase
      .from('websites')
      .select('user_id')
      .eq('id', websiteId)
      .single();

    if (websiteError || !website) {
      throw new Error('Website not found');
    }

    // Construct the full path to the file
    const fullPath = `websites/${website.user_id}/${websiteId}/${filePath}`;

    // Download the file
    const { data, error } = await supabase.storage
      .from('websites')
      .download(fullPath);

    if (error) throw error;

    return data;
  } catch (error) {
    console.error('Error fetching website file:', error);
    throw error;
  }
};

// Helper function to determine content type
const getContentType = (extension: string | undefined): string => {
  switch (extension) {
    case 'html':
    case 'htm':
      return 'text/html';
    case 'css':
      return 'text/css';
    case 'js':
      return 'application/javascript';
    case 'png':
      return 'image/png';
    case 'jpg':
    case 'jpeg':
      return 'image/jpeg';
    case 'gif':
      return 'image/gif';
    case 'svg':
      return 'image/svg+xml';
    default:
      return 'text/plain';
  }
};

// Helper function to clean up files on failure
const cleanupFiles = async (basePath: string) => {
  try {
    await supabase.storage
      .from('websites')
      .remove([basePath]);
  } catch (cleanupError) {
    console.error('Error during cleanup:', cleanupError);
  }
};
