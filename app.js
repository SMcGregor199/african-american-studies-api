import express from 'express';
import cors from 'cors';
import { getAllData } from './helper.js';
import { createSemanticNetwork } from './semantic-network.js';
import { createApiRouter } from './api/index.js';

export function createApp({ data = getAllData(), network = createSemanticNetwork(data) } = {}) {
  const app = express();
  app.set('json spaces', 2);
  app.use(cors());
  app.use('/api', createApiRouter(network));

  app.get('/', (req, res) => {
    res.json({
      name: 'Echo Lab',
      api: '/api',
    });
  });

  app.use((req, res) => {
    if (req.originalUrl.startsWith('/api')) {
      res.status(404).json({ error: 'API endpoint not found' });
    } else {
      res.status(404).json({ error: 'Page not found' });
    }
  });

  return app;
}
