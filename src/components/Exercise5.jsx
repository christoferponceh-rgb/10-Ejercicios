import React, { useState, useEffect } from 'react'

export default function Exercise5({ markCompleted, unmarkCompleted }){
  const [a, setA] = useState(() => localStorage.getItem('exercise5_a') || '')
  const [b, setB] = useState(() => localStorage.getItem('exercise5_b') || '')
  const [op, setOp] = useState(() => localStorage.getItem('exercise5_op') || '+')
  const [result, setResult] = useState('')

  useEffect(()=>{ localStorage.setItem('exercise5_a', a) }, [a])
  useEffect(()=>{ localStorage.setItem('exercise5_b', b) }, [b])
  useEffect(()=>{ localStorage.setItem('exercise5_op', op) }, [op])

  function compute(){
    const nA = parseFloat(a); const nB = parseFloat(b)
    if(Number.isNaN(nA) || Number.isNaN(nB)) { setResult('Entrada inválida'); return }
    let r = ''
    if(op === '+') r = nA + nB
    if(op === '-') r = nA - nB
    if(op === '*') r = nA * nB
    if(op === '/') r = nB === 0 ? 'Error: división por cero' : nA / nB
    setResult(String(r))
  }

  function toggleComplete(){
    const done = !!JSON.parse(localStorage.getItem('exercise5_done'))
    if(!done){ localStorage.setItem('exercise5_done', JSON.stringify(true)); markCompleted(5) }
    else { localStorage.setItem('exercise5_done', JSON.stringify(false)); unmarkCompleted(5) }
  }

  useEffect(()=>{ try{ if(JSON.parse(localStorage.getItem('exercise5_done'))) markCompleted(5) }catch{} }, [])

  return (
    <div className="exercise">
      <h2>5. Calculadora Simple</h2>
      <div style={{display:'flex',gap:8,alignItems:'center'}}>
        <input className="input" value={a} onChange={e=>setA(e.target.value)} placeholder="A" />
        <select className="input" value={op} onChange={e=>setOp(e.target.value)}>
          <option value="+">+</option>
          <option value="-">−</option>
          <option value="*">×</option>
          <option value="/">÷</option>
        </select>
        <input className="input" value={b} onChange={e=>setB(e.target.value)} placeholder="B" />
        <button className="btn primary" onClick={compute}>Calcular</button>
      </div>
      <div style={{marginTop:12}}>Resultado: <strong>{result}</strong></div>
      <div className="control-row">
        <button className="btn" onClick={toggleComplete}>Marcar/Desmarcar completado</button>
      </div>
    </div>
  )
}
