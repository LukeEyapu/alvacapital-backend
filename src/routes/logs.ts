import express from 'express';
import { getLogs } from '../services/log-service';

const router = express.Router();

router.get('/logs', async (req, res) => {
  res.json(getLogs());
});

export default router;
