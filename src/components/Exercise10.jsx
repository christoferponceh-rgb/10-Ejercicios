import React, { useState, useEffect } from 'react'

export default function Exercise10({ markCompleted, unmarkCompleted }){
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light')

  useEffect(() => {
    localStorage.setItem('theme', theme)
    // Solución 1: Usar body o el selector correcto (.App / #root)
    document.body.setAttribute('data-theme', theme)
  }, [theme])

  function toggleComplete(){
    // Solución 3: Lectura segura para evitar crashes
    let done = false;
    try {
      done = !!JSON.parse(localStorage.getItem('exercise10_done'))
    } catch {
      done = false;
    }
    
    // Solución 2: Verifica si el padre requiere el ID (10) o el índice (9)
    if(!done){ 
      localStorage.setItem('exercise10_done', JSON.stringify(true)); 
      markCompleted(10) // <-- Cambiar a 9 si el padre usa índices de array
    } else { 
      localStorage.setItem('exercise10_done', JSON.stringify(false)); 
      unmarkCompleted(10) // <-- Cambiar a 9 si el padre usa índices de array
    }
  }

  useEffect(() => { 
    try { 
      if(JSON.parse(localStorage.getItem('exercise10_done'))) {
        markCompleted(10) // <-- Cambiar a 9 si aplica
      }
    } catch {} 
  }, [markCompleted]) // Solución 4: Añadida la dependencia faltante

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
        <label style={{display:'flex',gap:6,alignItems:'center',cursor:'pointer'}}>
          <input type="radio" name="theme" checked={theme==='colorful'} onChange={()=>setTheme('colorful')} />
          Colorful
        </label>
      </div>
      <div style={{marginTop:12}} className="small-muted">Tema actual: {theme}</div>
      <div className="control-row">
        <button className="btn" onClick={toggleComplete}>Marcar/Desmarcar completado</button>
      </div>
    </div>
  )
}
