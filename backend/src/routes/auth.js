import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../db.js';
import { auth } from '../middleware/auth.js';

const router = Router();

// Cookie config — Secure flag only in production (requires HTTPS)
const cookieOptions = {
  httpOnly: true,
  sameSite: 'strict',
  path: '/',
  secure: process.env.NODE_ENV === 'production',
  maxAge: 24 * 60 * 60 * 1000, // 24 hours in ms
};

// POST /api/auth/login
router.post('/login', (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password required' });
    }

    const user = db.prepare(`SELECT * FROM users WHERE username = ?`).get(username);
    if (!user) {
      // Constant-time response — don't reveal whether the user exists
      bcrypt.compareSync('__dummy__', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ012345');
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const valid = bcrypt.compareSync(password, user.password_hash);
    if (!valid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // JWT_SECRET is guaranteed to be set — server.js exits on startup if missing
    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '24h' },
    );

    // Set httpOnly cookie — JS cannot read this token
    res.cookie('ct_admin_tok', token, cookieOptions);
    res.json({ username: user.username });
  } catch (err) {
    console.error('[auth/login]', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/auth/logout — clears the auth cookie server-side
router.post('/logout', (req, res) => {
  res.clearCookie('ct_admin_tok', { ...cookieOptions, maxAge: 0 });
  res.json({ ok: true });
});

// GET /api/auth/me — validate current session (used for client-side auth check on load)
router.get('/me', auth, (req, res) => {
  res.json({ username: req.user.username });
});

export default router;
