// 自動採点用のテストケース。ここは書き換えなくてOKです。
import * as d from './jsDrills.js'

const users = [
  { id: 1, name: '山田' },
  { id: 2, name: '佐藤' },
  { id: 3, name: '鈴木' },
]
const todos = [
  { id: 1, title: 'A', done: false },
  { id: 2, title: 'B', done: true },
]

// { fn, args, expected, noMutate?: 何番目の引数を変えてはいけないか }
export const drills = [
  { no: 1, title: 'greet', fn: d.greet, cases: [
    { args: ['太郎'], expected: 'こんにちは、太郎さん' },
    { args: ['花子'], expected: 'こんにちは、花子さん' },
  ]},
  { no: 2, title: 'sum', fn: d.sum, cases: [
    { args: [1, 2], expected: 3 },
    { args: [10, -4], expected: 6 },
  ]},
  { no: 3, title: 'doubleAll', fn: d.doubleAll, cases: [
    { args: [[1, 2, 3]], expected: [2, 4, 6] },
    { args: [[]], expected: [] },
  ]},
  { no: 4, title: 'onlyEven', fn: d.onlyEven, cases: [
    { args: [[1, 2, 3, 4, 5, 6]], expected: [2, 4, 6] },
    { args: [[1, 3]], expected: [] },
  ]},
  { no: 5, title: 'findById', fn: d.findById, cases: [
    { args: [users, 2], expected: { id: 2, name: '佐藤' } },
    { args: [users, 99], expected: undefined },
  ]},
  { no: 6, title: 'names', fn: d.names, cases: [
    { args: [users], expected: ['山田', '佐藤', '鈴木'] },
  ]},
  { no: 7, title: 'addItem', fn: d.addItem, cases: [
    { args: [[1, 2], 3], expected: [1, 2, 3], noMutate: 0 },
    { args: [[], 'a'], expected: ['a'], noMutate: 0 },
  ]},
  { no: 8, title: 'removeById', fn: d.removeById, cases: [
    { args: [users, 2], expected: [{ id: 1, name: '山田' }, { id: 3, name: '鈴木' }], noMutate: 0 },
  ]},
  { no: 9, title: 'toggleDone', fn: d.toggleDone, cases: [
    { args: [todos, 1], expected: [{ id: 1, title: 'A', done: true }, { id: 2, title: 'B', done: true }], noMutate: 0 },
    { args: [todos, 2], expected: [{ id: 1, title: 'A', done: false }, { id: 2, title: 'B', done: false }], noMutate: 0 },
  ]},
  { no: 10, title: 'updateName', fn: d.updateName, cases: [
    { args: [{ id: 1, name: '山田', age: 20 }, '田中'], expected: { id: 1, name: '田中', age: 20 }, noMutate: 0 },
  ]},
  { no: 11, title: 'countDone', fn: d.countDone, cases: [
    { args: [todos], expected: 1 },
    { args: [[]], expected: 0 },
  ]},
  { no: 12, title: 'formatUser', fn: d.formatUser, cases: [
    { args: [{ name: '山田', city: '東京' }], expected: '山田（東京）' },
  ]},
  { no: 13, title: 'isAdult', fn: d.isAdult, cases: [
    { args: [{ name: 'a', age: 18 }], expected: true },
    { args: [{ name: 'b', age: 17 }], expected: false },
  ]},
  { no: 14, title: 'total', fn: d.total, cases: [
    { args: [[{ price: 100, qty: 2 }, { price: 50, qty: 3 }]], expected: 350 },
    { args: [[]], expected: 0 },
  ]},
  { no: 15, title: 'sortByPrice', fn: d.sortByPrice, cases: [
    { args: [[{ name: 'a', price: 300 }, { name: 'b', price: 100 }, { name: 'c', price: 200 }]],
      expected: [{ name: 'b', price: 100 }, { name: 'c', price: 200 }, { name: 'a', price: 300 }], noMutate: 0 },
  ]},
]

const clone = (v) => JSON.parse(JSON.stringify(v))
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b)

// 1ケース実行して { ok, got, error } を返す
export function runCase(fn, c) {
  const args = clone(c.args)
  const before = c.noMutate !== undefined ? JSON.stringify(args[c.noMutate]) : null
  try {
    const got = fn(...args)
    if (!same(got, c.expected)) return { ok: false, got }
    if (before !== null && JSON.stringify(args[c.noMutate]) !== before) {
      return { ok: false, got, error: '元の引数を変えてしまっています' }
    }
    return { ok: true, got }
  } catch (e) {
    return { ok: false, error: e.message }
  }
}
