import React, { useState } from "react";
import Heading from "./components/Heading";
import NoteList from "./components/NoteList";
import CreateNote from "./components/CreateNote";
import Note from "./models/Note";

const App: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);

  const addNote = (note: Note) => {
    setNotes((prevNotes) => [
      ...prevNotes,
      {
        id: note.id,
        title: note.title,
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
