interface AnalysisData {
  frequency: number[];
  rhythm: {
    peaks: number[];
    tempo: number;
  };
  overtones: number[];
}

export const exportAnalysisData = (data: AnalysisData) => {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'analysis.json';
  link.click();
  URL.revokeObjectURL(url);
};

export const generateShareableLink = (data: AnalysisData) => {
  const compressed = btoa(JSON.stringify(data));
  return `${window.location.origin}/share/${compressed}`;
};
