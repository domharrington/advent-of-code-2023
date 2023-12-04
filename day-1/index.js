import path from 'node:path';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import { readFileSync } from 'node:fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const input = readFileSync(path.join(__dirname, 'input.txt'), 'utf-8');
const lines = input.split('\n');

const numbers = {
  one: '1',
  two: '2',
  three: '3',
  four: '4',
  five: '5',
  six: '6',
  seven: '7',
  eight: '8',
  nine: '9',
};

function toInteger(str) {
  if (str.length === 1) return str;
  return numbers[str];
}

function process(line) {
  const matches = Array.from(line.matchAll(new RegExp(`(?=(${Object.keys(numbers).join('|')}|${Object.values(numbers).join('|')}))`, 'g')))
    // Have to flatten because matchAll() returns with an interator of array items
    .flat()
    // Removing empty values
    .filter(Boolean);

  const first = matches.at(0);
  const last = matches.at(-1);
  return `${toInteger(first)}${toInteger(last)}`
}

const result = lines.map(line => process(line)).reduce((prev, next) => {
  return +prev + +next
});

console.log({ result });

// Part 1 assertions
assert.deepEqual(process('1abc2'), '12')
assert.deepEqual(process('pqr3stu8vwx'), '38')
assert.deepEqual(process('a1b2c3d4e5f'), '15')
assert.deepEqual(process('treb7uchet'), '77')

// Part 2 assertions
assert.deepEqual(process('ninefourone1'), '91');
assert.deepEqual(process('two1nine'), '29');
assert.deepEqual(process('eightwothree'), '83');
assert.deepEqual(process('abcone2threexyz'), '13');
assert.deepEqual(process('xtwone3four'), '24')
assert.deepEqual(process('4nineeightseven2'), '42')
assert.deepEqual(process('zoneight234'), '14')
assert.deepEqual(process('7pqrstsixteen'), '76')
assert.deepEqual(process('twofour2sevenk'), '27')
assert.deepEqual(process('jvhngkcdjhnmqghdbqdzqssf5onegzjbbcchboneightn'), '58')
