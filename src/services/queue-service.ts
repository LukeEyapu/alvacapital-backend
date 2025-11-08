import { Queue } from 'bullmq';
import { redis } from '../utils/redis-client';

let replicationQueue: Queue | null = null;

if (redis) {
  replicationQueue = new Queue('replication', { connection: redis.options });
  console.log('✅ Queue initialized');
} else {
  console.log('🚫 Queue not initialized (Redis disabled)');
}

export { replicationQueue };
