import React, { useState, useEffect } from 'react'

export default function Exercise10({ markCompleted, unmarkCompleted }){
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light')
  const [completed, setCompleted] = useState(() => JSON.parse(localStorage.getItem('exercise10_done')) || false)

  useEffect(() => {
    localStorage.setItem('theme', theme)
    const app = document.querySelector('.app')
    if(app) app.setAttribute('data-theme', theme === 'light' ? 'light' : theme)
  }, [theme])
  useEffect(() => { localStorage.setItem('exercise10_done', JSON.stringify(completed)) }, [completed])

  function toggleCompleted(){
    setCompleted(v => {
      const next = !v
      if(next) markCompleted(10)
      else unmarkCompleted(10)
      return next
    })
  }

  return (
    <div className="exercise">
      <h2>10. Selector de Temas</h2>
      <div style={{display:'flex',gap:8}}>
        <button className={theme==='light' ? 'btn primary' : 'btn'} onClick={() => setTheme('light')}>Claro</button>
        <button className={theme==='dark' ? 'btn primary' : 'btn'} onClick={() => setTheme('dark')}>Oscuro</button>
        <button className={theme==='colorful' ? 'btn primary' : 'btn'} onClick={() => setTheme('colorful')}>Colorido</button>
      </div>

      <div style={{marginTop:12}} className="small-muted">Tema actual: {theme}</div>

      <div className="control-row" style={{marginTop:12}}>
        <button className="btn primary" onClick={toggleCompleted}>{completed ? 'Marcar como no completado' : 'Marcar completado'}</button>
      </div>
    </div>
  )
}
