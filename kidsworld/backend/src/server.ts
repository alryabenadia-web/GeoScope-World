import express from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';
import profileRoutes from './routes/profile.routes';
import countriesRoutes from './routes/countries.routes';
import quizzesRoutes from './routes/quizzes.routes';
import journalRoutes from './routes/journal.routes';
import parentRoutes from './routes/parent.routes';
import challengesRoutes from './routes/challenges.routes';
import aiAssistantRoutes from './routes/aiAssistant.routes';
import { errorHandler } from './middleware/error.middleware';

dotenv.config();

// Add BigInt serialization support for JSON
(BigInt.prototype as any).toJSON = function() {
  return this.toString();
};

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true,
}));

app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Geography Learning API is running' });
});

app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/countries', countriesRoutes);
app.use('/api/quizzes', quizzesRoutes);
app.use('/api/journal', journalRoutes);
app.use('/api/parent', parentRoutes);
app.use('/api/challenges', challengesRoutes);
app.use('/api/ai', aiAssistantRoutes);

app.use(errorHandler);

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  const frontendPath = path.join(__dirname, '../../dist');
  app.use(express.static(frontendPath));

  // SPA fallback - serve index.html for all non-API routes
  app.get('*', (req, res) => {
    if (!req.path.startsWith('/api')) {
      res.sendFile(path.join(frontendPath, 'index.html'));
    }
  });
}

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`📊 API Health: http://localhost:${PORT}/api/health`);
});
