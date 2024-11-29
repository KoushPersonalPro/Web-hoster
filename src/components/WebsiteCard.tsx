import React from 'react';
import { Globe, Share2, Trash2 } from 'lucide-react';
// Import toastify if you're using react-toastify
import { toast, Toaster } from 'react-hot-toast'; // Assuming react-toastify is used

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
      minute: '2-digit',
    });
  };

  const handleRequestAccess = () => {
    // Show toast notification
    toast.custom((t) => (
      <div
        className={`${
          t.visible ? 'animate-enter' : 'animate-leave'
        } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
      >
        <div className="flex-1 w-0 p-4">
          <div className="flex items-start">
            
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-gray-900">
                {url}
              </p>
              <p className="mt-1 text-sm text-gray-500">
                {t.id}<br/>
                <span className='text-green-800'>Request sent successfully</span>
              </p>
            </div>
          </div>
        </div>
        <div className="flex border-l border-gray-200">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Close
          </button>
        </div>
      </div>
    ))
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <Toaster position="top-center"
  reverseOrder={false}/>
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
      <a
        // You can use an onClick handler to show the toast
        onClick={handleRequestAccess}
        className="text-blue-600 hover:underline break-all cursor-pointer"
      >
        <br />
        <span className='text-gray-600 font-bold'>Private key:</span> <span className='font-mono'>Request Access</span>
      </a>
      <p className="text-sm text-gray-500 mt-2">
        Created: {formatDate(createdAt)}
      </p>
    </div>
  );
};
