import { useState } from "react";

// R03: 真偽値の state
// 要件: ボタンを押すと「詳細テキスト」が出たり消えたりする。
//       ボタンの文字も「開く」「閉じる」で切り替わる。
export default function Toggle() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button type="button" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "閉じる" : "詳細を見る"}
      </button>
      {isOpen && <p>詳細テキスト</p>}
    </div>
  );
}
