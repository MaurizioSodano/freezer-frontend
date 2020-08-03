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
          <span> {todo.weight}</span>
          <span> {todo.insertion_date}</span>
          <span> {todo.best_before_date}</span>
          <button onClick={props.onDeleteNote.bind(null,todo.id!)}>DELETE</button>
        </li>
      ))}
    </ul>
  );
};

export default NoteList;
