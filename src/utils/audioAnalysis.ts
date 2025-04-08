export const detectOvertones = (frequencyData: Float32Array): number[] => {
  const fundamentalFreq = findFundamentalFrequency(frequencyData);
  const overtones: number[] = [];
  
  for (let i = 1; i <= 8; i++) {
    const expectedFreq = fundamentalFreq * i;
    const actualFreq = findNearestPeak(frequencyData, expectedFreq);
    if (actualFreq) overtones.push(actualFreq);
  }
  
  return overtones;
};

export const analyzeRhythm = (timeData: Float32Array, sampleRate: number) => {
  const peakThreshold = 0.7;
  const peaks: number[] = [];
  const intervals: number[] = [];
  
  for (let i = 1; i < timeData.length - 1; i++) {
    if (timeData[i] > peakThreshold && 
        timeData[i] > timeData[i - 1] && 
        timeData[i] > timeData[i + 1]) {
      peaks.push(i);
    }
  }
  
  for (let i = 1; i < peaks.length; i++) {
    intervals.push((peaks[i] - peaks[i-1]) / sampleRate);
  }
  
  return {
    peaks,
    intervals,
    tempo: estimateTempo(intervals)
  };
};
