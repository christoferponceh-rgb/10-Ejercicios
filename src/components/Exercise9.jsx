import React, { useState, useEffect } from 'react'

export default function Exercise9({ markCompleted, unmarkCompleted }){
  const [items, setItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem('exercise9_items')) ?? [] } catch { return [] }
  })
  const [desc, setDesc] = useState('')
  const [amount, setAmount] = useState('')

  useEffect(()=>{ localStorage.setItem('exercise9_items', JSON.stringify(items)) }, [items])

  function add(){
    const n = parseFloat(amount)
    if(!desc.trim() || Number.isNaN(n)) return
    setItems(it => [...it, { id: Date.now(), desc: desc.trim(), amount: n, date: new Date().toISOString().slice(0,10) }])
    setDesc(''); setAmount('')
  }

  function remove(id){ setItems(it => it.filter(x => x.id !== id)) }

  function total(){ return items.reduce((s,x)=>s + x.amount, 0).toFixed(2) }

  function toggleComplete(){
    const done = !!JSON.parse(localStorage.getItem('exercise9_done'))
    if(!done){ localStorage.setItem('exercise9_done', JSON.stringify(true)); markCompleted(9) }
    else { localStorage.setItem('exercise9_done', JSON.stringify(false)); unmarkCompleted(9) }
  }

  useEffect(()=>{ try{ if(JSON.parse(localStorage.getItem('exercise9_done'))) markCompleted(9) }catch{} }, [])

  return (
    <div className="exercise">
      <h2>9. Control de Gastos</h2>
      <div style={{display:'flex',gap:8}}>
        <input className="input" value={desc} onChange={e=>setDesc(e.target.value)} placeholder="Descripción" />
        <input className="input" value={amount} onChange={e=>setAmount(e.target.value)} placeholder="Monto" type="number" />
        <button className="btn primary" onClick={add}>Agregar</button>
      </div>

      <ul style={{marginTop:12}}>
        {items.map(it => (
          <li key={it.id} style={{display:'flex',gap:8,alignItems:'center'}}>
            <div>{it.date} — {it.desc} — ${it.amount.toFixed(2)}</div>
            <div style={{marginLeft:'auto'}}>
              <button className="btn" onClick={()=>remove(it.id)}>Eliminar</button>
            </div>
          </li>
        ))}
      </ul>

      <div style={{marginTop:8}}>Total: <strong>${total()}</strong></div>
      <div className="control-row"><button className="btn" onClick={toggleComplete}>Marcar/Desmarcar completado</button></div>
    </div>
  )
}
