import express from 'express';
import { getCopierCredential } from '../services/credential-service';

const router = express.Router();

/**
 * GET /api/stats/:copierId
 * Returns placeholder account stats for a given copier
 */
router.get('/stats/:copierId', async (req, res) => {
  const { copierId } = req.params;
  const credential = getCopierCredential(copierId);

  if (!credential) {
    return res.status(404).json({ error: 'Copier not found' });
  }

  try {
    // Placeholder values until Bybit signing logic is added
    const stats = {
      equity: 1000,
      unrealisedPnl: 25,
      walletBalance: 975,
      marginBalance: 950
    };

    res.json({ copierId, stats });
  } catch (err: any) {
    console.error('❌ Error fetching stats:', err.message);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

export default router;
