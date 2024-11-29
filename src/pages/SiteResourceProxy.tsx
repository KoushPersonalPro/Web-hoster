import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getWebsiteFile } from '../lib/website';

export const SiteResourceProxy = () => {
  const { websiteId, '*': filePath } = useParams<{ websiteId: string; '*': string }>();
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const loadResource = async () => {
      try {
        if (!websiteId || !filePath) return;

        const fileBlob = await getWebsiteFile(websiteId, filePath);
        const url = URL.createObjectURL(fileBlob);
        window.location.href = url;
        
        // Clean up the blob URL after navigation
        return () => URL.revokeObjectURL(url);
      } catch (err) {
        setError('Failed to load resource');
        console.error(err);
      }
    };

    loadResource();
  }, [websiteId, filePath]);

  if (error) {
    return <div className="text-red-600">{error}</div>;
  }

  return null;
};