// =====================================================================
// レッスン4: Todo アプリを作る（総合演習）
// =====================================================================
//
// レッスン1〜3で学んだことを全部使って、1つのアプリを作ります。
//
// 部品の構成:
//   TodoApp（親。todos と filter の state を持つ）
//   ├── TodoForm     入力欄。追加したい文字を onAdd で親に伝える
//   ├── FilterButtons  「すべて / 未完了 / 完了」の切り替え
//   └── TodoItem × N  1件分の表示。チェックと削除を onToggle / onRemove で親に伝える
//
// 見た目と部品はできています。親 TodoApp のロジックを段階的に書いていきます。
// =====================================================================

import { useState } from 'react'

// ---------------------------------------------------------------------
// 子1: 入力フォーム（レッスン3の AddItemForm とほぼ同じ）
// ---------------------------------------------------------------------
function TodoForm({ onAdd }) {
  const [text, setText] = useState('')

  function handleSubmit(event) {
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

// ---------------------------------------------------------------------
// 子2: フィルタボタン
// ---------------------------------------------------------------------
// filter の値は 'all' | 'active' | 'done' の3種類の文字列です。
const FILTERS = [
  { value: 'all', label: 'すべて' },
  { value: 'active', label: '未完了' },
  { value: 'done', label: '完了' },
]

function FilterButtons({ filter, onChange }) {
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

// ---------------------------------------------------------------------
// 子3: 1件分の表示
// ---------------------------------------------------------------------
function TodoItem({ todo, onToggle, onRemove }) {
  return (
    <li>
      <label>
        <input
          type="checkbox"
          checked={todo.done}
          onChange={() => onToggle(todo.id)}
        />{' '}
        <span className={todo.done ? 'done' : ''}>{todo.title}</span>
      </label>{' '}
      <button type="button" onClick={() => onRemove(todo.id)}>
        削除
      </button>
    </li>
  )
}

// ---------------------------------------------------------------------
// 親: TodoApp
// ---------------------------------------------------------------------
const initialTodos = [
  { id: 1, title: 'レッスン1〜3を終える', done: true },
  { id: 2, title: 'Todo アプリを完成させる', done: false },
]

function TodoApp() {
  const [todos, setTodos] = useState(initialTodos)
  const [filter, setFilter] = useState('all')

  function handleAdd(title) {
    const newTodo = { id: Date.now(), title, done: false }
    setTodos([...todos, newTodo])
  }

  function handleToggle(id) {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo, // 「id が同じものだけ」をコピーして done を反転
      ),
    )
  }

  function handleRemove(id) {
    setTodos(todos.filter((todo) => todo.id !== id)) // 「id が違うものだけ」を残す
  }

  const visibleTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.done
    if (filter === 'done') return todo.done
    return true // filter === 'all'
  })

  const activeCount = todos.filter((todo) => !todo.done).length

  function handleClearDone() {
    setTodos(todos.filter((todo) => !todo.done)) // 「done が false のものだけ」を残す
  }

  return (
    <div className="card">
      <TodoForm onAdd={handleAdd} />
      <FilterButtons filter={filter} onChange={setFilter} />
      <ul>
        {visibleTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={handleToggle}
            onRemove={handleRemove}
          />
        ))}
      </ul>
      <p>
        残り {activeCount} 件{' '}
        <button type="button" onClick={handleClearDone}>
          完了を全部削除
        </button>
      </p>
    </div>
  )
}

// =====================================================================
// 画面全体
// =====================================================================
function Lesson04() {
  return (
    <div className="lesson">
      <h1>レッスン4: Todo アプリ</h1>
      <p className="lead">
        コードは <code>src/lessons/Lesson04.jsx</code> にあります。
      </p>
      <div className="todo">
        <TodoApp />
      </div>
    </div>
  )
}

export default Lesson04
