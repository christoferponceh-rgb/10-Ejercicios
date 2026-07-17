import React, { useState, useEffect } from 'react'
import Exercise1 from './components/Exercise1'
import Exercise2 from './components/Exercise2'
import Exercise3 from './components/Exercise3'
import Exercise4 from './components/Exercise4'
import Exercise5 from './components/Exercise5'
import Exercise6 from './components/Exercise6'
import Exercise7 from './components/Exercise7'
import Exercise8 from './components/Exercise8'
import Exercise9 from './components/Exercise9'
import Exercise10 from './components/Exercise10'

export default function App(){
  const [page, setPage] = useState(() => {
    try { return JSON.parse(localStorage.getItem('selectedPage')) ?? null } catch { return null }
  })
  const [completed, setCompleted] = useState(() => {
    try { return JSON.parse(localStorage.getItem('completedExercises')) ?? [] } catch { return [] }
  })

  useEffect(() => {
    localStorage.setItem('selectedPage', JSON.stringify(page))
  }, [page])

  useEffect(() => {
    localStorage.setItem('completedExercises', JSON.stringify(completed))
  }, [completed])

  function markCompleted(n){
    setCompleted(prev => {
      if(prev.includes(n)) return prev
      return [...prev, n].sort((a,b)=>a-b)
    })
  }

  function unmarkCompleted(n){
    setCompleted(prev => prev.filter(x => x !== n))
  }

  return (
    <div className="app" data-theme={localStorage.getItem('theme') || 'light'}>
      <header className="header">
        <h1>10 Ejercicios de React - useState</h1>
        <p className="subtitle">Selecciona un ejercicio para verlo</p>
      </header>

      <nav className="nav">
        <button onClick={() => setPage(null)} className={page===null? 'active': ''}>Inicio</button>
        <div className="buttons">
          {[...Array(10)].map((_, i) => (
            <button key={i} onClick={() => setPage(i+1)} className={page===i+1? 'active': ''}>
              Ejercicio {i+1} {completed.includes(i+1) ? ' ✅' : ''}
            </button>
          ))}
        </div>
      </nav>

      <main className="main">
        {page === null && (
          <section className="home">
            <h2>Bienvenido</h2>
            <p>Aquí encontrarás los 10 ejercicios propuestos — haz clic en cualquiera para abrir su página.</p>
            <ol>
              <li>Contador Interactivo</li>
              <li>Formulario de Registro Simple</li>
              <li>Lista de Tareas</li>
              <li>Conversor de Unidades</li>
              <li>Calculadora Simple</li>
              <li>Tienda de Cafés</li>
              <li>Buscador de Películas</li>
              <li>Generador de Frases</li>
              <li>Control de Gastos</li>
              <li>Selector de Temas</li>
            </ol>
            <p>Puedes marcar un ejercicio como completado dentro de su vista — el progreso se guardará en tu navegador.</p>
          </section>
        )}

        {page === 1 && <Exercise1 markCompleted={markCompleted} unmarkCompleted={unmarkCompleted} />}
        {page === 2 && <Exercise2 markCompleted={markCompleted} unmarkCompleted={unmarkCompleted} />}
        {page === 3 && <Exercise3 markCompleted={markCompleted} unmarkCompleted={unmarkCompleted} />}
        {page === 4 && <Exercise4 markCompleted={markCompleted} unmarkCompleted={unmarkCompleted} />}
        {page === 5 && <Exercise5 markCompleted={markCompleted} unmarkCompleted={unmarkCompleted} />}
        {page === 6 && <Exercise6 markCompleted={markCompleted} unmarkCompleted={unmarkCompleted} />}
        {page === 7 && <Exercise7 markCompleted={markCompleted} unmarkCompleted={unmarkCompleted} />}
        {page === 8 && <Exercise8 markCompleted={markCompleted} unmarkCompleted={unmarkCompleted} />}
        {page === 9 && <Exercise9 markCompleted={markCompleted} unmarkCompleted={unmarkCompleted} />}
        {page === 10 && <Exercise10 markCompleted={markCompleted} unmarkCompleted={unmarkCompleted} />}
      </main>

      <footer className="footer">
        <small>Proyecto: 10 Ejercicios - implementando ejercicios y persistencia</small>
      </footer>
    </div>
  )
}
