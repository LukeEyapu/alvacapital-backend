import express from 'express';
import { addCopierCredential } from '../services/credential-service';

const router = express.Router();

router.post('/save-credentials', (req, res) => {
  const { copierId, apiKey, apiSecret } = req.body;



  if (!copierId || !apiKey || !apiSecret) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  addCopierCredential(copierId, apiKey, apiSecret);
  res.json({ status: 'Credential saved', copierId });
});

export default router;
