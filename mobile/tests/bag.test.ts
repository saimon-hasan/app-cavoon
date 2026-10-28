import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { addItem, initialState, itemKey, restoreState, subtotal, updateQuantity, type BagItem } from '../src/state/model.ts';

const catalog = JSON.parse(readFileSync(new URL('../src/data/products.json', import.meta.url), 'utf8'));
const item: BagItem = { productId: 'w1', size: 'M', color: 'Cloud white', quantity: 1 };
test('identical variants merge but different sizes and colors remain separate', () => {
  let bag = addItem([], item);
  bag = addItem(bag, item);
  bag = addItem(bag, { ...item, size: 'L' });
  bag = addItem(bag, { ...item, color: 'Sage green' });
  assert.equal(bag.length, 3);
  assert.equal(bag[0].quantity, 2);
  assert.equal(subtotal(bag, catalog), 196);
});
test('quantity is capped and removing a line only removes that variant', () => {
  let bag = addItem([], { ...item, quantity: 10 });
  bag = addItem(bag, item);
  assert.equal(bag[0].quantity, 10);
  bag = addItem(bag, { ...item, size: 'L' });
  bag = updateQuantity(bag, itemKey(item), 0);
  assert.equal(bag.length, 1);
  assert.equal(bag[0].size, 'L');
});
test('restoration drops stale products and invalid variants and deduplicates favorites', () => {
  const result = restoreState({ version: 1, bag: [item, item, { ...item, size: 'INVALID' }, { ...item, quantity: -1 }, { ...item, quantity: 1.5 }, { ...item, productId: 'deleted' }, null], saved: ['w1', 'w1', 'deleted'] }, catalog);
  assert.deepEqual(result, { version: 1, bag: [{ ...item, quantity: 2 }], saved: ['w1'] });
});
test('restoration safely handles unexpected schemas and excessive quantities', () => {
  for (const raw of [null, 'broken', {}, { version: 2 }, { version: 1, bag: 'bad', saved: null }]) {
    assert.deepEqual(restoreState(raw, catalog), initialState);
  }
  assert.equal(restoreState({ version: 1, bag: [{ ...item, quantity: 100 }] }, catalog).bag[0].quantity, 10);
});
test('bag round trip retains variants, quantities, and favorites', () => {
  const state = { version: 1, bag: [item, { ...item, size: 'L', quantity: 3 }], saved: ['w1', 'm2'] };
  assert.deepEqual(restoreState(JSON.parse(JSON.stringify(state)), catalog), state);
  assert.equal(subtotal(state.bag, catalog), 196);
});
