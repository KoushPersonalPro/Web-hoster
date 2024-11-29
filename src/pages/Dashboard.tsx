import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { FileUpload } from '../components/FileUpload';
import { WebsiteCard } from '../components/WebsiteCard';
import { uploadWebsiteFiles, deleteWebsite, Website } from '../lib/website';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

export const Dashboard = () => {
  const { user } = useAuth();
  const [websites, setWebsites] = useState<Website[]>([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (user) {
      loadWebsites();
    }
  }, [user]);

  const loadWebsites = async () => {
    try {
      const { data, error } = await supabase
        .from('websites')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setWebsites(data || []);
    } catch (error) {
      toast.error('Failed to load websites');
    }
  };

  const handleUpload = async (files: File[]) => {
    if (!user) return;

    // Validate files
    const hasIndex = files.some(f => f.name.toLowerCase() === 'index.html');
    if (!hasIndex) {
      toast.error('Please include an index.html file');
      return;
    }

    setUploading(true);
    try {
      await uploadWebsiteFiles(files, user.id);
      toast.success('Website uploaded successfully!');
      loadWebsites();
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload website');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (websiteId: string) => {
    if (!user) return;
    
    try {
      await deleteWebsite(websiteId, user.id);
      toast.success('Website deleted successfully!');
      loadWebsites();
    } catch (error) {
      toast.error('Failed to delete website');
    }
  };

  const handleShare = (url: string) => {
    const fullUrl = `${window.location.origin}${url}`;
    navigator.clipboard.writeText(fullUrl);
    toast.success('URL copied to clipboard!');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">My Websites</h1>
        <p className="mt-2 text-gray-600">Upload and manage your websites</p>
      </div>

      <div className="mb-8">
        <FileUpload onUpload={handleUpload} isUploading={uploading} />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {websites.map((website) => (
          <WebsiteCard
            key={website.id}
            name={website.name}
            url={website.url}
            createdAt={website.created_at}
            onDelete={() => handleDelete(website.id)}
            onShare={() => handleShare(website.url)}
          />
        ))}
      </div>
    </div>
  );
};