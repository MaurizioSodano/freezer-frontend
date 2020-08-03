import React, { useRef } from "react";
import Note from "../models/Note";

type NoteProps = {
  onAddNote: (note: Note) => void;
};

const CreateNote: React.FC<NoteProps> = (props) => {
  const textInputRef = useRef<HTMLInputElement>(null);

  const noteSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const enteredText = textInputRef.current!.value;
    const note = { id: Math.random().toString(), title: enteredText };
    props.onAddNote(note);
  };

  return (
    <form onSubmit={noteSubmitHandler}>
      <div>
        <label htmlFor="note-text">Note Text</label>
        <input type="text" id="note-text" ref={textInputRef} />
      </div>
      <button type="submit">ADD NOTE</button>
    </form>
  );
};

export default CreateNote;
