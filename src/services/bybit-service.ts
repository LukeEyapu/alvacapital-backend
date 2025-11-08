import axios from 'axios';
import crypto from 'crypto';
import { config } from '../config';

function signParams(params: Record<string, any>): string {
  const ordered = Object.keys(params).sort().map(key => `${key}=${params[key]}`).join('&');
  return crypto.createHmac('sha256', config.bybit.apiSecret).update(ordered).digest('hex');
}

export async function getWalletStats() {
  const timestamp = Date.now();
  const params = {
    api_key: config.bybit.apiKey,
    timestamp,
  };
  const sign = signParams(params);

  const response = await axios.get(`${config.bybit.baseUrl}/v2/private/wallet/balance`, {
    params: { ...params, sign },
  });

  const balances = response.data.result;
  const usdt = balances.USDT;

  return {
    walletBalance: parseFloat(usdt.wallet_balance),
    marginBalance: parseFloat(usdt.margin_balance),
    unrealizedPnl: parseFloat(usdt.unrealised_pnl),
    totalEquity: parseFloat(usdt.equity),
  };
}

export async function placeOrderForCopier(
  copier: { apiKey: string; apiSecret: string },
  tradePayload: {
    symbol: string;
    side: 'Buy' | 'Sell';
    order_type: 'Market' | 'Limit';
    qty: number;
    leverage?: number;
  }
) {
  const timestamp = Date.now();
  const params: Record<string, any> = {
    api_key: copier.apiKey,
    symbol: tradePayload.symbol,
    side: tradePayload.side,
    order_type: tradePayload.order_type,
    qty: tradePayload.qty,
    timestamp,
  };

  if (tradePayload.leverage) {
    params.leverage = tradePayload.leverage;
  }

  const ordered = Object.keys(params).sort().map(key => `${key}=${params[key]}`).join('&');
  const sign = crypto.createHmac('sha256', copier.apiSecret).update(ordered).digest('hex');

  const response = await axios.post(`${config.bybit.baseUrl}/v2/private/order/create`, null, {
    params: { ...params, sign },
  });

  return response.data;
}
