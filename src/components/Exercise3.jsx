import React, { useState, useEffect } from 'react'

export default function Exercise3({ markCompleted, unmarkCompleted }){
  const [todos, setTodos] = useState(() => {
    try { return JSON.parse(localStorage.getItem('exercise3_todos')) ?? [] } catch { return [] }
  })
  const [text, setText] = useState('')

  useEffect(()=>{ localStorage.setItem('exercise3_todos', JSON.stringify(todos)) }, [todos])

  function add(){
    if(!text.trim()) return
    setTodos(t => [...t, { id: Date.now(), title: text.trim(), done: false }])
    setText('')
  }

  function toggle(id){ setTodos(t => t.map(x => x.id===id? { ...x, done: !x.done } : x)) }
  function remove(id){ setTodos(t => t.filter(x => x.id!==id)) }

  function mark(){ localStorage.setItem('exercise3_done', JSON.stringify(true)); markCompleted(3) }
  function unmark(){ localStorage.setItem('exercise3_done', JSON.stringify(false)); unmarkCompleted(3) }

  useEffect(()=>{
    try{ if(JSON.parse(localStorage.getItem('exercise3_done'))) markCompleted(3) }catch{}
  }, [])

  const completedCount = todos.filter(t => t.done).length

  return (
    <div className="exercise">
      <h2>3. Lista de Tareas</h2>
      <div style={{display:'flex',gap:8}}>
        <input className="input" value={text} onChange={e=>setText(e.target.value)} placeholder="Nueva tarea" />
        <button className="btn primary" onClick={add}>Agregar</button>
      </div>

      <ul style={{marginTop:12}}>
        {todos.map(t => (
          <li key={t.id} style={{display:'flex',alignItems:'center',gap:8}}>
            <input type="checkbox" checked={t.done} onChange={()=>toggle(t.id)} />
            <span style={{textDecoration: t.done ? 'line-through' : 'none'}}>{t.title}</span>
            <button className="btn" onClick={()=>remove(t.id)}>Eliminar</button>
          </li>
        ))}
      </ul>

      <div style={{marginTop:12}}>
        <div className="small-muted">Tareas completadas: {completedCount}</div>
        <div className="control-row">
          <button className="btn" onClick={mark}>Marcar completado</button>
          <button className="btn" onClick={unmark}>Desmarcar completado</button>
        </div>
      </div>
    </div>
  )
}
