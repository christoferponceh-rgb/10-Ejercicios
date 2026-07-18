import React, { useState, useEffect } from 'react'

export default function Exercise10({ markCompleted, unmarkCompleted }){
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light')

  useEffect(()=>{
    localStorage.setItem('theme', theme)
    // update app root's data-theme so App reflects change immediately
    const root = document.querySelector('.app')
    if(root) root.setAttribute('data-theme', theme)
  }, [theme])

  function toggleComplete(){
    const done = !!JSON.parse(localStorage.getItem('exercise10_done'))
    if(!done){ localStorage.setItem('exercise10_done', JSON.stringify(true)); markCompleted(10) }
    else { localStorage.setItem('exercise10_done', JSON.stringify(false)); unmarkCompleted(10) }
  }

  useEffect(()=>{ try{ if(JSON.parse(localStorage.getItem('exercise10_done'))) markCompleted(10) }catch{} }, [])

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
      <div className="control-row"><button className="btn" onClick={toggleComplete}>Marcar/Desmarcar completado</button></div>
    </div>
  )
}
