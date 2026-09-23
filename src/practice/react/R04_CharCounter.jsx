import { useState } from "react";

// R04: 制御された input
// 要件: 入力欄と、その下に「{文字数} 文字」を表示。「クリア」ボタンで空にする。
//       20 文字を超えたら文字数を赤くする（style={{ color: 'red' }}）。
export default function CharCounter() {
  const [text, setText] = useState("");

  return (
    <div className="card">
      <label>
        <input
          type="text"
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="ここに入力"
        />
      </label>
      <p>
        <span
          className="badge"
          style={{ color: text.length > 20 ? "red" : "inherit" }}
        >
          {text.length} 文字
        </span>
      </p>
      <button type="button" onClick={() => setText("")}>
        リセット
      </button>
    </div>
  );
}
