// R01: props
// 要件: name を props で受け取り「こんにちは、{name}さん」と <p> で表示する。
// 呼び出し側: <Greeting name="太郎" />
export default function Greeting({name}) {
  return <p>こんにちは、{name}さん</p>
}
