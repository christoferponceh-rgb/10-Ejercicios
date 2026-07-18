import React, { useState, useEffect } from 'react'

export default function Exercise5({ markCompleted, unmarkCompleted }){
  const [display, setDisplay] = useState(() => localStorage.getItem('exercise5_display') || '0')
  const [previousValue, setPreviousValue] = useState(null)
  const [operation, setOperation] = useState(null)
  const [waitingForNewValue, setWaitingForNewValue] = useState(false)

  useEffect(()=>{ localStorage.setItem('exercise5_display', display) }, [display])

  function handleNumber(num){
    if(waitingForNewValue){
      setDisplay(String(num))
      setWaitingForNewValue(false)
    } else {
      setDisplay(display === '0' ? String(num) : display + num)
    }
  }

  function handleDecimal(){
    if(!display.includes('.')){
      setDisplay(display + '.')
      setWaitingForNewValue(false)
    }
  }

  function handleOperation(op){
    const currentValue = parseFloat(display)
    
    if(previousValue === null){
      setPreviousValue(currentValue)
    } else if(operation){
      const result = calculate(previousValue, currentValue, operation)
      setDisplay(String(result))
      setPreviousValue(result)
    }
    
    setOperation(op)
    setWaitingForNewValue(true)
  }

  function calculate(prev, current, op){
    switch(op){
      case '+': return prev + current
      case '-': return prev - current
      case '*': return prev * current
      case '/': return current === 0 ? 0 : prev / current
      default: return current
    }
  }

  function handleEquals(){
    if(operation && previousValue !== null){
      const result = calculate(previousValue, parseFloat(display), operation)
      setDisplay(String(result))
      setPreviousValue(null)
      setOperation(null)
      setWaitingForNewValue(true)
    }
  }

  function handleClear(){
    setDisplay('0')
    setPreviousValue(null)
    setOperation(null)
    setWaitingForNewValue(false)
  }

  function toggleComplete(){
    const done = !!JSON.parse(localStorage.getItem('exercise5_done'))
    if(!done){ localStorage.setItem('exercise5_done', JSON.stringify(true)); markCompleted(5) }
    else { localStorage.setItem('exercise5_done', JSON.stringify(false)); unmarkCompleted(5) }
  }

  useEffect(()=>{ try{ if(JSON.parse(localStorage.getItem('exercise5_done'))) markCompleted(5) }catch{} }, [])

  const buttonStyle = {
    padding: '20px',
    fontSize: '18px',
    border: '1px solid #e6e9ef',
    borderRadius: '8px',
    cursor: 'pointer',
    backgroundColor: 'var(--card)',
    color: 'inherit',
    fontWeight: 'bold'
  }

  const operationButtonStyle = { ...buttonStyle, backgroundColor: 'var(--accent)', color: '#fff' }
  const equalsButtonStyle = { ...buttonStyle, backgroundColor: 'var(--success)', color: '#fff' }

  return (
    <div className="exercise">
      <h2>5. Calculadora Simple</h2>
      
      <div style={{
        backgroundColor: '#f0f0f0',
        padding: '16px',
        borderRadius: '8px',
        marginBottom: '16px',
        textAlign: 'right',
        fontSize: '28px',
        fontWeight: 'bold',
        minHeight: '50px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        color: '#000',
        wordBreak: 'break-all'
      }}>
        {display}
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '8px',
        marginBottom: '16px'
      }}>
        <button style={{...operationButtonStyle, gridColumn: 'span 2'}} onClick={handleClear}>AC</button>
        <button style={operationButtonStyle} onClick={() => handleOperation('/')}>/</button>
        <button style={operationButtonStyle} onClick={() => handleOperation('*')}>×</button>

        <button style={buttonStyle} onClick={() => handleNumber(7)}>7</button>
        <button style={buttonStyle} onClick={() => handleNumber(8)}>8</button>
        <button style={buttonStyle} onClick={() => handleNumber(9)}>9</button>
        <button style={operationButtonStyle} onClick={() => handleOperation('-')}>−</button>

        <button style={buttonStyle} onClick={() => handleNumber(4)}>4</button>
        <button style={buttonStyle} onClick={() => handleNumber(5)}>5</button>
        <button style={buttonStyle} onClick={() => handleNumber(6)}>6</button>
        <button style={operationButtonStyle} onClick={() => handleOperation('+')}>+</button>

        <button style={buttonStyle} onClick={() => handleNumber(1)}>1</button>
        <button style={buttonStyle} onClick={() => handleNumber(2)}>2</button>
        <button style={buttonStyle} onClick={() => handleNumber(3)}>3</button>
        <button style={{...equalsButtonStyle, gridRow: 'span 2'}} onClick={handleEquals}>=</button>

        <button style={{...buttonStyle, gridColumn: 'span 2'}} onClick={() => handleNumber(0)}>0</button>
        <button style={buttonStyle} onClick={handleDecimal}>.</button>
      </div>

      <div className="control-row">
        <button className="btn" onClick={toggleComplete}>Marcar/Desmarcar completado</button>
      </div>
    </div>
  )
}
