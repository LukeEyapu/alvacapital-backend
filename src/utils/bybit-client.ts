import axios from 'axios';
import crypto from 'crypto';

export async function getWalletBalance(apiKey: string, apiSecret: string) {
  const url = 'https://api.bybit.com/v5/account/wallet-balance';
  const timestamp = Date.now().toString();
  const recvWindow = '5000';

  // For GET requests, sign the query string (empty here)
  const queryString = `timestamp=${timestamp}&recvWindow=${recvWindow}`;
  const signature = crypto
    .createHmac('sha256', apiSecret)
    .update(queryString)
    .digest('hex');

  const headers = {
    'X-BAPI-API-KEY': apiKey,
    'X-BAPI-SIGN': signature,
    'X-BAPI-TIMESTAMP': timestamp,
    'X-BAPI-RECV-WINDOW': recvWindow,
  };

  const response = await axios.get(`${url}?${queryString}`, { headers });
  return response.data;
}
