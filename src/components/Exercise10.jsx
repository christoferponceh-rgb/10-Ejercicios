import React, { useState, useEffect } from 'react'

export default function Exercise10({ markCompleted, unmarkCompleted }){
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light')

  useEffect(() => {
    localStorage.setItem('theme', theme)
    // Aplicar el atributo al body para que los estilos reaccionen al tema
    document.body.setAttribute('data-theme', theme)
  }, [theme])

  function toggleComplete(){
    // Lectura segura para evitar crashes si el valor en localStorage está mal formado
    let done = false
    try {
      done = !!JSON.parse(localStorage.getItem('exercise10_done'))
    } catch {
      done = false
    }

    if(!done){
      localStorage.setItem('exercise10_done', JSON.stringify(true))
      markCompleted(10)
    } else {
      localStorage.setItem('exercise10_done', JSON.stringify(false))
      unmarkCompleted(10)
    }
  }

  useEffect(() => {
    try {
      if(JSON.parse(localStorage.getItem('exercise10_done'))) {
        markCompleted(10)
      }
    } catch {}
  }, [markCompleted])

  return (
    <div className="exercise">
      <h2>10. Selector de Temas</h2>
      <div style={{display:'flex',gap:8,alignItems:'center'}}>
        <label style={{display:'flex',gap:6,alignItems:'center',cursor:'pointer'}}>
          <input type="radio" name="theme" checked={theme==='light'} onChange={()=>setTheme('light')} />
          Light
        </label>
        <label style={{display:'flex',gap:6,alignItems:'center',cursor:'pointer'}}>
          <input type="radio" name="theme" checked={theme==='dark'} onChange={()=>setTheme('dark')} />
          Dark
        </label>
      </div>
      <div style={{marginTop:12}} className="small-muted">Tema actual: {theme}</div>
      <div className="control-row">
        <button className="btn" onClick={toggleComplete}>Marcar/Desmarcar completado</button>
      </div>
    </div>
  )
}
