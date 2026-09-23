import { drills, runCase } from './jsDrillTests.js'

const show = (v) => (v === undefined ? 'undefined' : JSON.stringify(v))

function PracticeJS() {
  const results = drills.map((d) => ({ ...d, results: d.cases.map((c) => runCase(d.fn, c)) }))
  const passed = results.filter((d) => d.results.every((r) => r.ok)).length

  return (
    <div>
      <p className="lead">
        <code>src/practice/jsDrills.js</code> を編集してください。合格 {passed} / {drills.length}
      </p>
      {results.map((d) => {
        const allOk = d.results.every((r) => r.ok)
        return (
          <div className="card" key={d.no} style={{ opacity: allOk ? 0.6 : 1 }}>
            <h3>
              {allOk ? '✓' : '✗'} 練習{d.no}: {d.title}
            </h3>
            {d.cases.map((c, i) => {
              const r = d.results[i]
              return (
                <p key={i} style={{ fontSize: '0.9rem' }}>
                  {r.ok ? '✓' : '✗'} {d.title}({c.args.map(show).join(', ')}) → 期待: {show(c.expected)}
                  {!r.ok && <> / 実際: {r.error ? `エラー: ${r.error}` : show(r.got)}</>}
                </p>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}

export default PracticeJS
