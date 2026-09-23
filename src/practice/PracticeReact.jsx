import Greeting from './react/R01_Greeting.jsx'
import Counter from './react/R02_Counter.jsx'
import Toggle from './react/R03_Toggle.jsx'
import CharCounter from './react/R04_CharCounter.jsx'
import FruitList from './react/R05_FruitList.jsx'
import ColorChooser from './react/R06_ColorChooser.jsx'
import TwoButtons from './react/R07_TwoButtons.jsx'
import NameList from './react/R08_NameList.jsx'
import Checklist from './react/R09_Checklist.jsx'
import Countdown from './react/R10_Countdown.jsx'
import UserFetch from './react/R11_UserFetch.jsx'
import FilterList from './react/R12_FilterList.jsx'

const drills = [
  { file: 'R01_Greeting', el: <Greeting name="太郎" /> },
  { file: 'R02_Counter', el: <Counter /> },
  { file: 'R03_Toggle', el: <Toggle /> },
  { file: 'R04_CharCounter', el: <CharCounter /> },
  { file: 'R05_FruitList', el: <FruitList /> },
  { file: 'R06_ColorChooser', el: <ColorChooser /> },
  { file: 'R07_TwoButtons', el: <TwoButtons /> },
  { file: 'R08_NameList', el: <NameList /> },
  { file: 'R09_Checklist', el: <Checklist /> },
  { file: 'R10_Countdown', el: <Countdown /> },
  { file: 'R11_UserFetch', el: <UserFetch /> },
  { file: 'R12_FilterList', el: <FilterList /> },
]

function PracticeReact() {
  return (
    <div>
      <p className="lead">
        <code>src/practice/react/</code> の各ファイルを編集してください。要件はファイルの先頭にあります。
      </p>
      {drills.map((d) => (
        <div className="card" key={d.file}>
          <h3>{d.file}</h3>
          {d.el}
        </div>
      ))}
    </div>
  )
}

export default PracticeReact
