// =====================================================================
// fst-ryoshi 縮小版レッスン F01: URL ルーターなしの画面切替
// =====================================================================
//
// 業務リポジトリ fst-ryoshi の画面切替を、図書館アプリの題材で縮小したものです。
//   元ネタ: fst-ryoshi/src/w-contents/constants/pages.ts  … 画面IDの一覧（as const）と Union 型
//           fst-ryoshi/src/w-contents/App.tsx             … useState + switch で画面を切り替える入口
//
// 目的: react-router を使わずに画面を切り替える。
//   ・画面の数が少なく、ルーターを入れるほどでもない
//   ・URL を変えたくない（fst-ryoshi は URL が常に "/" のまま）
//   ・「今どの画面か」「どこから来たか」を state として持ち、型で守れる
//
// 進め方: 写経（そのまま書き写す）→ 改造（練習問題）→ 白紙から再現 の 3 段階。
// =====================================================================

import { useEffect, useState } from 'react'

// ---------------------------------------------------------------------
// 1. as const から Union 型を作る
// ---------------------------------------------------------------------
// fst-ryoshi の wPages / wPageType と同じ形です。

const PAGES = {
  TOP: 'top',
  LIST: 'list',
  DETAIL: 'detail',
} as const

type PageType = (typeof PAGES)[keyof typeof PAGES]

// 段階的に分解すると:
//
// (1) as const を外すと
//       const PAGES = { TOP: 'top', ... }
//     の型は { TOP: string; LIST: string; DETAIL: string } になる。
//     値が「ただの string」に広がるので PageType も string になってしまい、
//     setPage('tpo') のような打ち間違いを型チェックで見つけられない。
//
// (2) as const を付けると
//     型は { readonly TOP: 'top'; readonly LIST: 'list'; readonly DETAIL: 'detail' } になる。
//     値そのもの（'top' など）が型として残る。readonly なので書き換えもできない。
//
// (3) typeof PAGES
//     「PAGES という値」から「その型」を取り出す。上の (2) の型そのもの。
//
// (4) keyof typeof PAGES
//     その型のキーの Union。 'TOP' | 'LIST' | 'DETAIL'
//
// (5) (typeof PAGES)[keyof typeof PAGES]
//     「すべてのキーで引いた値の型」の Union。 'top' | 'list' | 'detail'
//     → これが PageType。PAGES に 1 行足せば PageType も自動で広がる。

// 本のデータ（題材用の固定データ）
type Book = { id: number; title: string; author: string }
const BOOKS: Book[] = [
  { id: 1, title: '吾輩は猫である', author: '夏目漱石' },
  { id: 2, title: '走れメロス', author: '太宰治' },
  { id: 3, title: '銀河鉄道の夜', author: '宮沢賢治' },
]

// ---------------------------------------------------------------------
// 2. useState + switch の画面切替
// ---------------------------------------------------------------------
// ブラウザの開発者ツールのコンソールを開いて、画面を切り替えてみてください。
// 各画面の useEffect が "mount" / "unmount" を出します。
// switch で別のコンポーネントを返すと、前の画面はアンマウント（破棄）される
// → 前の画面の中の state も消える、ということが観察できます。
// （StrictMode では最初に mount → unmount → mount と 2 回走るのは正常です）

type NavigateFn = (to: PageType) => void

function TopScreen({
  onNavigate,
  onShortcut,
}: {
  onNavigate: NavigateFn
  onShortcut: NavigateFn
}) {
  useEffect(() => {
    console.log('TopScreen: mount')
    return () => console.log('TopScreen: unmount')
  }, [])

  return (
    <div className="card">
      <h3>TOP</h3>
      <p>
        <button type="button" onClick={() => onNavigate(PAGES.LIST)}>
          本の一覧へ
        </button>{' '}
        <button type="button" onClick={() => onShortcut(PAGES.LIST)}>
          今月のおすすめ（ショートカット）
        </button>{' '}
        <button type="button" onClick={() => onNavigate(PAGES.DETAIL)}>
          本の詳細へ（本を選ばずに）
        </button>
      </p>
    </div>
  )
}

function ListScreen({
  fromShortcut,
  onSelectBook,
}: {
  fromShortcut: boolean
  onSelectBook: (bookId: number) => void
  // TODO(human) 練習問題 3: 「TOP へ戻る」ボタンのために onNavigate を受け取る
}) {
  useEffect(() => {
    console.log('ListScreen: mount')
    return () => console.log('ListScreen: unmount')
  }, [])

  return (
    <div className="card">
      <h3>本の一覧</h3>
      {fromShortcut && <p className="badge">TOP のショートカットから来ました</p>}
      <ul>
        {BOOKS.map((book) => (
          <li key={book.id}>
            <button type="button" onClick={() => onSelectBook(book.id)}>
              {book.title}
            </button>
          </li>
        ))}
      </ul>
      {/* TODO(human) 練習問題 3: ここに「TOP へ戻る」ボタン */}
    </div>
  )
}

function DetailScreen({
  selectedBookId,
  onNavigate,
}: {
  selectedBookId: number | null
  onNavigate: NavigateFn
}) {
  useEffect(() => {
    console.log('DetailScreen: mount')
    return () => console.log('DetailScreen: unmount')
  }, [])

  const book = BOOKS.find((b) => b.id === selectedBookId)

  return (
    <div className="card">
      <h3>本の詳細</h3>
      {book ? (
        <p>
          『{book.title}』 {book.author}
        </p>
      ) : (
        <p>本が選ばれていません</p>
      )}
      <p>
        <button type="button" onClick={() => onNavigate(PAGES.LIST)}>
          一覧へ戻る
        </button>
        {/* TODO(human) 練習問題 3: ここに「TOP へ戻る」ボタン */}
      </p>
    </div>
  )
}

function PageSwitchApp() {
  // fst-ryoshi の App では page / fromTopSummary / fromTopLanding / recordsEntry / hurikaeriEntry の 5 つ。
  // ここでは 3 つに縮小:
  //   page           … 今どの画面か
  //   fromShortcut   … 起点フラグ（fromTopSummary に相当）。TOP のショートカットから来たか
  //   selectedBookId … 遷移時に渡す文脈（recordsEntry に相当）。どの本の詳細を見るか
  const [page, setPage] = useState<PageType>(initialPage)
  const [fromShortcut, setFromShortcut] = useState(false)
  const [selectedBookId, setSelectedBookId] = useState<number | null>(null)

  // 普通の遷移: 全 state をリセットしてから画面を変える（全リセット遷移）。
  // なぜ毎回リセットするのか:
  //   「どこから来たか」「何を渡されたか」は、その 1 回の遷移のためだけの情報。
  //   リセットしないと、前の遷移で立てたフラグや渡した本 ID が次の遷移まで残り、
  //   別の起点から入ったのに前の起点の続きとして表示される（起点が混線する）。
  // ※ fst-ryoshi では navigate を useCallback で包んでいる（下の画面が依存に持つため）。
  //   その話は F03 で扱うので、ここでは普通の関数にしている。
  const navigate = (to: PageType) => {
    setFromShortcut(false)
    setSelectedBookId(null)
    setPage(to)
  }

  // 起点フラグを立てる遷移（fst-ryoshi の navigateFromSummary に相当）。
  // 他の state はリセットし、フラグだけ「行き先が一覧のときに」立てる。
  const navigateFromShortcut = (to: PageType) => {
    setFromShortcut(to === PAGES.LIST)
    setSelectedBookId(null)
    setPage(to)
  }

  // 文脈を渡す遷移（fst-ryoshi の navigateFromHurikaeri に相当）。
  // 行き先は詳細画面に決まっているので、引数は本 ID だけ。
  const navigateToDetail = (bookId: number) => {
    setFromShortcut(false)
    setSelectedBookId(bookId)
    setPage(PAGES.DETAIL)
  }

  // 今の state を見える化（学習用）
  const debug = (
    <p>
      <small>
        page: {page} / fromShortcut: {String(fromShortcut)} / selectedBookId: {String(selectedBookId)}
      </small>
    </p>
  )

  switch (page) {
    case PAGES.LIST:
      return (
        <>
          {debug}
          <ListScreen fromShortcut={fromShortcut} onSelectBook={navigateToDetail} />
        </>
      )
    case PAGES.DETAIL:
      return (
        <>
          {debug}
          <DetailScreen selectedBookId={selectedBookId} onNavigate={navigate} />
        </>
      )
    case PAGES.TOP:
    default:
      // TODO(human) 練習問題 1: default を網羅性チェックに置き換える
      return (
        <>
          {debug}
          <TopScreen onNavigate={navigate} onShortcut={navigateFromShortcut} />
        </>
      )
  }
}

// ---------------------------------------------------------------------
// 3. 遅延初期化 useState(() => ...)
// ---------------------------------------------------------------------
// セクション 2 の useState<PageType>(initialPage) で使っている関数です。
// （function 宣言は巻き上げられるので、使う場所より後ろに書いても動きます）
//
// 開始画面を決める関数。URL の hash が "#list" なら一覧から、それ以外は TOP から始める。
// fst-ryoshi の initialPage() は「dev のときだけ /map などの URL でふり返りから開始する」
// 口になっている。これはその縮小版。
// ※ 本番の機能としてはこの入口に依存しない（あくまで開発・資料作成用の抜け道）。
//
// 試し方: ブラウザのアドレスの末尾に #list を付けて再読み込み → 一覧から始まる。
function initialPage(): PageType {
  if (typeof window === 'undefined') return PAGES.TOP
  return window.location.hash === '#list' ? PAGES.LIST : PAGES.TOP
}

// useState(initialPage)   … 関数そのものを渡す（遅延初期化）。
//                            React は「最初のレンダーのときだけ」この関数を呼ぶ。
// useState(initialPage()) … 関数を「呼んだ結果」を渡す。
//                            結果は同じだが、initialPage() は再レンダーのたびに毎回実行される
//                            （2 回目以降は結果が捨てられるだけ）。
// 初期値の計算が重い・window を読むなど、毎回やりたくない処理なら関数を渡す方を選ぶ。

// =====================================================================
// 練習問題
// =====================================================================
//
// 問 1: 設定画面を足す（Union 型が自動で広がる／網羅性チェック）
//   (a) PAGES に SETTINGS: 'settings' を 1 行足す。
//       → PageType にカーソルを当てると 'top' | 'list' | 'detail' | 'settings' に広がっている。
//   (b) 小さな SettingsScreen を作り、switch に case PAGES.SETTINGS を足す。
//       TOP に「設定へ」ボタンも足す。
//   (c) 上の switch の「case PAGES.TOP: default:」を分けて、
//       case PAGES.TOP では TopScreen を返し、default では page を never 型の変数
//       （例: const _exhaustive: never = page）に代入してから return する。
//       ヒント: どの case にも当たらなかった「残りの型」が default に来る。
//       全部の case を書いてあれば残りは「なし（never）」なので代入できる。
//       (b) の case を 1 つ消してみると、'settings' が never に代入できず型エラーになる
//       ＝ case の足し忘れを typecheck が教えてくれる。
//
// 問 2: 全リセットを外すとどうなるか（バグの再現）
//   navigate の中の setSelectedBookId(null) の 1 行をわざと消し、
//   「一覧 → 本を選んで詳細 → TOP へ戻る → 本の詳細へ（本を選ばずに）」と遷移する。
//   → 選んでいないはずなのに、前に選んだ本が出てしまう（起点の混線）。
//   上の debug 表示の selectedBookId も見ること。確認したら 1 行を元に戻す。
//   ※ 詳細から TOP へ戻るボタンは問 3 で作るので、問 3 を先にやるのがおすすめ。
//     （再読み込みで TOP に戻すと state ごと消えるので再現できない）
//
// 問 3: 各画面に「TOP へ戻る」ボタンを足す
//   TODO(human) の場所に書く。ListScreen は onNavigate を props で受け取っていないので、
//   props の型に onNavigate: NavigateFn を足し、PageSwitchApp の switch からも渡す
//   （props バケツリレー）。
// =====================================================================

// =====================================================================
// 画面全体
// =====================================================================
function F01_PageSwitch() {
  return (
    <div className="lesson">
      <h1>F01: URL ルーターなしの画面切替</h1>
      <p className="lead">
        コードは <code>src/lessons/fst/F01_PageSwitch.tsx</code> にあります。
        元ネタは fst-ryoshi の <code>constants/pages.ts</code> と <code>App.tsx</code> です。
      </p>

      <h2>useState + switch の画面切替</h2>
      <p>画面を切り替えても URL は変わりません。コンソールで mount / unmount を確認してください。</p>
      <div className="todo">
        <PageSwitchApp />
      </div>
    </div>
  )
}

export default F01_PageSwitch
