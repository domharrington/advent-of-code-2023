import path from 'node:path';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import { readFileSync } from 'node:fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const input = readFileSync(path.join(__dirname, 'input.txt'), 'utf-8');
const lines = input.split('\n');

// only 12 red cubes, 13 green cubes, and 14 blue cubes
const max = {
  red: 12,
  green: 13,
  blue: 14,
};

function process(game) {
  const [, contents] = game.split(': ');
  const rounds = contents.split('; ');
  return rounds.every(round => {
    const counts = round.split(', ');
    return counts.every(count => {
      const [amount, colour] = count.split(' ')
      return +amount <= max[colour];
    });
  });
}

const result = lines.map(game => {
  const id = +game.match(/Game (\d{0,3})/)[1];
  const possible = process(game);
  if (possible) return id;
})
  .filter(Boolean)
  .reduce((prev, next) => prev + next);

console.log({ result });

assert.deepEqual(process('Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green'), true);
assert.deepEqual(process('Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue'), true);
assert.deepEqual(process('Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red'), false);
assert.deepEqual(process('Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red'), false);
assert.deepEqual(process('Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green'), true);
