// =====================================================================
// JS ドリル: React で毎回使う JavaScript の書き方だけを練習します
// =====================================================================
// 各関数の中身を書いてください。ブラウザに自動で ✓ / ✗ が出ます。
// 「元の配列やオブジェクトを変えない」問題は、変えると ✗ になります。
// 上から順に。分からなければ Lesson03.jsx の下の方にヒントがあります。
// =====================================================================

// 練習1: 名前を受け取り「こんにちは、太郎さん」という文字列を返す
// TODO(human): ここから始めてください
export function greet(name) {}

// 練習2: 2つの数の合計を返す
export function sum(a, b) {}

// 練習3: 数値の配列を受け取り、全部2倍にした新しい配列を返す（map）
export function doubleAll(nums) {}

// 練習4: 数値の配列から偶数だけを残した新しい配列を返す（filter）
export function onlyEven(nums) {}

// 練習5: users（{ id, name } の配列）から、id が一致する1件を返す（find）
export function findById(users, id) {}

// 練習6: users から name だけを取り出した配列を返す（map）
export function names(users) {}

// 練習7: 配列の末尾に item を追加した新しい配列を返す。元の配列は変えない（スプレッド）
export function addItem(arr, item) {}

// 練習8: items から id が一致するものを取り除いた新しい配列を返す（filter）
export function removeById(items, id) {}

// 練習9: todos（{ id, title, done }）のうち id が一致する1件だけ done を反転した新しい配列を返す（map + スプレッド）
export function toggleDone(todos, id) {}

// 練習10: user オブジェクトの name だけを newName に変えた新しいオブジェクトを返す。元は変えない
export function updateName(user, newName) {}

// 練習11: todos のうち done が true の件数を返す
export function countDone(todos) {}

// 練習12: user（{ name, city }）から「山田（東京）」という文字列を返す（テンプレート文字列）
export function formatUser(user) {}

// 練習13: user.age が 18 以上なら true、そうでなければ false を返す
export function isAdult(user) {}

// 練習14: items（{ price, qty }）の price × qty の合計を返す（for 文でも reduce でも可）
export function total(items) {}

// 練習15: items（{ name, price }）を price の安い順に並べた新しい配列を返す。元は変えない
//         ヒント: [...items].sort((a, b) => a.price - b.price)
export function sortByPrice(items) {}
