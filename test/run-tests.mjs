// Runs the engine unit tests embedded in paper-flight.html under Node.
// Usage: node test/run-tests.mjs [path/to/paper-flight.html]
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const file = process.argv[2] || join(here, '..', 'paper-flight.html');
const html = readFileSync(file, 'utf8');
const grab = id => {
  const m = html.match(new RegExp(`<script id="${id}">([\\s\\S]*?)</script>`));
  if (!m) throw new Error(`missing <script id="${id}">`);
  return m[1];
};
new Function(grab('engine'))();
new Function(grab('engine-tests'))();

const t0 = Date.now();
const results = globalThis.PaperTests.run();
let failed = 0;
for (const r of results) {
  console.log(`${r.ok ? 'PASS' : 'FAIL'}  ${r.name}${r.ok ? '' : '\n      ' + r.error}`);
  if (!r.ok) failed++;
}
console.log(`\n${results.length - failed}/${results.length} passed in ${Date.now() - t0} ms`);
process.exit(failed ? 1 : 0);
