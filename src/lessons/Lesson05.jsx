// =====================================================================
// レッスン5: useEffect と外部データ
// =====================================================================
//
// これまでのコンポーネントは「props と state から画面を作る」だけでした。
// でも実際のアプリでは、画面の外の世界とやりとりが必要です。
//   - サーバーからデータを取ってくる
//   - タイマーを動かす
//   - ブラウザのタブのタイトルを変える
// こういう「描画以外の仕事」を副作用（effect）と呼び、useEffect に書きます。
// =====================================================================

import { useEffect, useState } from "react";

// ---------------------------------------------------------------------
// 1. useEffect の基本形
// ---------------------------------------------------------------------
//   useEffect(() => {
//     やりたいこと
//   }, [依存する値])
//
// 「依存する値」が変わったときだけ、中の処理が実行されます。
// 下の例では count が変わるたびに、ブラウザのタブのタイトルを書き換えます。
// （ブラウザのタブを見てください）

function TitleCounter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `カウント: ${count}`;
  }, [count]);

  return (
    <div className="card">
      <button type="button" onClick={() => setCount(count + 1)}>
        カウント {count}（タブのタイトルを見て）
      </button>
    </div>
  );
}

// ---------------------------------------------------------------------
// 2. 依存配列の3パターン
// ---------------------------------------------------------------------
//   useEffect(() => {...}, [count])  … count が変わったとき
//   useEffect(() => {...}, [])       … 最初の1回だけ
//   useEffect(() => {...})           … 描画のたび毎回（ほぼ使わない）
//
// 「最初の1回だけ」はデータ取得でよく使います。

// ---------------------------------------------------------------------
// 3. 後片付け（クリーンアップ）
// ---------------------------------------------------------------------
// タイマーのように「止める必要があるもの」は、
// useEffect の中から関数を return すると、React が止めるときに呼んでくれます。
// これを忘れるとタイマーが動きっぱなしになります。

function Clock() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timerId); // ← 後片付け
  }, []);

  return (
    <div className="card">
      <p>現在時刻: {now.toLocaleTimeString()}</p>
    </div>
  );
}

// ---------------------------------------------------------------------
// 4. データ取得
// ---------------------------------------------------------------------
// fetch(URL) でデータを取りに行きます。時間がかかるので、結果は「あとで」届きます。
// そのため state を3つ用意するのが定番です。
//   users   … 届いたデータ
//   loading … 取得中か？
//   error   … 失敗したときのメッセージ
//
// 下の fetchUsers は「public/users.json を読む」関数です。
// 本物のサーバーっぽくするため、わざと 1 秒待ってから返します。

async function fetchUsers(url = "/users.json") {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`取得に失敗しました（${response.status}）`);
  }
  return response.json();
}

// =====================================================================
// 練習問題: ユーザー一覧
// =====================================================================
function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // 「再読み込み」ボタンを押すたびに 1 増える数。この数が変わったら再取得したい
  const [reloadCount, setReloadCount] = useState(0);

  /**
   * 「再読み込み」ボタンを押したときの処理
   * - loading を true にする
   * - error を null にする
   * - reloadCount を 1 増やす
   * すると useEffect が反応して fetchUsers が呼ばれる
   */
  function handleReload() {
    setLoading(true);
    setError(null);
    setReloadCount(reloadCount + 1);
  }

  useEffect(() => {
    fetchUsers()
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [reloadCount]); // reloadCount が変わるたびに再取得する

  const reloadButton = (
    <button type="button" onClick={handleReload}>
      再読み込み
    </button>
  );

  if (loading) {
    return <p>読み込み中...</p>;
  }
  if (error) {
    return (
      <p>
        エラー: {error} {reloadButton}
      </p>
    );
  }
  return (
    <div className="card">
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name}（{user.city}）
          </li>
        ))}
      </ul>
      {reloadButton}
    </div>
  );
}

// =====================================================================
// 画面全体
// =====================================================================
function Lesson05() {
  return (
    <div className="lesson">
      <h1>レッスン5: useEffect と外部データ</h1>
      <p className="lead">
        コードは <code>src/lessons/Lesson05.jsx</code> にあります。
      </p>

      <h2>1. useEffect の基本</h2>
      <TitleCounter />

      <h2>3. 後片付け</h2>
      <Clock />

      <h2>4. データ取得 / 練習問題</h2>
      <div className="todo">
        <strong>ユーザー一覧</strong>
        <UserList />
      </div>
    </div>
  );
}

export default Lesson05;
