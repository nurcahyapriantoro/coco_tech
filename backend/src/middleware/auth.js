import jwt from 'jsonwebtoken';

export function auth(req, res, next) {
  // Read token from httpOnly cookie (set at login).
  // Falls back to Authorization: Bearer header for dev/API tooling compatibility.
  const token = req.cookies?.ct_admin_tok
    ?? (req.headers['authorization']?.startsWith('Bearer ')
        ? req.headers['authorization'].slice(7)
        : null);

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    // JWT_SECRET is guaranteed to be set — server.js exits on startup if missing
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}
