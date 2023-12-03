import path from 'node:path';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import { readFileSync } from 'node:fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const input = readFileSync(path.join(__dirname, 'input.txt'), 'utf-8');
const lines = input.split('\n');

function process(line) {
  let first = null;
  line.split('').forEach(char => {
    if (first) return;
    if (Number.isInteger(+char)) {
      first = char;
    }
  });

  let last = null;
  line.split('').reverse().forEach(char => {
    if (last) return;
    if (Number.isInteger(+char)) {
      last = char;
    }
  });

  return `${first}${last}`;
}

const result = lines.map(line => process(line)).reduce((prev, next) => {
  return +prev + +next
});

console.log({ result });

assert.deepEqual(process('ninefourone1'), '11');
