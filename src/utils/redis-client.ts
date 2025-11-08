import Redis from 'ioredis';

let redis: Redis | null = null;

if (process.env.ENABLE_REDIS === 'true') {
  redis = new Redis(); // or pass config if needed
  redis.on('connect', () => console.log('✅ Redis connected'));
  redis.on('error', err => console.error('❌ Redis error:', err));
} else {
  console.log('🚫 Redis disabled in this environment');
}

export { redis as redis };
