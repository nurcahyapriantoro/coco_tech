import { Router } from 'express';
import db from '../db.js';
import { auth } from '../middleware/auth.js';

/** Tables that are allowed to be accessed via this router. */
const ALLOWED_TABLES = new Set([
  'portfolio',
  'experience',
  'testimonials',
  'paket',
  'skills',
  'awards',
]);

/**
 * Build a standard CRUD router for an entity table.
 * Each row has: id (INTEGER PK), data (TEXT JSON), sort_order (INTEGER)
 */
export function buildCrudRouter(table) {
  if (!ALLOWED_TABLES.has(table)) {
    throw new Error(`[crud] Refused to build router for unknown table: "${table}"`);
  }
  const router = Router();

  // Helpers
  function parseRow(row) {
    try {
      const parsed = JSON.parse(row.data);
      // DB integer id ALWAYS wins — strip any 'id' from JSON blob to prevent
      // seeded string slugs (e.g. 'audit-monitoring') from overriding the
      // integer primary key used in PUT/DELETE routes.
      // The original JSON slug is re-exposed as 'slug' so the admin form
      // can still display and edit it.
      const { id: jsonSlug, ...rest } = parsed;
      const result = { id: row.id, sort_order: row.sort_order, ...rest };
      if (jsonSlug !== undefined) result.slug = jsonSlug;
      return result;
    } catch {
      return { id: row.id, sort_order: row.sort_order };
    }
  }

  function rowToData(body) {
    // Strip id (DB integer PK) and sort_order — those live in dedicated columns.
    // 'slug' is a user-defined string identifier stored inside the JSON blob.
    const { id: _id, sort_order: _so, ...rest } = body;
    return JSON.stringify(rest);
  }

  // GET / — all items ordered by sort_order
  router.get('/', (req, res) => {
    try {
      const rows = db.prepare(`SELECT * FROM ${table} ORDER BY sort_order ASC, id ASC`).all();
      res.json(rows.map(parseRow));
    } catch (err) {
      console.error(`[${table} GET /]`, err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // GET /:id — single item
  router.get('/:id', (req, res) => {
    try {
      const row = db.prepare(`SELECT * FROM ${table} WHERE id = ?`).get(req.params.id);
      if (!row) return res.status(404).json({ error: 'Not found' });
      res.json(parseRow(row));
    } catch (err) {
      console.error(`[${table} GET /:id]`, err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // POST / — create (protected)
  router.post('/', auth, (req, res) => {
    try {
      const { sort_order = 0 } = req.body;
      const data = rowToData(req.body);
      const result = db
        .prepare(`INSERT INTO ${table} (data, sort_order) VALUES (?, ?)`)
        .run(data, sort_order);
      const row = db.prepare(`SELECT * FROM ${table} WHERE id = ?`).get(result.lastInsertRowid);
      res.status(201).json(parseRow(row));
    } catch (err) {
      console.error(`[${table} POST /]`, err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // PUT /reorder — bulk update sort order (protected) — must be before /:id
  router.put('/reorder', auth, (req, res) => {
    try {
      const items = req.body; // array of { id, sort_order }
      if (!Array.isArray(items)) {
        return res.status(400).json({ error: 'Expected array of { id, sort_order }' });
      }
      const update = db.prepare(`UPDATE ${table} SET sort_order = ? WHERE id = ?`);
      const reorderMany = db.transaction((rows) => {
        rows.forEach(({ id, sort_order }) => update.run(sort_order, id));
      });
      reorderMany(items);
      res.json({ ok: true });
    } catch (err) {
      console.error(`[${table} PUT /reorder]`, err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // PUT /:id — update (protected)
  router.put('/:id', auth, (req, res) => {
    try {
      const row = db.prepare(`SELECT * FROM ${table} WHERE id = ?`).get(req.params.id);
      if (!row) return res.status(404).json({ error: 'Not found' });

      const { sort_order } = req.body;
      const data = rowToData(req.body);
      const newOrder = sort_order !== undefined ? sort_order : row.sort_order;

      db.prepare(`UPDATE ${table} SET data = ?, sort_order = ? WHERE id = ?`)
        .run(data, newOrder, req.params.id);

      const updated = db.prepare(`SELECT * FROM ${table} WHERE id = ?`).get(req.params.id);
      res.json(parseRow(updated));
    } catch (err) {
      console.error(`[${table} PUT /:id]`, err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // DELETE /:id — delete (protected)
  router.delete('/:id', auth, (req, res) => {
    try {
      const row = db.prepare(`SELECT id FROM ${table} WHERE id = ?`).get(req.params.id);
      if (!row) return res.status(404).json({ error: 'Not found' });
      db.prepare(`DELETE FROM ${table} WHERE id = ?`).run(req.params.id);
      res.json({ ok: true });
    } catch (err) {
      console.error(`[${table} DELETE /:id]`, err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  return router;
}
