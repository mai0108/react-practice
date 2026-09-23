// =====================================================================
// レッスン8: TypeScript 入門
// =====================================================================
//
// TypeScript = JavaScript + 型。ファイルの拡張子が .jsx → .tsx になります。
// 書いたコードはそのまま動き、加えて「型チェック」で間違いを実行前に教えてくれます。
//
// 型チェックの実行:  docker compose exec app npm run typecheck
// （ブラウザは型が間違っていても動きます。エディタの赤線と typecheck で確認します）
//
// ---------------------------------------------------------------------
// 型の基本（これだけ覚えれば React で困りません）
// ---------------------------------------------------------------------
//   const name: string = '太郎'          文字列
//   const age: number = 20               数値
//   const done: boolean = false          真偽値
//   const tags: string[] = ['a', 'b']    文字列の配列
//
//   type User = { id: number; name: string }     オブジェクトの形に名前を付ける
//   const users: User[] = [...]                  User の配列
//
//   function add(a: number, b: number): number   引数と戻り値の型
//   type Filter = 'all' | 'active' | 'done'      「この3つのどれか」という型
//
// 変数の型は、初期値から自動で推測されるので、毎回書く必要はありません。
//   const count = 0        // ← number と推測される
// 書く必要があるのは主に「関数の引数」と「props」と「空配列などの初期値」です。
// =====================================================================

import { useState } from 'react'

// ---------------------------------------------------------------------
// 1. 型付きの関数の例
// ---------------------------------------------------------------------
// 引数 price は number、戻り値は string と宣言しています。
// formatPrice('abc') と書くと、実行前にエラーになります。

function formatPrice(price: number): string {
  return `${price.toLocaleString()}円`
}

function PriceDemo() {
  return (
    <div className="card">
      <p>{formatPrice(1980)}</p>
      <p>{formatPrice(1234567)}</p>
    </div>
  )
}

// =====================================================================
// 練習問題: Todo アプリに型を付ける
// =====================================================================
// レッスン4の Todo アプリに型を付けたものです（any をすべて正しい型に置き換え済み）。

type Todo = {
  id: number
  title: string
  done: boolean
}
const initialTodos: Todo[] = [
  { id: 1, title: 'レッスン1〜7を終える', done: true },
  { id: 2, title: 'TypeScript を覚える', done: false },
]

type Filter = 'all' | 'active' | 'done'
const FILTERS: { value: Filter, label: string }[] = [
  { value: 'all', label: 'すべて' },
  { value: 'active', label: '未完了' },
  { value: 'done', label: '完了済み' },
]

function TodoForm({ onAdd }: { onAdd: (title: string) => void }) {
  const [text, setText] = useState('')

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    const title = text.trim()
    if (title === '') return
    onAdd(title)
    setText('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="やることを入力して Enter"
      />{' '}
      <button type="submit">追加</button>
    </form>
  )
}

function FilterButtons({ filter, onChange }: { filter: Filter; onChange: (value: Filter) => void }) {
  return (
    <p>
      {FILTERS.map((f) => (
        <button
          type="button"
          key={f.value}
          onClick={() => onChange(f.value)}
          style={{ marginRight: 8, fontWeight: f.value === filter ? 'bold' : 'normal' }}
        >
          {f.label}
        </button>
      ))}
    </p>
  )
}

function TodoItem({ todo, onToggle, onRemove }: { todo: Todo; onToggle: (id: number) => void; onRemove: (id: number) => void }) {
  return (
    <li>
      <label>
        <input type="checkbox" checked={todo.done} onChange={() => onToggle(todo.id)} />{' '}
        <span className={todo.done ? 'done' : ''}>{todo.title}</span>
      </label>{' '}
      <button type="button" onClick={() => onRemove(todo.id)}>
        削除
      </button>
    </li>
  )
}

function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>(initialTodos)
  const [filter, setFilter] = useState<Filter>('all')

  function handleAdd(title: string) {
    setTodos([...todos, { id: Date.now(), title, done: false }])
  }

  function handleToggle(id: number) {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo)))
  }

  function handleRemove(id: number) {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const visibleTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.done
    if (filter === 'done') return todo.done
    return true
  })

  return (
    <div className="card">
      <TodoForm onAdd={handleAdd} />
      <FilterButtons filter={filter} onChange={setFilter} />
      <ul>
        {visibleTodos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} onToggle={handleToggle} onRemove={handleRemove} />
        ))}
      </ul>
    </div>
  )
}

// =====================================================================
// 画面全体
// =====================================================================
function Lesson08() {
  return (
    <div className="lesson">
      <h1>レッスン8: TypeScript 入門</h1>
      <p className="lead">
        コードは <code>src/lessons/Lesson08.tsx</code> にあります。
      </p>

      <h2>1. 型付きの関数</h2>
      <PriceDemo />

      <h2>練習問題: Todo に型を付ける</h2>
      <div className="todo">
        <TodoApp />
      </div>
    </div>
  )
}

export default Lesson08
