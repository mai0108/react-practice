// =====================================================================
// レッスン7: ルーティング（React Router）と複数ページ
// =====================================================================
//
// ここまでのアプリは1画面でした。実際のアプリは
//   /          … トップ
//   /users     … ユーザー一覧
//   /users/2   … ユーザー詳細
// のように、URL ごとに違う画面を出します。これをルーティングと呼びます。
//
// React Router の登場人物:
//   <BrowserRouter>  … アプリ全体を包む。URL を監視する
//   <Routes> <Route> … 「この URL ならこのコンポーネント」の対応表
//   <Link to="...">  … ページ遷移するリンク（<a> の代わり。画面が真っ白にならない）
//   useParams()      … URL の /users/:id の id 部分を取り出す
// =====================================================================

import {
  BrowserRouter,
  Link,
  NavLink,
  Route,
  Routes,
  useParams,
} from "react-router";

const users = [
  { id: 1, name: "山田 太郎", city: "東京", hobby: "読書" },
  { id: 2, name: "佐藤 花子", city: "大阪", hobby: "登山" },
  { id: 3, name: "鈴木 一郎", city: "福岡", hobby: "料理" },
];

// ---------------------------------------------------------------------
// 各ページ（ふつうのコンポーネント）
// ---------------------------------------------------------------------
function HomePage() {
  return (
    <div className="card">
      <h3>トップページ</h3>
      <p>上のメニューからページを切り替えてみてください。URL が変わります。</p>
    </div>
  );
}

function UsersPage() {
  return (
    <div className="card">
      <h3>ユーザー一覧</h3>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <Link to={`/users/${user.id}`}>{user.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function UserDetailPage() {
  const { id } = useParams();
  const user = users.find((user) => user.id === Number(id));
  return (
    <div className="card">
      <h3>ユーザー詳細</h3>
      {user ? (
        <div>
          <p>名前: {user.name}</p>
          <p>住んでいる所: {user.city}</p>
          <p>趣味: {user.hobby}</p>
        </div>
      ) : (
        <p>ユーザーが見つかりません</p>
      )}
    </div>
  );
}

function NotFoundPage() {
  return (
    <div className="card">
      <h3>ページが見つかりません</h3>
      <Link to="/">トップへ戻る</Link>
    </div>
  );
}

// ---------------------------------------------------------------------
// ナビゲーション
// ---------------------------------------------------------------------
// NavLink は Link とほぼ同じですが、「今いるページ」のリンクに
// 自動で active クラスが付くので、太字にするなどができます。
function Nav() {
  const style = ({ isActive }) => ({
    marginRight: 12,
    fontWeight: isActive ? "bold" : "normal",
  });
  return (
    <nav>
      <NavLink to="/" style={style} end>
        トップ
      </NavLink>
      <NavLink to="/users" style={style}>
        ユーザー一覧
      </NavLink>
      <NavLink to="/nai-page" style={style}>
        存在しないページ
      </NavLink>
    </nav>
  );
}

// ---------------------------------------------------------------------
// 対応表（URL → コンポーネント）
// ---------------------------------------------------------------------
function Lesson07() {
  return (
    <BrowserRouter>
      <div className="lesson">
        <h1>レッスン7: ルーティング</h1>
        <p className="lead">
          コードは <code>src/lessons/Lesson07.jsx</code> にあります。
        </p>
        <Nav />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/users/:id" element={<UserDetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default Lesson07;
