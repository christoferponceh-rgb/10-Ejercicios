import React, { useState, useEffect } from 'react'

const PRODUCTS = [
  { id: 1, name: 'Café Espresso', price: 1.5 },
  { id: 2, name: 'Café Latte', price: 2.5 },
  { id: 3, name: 'Cappuccino', price: 2.0 },
]

export default function Exercise6({ markCompleted, unmarkCompleted }){
  const [cart, setCart] = useState(() => {
    try { return JSON.parse(localStorage.getItem('exercise6_cart')) ?? [] } catch { return [] }
  })

  useEffect(()=>{ localStorage.setItem('exercise6_cart', JSON.stringify(cart)) }, [cart])

  function add(product){
    setCart(c => {
      const found = c.find(x => x.id === product.id)
      if(found) return c.map(x => x.id===product.id? { ...x, qty: x.qty+1 } : x)
      return [...c, { id: product.id, name: product.name, price: product.price, qty: 1 }]
    })
  }

  function remove(id){ setCart(c => c.filter(x => x.id!==id)) }
  function changeQty(id, delta){ setCart(c => c.map(x => x.id===id? { ...x, qty: Math.max(1, x.qty+delta) } : x)) }

  function total(){ return cart.reduce((s,x)=>s + x.price * x.qty, 0).toFixed(2) }

  function toggleComplete(){
    const done = !!JSON.parse(localStorage.getItem('exercise6_done'))
    if(!done){ localStorage.setItem('exercise6_done', JSON.stringify(true)); markCompleted(6) }
    else { localStorage.setItem('exercise6_done', JSON.stringify(false)); unmarkCompleted(6) }
  }

  useEffect(()=>{ try{ if(JSON.parse(localStorage.getItem('exercise6_done'))) markCompleted(6) }catch{} }, [])

  return (
    <div className="exercise">
      <h2>6. Tienda de Cafés</h2>
      <div style={{display:'flex',gap:12,flexWrap:'wrap'}}>
        {PRODUCTS.map(p => (
          <div key={p.id} style={{padding:8,border:'1px solid #e6e9ef',borderRadius:8}}>
            <div><strong>{p.name}</strong></div>
            <div className="small-muted">${p.price.toFixed(2)}</div>
            <div style={{marginTop:8}}>
              <button className="btn" onClick={()=>add(p)}>Agregar</button>
            </div>
          </div>
        ))}
      </div>

      <h4 style={{marginTop:12}}>Carrito</h4>
      {cart.length===0 && <div className="small-muted">Carrito vacío</div>}
      <ul>
        {cart.map(item => (
          <li key={item.id} style={{display:'flex',gap:8,alignItems:'center'}}>
            <div>{item.name} x {item.qty} - ${ (item.price * item.qty).toFixed(2) }</div>
            <div style={{marginLeft:'auto'}}>
              <button className="btn" onClick={()=>changeQty(item.id, -1)}>-</button>
              <button className="btn" onClick={()=>changeQty(item.id, +1)}>+</button>
              <button className="btn" onClick={()=>remove(item.id)}>Eliminar</button>
            </div>
          </li>
        ))}
      </ul>

      <div style={{marginTop:8}}>Total: <strong>${total()}</strong></div>
      <div className="control-row"><button className="btn" onClick={toggleComplete}>Marcar/Desmarcar completado</button></div>
    </div>
  )
}
