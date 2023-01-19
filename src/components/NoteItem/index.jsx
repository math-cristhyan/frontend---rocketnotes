import {  FiPlus, FiX } from "react-icons/fi";
import { Container } from "./styles";

export function NoteItem({value, onClick, isNew = false, ...rest}) {
  return (
    <Container isNew ={isNew}>
      <input 
      type="text" 
      value={value}
      readOnly = {!isNew}
      {...rest}
      />
      
      <button
      type="button"
      className={isNew ? "button-add" : "button-delete"}
      onClick={onClick}
      >
        {isNew ? <FiPlus /> : <FiX />}
      </button>

    </Container>
  )
}

