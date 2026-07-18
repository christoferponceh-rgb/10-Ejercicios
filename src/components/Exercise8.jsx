import React, { useState, useEffect } from 'react'

const SUBJECTS = ['El gato', 'Mi amigo', 'La universidad', 'Un programador']
const VERBS = ['come', 'escribe', 'salta sobre', 'descubre']
const OBJECTS = ['un donut', 'el teclado', 'la solución', 'una frase']

export default function Exercise8({ markCompleted, unmarkCompleted }){
  const [phrase, setPhrase] = useState('')

  useEffect(() => {
    generate()
  }, [])

  function generate(){
    const a = SUBJECTS[Math.floor(Math.random()*SUBJECTS.length)]
    const b = VERBS[Math.floor(Math.random()*VERBS.length)]
    const c = OBJECTS[Math.floor(Math.random()*OBJECTS.length)]
    setPhrase(`${a} ${b} ${c}.`)
  }

  function copy(){
    try{ navigator.clipboard.writeText(phrase) }catch{}
  }

  function toggleComplete(){
    const done = !!JSON.parse(localStorage.getItem('exercise8_done'))
    if(!done){ localStorage.setItem('exercise8_done', JSON.stringify(true)); markCompleted(8) }
    else { localStorage.setItem('exercise8_done', JSON.stringify(false)); unmarkCompleted(8) }
  }

  return (
    <div className="exercise">
      <h2>8. Generador de Frases</h2>
      <div style={{display:'flex',gap:8,alignItems:'center'}}>
        <button className="btn primary" onClick={generate}>Generar</button>
        <button className="btn" onClick={copy}>Copiar</button>
      </div>
      <p style={{marginTop:12}}>{phrase}</p>
      <div className="control-row"><button className="btn" onClick={toggleComplete}>Marcar/Desmarcar completado</button></div>
    </div>
  )
}
