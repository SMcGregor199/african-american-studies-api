import test from 'node:test';
import assert from 'node:assert/strict';
import { Readable } from 'node:stream';
import { createApp } from '../app.js';

const fixture = {
  figures: [
    { id: 'ida-b-wells', name: 'Ida B. Wells', lastName: 'Wells', titles: ['southern-horrors'], concepts: ['racial-justice'] },
  ],
  titles: [
    { id: 'southern-horrors', title: 'Southern Horrors', figures: ['ida-b-wells'], concepts: ['racial-justice'] },
  ],
  concepts: [
    { id: 'racial-justice', term: 'Racial Justice', titles: ['southern-horrors'], figures: ['ida-b-wells'] },
  ],
  movements: [
    { id: 'anti-lynching', name: 'Anti-Lynching Movement', figures: ['ida-b-wells'], titles: ['southern-horrors'], concepts: ['racial-justice'] },
  ],
  organizations: [],
};

async function request(app, url) {
  const req = new Readable({
    read() {
      this.push(null);
    },
  });
  req.method = 'GET';
  req.url = url;
  req.headers = {};
  req.socket = { encrypted: false };
  req.connection = req.socket;

  const headers = {};
  const chunks = [];

  return new Promise((resolve) => {
    const res = {
      statusCode: 200,
      setHeader(name, value) {
        headers[name.toLowerCase()] = value;
      },
      getHeader(name) {
        return headers[name.toLowerCase()];
      },
      getHeaders() {
        return headers;
      },
      removeHeader(name) {
        delete headers[name.toLowerCase()];
      },
      write(chunk) {
        chunks.push(Buffer.from(chunk));
      },
      end(chunk) {
        if (chunk) chunks.push(Buffer.from(chunk));
        const text = Buffer.concat(chunks).toString('utf8');
        resolve({
          status: this.statusCode,
          text,
          body: JSON.parse(text),
        });
      },
    };

    app.handle(req, res);
  });
}

test('figure route returns a resolved semantic network profile', async () => {
  const response = await request(createApp({ data: fixture }), '/api/figures/ida-b-wells');

  assert.equal(response.status, 200);
  assert.equal(response.body.figure.name, 'Ida B. Wells');
  assert.deepEqual(response.body.titles.map((title) => title.id), ['southern-horrors']);
  assert.deepEqual(response.body.concepts.map((concept) => concept.id), ['racial-justice']);
});

test('movement route sends a profile response', async () => {
  const response = await request(createApp({ data: fixture }), '/api/movements/anti-lynching');

  assert.equal(response.status, 200);
  assert.equal(response.body.movement.name, 'Anti-Lynching Movement');
  assert.deepEqual(response.body.figures.map((figure) => figure.id), ['ida-b-wells']);
});
