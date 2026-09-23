// =====================================================================
// レッスン6: useRef / カスタムフック / useContext
// =====================================================================
//
// 3つとも「useState と useEffect だけだと不便な場面」を助ける道具です。
//   useRef        … 画面の要素（input など）を直接さわりたい
//   カスタムフック … 同じ state + effect の組み合わせを使い回したい
//   useContext    … 孫やひ孫まで props をバケツリレーせずに値を届けたい
// =====================================================================

import { createContext, useContext, useEffect, useRef, useState } from "react";

// ---------------------------------------------------------------------
// 1. useRef: 画面の要素をつかむ
// ---------------------------------------------------------------------
// <input ref={inputRef} /> と書くと、inputRef.current にその input 要素が入ります。
// これで input.focus() のようなブラウザの機能を直接呼べます。
//
// state との違い: ref の値を変えても再描画されません。
// 「画面に表示しない値」「DOM 要素」を持つときに使います。

function FocusInput() {
  const inputRef = useRef(null);

  function handleClick() {
    inputRef.current.focus(); // ← input にカーソルを移す
  }

  return (
    <div className="card">
      <input ref={inputRef} placeholder="ボタンを押すとここにフォーカス" />{" "}
      <button type="button" onClick={handleClick}>
        フォーカス
      </button>
    </div>
  );
}

// ---------------------------------------------------------------------
// 2. カスタムフック: state + effect のセットを関数にまとめる
// ---------------------------------------------------------------------
// レッスン5の「users / loading / error + useEffect で fetch」は、
// 「商品一覧」「記事一覧」など、取るものが変わっても毎回同じ形です。
// そこで use で始まる関数にまとめると、1行で使い回せます。
//
//   const { data, loading, error } = useFetch('/users.json')
//
// ルール: 名前は use で始める。中で useState / useEffect を使ってよい。

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadJson(url)
      .then((data) => {
        setData(data);
        setLoading(false);
        console.log("取得成功:", data);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [url]);

  return { data, loading, error };
}

// URL の JSON を読む。わざと 1 秒待つ。失敗したら例外を投げる
async function loadJson(url) {
  await delay(1000);
  const response = await fetch(url);
  if (!response.ok) throw new Error(`取得に失敗しました（${response.status}）`);
  return response.json();
}

// useFetch を使う側。レッスン5より圧倒的に短くなります
function UserList() {
  const { data: users, loading, error } = useFetch("/users.json");

  if (loading) return <p>読み込み中...</p>;
  if (error) return <p>エラー: {error}</p>;
  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>
          {user.name}（{user.city}）
        </li>
      ))}
    </ul>
  );
}

// ---------------------------------------------------------------------
// 3. useContext: 深い階層に値を届ける
// ---------------------------------------------------------------------
// 「ログイン中のユーザー名」を、App → Page → Header → UserBadge と
// 4段下まで表示したいとします。props で渡すと途中の Page と Header は
// 使いもしない user を受け取って渡すだけになります（バケツリレー）。
//
// Context を使うと、上で <UserContext value={...}> と包んでおけば、
// 下のどこからでも useContext(UserContext) で取り出せます。

const UserContext = createContext(null);

function UserBadge() {
  const user = useContext(UserContext); // ← props を通さず直接受け取る
  return <span className="badge">{user.name}</span>;
}

function Header() {
  // user を受け取っていないのに、下の UserBadge は user を使える
  return (
    <p>
      マイページ <UserBadge />
    </p>
  );
}

function Footer() {
  const user = useContext(UserContext); // ← props を通さず直接受け取る
  return <p>ログイン中: {user.name}</p>
}

function Page() {
  return (
    <div className="card">
      <Header />
      <p>ここにページの中身</p>
      <Footer />
    </div>
  );
}

function ContextDemo() {
  const [user] = useState({ name: "山田 太郎" });

  return (
    <UserContext value={user}>
      <Page />
    </UserContext>
  );
}

// =====================================================================
// 画面全体
// =====================================================================
function Lesson06() {
  return (
    <div className="lesson">
      <h1>レッスン6: useRef / カスタムフック / useContext</h1>
      <p className="lead">
        コードは <code>src/lessons/Lesson06.jsx</code> にあります。
      </p>

      <h2>1. useRef</h2>
      <FocusInput />

      <h2>2. カスタムフック / 練習問題</h2>
      <div className="todo">
        <strong>useFetch</strong>
        <UserList />
      </div>

      <h2>3. useContext</h2>
      <ContextDemo />
    </div>
  );
}

export default Lesson06;
