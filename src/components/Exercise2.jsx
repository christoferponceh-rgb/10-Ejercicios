import React, { useState, useEffect } from 'react'

export default function Exercise2({ markCompleted, unmarkCompleted }){
  const [form, setForm] = useState(() => {
    try { return JSON.parse(localStorage.getItem('exercise2_form')) ?? { name: '', email: '', age: '' } } catch { return { name: '', email: '', age: '' } }
  })
  const [submitted, setSubmitted] = useState(() => {
    try { return JSON.parse(localStorage.getItem('exercise2_submitted')) ?? null } catch { return null }
  })
  const [errors, setErrors] = useState({})

  useEffect(() => { localStorage.setItem('exercise2_form', JSON.stringify(form)) }, [form])
  useEffect(() => { localStorage.setItem('exercise2_submitted', JSON.stringify(submitted)) }, [submitted])

  function onChange(e){
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
  }

  function validate(){
    const errs = {}
    if(!form.name.trim()) errs.name = 'Nombre requerido'
    if(!form.email.includes('@')) errs.email = 'Email inválido'
    if(!form.age || Number(form.age) <= 0) errs.age = 'Edad debe ser mayor a 0'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  function submit(e){
    e.preventDefault()
    if(!validate()) return
    setSubmitted({ ...form, age: Number(form.age) })
  }

  function toggleCompleted(){
    const done = !!JSON.parse(localStorage.getItem('exercise2_done'))
    if(!done){
      localStorage.setItem('exercise2_done', JSON.stringify(true))
      markCompleted(2)
    } else {
      localStorage.setItem('exercise2_done', JSON.stringify(false))
      unmarkCompleted(2)
    }
  }

  useEffect(()=>{
    try{
      const done = JSON.parse(localStorage.getItem('exercise2_done')) || false
      if(done) markCompleted(2)
    }catch{}
  }, [])

  return (
    <div className="exercise">
      <h2>2. Formulario de Registro Simple</h2>
      <form onSubmit={submit} style={{display:'grid',gap:8,maxWidth:480}}>
        <label>
          Nombre:
          <input className="input" name="name" value={form.name} onChange={onChange} />
          {errors.name && <div className="small-muted">{errors.name}</div>}
        </label>

        <label>
          Email:
          <input className="input" name="email" value={form.email} onChange={onChange} />
          {errors.email && <div className="small-muted">{errors.email}</div>}
        </label>

        <label>
          Edad:
          <input className="input" name="age" value={form.age} onChange={onChange} type="number" />
          {errors.age && <div className="small-muted">{errors.age}</div>}
        </label>

        <div className="control-row">
          <button className="btn primary" type="submit">Enviar</button>
          <button type="button" className="btn" onClick={() => { setForm({ name:'', email:'', age:'' }); setSubmitted(null) }}>Limpiar</button>
          <button type="button" className="btn" onClick={toggleCompleted}>Marcar/Desmarcar completado</button>
        </div>
      </form>

      {submitted && (
        <div style={{marginTop:12}}>
          <h4>Datos enviados</h4>
          <div>Nombre: {submitted.name}</div>
          <div>Email: {submitted.email}</div>
          <div>Edad: {submitted.age}</div>
        </div>
      )}
    </div>
  )
}
