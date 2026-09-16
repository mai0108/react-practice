# react-docker-practice

Docker上だけで動く、React（Vite + JavaScript）の練習用プロジェクトです。
パソコンに Node.js をインストールしなくても、Docker さえあれば開発サーバーを動かせます。

## ファイルの説明

- **Dockerfile**: このプロジェクト用のコンテナ（開発環境）の作り方を書いた設計図です。Node.js 24 のイメージをベースに、依存パッケージをインストールし、Vite の開発サーバーを起動します。
- **compose.yaml**: `docker compose` コマンドでコンテナを起動するための設定ファイルです。ポート番号の割り当てや、自分のパソコンのファイルをコンテナと共有する設定（ボリューム）をまとめています。
- **.dockerignore**: Docker イメージを作るときに、コンテナに含めなくてよいファイル（`node_modules`、`dist`、`.git`）を指定します。ビルドを速くし、余計なファイルの混入を防ぎます。
- **vite.config.js の変更点**: `server.host: true` でコンテナの外（自分のパソコンのブラウザ）からアクセスできるようにし、`server.watch.usePolling: true` で Windows の共有フォルダでもファイルの変更を検知できるようにしています。

## 毎日使うコマンド

プロジェクトのフォルダ（このファイルがある場所）で実行してください。

```
# 初回、またはpackage.jsonを変更した後
docker compose up --build

# 2回目以降（すでにビルド済みの場合）
docker compose up

# 終了するとき
docker compose down

# 新しいパッケージを追加したいとき
docker compose exec app npm install <パッケージ名>

# package.json を変更した後、イメージを作り直したいとき
docker compose build
```

## アクセス方法

コンテナが起動したら、ブラウザで以下を開いてください。

http://localhost:5173

## 編集してみよう

`src/App.jsx` を編集して保存すると、ブラウザの表示が自動で更新されます（ホットリロード）。
コンテナを再起動する必要はありません。

## 困ったとき

- **ポートがすでに使われていると言われる**: `5173` 番ポートを使っている他のアプリやコンテナがないか確認してください。`docker compose down` で一度停止するか、`compose.yaml` の `ports` の左側の番号（例: `"5174:5173"`）を別の空いている番号に変更してください。
- **ファイルを編集しても画面に反映されない**: Windows 環境ではファイルの変更通知がうまく届かないことがあるため、`vite.config.js` の `watch.usePolling: true` と、`compose.yaml` の `CHOKIDAR_USEPOLLING=true` で定期的にファイルをチェックする設定にしています。それでも反映されない場合は `docker compose restart app` を試してください。
- **node_modules がよくわからない**: `compose.yaml` の `volumes` に `/app/node_modules` という設定（匿名ボリューム）があります。これにより、自分のパソコンには `node_modules` フォルダが作られず、コンテナの中だけにインストールされた依存パッケージが保存されます。パソコン側とコンテナ側の `node_modules` が混ざって壊れるのを防ぐための仕組みです。
