import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import multer from 'multer';
import { TTSService } from '../services/tts.service';
import { AudioService } from '../services/audio.service';

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());

// File upload config
const upload = multer({
  dest: 'uploads/',
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB
  },
  fileFilter: (_, file, cb) => {
    const allowedTypes = ['audio/wav', 'audio/mpeg', 'audio/mp4'];
    if (!allowedTypes.includes(file.mimetype)) {
      cb(new Error('Invalid file type'));
      return;
    }
    cb(null, true);
  }
});

// Services
const ttsService = new TTSService();
const audioService = new AudioService();

// Health check
app.get('/health', (_, res) => res.json({ status: 'ok' }));

// TTS endpoint
app.post('/api/tts', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { text } = req.body;
    if (!text) throw new Error('Text is required');

    const audioBuffer = await ttsService.synthesizeSpeech(text);
    res.type('audio/mp3').send(Buffer.from(audioBuffer));
  } catch (error) {
    next(error);
  }
});

// Audio processing endpoints
app.post('/api/audio/convert', upload.single('audio'), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const file = req.file;
    if (!file) throw new Error('No file uploaded');

    const format = req.body.format as 'mp3' | 'wav';
    if (!['mp3', 'wav'].includes(format)) throw new Error('Invalid format');

    const audioBuffer = await audioService.convertToAudioBuffer(file.buffer);
    const convertedBlob = await audioService.convertFormat(audioBuffer, format);
    
    res.type(`audio/${format}`).send(Buffer.from(await convertedBlob.arrayBuffer()));
  } catch (error) {
    next(error);
  }
});

app.post('/api/audio/analyze', upload.single('audio'), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const file = req.file;
    if (!file) throw new Error('No file uploaded');

    const audioBuffer = await audioService.convertToAudioBuffer(file.buffer);
    const analysis = await audioService.analyzeAudio(audioBuffer);
    
    res.json(analysis);
  } catch (error) {
    next(error);
  }
});

// Error handling
app.use((err: Error, _: Request, res: Response, __: NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({
    error: err.message || 'Internal server error'
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
