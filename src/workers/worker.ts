import { Worker } from 'bullmq';
import { redis } from '../utils/redis-client';

const worker = new Worker('transferQueue', async job => {
  const { apiKey, apiSecret } = job.data;
  console.log(`🔁 Processing trade for ${apiKey}`);

  await new Promise(resolve => setTimeout(resolve, 1000));
  console.log(`✅ Trade replicated for ${apiKey}`);
}, {
  connection: {
    ...redis.options,
    maxRetriesPerRequest: null,
  },
});

worker.on('completed', job => {
  console.log(`🎉 Job ${job.id} completed`);
});

worker.on('failed', (job, err) => {
  console.error(`❌ Job ${job?.id} failed:`, err);
});
