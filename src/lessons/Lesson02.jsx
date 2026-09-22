// =====================================================================
// レッスン2: イベントと state（useState）
// =====================================================================
//
// レッスン1のコンポーネントは「表示するだけ」でした。
// このレッスンでは、クリックや入力に反応して画面が変わる仕組みを学びます。
// =====================================================================

import { useState } from 'react'

// ---------------------------------------------------------------------
// 1. イベントハンドラ: クリックに反応する
// ---------------------------------------------------------------------
// onClick={関数} のように、「イベント名={呼び出す関数}」の形で書きます。
// よくある間違い: onClick={handleClick()} と () を付けると、
// 描画のたびに即実行されてしまいます。関数そのものを渡してください。

function AlertButton() {
  function handleClick() {
    alert('クリックされました！')
  }

  return (
    <button type="button" onClick={handleClick}>
      クリックしてみて
    </button>
  )
}

// ---------------------------------------------------------------------
// 2. state: 「変わる値」を持つ
// ---------------------------------------------------------------------
// ふつうの変数 (let count = 0) を書き換えても、React は画面を更新しません。
// useState を使うと、値を変えたときに React が自動で再描画してくれます。
//
//   const [値, 値を変える関数] = useState(初期値)
//
// 値を変える関数（setCount）を呼ぶと、
// コンポーネント関数がもう一度実行されて、新しい値で画面が描き直されます。

function Counter() {
  const [count, setCount] = useState(0)

  return (
    <div className="card">
      <h3>カウンター: {count}</h3>
      <button type="button" onClick={() => setCount(count + 1)}>
        +1
      </button>{' '}
      <button type="button" onClick={() => setCount(count - 1)}>
        -1
      </button>{' '}
      <button type="button" onClick={() => setCount(0)}>
        リセット
      </button>
    </div>
  )
}

// ---------------------------------------------------------------------
// 3. 真偽値の state: 表示 / 非表示を切り替える
// ---------------------------------------------------------------------
// state は数値だけでなく、真偽値・文字列・配列・オブジェクトも持てます。
// レッスン1の && と組み合わせると「開閉」が作れます。

function ToggleDetail() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="card">
      <button type="button" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? '閉じる' : '詳細を見る'}
      </button>
      {isOpen && <p>これが詳細です。もう一度押すと閉じます。</p>}
    </div>
  )
}

// ---------------------------------------------------------------------
// 4. 入力フォーム: 制御されたコンポーネント
// ---------------------------------------------------------------------
// <input> の value を state にし、onChange で state を更新します。
// こうすると「入力欄の中身 = state」が常に一致し、
// 文字数カウントやバリデーションが簡単に書けます。
//
// event.target.value に、いま入力欄に入っている文字列が入っています。

function NameInput() {
  const [name, setName] = useState('')

  return (
    <div className="card">
      <label>
        お名前:{' '}
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="ここに入力"
        />
      </label>
      <p>
        {name === '' ? 'まだ入力されていません' : `こんにちは、${name} さん！`}
        <span className="badge">{name.length} 文字</span>
      </p>
    </div>
  )
}

// =====================================================================
// 練習問題: 商品の数量セレクター
// =====================================================================
// ECサイトによくある「数量を + / - で選び、合計金額を表示する」部品です。
// 表示部分（JSX）はできています。数量を増減する2つの関数を完成させてください。
//
// 仕様:
//   - 数量は MIN（1）未満、MAX（10）より大きくならないこと
//   - 合計金額 = 単価 × 数量

const MIN = 1
const MAX = 10

function QuantitySelector({ productName, unitPrice }) {
  const [quantity, setQuantity] = useState(1)

  function increment() {
    setQuantity(Math.min(quantity + 1, MAX))
  }

  function decrement() {
    setQuantity(Math.max(quantity - 1, MIN))
  }

  return (
    <div className="card">
      <h3>{productName}</h3>
      <p>単価: {unitPrice}円</p>
      <p>
        <button type="button" onClick={decrement}>
          -
        </button>
        <span style={{ margin: '0 12px' }}>{quantity}</span>
        <button type="button" onClick={increment}>
          +
        </button>
      </p>
      <p>
        合計: <strong>{unitPrice * quantity}円</strong>
      </p>
    </div>
  )
}

// =====================================================================
// 画面全体
// =====================================================================
function Lesson02() {
  return (
    <div className="lesson">
      <h1>レッスン2: イベントと state</h1>
      <p className="lead">
        コードは <code>src/lessons/Lesson02.jsx</code> にあります。
      </p>

      <h2>1. イベントハンドラ</h2>
      <AlertButton />

      <h2>2. useState</h2>
      <Counter />

      <h2>3. 真偽値の state</h2>
      <ToggleDetail />

      <h2>4. 入力フォーム</h2>
      <NameInput />

      <h2>練習問題</h2>
      <div className="todo">
        <strong>数量セレクター</strong>
        <QuantitySelector productName="コーヒー豆 200g" unitPrice={980} />
      </div>
    </div>
  )
}

export default Lesson02
