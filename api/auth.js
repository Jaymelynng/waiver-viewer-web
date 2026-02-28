import { kv } from '@vercel/kv';
import crypto from 'crypto';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { pin } = req.body || {};
  if (!pin) {
    return res.status(400).json({ error: 'PIN required' });
  }

  const hash = crypto.createHash('sha256').update(String(pin)).digest('hex');
  const storedHash = process.env.ADMIN_PASSWORD_HASH;

  if (!storedHash) {
    return res.status(500).json({ error: 'Admin password not configured. Set ADMIN_PASSWORD_HASH in Vercel env vars.' });
  }

  if (hash !== storedHash) {
    return res.status(401).json({ error: 'Invalid PIN' });
  }

  const token = crypto.randomBytes(32).toString('hex');
  await kv.set(`session:${token}`, { created: Date.now() }, { ex: 86400 });

  return res.status(200).json({ token });
}
