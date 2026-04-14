const FIREBASE_URL = 'https://lunaworld-farm-default-rtdb.firebaseio.com';

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    if (req.method === 'OPTIONS') { res.status(200).end(); return; }

    const ip = (req.headers['x-forwarded-for'] || '').split(',')[0].trim()
             || req.socket?.remoteAddress
             || 'unknown';
    const ua  = req.headers['user-agent'] || '';
    const ref = req.headers['referer'] || '';
    const ts  = Date.now();

    try {
        await fetch(`${FIREBASE_URL}/visits.json`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ip, ua, ref, ts })
        });
    } catch (e) {
        // Firebase 실패해도 무시
    }

    res.status(200).json({ ok: true });
}
