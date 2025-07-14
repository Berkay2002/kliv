import { createClient } from 'redis';

const client = createClient({
  url: process.env.REDIS_URL,
});

client.on('error', err => console.log('Redis Client Error', err));

async function connectRedis() {
  if (!client.isOpen) {
    await client.connect();
    console.log('Connected to Redis');
  }
}

const SUBSCRIBERS_KEY = 'email_subscribers';

export async function addSubscriber(email: string): Promise<boolean> {
  await connectRedis();
  try {
    const currentSubscribers = await client.sMembers(SUBSCRIBERS_KEY);
    if (!currentSubscribers.includes(email)) {
      await client.sAdd(SUBSCRIBERS_KEY, email);
      console.log(`Subscriber added: ${email}`);
      return true;
    }
    console.log(`Subscriber already exists: ${email}`);
    return false;
  } catch (error) {
    console.error('Error adding subscriber:', error);
    return false;
  }
}

export async function removeSubscriber(email: string): Promise<boolean> {
  await connectRedis();
  try {
    const removed = await client.sRem(SUBSCRIBERS_KEY, email);
    if (removed > 0) {
      console.log(`Subscriber removed: ${email}`);
      return true;
    }
    console.log(`Subscriber not found: ${email}`);
    return false;
  } catch (error) {
    console.error('Error removing subscriber:', error);
    return false;
  }
}

export async function getSubscribers(): Promise<string[]> {
  await connectRedis();
  try {
    const subscribers = await client.sMembers(SUBSCRIBERS_KEY);
    return subscribers;
  } catch (error) {
    console.error('Error getting subscribers:', error);
    return [];
  }
} 