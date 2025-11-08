import express from 'express';
import dotenv from 'dotenv';
import { redis } from './utils/redis-client';
import replicationRoutes from './routes/replication';
import { addCopierCredential, getAllCopierCredentials } from './services/credential-service';
import credentialsRoute from './routes/credentials';
import saveCredentialsRoute from './routes/save-credentials';
import statsRoute from './routes/stats';
import openPositionsRoute from './routes/open-positions';
import tradeHistoryRoute from './routes/trade-history';
import logsRoute from './routes/logs';

dotenv.config();

const app = express();
app.use(express.json()); 

const PORT = process.env.PORT || 4000;


app.use('/api', replicationRoutes);
app.use('/api', credentialsRoute);
app.use('/api', saveCredentialsRoute);
app.use('/api', statsRoute);
app.use('/api', openPositionsRoute);
app.use('/api', tradeHistoryRoute);
app.use('/api', logsRoute);
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));



addCopierCredential('copier1', 'copier_api_key_1', 'copier_api_secret_1');
addCopierCredential('copier2', 'copier_api_key_2', 'copier_api_secret_2');

console.log("✅ Loaded copier credentials:");
console.log(getAllCopierCredentials());

// redis.ping()
//   .then(res => console.log('✅ Redis connected:', res))
//   .catch(err => console.error('❌ Redis connection failed:', err));

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
