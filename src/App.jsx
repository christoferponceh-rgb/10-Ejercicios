import React, { useState } from 'react'
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
  const [page, setPage] = useState(null)

  return (
    <div className="app">
      <header className="header">
        <h1>10 Ejercicios de React - useState</h1>
        <p className="subtitle">Selecciona un ejercicio para verlo</p>
      </header>

      <nav className="nav">
        <button onClick={() => setPage(null)} className={page===null? 'active': ''}>Inicio</button>
        <div className="buttons">
          {[...Array(10)].map((_, i) => (
            <button key={i} onClick={() => setPage(i+1)} className={page===i+1? 'active': ''}>Ejercicio {i+1}</button>
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
            <p>Pide que implemente uno en particular y lo desarrollo con useState.</p>
          </section>
        )}

        {page === 1 && <Exercise1 />}
        {page === 2 && <Exercise2 />}
        {page === 3 && <Exercise3 />}
        {page === 4 && <Exercise4 />}
        {page === 5 && <Exercise5 />}
        {page === 6 && <Exercise6 />}
        {page === 7 && <Exercise7 />}
        {page === 8 && <Exercise8 />}
        {page === 9 && <Exercise9 />}
        {page === 10 && <Exercise10 />}
      </main>

      <footer className="footer">
        <small>Proyecto: 10 Ejercicios - placeholders agregados</small>
      </footer>
    </div>
  )
}
