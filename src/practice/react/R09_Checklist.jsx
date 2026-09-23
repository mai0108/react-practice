// R09: 配列の state（1件だけ更新、削除）
// 要件: items を state に持ち、各項目にチェックボックスと「削除」ボタンを付ける。
//       チェックで done を反転（打ち消し線 className="done"）。削除でその項目を消す。
//       最後に「残り {未完了の数} 件」を表示。
const initialItems = [
  { id: 1, text: '牛乳を買う', done: false },
  { id: 2, text: '掃除', done: true },
  { id: 3, text: 'メール返信', done: false },
]

export default function Checklist() {
  return <p>（未実装）</p>
}
