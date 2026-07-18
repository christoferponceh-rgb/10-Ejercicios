import React, { useState, useEffect } from 'react'

const MOVIES = [
  { id:1, title: 'El viaje', year: 2020 },
  { id:2, title: 'La búsqueda', year: 2018 },
  { id:3, title: 'Noche de estrellas', year: 2021 },
  { id:4, title: 'Café y cine', year: 2019 },
  { id:5, title: 'Código secreto', year: 2022 },
  { id:6, title: 'La última frontera', year: 2020 },
  { id:7, title: 'Aventura en la montaña', year: 2019 },
  { id:8, title: 'Sueños de papel', year: 2021 },
  { id:9, title: 'Espejo reflejado', year: 2023 },
  { id:10, title: 'El resurgimiento', year: 2022 },
]

export default function Exercise7({ markCompleted, unmarkCompleted }){
  const [query, setQuery] = useState('')
  const [results, setResults] = useState(MOVIES.slice(0, 10))

  function search(){
    const q = query.trim().toLowerCase()
    if(!q){ 
      setResults(MOVIES.slice(0, 10))
      return 
    }
    setResults(MOVIES.filter(m => m.title.toLowerCase().includes(q)))
  }

  function toggleComplete(){
    const done = !!JSON.parse(localStorage.getItem('exercise7_done'))
    if(!done){ localStorage.setItem('exercise7_done', JSON.stringify(true)); markCompleted(7) }
    else { localStorage.setItem('exercise7_done', JSON.stringify(false)); unmarkCompleted(7) }
  }

  useEffect(()=>{ try{ if(JSON.parse(localStorage.getItem('exercise7_done'))) markCompleted(7) }catch{} }, [])

  return (
    <div className="exercise">
      <h2>7. Buscador de Películas (simulado)</h2>
      <div style={{display:'flex',gap:8}}>
        <input className="input" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Buscar título" />
        <button className="btn primary" onClick={search}>Buscar</button>
      </div>

      <ul style={{marginTop:12}}>
        {results.map(r => <li key={r.id}>{r.title} <span className="small-muted">({r.year})</span></li>)}
      </ul>

      <div className="control-row"><button className="btn" onClick={toggleComplete}>Marcar/Desmarcar completado</button></div>
    </div>
  )
}
