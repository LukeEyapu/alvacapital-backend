export const config = {
  port: parseInt(process.env.PORT || '3000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  bybit: {
    apiKey: process.env.BYBIT_API_KEY!,
    apiSecret: process.env.BYBIT_API_SECRET!,
    baseUrl: process.env.BYBIT_BASE_URL || 'https://api.bybit.com',
  },
};
