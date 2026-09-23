// =====================================================================
// 仕上げ課題: お気に入りユーザー
// =====================================================================
//
// レッスン4（一覧・切り替え・フィルタ）と レッスン5（fetch・loading・error）を
// 組み合わせた小さなアプリを、TypeScript で自力で作ってください。
//
// ■ 要件
//   1. /users.json を fetch して、ユーザー一覧を表示する
//      - 取得中は「読み込み中...」、失敗したら「エラー: メッセージ」を表示
//   2. 各ユーザーに「お気に入り」ボタンを付ける
//      - 押すとお気に入りになり、もう一度押すと解除される
//      - お気に入りのユーザーは名前の横に ★ を表示
//   3. 「すべて / お気に入りのみ」のフィルタボタンを付ける
//   4. 「お気に入り: N 人」と件数を表示する
//   5. any を使わない（type で User の形を定義する）
//
// ■ ヒント（どうしても詰まったときだけ）
//   - users.json の1件は { id, name, email, city } です
//   - お気に入りは「お気に入りの id の配列」を state に持つのが簡単です
//     例: const [favoriteIds, setFavoriteIds] = useState<number[]>([])
//   - 「含まれているか」は favoriteIds.includes(user.id)
//   - 過去のレッスンのファイルを見るのは自由です
//
// ■ 確認
//   docker compose exec app npm run typecheck   … エラーなし
//   docker compose exec app npm run lint        … 警告なし
//
// 部品の分け方（コンポーネントをいくつ作るか）はあなたに任せます。
// =====================================================================

import { useEffect, useState } from "react";

// 2026-09-23 完成。要件1〜5をすべて自力で実装。
type User = {
  id: number;
  name: string;
  email: string;
  city: string;
};

type Filter = "all" | "favorite";
const FILTERS: { value: Filter; label: string }[] = [
  { value: "all", label: "すべて" },
  { value: "favorite", label: "お気に入りのみ" },
];

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function loadJson(url: string) {
  await delay(1000);
  const response = await fetch(url);
  if (!response.ok) throw new Error(`取得に失敗しました（${response.status}）`);
  return response.json();
}

function useFetch(url: string) {
  const [data, setData] = useState<User[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadJson(url)
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [url]);

  return { data, loading, error };
}

function UserItem({
  user,
  isFavorite,
  onToggle,
}: {
  user: User;
  isFavorite: boolean;
  onToggle: (id: number) => void;
}) {
  return (
    <li>
      {user.name}
      {isFavorite && <span> ★ </span>}
      <button onClick={() => onToggle(user.id)}>お気に入り</button>
    </li>
  );
}

function FilterButtons({
  filter,
  onChange,
}: {
  filter: Filter;
  onChange: (value: Filter) => void;
}) {
  return (
    <p>
      {FILTERS.map((f) => (
        <button
          type="button"
          key={f.value}
          onClick={() => onChange(f.value)}
          style={{
            marginRight: 8,
            fontWeight: f.value === filter ? "bold" : "normal",
          }}
        >
          {f.label}
        </button>
      ))}
    </p>
  );
}

function UserApp() {
  const { data: users, loading, error } = useFetch("/users.json");
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);
  const [filter, setFilter] = useState<Filter>("all");

  function handleToggleFavorite(id: number) {
    if (!users) return;
    setFavoriteIds(
      favoriteIds.includes(id) // お気に入りかどうかを判定
        ? favoriteIds.filter((fid) => fid !== id) // お気に入り解除
        : [...favoriteIds, id], // お気に入り追加
    );
  }

  if (loading) return <p>読み込み中...</p>;
  if (error) return <p>エラー: {error}</p>;
  if (!users) return <p>ユーザーが見つかりません</p>;

  const visibleUsers = users.filter((user) => {
    if (filter === "favorite") return favoriteIds.includes(user.id);
    return true;
  });

  return (
    <div className="card">
      <FilterButtons filter={filter} onChange={setFilter} />
      <p>お気に入り: {favoriteIds.length} 人</p>
      <hr />
      <ul>
        {visibleUsers.map((user: User) => (
          <UserItem
            key={user.id}
            user={user}
            isFavorite={favoriteIds.includes(user.id)}
            onToggle={handleToggleFavorite}
          />
        ))}
      </ul>
    </div>
  );
}

function Final() {
  return (
    <div className="lesson">
      <h1>仕上げ: お気に入りユーザー</h1>
      <p className="lead">
        コードは <code>src/lessons/Final.tsx</code> にあります。
      </p>
      <UserApp />
    </div>
  );
}

export default Final;
