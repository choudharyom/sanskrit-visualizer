import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { CloudArrowUpIcon } from '@heroicons/react/24/outline';
import { validateAudioFile } from '../../utils/validation';

interface FileUploadProps {
  onFileAccepted: (file: File) => void;
  onError?: (error: string) => void;
}

const ACCEPTED_TYPES = {
  'audio/wav': ['.wav'],
  'audio/mpeg': ['.mp3'],
  'audio/mp4': ['.m4a'],
};

export const FileUpload: React.FC<FileUploadProps> = ({ onFileAccepted, onError }) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!validateAudioFile(file)) {
      onError?.('Invalid file type. Please upload WAV, MP3, or M4A files.');
      return;
    }

    setIsProcessing(true);
    const formData = new FormData();
    formData.append('audio', file);

    try {
      const response = await fetch('/api/audio/process', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) throw new Error('Upload failed');
      
      const processedBlob = await response.blob();
      // Convert blob back to File with original name
      const processedFile = new File([processedBlob], file.name, {
        type: processedBlob.type,
      });
      onFileAccepted(processedFile);
    } catch (error) {
      onError?.('Failed to process audio file');
    } finally {
      setIsProcessing(false);
    }
  }, [onFileAccepted, onError]);

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop,
    accept: ACCEPTED_TYPES,
    maxFiles: 1,
    maxSize: 50 * 1024 * 1024, // 50MB
  });

  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors
          ${isDragActive ? 'border-indigo-500 bg-indigo-500/10' : 'border-gray-700 hover:border-gray-600'}
          ${isProcessing ? 'pointer-events-none opacity-50' : ''}
        `}
      >
        <input {...getInputProps()} />
        <CloudArrowUpIcon className="w-10 h-10 mx-auto mb-3 text-gray-400" />
        
        <p className="text-sm text-gray-300">
          {isDragActive
            ? "Drop the audio file here"
            : "Drag & drop an audio file, or click to select"}
        </p>
        
        <p className="mt-2 text-xs text-gray-500">
          Supported formats: WAV, MP3, M4A (max 50MB)
        </p>

        {isProcessing && (
          <p className="mt-2 text-sm text-indigo-400">
            Processing audio file...
          </p>
        )}

        {fileRejections.length > 0 && (
          <p className="mt-2 text-sm text-red-400">
            {fileRejections[0].errors[0].message}
          </p>
        )}
      </div>
    </div>
  );
};
