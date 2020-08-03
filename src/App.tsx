import React, { useState } from "react";
import Heading from "./components/Heading";
import NoteList from "./components/NoteList";
import CreateNote from "./components/CreateNote";
import Note from "./models/Note";
import { v4 as uuidv4 } from "uuid";
const App: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);

  const addNote = (note: Note) => {
    const id = uuidv4();
    note.id = id;
    setNotes((prevNotes) => [
      ...prevNotes,
      {
        id: note.id,
        title: note.title,
        quantity:note.quantity,
        weight:note.weight,
        insertion_date:note.insertion_date,
        best_before_date:note.best_before_date
      },
    ]);
  };

  const deleteNote = (todoId: string) => {
    setNotes((prevNotes) => {
      return prevNotes.filter((note) => note.id !== todoId);
    });
  };
  return (
    <div className="App">
      <Heading />
      <CreateNote onAddNote={addNote} />
      <NoteList items={notes} onDeleteNote={deleteNote} />
    </div>
  );
};

export default App;
