import { Router } from 'express';
import db from '../db.js';
import { auth } from '../middleware/auth.js';

const router = Router();

/** Settings keys that are allowed to be read or written. */
const ALLOWED_KEYS = new Set(['copywriting']);

function parseValue(raw) {
  try {
    return JSON.parse(raw);
  } catch {
    return raw;
  }
}

// GET / — all settings as { key: value } object
router.get('/', (req, res) => {
  try {
    const rows = db.prepare(`SELECT key, value FROM settings`).all();
    const result = {};
    rows.forEach(row => {
      result[row.key] = parseValue(row.value);
    });
    res.json(result);
  } catch (err) {
    console.error('[settings GET /]', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /:key — single setting value
router.get('/:key', (req, res) => {
  try {
    const row = db.prepare(`SELECT value FROM settings WHERE key = ?`).get(req.params.key);
    if (!row) return res.status(404).json({ error: 'Setting not found' });
    res.json({ key: req.params.key, value: parseValue(row.value) });
  } catch (err) {
    console.error('[settings GET /:key]', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT /:key — upsert a setting (protected)
router.put('/:key', auth, (req, res) => {
  try {
    if (!ALLOWED_KEYS.has(req.params.key)) {
      return res.status(400).json({ error: `Unknown settings key: "${req.params.key}"` });
    }
    const { value } = req.body;
    if (value === undefined) {
      return res.status(400).json({ error: 'value is required in body' });
    }
    const serialized = typeof value === 'string' ? value : JSON.stringify(value);
    db.prepare(`INSERT INTO settings (key, value) VALUES (?, ?)
                ON CONFLICT(key) DO UPDATE SET value = excluded.value`)
      .run(req.params.key, serialized);
    res.json({ key: req.params.key, value: parseValue(serialized) });
  } catch (err) {
    console.error('[settings PUT /:key]', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
