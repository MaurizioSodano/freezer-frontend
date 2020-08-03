import React from "react";
import Note from "../models/Note";
interface NoteListProps {
    items:Note[];
};

const NoteList: React.FC<NoteListProps> = props => {
  
  return (
    <ul>
      {props.items.map((todo) => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  );
};

export default NoteList;
