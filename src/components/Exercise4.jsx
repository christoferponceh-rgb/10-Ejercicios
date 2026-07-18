import React, { useState, useEffect } from 'react'

export default function Exercise4({ markCompleted, unmarkCompleted }){
  const [value, setValue] = useState(() => localStorage.getItem('exercise4_value') || '')
  const [mode, setMode] = useState(() => localStorage.getItem('exercise4_mode') || 'km-to-mi')

  useEffect(()=>{ localStorage.setItem('exercise4_value', value) }, [value])
  useEffect(()=>{ localStorage.setItem('exercise4_mode', mode) }, [mode])

  function convert(){
    const n = parseFloat(value)
    if(Number.isNaN(n)) return ''
    if(mode==='km-to-mi') return (n * 0.621371).toFixed(3)
    return (n / 0.621371).toFixed(3)
  }

  function toggleComplete(){
    const done = !!JSON.parse(localStorage.getItem('exercise4_done'))
    if(!done){ localStorage.setItem('exercise4_done', JSON.stringify(true)); markCompleted(4) }
    else { localStorage.setItem('exercise4_done', JSON.stringify(false)); unmarkCompleted(4) }
  }

  useEffect(()=>{ try{ if(JSON.parse(localStorage.getItem('exercise4_done'))) markCompleted(4) }catch{} }, [])

  return (
    <div className="exercise">
      <h2>4. Conversor de Unidades (km ↔ mi)</h2>
      <div style={{display:'flex',gap:8,alignItems:'center'}}>
        <input className="input" value={value} onChange={e=>setValue(e.target.value)} placeholder="Valor numérico" />
        <select className="input" value={mode} onChange={e=>setMode(e.target.value)}>
          <option value="km-to-mi">km → millas</option>
          <option value="mi-to-km">millas → km</option>
        </select>
        <div style={{minWidth:120,padding:8,background:'var(--card)',borderRadius:8}}>Resultado: {convert()}</div>
      </div>
      <div className="control-row">
        <button className="btn" onClick={toggleComplete}>Marcar/Desmarcar completado</button>
      </div>
    </div>
  )
}
