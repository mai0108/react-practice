// ここが画面の入り口です。
// 今取り組んでいるレッスンのコンポーネントを import して表示します。
// レッスンが進んだら import 先を切り替えてください。
//
// 元のテンプレート画面を見たいときは
//   import StarterPage from './StarterPage.jsx'
// に切り替えて <StarterPage /> を表示すればOKです。
// 練習ドリルに戻すときは
//   import Practice from './practice/Practice.jsx'
// にして <Practice /> を表示します。
import F01_PageSwitch from './lessons/fst/F01_PageSwitch.tsx'
import './lessons/lessons.css'

function App() {
  return <F01_PageSwitch />
}

export default App
