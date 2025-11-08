import express from 'express';
import { getAllCopierCredentials } from '../services/credential-service';

const router = express.Router();

router.get('/credentials', (req, res) => {
  const copiers = getAllCopierCredentials();

  if (!copiers || copiers.length === 0) {
    return res.status(404).json({ message: 'No copier credentials found' });
  }

  res.json({ copiers });
});

export default router;
