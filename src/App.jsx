// ここが画面の入り口です。
// 今取り組んでいるレッスンのコンポーネントを import して表示します。
// レッスンが進んだら import 先を切り替えてください。
//
// 元のテンプレート画面を見たいときは
//   import StarterPage from './StarterPage.jsx'
// に切り替えて <StarterPage /> を表示すればOKです。
import Lesson04 from './lessons/Lesson04.jsx'
import './lessons/lessons.css'

function App() {
  return <Lesson04 />
}

export default App
