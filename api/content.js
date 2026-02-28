import { kv } from '@vercel/kv';

async function validateToken(req) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) return false;
  const token = auth.slice(7);
  const session = await kv.get(`session:${token}`);
  return !!session;
}

export default async function handler(req, res) {
  // Allow GET without auth (public read)
  if (req.method === 'GET') {
    try {
      const content = await kv.get('content');
      if (!content) {
        return res.status(404).json({ error: 'Content not found. Run /api/seed first.' });
      }
      // Cache for 60s on CDN, revalidate in background
      res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300');
      return res.status(200).json(content);
    } catch (e) {
      return res.status(500).json({ error: 'KV not configured. Create a KV database in Vercel dashboard.' });
    }
  }

  // PUT requires auth
  if (req.method === 'PUT') {
    if (!(await validateToken(req))) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const content = req.body;
    if (!content || !content.waiver || !content.policy) {
      return res.status(400).json({ error: 'Invalid content. Must have waiver and policy keys.' });
    }

    await kv.set('content', content);
    return res.status(200).json({ ok: true });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
