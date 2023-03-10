import './App.css';
import { useReducer, useState } from 'react';
// import Modal from './Modal';
import Digit from './Digit';
import OperationButton from './OperationButton';

export const ACTIONS = {
  ADD_DIGIT: "add_digit",
  CHOOSE_OPEARION: "choose-operation",
  CLEAR: "clear",
  DELETE_DIGIT: "delete",
  EVALUATE: "evauate"
}

function reducer(state, {type, payload}) {
  switch(type) {


    case ACTIONS.ADD_DIGIT:
      if(state.overwrite) {
        return{
          ...state,
          currentOperand: payload.digit,
          overwrite: false
        }
      }

      if(payload.digit ==="0" && state.currentOperand === "0")  
      {
        return  state
      }
      if(payload.digit ==="." && state.currentOperand.includes("."))
      {
        return state
      }
      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`
      }



      case ACTIONS.CHOOSE_OPEARION:
        if (state.currentOperand == null && state.previousOperand == null){
          return state;
        }
        if(state.currentOperand == null){
          return {
            ...state,
            operaion: payload.operation,
          }
        }

        if(state.previousOperand == null){
          return{
            ...state,
            operation: payload.operation,
            previousOperand: state.currentOperand,
            currentOperand: null,
          }
        }

        return{
          ...state,
          previousOperand: evaluate(state), 
          operation: payload.operation,
          currentOperand: null
        }

      case ACTIONS.CLEAR: 
      return{}

      case ACTIONS.DELETE_DIGIT: 
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          currentOperand: null
        }
      }

        if (state.currentOperand == null ) return state
        if(state.currentOperand.length == 1) {
          return {...state, currentOperand: null}
        }
        return {
          ...state,
          currentOperand: state.currentOperand.slice(0, -1)
        }



      case ACTIONS.EVALUATE:
        if(
          state.operation == null ||
          state.currentOperand == null || 
          state.previousOperand == null
        ) {
          return state;
        }

        return{
          ...state,
          overwrite: true,
          previousOperand: null,
          operaion: null,
          currentOperand: evaluate(state)
       }
  }
}
function evaluate({currentOperand, previousOperand, operation}) {
  const prev = parseFloat(previousOperand)
  const current = parseFloat(currentOperand)
  if(isNaN(prev) || isNaN(current)) return ""
  let computation = ""
  switch(operation) {
    case "+":
      computation = prev + current
      break
    case "-":
      computation = prev - current
      break
    case "*":
       computation = prev * current
       break
     case "/":
       computation = prev / current
       break
  }
  return computation.toString()
}



function App() {
  const [{currentOperand, previousOperand, operation}, dispatch] = useReducer(reducer, {});
  return (
    <div className="calculator-grid">
      <div className='output'>
      <div className='previous-operand'>{previousOperand} {operation}</div>
      <div className='current-operand'>{currentOperand}</div>
      </div>
      <button className='span-two' onClick={()=>dispatch({type: ACTIONS.CLEAR})}>AC</button>
      <button onClick={()=>dispatch({type: ACTIONS.DELETE_DIGIT})}>DEL</button>
      <OperationButton operation="/" onClick={()=>dispatch({type: ACTIONS.CHOOSE_OPEARION})} dispatch={dispatch}/>
      <Digit digit="1" dispatch={dispatch}/>
      <Digit digit="2" dispatch={dispatch}/>
      <Digit digit="3" dispatch={dispatch}/>
      <OperationButton operation="*" onClick={()=>dispatch({type: ACTIONS.CHOOSE_OPEARION})} dispatch={dispatch}/>
      <Digit digit="4" dispatch={dispatch}/>
      <Digit digit="5" dispatch={dispatch}/>
      <Digit digit="6" dispatch={dispatch}/>
      <OperationButton operation="+" onClick={()=>dispatch({type: ACTIONS.CHOOSE_OPEARION})} dispatch={dispatch}/>
      <Digit digit="7" dispatch={dispatch}/>
      <Digit digit="8" dispatch={dispatch}/>
      <Digit digit="9" dispatch={dispatch}/>
      <OperationButton operation="-" onClick={()=>dispatch({type: ACTIONS.CHOOSE_OPEARION})} dispatch={dispatch}/>
      <Digit digit="." dispatch={dispatch}/>
      <Digit digit="0" dispatch={dispatch}/>
      <button className='span-two' onClick={()=>dispatch({type: ACTIONS.EVALUATE})}>=</button>
    </div>
);
}

export default App;
