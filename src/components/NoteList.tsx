import React from "react";
import Note from "../models/Note";
interface NoteListProps {
  items: Note[];
  onDeleteNote: (id: string) => void;
}

const NoteList: React.FC<NoteListProps> = (props) => {

  return (
    <ul>
      {props.items.map((todo) => (
        <li key={todo.id}>
          <span> {todo.title}</span>
          <span> {todo.quantity}</span>
          <button onClick={props.onDeleteNote.bind(null,todo.id)}>DELETE</button>
        </li>
      ))}
    </ul>
  );
};

export default NoteList;
