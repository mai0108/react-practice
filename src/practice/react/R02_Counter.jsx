// R02: useState とイベント

import { useState } from "react";

// 要件: 数字と「+1」「-1」「リセット」の3つのボタン。0 未満にはならないこと。
export default function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <span style={{ margin: "0 12px" }}>{count}</span>
      <button type="button" onClick={() => setCount(count + 1)}>
        +
      </button>
      <button type="button" onClick={() => setCount(Math.max(count - 1, 0))}>
        -
      </button>
      <button type="button" onClick={() => setCount(0)}>
        リセット
      </button>
    </div>
  );
}
