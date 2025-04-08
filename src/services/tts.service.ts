import { TextToSpeechClient } from '@google-cloud/text-to-speech';

export class TTSService {
  private client: TextToSpeechClient;

  constructor() {
    this.client = new TextToSpeechClient();
  }

  async synthesizeSpeech(text: string): Promise<ArrayBuffer> {
    const request = {
      input: { text },
      voice: {
        languageCode: 'sa-IN',
        name: 'sa-IN-Standard-A',
      },
      audioConfig: { audioEncoding: 'MP3' },
    };

    try {
      const [response] = await this.client.synthesizeSpeech(request);
      return response.audioContent as ArrayBuffer;
    } catch (error) {
      console.error('TTS Error:', error);
      throw new Error('Failed to synthesize speech');
    }
  }
}
