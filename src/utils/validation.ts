export const SANSKRIT_PATTERN = /^[\u0900-\u097F\s।॥]+$/;
export const AUDIO_MIME_TYPES = ['audio/wav', 'audio/mpeg', 'audio/mp4'];

export const validateSanskritText = (text: string): boolean => {
  return SANSKRIT_PATTERN.test(text);
};

export const validateAudioFile = (file: File): boolean => {
  return AUDIO_MIME_TYPES.includes(file.type);
};
