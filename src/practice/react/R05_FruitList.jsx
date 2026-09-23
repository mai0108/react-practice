import { useState } from "react";

// R05: リストと key、条件分岐
// 要件: fruits を <ul> で表示。price が 100 以上のものは名前の後ろに「（高い）」を付ける。
//       fruits が空配列のときは「果物がありません」と表示。
//       ※ 動作確認のため、fruits を [] にしても試すこと
const fruits = [
  { id: 1, name: "りんご", price: 120 },
  { id: 2, name: "バナナ", price: 80 },
  { id: 3, name: "メロン", price: 800 },
];

export default function FruitList() {
  return <p>（未実装）</p>;
}
