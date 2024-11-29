import React from 'react';
import { Globe, Share2, Trash2 } from 'lucide-react';

interface WebsiteCardProps {
  name: string;
  url: string;
  createdAt: string;
  onDelete: () => void;
  onShare: () => void;
}

export const WebsiteCard: React.FC<WebsiteCardProps> = ({
  name,
  url,
  createdAt,
  onDelete,
  onShare,
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Globe className="h-6 w-6 text-blue-600" />
          <h3 className="text-lg font-semibold">{name}</h3>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={onShare}
            className="p-2 text-gray-600 hover:text-blue-600 rounded-full hover:bg-gray-100"
          >
            <Share2 className="h-5 w-5" />
          </button>
          <button
            onClick={onDelete}
            className="p-2 text-gray-600 hover:text-red-600 rounded-full hover:bg-gray-100"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      </div>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:underline break-all"
      >
        <span className='text-gray-600 font-bold'>Public key:</span> {url}
      </a>
      <p className="text-sm text-gray-500 mt-2">
        Created: {formatDate(createdAt)}
      </p>
    </div>
  );
};