import React, { useState, useEffect } from 'react'

export default function Exercise1({ markCompleted, unmarkCompleted }){
  const [count, setCount] = useState(() => {
    try { return JSON.parse(localStorage.getItem('exercise1_count')) ?? 0 } catch { return 0 }
  })
  const [color, setColor] = useState(() => localStorage.getItem('exercise1_color') || '#2563eb')
  const [completed, setCompleted] = useState(() => JSON.parse(localStorage.getItem('exercise1_done')) || false)

  useEffect(() => { localStorage.setItem('exercise1_count', JSON.stringify(count)) }, [count])
  useEffect(() => { localStorage.setItem('exercise1_color', color) }, [color])
  useEffect(() => { localStorage.setItem('exercise1_done', JSON.stringify(completed)) }, [completed])

  function increase(){ setCount(c => c + 1) }
  function decrease(){ setCount(c => Math.max(0, c - 1)) }
  function reset(){ setCount(0) }
  function changeColor(e){ setColor(e.target.value) }

  function toggleCompleted(){
    setCompleted(v => {
      const next = !v
      if(next) markCompleted(1)
      else unmarkCompleted(1)
      return next
    })
  }

  return (
    <div className="exercise">
      <h2>1. Contador Interactivo</h2>
      <div style={{display:'flex',alignItems:'center',gap:12}}>
        <button className="btn" onClick={decrease}>-</button>
        <div style={{minWidth:72, textAlign:'center', padding:12, borderRadius:8, background:color, color:'#fff'}}>{count}</div>
        <button className="btn" onClick={increase}>+</button>
        <button className="btn" onClick={reset}>Reiniciar</button>
      </div>

      <div className="control-row">
        <label className="small-muted">Color:</label>
        <input className="input" type="color" value={color} onChange={changeColor} />
      </div>

      <div className="control-row">
        <button className="btn primary" onClick={toggleCompleted}>{completed ? 'Marcar como no completado' : 'Marcar completado'}</button>
      </div>

      <p className="small-muted">La cuenta no puede bajar de 0. Valores persistidos en localStorage.</p>
    </div>
  )
}
