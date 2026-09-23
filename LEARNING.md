# React 学習ノート

このプロジェクトでの学習の進め方と進捗をここに記録します。

## 進め方

1. `docker compose up` で開発サーバーを起動し、http://localhost:5173 を開く
2. `src/lessons/LessonXX.jsx` を上から読む（コメントに解説があります）
3. 各レッスン末尾の **練習問題** を解く（保存すると即ブラウザに反映）
4. 終わったら下のチェックボックスにチェックを入れて、次のレッスンへ

表示するレッスンの切り替えは `src/App.jsx` の import 先を変えるだけです。
元のテンプレート画面は `src/StarterPage.jsx` に残してあります。

## カリキュラム

React 公式ドキュメント（https://ja.react.dev/learn）の流れに沿っています。

- [x] **レッスン1: コンポーネント / JSX / props / リスト / 条件分岐**（2026-09-22 完了）
  - 関数コンポーネントの作り方、JSX のルール
  - props で親から子へデータを渡す
  - `? :` と `&&` による条件分岐
  - `.map()` と `key` によるリスト表示
- [x] **レッスン2: イベントと state（useState）**（2026-09-22 完了）
  - onClick などのイベントハンドラ
  - useState で「変わる値」を持つ
  - フォーム入力（制御されたコンポーネント）
- [x] **レッスン3: state の設計と親子間のやりとり**（2026-09-22 完了）
  - 子から親へ関数 props で通知する
  - state のリフトアップ（持ち上げ）
  - 配列・オブジェクトの state を「イミュータブルに」更新する
- [x] **レッスン4: Todo アプリを作る（総合演習）**（2026-09-22 完了）
  - 追加 / 完了 / 削除 / フィルタ
- [x] **レッスン5: useEffect と外部データ**（2026-09-22 完了）
  - 副作用とは何か、依存配列
  - fetch で API からデータ取得、ローディング/エラー表示
- [x] **レッスン6: useRef / カスタムフック / useContext**（2026-09-23 完了）
- [x] **レッスン7: ルーティング（React Router）と複数ページ**（2026-09-23 完了）
- [x] **レッスン8: TypeScript 入門（型の基本、Todo アプリを .tsx に書き換え、props/state の型）**（2026-09-23 完了）
- [x] **仕上げ: 自力で小さなアプリを TypeScript で作る（`src/lessons/Final.tsx`）**（2026-09-23 完了）

## 進捗メモ

- 2026-09-24: React ドリル R03・R04 完了（onClick の即実行、{ } の二重、style の二重括弧を復習）。次は R05 から。
- 2026-09-23: 仕上げ課題 完了。**全カリキュラム修了。** useFetch を自分で再実装し、お気に入りを別 state にする設計判断も自分で行えた。
- 2026-09-23: レッスン8 完了（typescript 7 を追加、tsconfig.json 作成、npm run typecheck を追加。Todo の any を全部型に置き換えた）。
- 2026-09-23: レッスン7 完了（react-router 8 を追加。useParams と Link を自力実装）。
- 2026-09-23: レッスン6 完了（useFetch を自力で書けた。StrictMode の2回実行も確認）。
- 2026-09-22: Docker 環境構築完了。レッスン1 完了（練習3問すべて自力で正解）。レッスン2 完了（QuantitySelector を Math.min/max 方式で実装）。レッスン3 完了（handleAdd を Date.now() + スプレッド構文で実装）。「子から親へ関数を渡す」「() => f('A') と f('A') の違い」を重点的に復習した。レッスン4 完了（3ステップすべて自力で実装。フィルタは filter 内 if 方式）。レッスン5 完了（fetch + loading/error + 再読み込み。state のリセットは effect ではなくイベントハンドラに書く、を学んだ）。
- Claude Code の学習モード（Learning 出力スタイル）を有効化。コード内の `TODO(human)` を自分で書く進め方。

## 練習問題（2026-09-23 追加）

「見ながらでないと書けない」を「見ずに書ける」にするための反復練習です。
`src/App.jsx` で `Practice` を表示すると、ブラウザに練習ページが出ます。

- **JS ドリル** `src/practice/jsDrills.js`（15問、自動採点）
  React で毎回使う map / filter / スプレッド / テンプレート文字列 / find だけを練習
- **React ドリル** `src/practice/react/R01〜R12`（12問）
  小さなコンポーネントを白紙から書く。要件は各ファイルの先頭
- おすすめの順番: JS ドリルを全部 ✓ にする → React ドリルを R01 から順に
- 一度解いたら、数日後にもう一度（中身を消して）解くと定着します

進捗: JS 15/15（2026-09-23 完了）、React 4/12（次は R05）

## 2026-09-23 の計画（すべて完了）

目標: 明日中に一通り終える（目安 4〜5時間）

1. ~~復習（15分）: Todo アプリに「編集」機能を自力で足す~~ → 9/22 に前倒しで完了
2. レッスン6（1時間）: useRef、カスタムフック（fetch を useFetch に切り出す）、useContext
3. レッスン7（1時間）: React Router で複数ページ
4. レッスン8（1.5時間）: TypeScript 入門。型の基本 → Todo アプリを .tsx に書き換え → props と state に型を付ける
5. 仕上げ（1時間）: レッスン4と5を組み合わせた小さなアプリを TypeScript でヒントなしで作る

## 便利コマンド

```
docker compose up            # 開発サーバー起動
docker compose exec app npm run lint   # 文法チェック
docker compose exec app npm run build  # 本番ビルドが通るか確認
docker compose exec app npm run typecheck  # TypeScript の型チェック（レッスン8〜）
```
