import React, { useCallback } from 'react';
import { Upload } from 'lucide-react';
import { useDropzone } from 'react-dropzone';

interface FileUploadProps {
  onUpload: (files: File[]) => void;
  isUploading: boolean;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onUpload, isUploading }) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onUpload(acceptedFiles);
  }, [onUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/html': ['.html', '.htm'],
      'text/css': ['.css'],
      'text/javascript': ['.js'],
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.svg']
    },
    multiple: true
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
        ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'}`}
    >
      <input {...getInputProps()} />
      <Upload className="mx-auto h-12 w-12 text-gray-400" />
      <p className="mt-2 text-sm text-gray-600">
        {isDragActive ? (
          'Drop the files here...'
        ) : (
          <>
            Drag & drop your website files here, or <span className="text-blue-500">browse</span>
            <br />
            <span className="text-xs">(HTML, CSS, JavaScript, and image files)</span>
          </>
        )}
      </p>
      {isUploading && (
        <div className="mt-4">
          <div className="animate-pulse text-sm text-blue-600">Uploading...</div>
        </div>
      )}
    </div>
  );
};