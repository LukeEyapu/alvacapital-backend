import express from 'express';
import { getCopierCredential } from '../services/credential-service';
import { getAllCopierCredentials } from '../services/credential-service';

const router = express.Router();

/**
 * GET /api/open-positions/:copierId
 * Returns active trades for a given copier
 */
router.get('/open-positions/:copierId', async (req, res) => {
  const { copierId } = req.params;
  const credential = getCopierCredential(copierId);

  if (!credential) {
    return res.status(404).json({ error: 'Copier not found' });
  }

  try {
    // Placeholder until Bybit signing logic is added
    const positions = [
      { symbol: 'BTCUSDT', qty: 0.01, entryPrice: 35000, markPrice: 35200, pnl: 20 }
    ];

    res.json({ copierId, positions });
  } catch (err: any) {
    console.error('❌ Error fetching positions:', err.message);
    res.status(500).json({ error: 'Failed to fetch positions' });
  }
});

router.get('/open-positions', async (req, res) => {
  const copiers = getAllCopierCredentials();

  const results = copiers.map(copier => ({
    copierId: copier.id,
    positions: [
      {
        symbol: 'BTCUSDT',
        qty: 0.01,
        entryPrice: 35000,
        markPrice: 35200,
        pnl: 20
      }
    ]
  }));

  res.json(results);
});

export default router;
