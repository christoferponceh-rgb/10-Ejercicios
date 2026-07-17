import React, { useState, useEffect } from 'react'

export default function Exercise2({ markCompleted, unmarkCompleted }){
  const [form, setForm] = useState(() => {
    try { return JSON.parse(localStorage.getItem('exercise2_form')) ?? { name:'', email:'', age:'' } } catch { return { name:'', email:'', age:'' } }
  })
  const [touched, setTouched] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [completed, setCompleted] = useState(() => JSON.parse(localStorage.getItem('exercise2_done')) || false)

  useEffect(() => { localStorage.setItem('exercise2_form', JSON.stringify(form)) }, [form])
  useEffect(() => { localStorage.setItem('exercise2_done', JSON.stringify(completed)) }, [completed])

  function onChange(e){
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
  }

  function validate(){
    const errors = {}
    if(!form.name.trim()) errors.name = 'Nombre requerido'
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = 'Email inválido'
    if(!form.age || Number(form.age) <= 0) errors.age = 'Edad debe ser mayor a 0'
    return errors
  }

  function onSubmit(e){
    e.preventDefault()
    setTouched({ name:true, email:true, age:true })
    const errors = validate()
    if(Object.keys(errors).length === 0){
      setSubmitted(true)
    }
  }

  function onClear(){
    setForm({ name:'', email:'', age:'' })
    setSubmitted(false)
  }

  function toggleCompleted(){
    setCompleted(v => {
      const next = !v
      if(next) markCompleted(2)
      else unmarkCompleted(2)
      return next
    })
  }

  const errors = validate()

  return (
    <div className="exercise">
      <h2>2. Formulario de Registro Simple</h2>

      <form onSubmit={onSubmit} style={{maxWidth:480}}>
        <div style={{marginBottom:8}}>
          <label className="small-muted">Nombre</label><br />
          <input name="name" className="input" value={form.name} onChange={onChange} onBlur={() => setTouched(t=>({...t, name:true}))} />
          {touched.name && errors.name && <div style={{color:'#dc2626',marginTop:4}}>{errors.name}</div>}
        </div>

        <div style={{marginBottom:8}}>
          <label className="small-muted">Email</label><br />
          <input name="email" className="input" value={form.email} onChange={onChange} onBlur={() => setTouched(t=>({...t, email:true}))} />
          {touched.email && errors.email && <div style={{color:'#dc2626',marginTop:4}}>{errors.email}</div>}
        </div>

        <div style={{marginBottom:8}}>
          <label className="small-muted">Edad</label><br />
          <input name="age" type="number" className="input" value={form.age} onChange={onChange} onBlur={() => setTouched(t=>({...t, age:true}))} />
          {touched.age && errors.age && <div style={{color:'#dc2626',marginTop:4}}>{errors.age}</div>}
        </div>

        <div className="control-row">
          <button className="btn primary" type="submit">Guardar</button>
          <button type="button" className="btn" onClick={onClear}>Limpiar</button>
        </div>
      </form>

      {submitted && (
        <div style={{marginTop:12, padding:12, borderRadius:8, background:'#f1f5f9'}}>
          <h4>Datos ingresados</h4>
          <div><strong>Nombre:</strong> {form.name}</div>
          <div><strong>Email:</strong> {form.email}</div>
          <div><strong>Edad:</strong> {form.age}</div>
        </div>
      )}

      <div className="control-row" style={{marginTop:12}}>
        <button className="btn primary" onClick={toggleCompleted}>{completed ? 'Marcar como no completado' : 'Marcar completado'}</button>
      </div>
    </div>
  )
}
