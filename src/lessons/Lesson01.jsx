// =====================================================================
// レッスン1: コンポーネント / JSX / props / リスト / 条件分岐
// =====================================================================
//
// このファイルは「読む → ブラウザで確認する → 練習問題を解く」の順で
// 進めてください。ファイルを保存するとブラウザが自動で更新されます。
//
// 練習問題は「練習1」「練習2」…で検索すると見つかります。
// =====================================================================

// ---------------------------------------------------------------------
// 1. コンポーネントとは
// ---------------------------------------------------------------------
// React では「画面の部品」を関数で作ります。これをコンポーネントと呼びます。
// ルール:
//   - 関数名は大文字で始める（<Hello /> のようにタグとして使うため）
//   - JSX（HTMLに似た書き方）を return する
//
// JSX は HTML とほぼ同じですが、いくつか違いがあります。
//   - class ではなく className と書く
//   - 1つの親要素で包む必要がある（<div>...</div> か <>...</>）
//   - { } の中に JavaScript の式を書ける

function Hello() {
  return <p>こんにちは、React！</p>;
}

// ---------------------------------------------------------------------
// 2. props（プロパティ）: 親から子へデータを渡す
// ---------------------------------------------------------------------
// HTML の属性のように値を渡すと、子コンポーネントは props として受け取れます。
//   <Greeting name="太郎" />  →  props.name は "太郎"
//
// 引数の { name } は「分割代入」で、props.name を name として取り出しています。

function Greeting({ name }) {
  return <p>{name} さん、ようこそ！</p>;
}

// props には文字列以外（数値、真偽値、配列、関数…）も渡せます。
// 文字列以外を渡すときは { } で囲みます。 例: <UserCard age={20} />

function UserCard({ name, age, hobby }) {
  return (
    <div className="card">
      <h3>{name}</h3>
      <p>年齢: {age} 歳</p>
      <p>趣味: {hobby}</p>
    </div>
  );
}

// ---------------------------------------------------------------------
// 3. 条件分岐: 状況によって表示を変える
// ---------------------------------------------------------------------
// JSX の { } の中では if 文は書けませんが、
// 三項演算子 (条件 ? A : B) や && が使えます。

function LoginStatus({ isLoggedIn }) {
  return (
    <p>
      {isLoggedIn ? "ログイン中です" : "ログインしていません"}
      {/* && は「左が true のときだけ右を表示」 */}
      {isLoggedIn && <span className="badge">会員</span>}
    </p>
  );
}

// ---------------------------------------------------------------------
// 4. リスト: 配列からたくさんの要素を作る
// ---------------------------------------------------------------------
// 配列の .map() で、データ1件ごとに JSX を返します。
// 繰り返しで作る要素には、他と重複しない key を必ず付けます。
// （React が「どの要素が変わったか」を見分けるために使います）

const fruits = [
  { id: 1, name: "りんご", price: 120 },
  { id: 2, name: "バナナ", price: 80 },
  { id: 3, name: "みかん", price: 60 },
];

function FruitList() {
  return (
    <ul>
      {fruits.map((fruit) => (
        <li key={fruit.id}>
          {fruit.name} — {fruit.price}円
        </li>
      ))}
    </ul>
  );
}

// ---------------------------------------------------------------------
// 5. 組み合わせる: コンポーネントの中でコンポーネントを使う
// ---------------------------------------------------------------------
// 部品を組み合わせて画面を作るのが React の基本スタイルです。

const users = [
  { id: "u1", name: "山田", age: 28, hobby: "読書" },
  { id: "u2", name: "佐藤", age: 34, hobby: "登山" },
];

function UserList() {
  return (
    <div>
      {users.map((user) => (
        <UserCard
          key={user.id}
          name={user.name}
          age={user.age}
          hobby={user.hobby}
        />
      ))}
    </div>
  );
}

// =====================================================================
// 練習問題
// =====================================================================
// 下の Exercise コンポーネントたちを完成させてください。
// 完成したら「TODO」のコメントを消してOKです。

// 練習1: Greeting と同じ要領で、name と message を props で受け取り
//        「{name} さんへ: {message}」と表示する Message コンポーネントを作ってください。
//        ヒント: 引数を { name, message } にする
function Message({ name, message }) {
  return (
    <p>
      {name} さんへ: {message}
    </p>
  );
}

// 練習2: 下の todos 配列を使って、<ul> の中に <li> を map で並べてください。
//        done が true の項目には className="done" を付けて打ち消し線にしてください。
//        ヒント: className={todo.done ? 'done' : ''}
//        ヒント: key を忘れずに
const todos = [
  { id: 1, title: "Reactの環境構築", done: true },
  { id: 2, title: "コンポーネントを理解する", done: false },
  { id: 3, title: "propsを理解する", done: false },
];

function TodoList() {
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id} className={todo.done ? "done" : ""}>
          {todo.title}
        </li>
      ))}
    </ul>
  );
}

// 練習3: score（0〜100の数値）を props で受け取り、
//        80以上なら「合格」、それ以外なら「不合格」と表示する
//        Result コンポーネントを作ってください。
//        さらに、100点のときだけ「満点！」というバッジ（className="badge"）も出してください。
function Result({ score }) {
  return (
    <p>
      {score >= 80 ? "合格" : "不合格"}
      {score === 100 && <span className="badge">満点！</span>}
    </p>
  );
}

// =====================================================================
// 画面全体
// =====================================================================
function Lesson01() {
  return (
    <div className="lesson">
      <h1>レッスン1: コンポーネントと props</h1>
      <p className="lead">
        コードは <code>src/lessons/Lesson01.jsx</code> にあります。
      </p>

      <h2>1. コンポーネント</h2>
      <Hello />

      <h2>2. props</h2>
      <Greeting name="太郎" />
      <Greeting name="花子" />
      <UserCard name="鈴木" age={25} hobby="サッカー" />

      <h2>3. 条件分岐</h2>
      <LoginStatus isLoggedIn={true} />
      <LoginStatus isLoggedIn={false} />

      <h2>4. リスト</h2>
      <FruitList />

      <h2>5. 組み合わせ</h2>
      <UserList />

      <h2>練習問題</h2>
      <div className="todo">
        <strong>練習1</strong>
        <Message name="太郎" message="今日もがんばろう" />
      </div>
      <div className="todo">
        <strong>練習2</strong>
        <TodoList />
      </div>
      <div className="todo">
        <strong>練習3</strong>
        <Result score={85} />
        <Result score={60} />
        <Result score={100} />
      </div>
    </div>
  );
}

export default Lesson01;
