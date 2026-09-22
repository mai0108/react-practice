// =====================================================================
// レッスン3: state の設計と親子間のやりとり
// =====================================================================
//
// レッスン2では1つのコンポーネントの中で state を扱いました。
// 実際のアプリでは「複数のコンポーネントが同じデータを共有する」場面が
// ほとんどです。そのための考え方を学びます。
// =====================================================================

import { useState } from 'react'

// ---------------------------------------------------------------------
// 1. 子から親へ: 関数を props で渡す
// ---------------------------------------------------------------------
// props は親→子の一方通行です。では子で起きたクリックを親に伝えるには？
// 答え: 親が「関数」を props で渡し、子がそれを呼ぶ。
//
// 慣習として、渡す props 名は onXxx、親側の関数名は handleXxx にします。

function FancyButton({ label, onPress }) {
  return (
    <button type="button" onClick={onPress}>
      {label}
    </button>
  )
}

function ParentWithButton() {
  const [message, setMessage] = useState('まだ押されていません')

  function handlePress(label) {
    console.log('親が受け取った:', label)
    setMessage(`「${label}」が押されました`)
  }

  return (
    <div className="card">
      <FancyButton label="A" onPress={() => handlePress('A')} />{' '}
      <FancyButton label="B" onPress={() => handlePress('B')} />
      <p>{message}</p>
    </div>
  )
}

// ---------------------------------------------------------------------
// 2. state のリフトアップ（持ち上げ）
// ---------------------------------------------------------------------
// 2つのコンポーネントが同じ値を使いたいとき、
// state はそれぞれの中ではなく「共通の親」に置きます。
// 親が state を持ち、子には「値」と「変える関数」を props で配ります。
//
// 例: 色を選ぶ ColorPicker と、選んだ色を表示する Preview。
//     どちらも「いま選ばれている色」を知る必要がある → 親 ColorDemo が持つ。

const COLORS = ['tomato', 'gold', 'mediumseagreen', 'dodgerblue']

function ColorPicker({ selected, onSelect }) {
  return (
    <p>
      {COLORS.map((color) => (
        <button
          type="button"
          key={color}
          onClick={() => onSelect(color)}
          style={{
            background: color,
            marginRight: 8,
            outline: color === selected ? '3px solid black' : 'none',
          }}
        >
          {color}
        </button>
      ))}
    </p>
  )
}

function Preview({ color }) {
  return (
    <div style={{ background: color, padding: 16, borderRadius: 8 }}>
      選択中: {color}
    </div>
  )
}

function ColorDemo() {
  // ← state はここ（共通の親）に1つだけ
  const [selected, setSelected] = useState('tomato')

  return (
    <div className="card">
      <ColorPicker selected={selected} onSelect={setSelected} />
      <Preview color={selected} />
    </div>
  )
}

// ---------------------------------------------------------------------
// 3. オブジェクトの state は「コピーして」更新する
// ---------------------------------------------------------------------
// React は「state の参照が変わったか」で再描画を判断します。
//   profile.name = '...'   ← 同じオブジェクトを書き換えても気づかない（NG）
//   setProfile({ ...profile, name: '...' })  ← 新しいオブジェクトを作る（OK）
//
// { ...profile } は「profile の中身を全部コピーした新しいオブジェクト」です。

function ProfileEditor() {
  const [profile, setProfile] = useState({ name: '山田', age: 28 })

  return (
    <div className="card">
      <label>
        名前:{' '}
        <input
          value={profile.name}
          onChange={(e) => setProfile({ ...profile, name: e.target.value })}
        />
      </label>{' '}
      <label>
        年齢:{' '}
        <input
          type="number"
          value={profile.age}
          onChange={(e) => setProfile({ ...profile, age: Number(e.target.value) })}
        />
      </label>
      <p>
        {profile.name}（{profile.age}歳）
      </p>
    </div>
  )
}

// ---------------------------------------------------------------------
// 4. 配列の state も「新しい配列を作って」更新する
// ---------------------------------------------------------------------
// push / splice など元の配列を変えるメソッドは使いません。
//   追加: [...items, newItem]
//   削除: items.filter((item) => item.id !== id)
//   更新: items.map((item) => (item.id === id ? { ...item, done: true } : item))
//
// 下の買い物リストでは、削除と「買った」切り替えは実装済みです。

const initialItems = [
  { id: 1, name: '牛乳', bought: false },
  { id: 2, name: '卵', bought: true },
]

// 入力欄と「追加」ボタンだけを担当する子コンポーネント。
// 何を追加するかは親に onAdd で伝えるだけで、リスト自体は持たない。
function AddItemForm({ onAdd }) {
  const [text, setText] = useState('')

  function handleSubmit(event) {
    event.preventDefault() // フォーム送信でページが再読み込みされるのを防ぐ
    const name = text.trim()
    if (name === '') return
    onAdd(name) // 親に「追加する名前」を伝える
    setText('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="買うものを入力"
      />{' '}
      <button type="submit">追加</button>
    </form>
  )
}

// 「買ったものを消す」ボタンだけの子コンポーネント。
// 押されたら、親からもらった onClear を呼ぶだけ。
function ClearBoughtButton({ onClear }) {
  return (
    <button type="button" onClick={onClear}>
      買ったものを消す
    </button>
  )
}

// =====================================================================
// 練習問題: 買い物リストへの追加
// =====================================================================
function ShoppingList() {
  const [items, setItems] = useState(initialItems)

  function handleAdd(name) {
    const newItem = {id: Date.now(), name, bought: false}
    setItems([...items, newItem])
  }

  function handleToggle(id) {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, bought: !item.bought } : item, // 「id が同じものだけ」をコピーして bought を反転
      ),
    )
  }

  function handleRemove(id) {
    setItems(items.filter((item) => item.id !== id)) // 「id が違うものだけ」を残す
  }

  function handleClearBought() {
    setItems(items.filter((item) => !item.bought)) // 「買ったもの以外」を残す
  }

  return (
    <div className="card">
      <AddItemForm onAdd={handleAdd} />
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <label>
              <input
                type="checkbox"
                checked={item.bought}
                onChange={() => handleToggle(item.id)}
              />{' '}
              <span className={item.bought ? 'done' : ''}>{item.name}</span>
            </label>{' '}
            <button type="button" onClick={() => handleRemove(item.id)}>
              削除
            </button>
          </li>
        ))}
      </ul>
      <p>
        残り {items.filter((item) => !item.bought).length} 品{' '}
        <ClearBoughtButton onClear={handleClearBought} />
      </p>
    </div>
  )
}

// =====================================================================
// 画面全体
// =====================================================================
function Lesson03() {
  return (
    <div className="lesson">
      <h1>レッスン3: state の設計と親子間のやりとり</h1>
      <p className="lead">
        コードは <code>src/lessons/Lesson03.jsx</code> にあります。
      </p>

      <h2>1. 子から親へ（関数を props で渡す）</h2>
      <ParentWithButton />

      <h2>2. state のリフトアップ</h2>
      <ColorDemo />

      <h2>3. オブジェクトの state</h2>
      <ProfileEditor />

      <h2>4. 配列の state / 練習問題</h2>
      <div className="todo">
        <strong>買い物リスト</strong>
        <ShoppingList />
      </div>
    </div>
  )
}

export default Lesson03
