import express from 'express';
import { replicateTradeToAllCopiers } from '../services/replication-controller';


const router = express.Router();

router.post('/replicate', async (req, res) => {
  try {
    console.log('Received payload:', req.body); // 👈 Add this

    const tradePayload = req.body;

    if (!tradePayload?.symbol || !tradePayload?.side || !tradePayload?.qty) {
      return res.status(400).json({ error: 'Missing required trade fields: symbol, side, qty' });
    }
    
    const result = await replicateTradeToAllCopiers(tradePayload);
    res.json({ status: 'replication triggered', result });
  } catch (err: any) {
    console.error('❌ Replication error:', err);
    res.status(500).json({ error: 'Replication failed', details: err.message });
  }
});


export default router;
