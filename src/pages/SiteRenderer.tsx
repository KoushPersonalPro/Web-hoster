import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getWebsiteFile } from '../lib/website';

export const SiteRenderer = () => {
  const { websiteId } = useParams<{ websiteId: string }>();
  const [content, setContent] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const loadWebsite = async () => {
      try {
        if (!websiteId) return;

        const fileBlob = await getWebsiteFile(websiteId);
        
        const text = await fileBlob.text();
        
        // Create a blob URL for resources
        const modifiedContent = text.replace(
          /(src|href)="(?!http|\/\/|data:)([^"]+)"/g,
          `$1="/sites/${websiteId}/$2"`
        );

        // Set the document title from the HTML if available
        const titleMatch = modifiedContent.match(/<title>(.*?)<\/title>/i);
        if (titleMatch && titleMatch[1]) {
          document.title = titleMatch[1];
        }
        
        setContent(modifiedContent);
      } catch (err) {
        setError('Failed to load website');
        console.error(err);
      }
    };

    loadWebsite();

    // Reset title when unmounting
    return () => {
      document.title = 'WebHoster';
    };
  }, [websiteId]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-600">{error}
          buhahah
        </div>
      </div>
    );
  }

  return (
    <div 
      dangerouslySetInnerHTML={{ __html: content }} 
      className="website-container"
    />
  );
};