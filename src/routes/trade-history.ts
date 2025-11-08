import express from 'express';
import { getCopierCredential } from '../services/credential-service';
import { getAllCopierCredentials } from '../services/credential-service';

const router = express.Router();

/**
 * GET /api/trade-history/:copierId
 * Returns closed trades for a given copier
 */
router.get('/trade-history/:copierId', async (req, res) => {
  const { copierId } = req.params;
  const credential = getCopierCredential(copierId);

  if (!credential) {
    return res.status(404).json({ error: 'Copier not found' });
  }

  try {
    // Placeholder until Bybit signing logic is added
    const history = [
      { symbol: 'ETHUSDT', side: 'BUY', price: 2000, qty: 0.5, time: '2025-11-08T12:00:00Z' }
    ];

    res.json({ copierId, history });
  } catch (err: any) {
    console.error('❌ Error fetching trade history:', err.message);
    res.status(500).json({ error: 'Failed to fetch trade history' });
  }
});

/**
 * GET /api/trade-history
 * Returns closed trades for all copiers
 */
router.get('/trade-history', async (req, res) => {
  try {
    const copiers = getAllCopierCredentials();

    const results = copiers.map(copier => ({
      copierId: copier.id,
      history: [
        {
          symbol: 'ETHUSDT',
          side: 'BUY',
          price: 2000,
          qty: 0.5,
          time: '2025-11-08T12:00:00Z'
        },
        {
          symbol: 'BTCUSDT',
          side: 'SELL',
          price: 36000,
          qty: 0.01,
          time: '2025-11-08T10:30:00Z'
        }
      ]
    }));

    res.json(results);
  } catch (err: any) {
    console.error('❌ Error fetching global trade history:', err.message);
    res.status(500).json({ error: 'Failed to fetch trade history' });
  }
});

export default router;
