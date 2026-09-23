// 練習問題のページ。上のボタンで JS ドリル / React ドリルを切り替えます。
import { useState } from 'react'
import PracticeJS from './PracticeJS.jsx'
import PracticeReact from './PracticeReact.jsx'

function Practice() {
  const [tab, setTab] = useState('js')

  return (
    <div className="lesson">
      <h1>練習問題</h1>
      <p>
        <button type="button" onClick={() => setTab('js')} style={{ fontWeight: tab === 'js' ? 'bold' : 'normal', marginRight: 8 }}>
          JS ドリル（自動採点）
        </button>
        <button type="button" onClick={() => setTab('react')} style={{ fontWeight: tab === 'react' ? 'bold' : 'normal' }}>
          React ドリル
        </button>
      </p>
      {tab === 'js' ? <PracticeJS /> : <PracticeReact />}
    </div>
  )
}

export default Practice
