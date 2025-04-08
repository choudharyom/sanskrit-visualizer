import { useState, useEffect } from 'react';

export const useProgressiveLoading = (data: Float32Array, chunkSize: number = 1024) => {
  const [loadedChunks, setLoadedChunks] = useState<Float32Array[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const chunks: Float32Array[] = [];
    
    const loadChunks = async () => {
      for (let i = 0; i < data.length; i += chunkSize) {
        if (!mounted) break;
        
        const chunk = data.slice(i, i + chunkSize);
        chunks.push(chunk);
        setLoadedChunks([...chunks]);
        
        // Simulate chunk processing time
        await new Promise(resolve => setTimeout(resolve, 10));
      }
      setIsLoading(false);
    };

    loadChunks();
    return () => { mounted = false; };
  }, [data, chunkSize]);

  return { loadedChunks, isLoading };
};
