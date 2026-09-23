// R06: 子から親へ（関数を props で渡す）
// 要件: 子 ColorButton は color を props で受け取り、その色のボタンを表示。
//       押されたら親からもらった onPick(color) を呼ぶ。
//       親 ColorChooser は3色分の ColorButton を並べ、「選択中: {色}」を表示する。
//       state を持つのは親だけ。
function ColorButton() {
  return <button type="button">（未実装）</button>
}

export default function ColorChooser() {
  return (
    <div>
      <ColorButton />
      <p>選択中: （未実装）</p>
    </div>
  )
}
