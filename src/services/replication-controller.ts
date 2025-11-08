import { getAllCopierCredentials } from './credential-service';
import { placeOrderForCopier } from './bybit-service';
import { validateTradePayload } from './replication-service'; // optional helper

interface TradePayload {
  symbol: string;
  side: 'Buy' | 'Sell';
  order_type: 'Market' | 'Limit';
  qty: number;
  leverage?: number;
}

export async function replicateTradeToAllCopiers(tradePayload: TradePayload) {
  const copiers = getAllCopierCredentials();
  const results = [];

  for (const copier of copiers) {
    try {
      const response = await placeOrderForCopier(copier, tradePayload);
      results.push({ copier: copier.apiKey, success: true, response });
    } catch (err: any) {
      results.push({ copier: copier.apiKey, success: false, error: err.message });
    }
  }

  return results;
}
