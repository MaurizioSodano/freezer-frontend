import React, { useState } from "react";
import Note from "../models/Note";
import DatePicker from "react-datepicker";
import dateFormat from "dateformat";
import "react-datepicker/dist/react-datepicker.css";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";
type NoteProps = {
  onAddNote: (note: Note) => void;
};

const CreateNote: React.FC<NoteProps> = (props) => {

  const [checked, setChecked] = useState<boolean>(false);
  const [note, setNote] = useState<Note>({
    title: ""
  });
  const submitNote = (event: React.MouseEvent) => {
    event.preventDefault();

    props.onAddNote(note);

    setNote({
      title: "", quantity: undefined,
      weight: undefined,
      insertion_date: undefined,
      best_before_date: undefined

    });
    setChecked(false);

  };

  function expandArea() {
    setChecked(true);
  }
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setNote((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  }


  return (
    <div>
      <form className="create-note">
        <input
          onChange={handleChange}
          onClick={expandArea}
          name="title"
          value={note.title}
          placeholder={!checked ? "Inserisci cibo..." : "Nome"}
        />
        {checked && (
          <input
            onChange={handleChange}
            name="quantity"
            value={note.quantity}
            placeholder="Quantità"
          />
        )}
        {checked && (
          <input
            onChange={handleChange}
            name="weight"
            value={note.weight}
            placeholder="Peso..."
          />
        )}
        {checked && (
          <DatePicker
            dateFormat="dd-mm-yyyy"
            name="insertion_date"
            value={note.insertion_date}
            placeholderText="Data inserimento..."

            onChange={(date) => {
              const parsedDate = dateFormat(date as Date, "dd/mm/yyyy");
              setNote((prevValue) => {
                return {
                  ...prevValue,
                  insertion_date: parsedDate,
                };
              });
            }}
          />
        )}
        {checked && (
          <DatePicker
            dateFormat="dd-mm-yyyy"
            name="best_before_date"
            value={note.best_before_date}
            placeholderText="Data di scadenza..."

            onChange={(date) => {
              const parsedDate = dateFormat(date as Date, "dd/mm/yyyy");
              setNote((prevValue) => {
                return {
                  ...prevValue,
                  best_before_date: parsedDate,
                };
              });
            }}
          />
        )}
        <Zoom
          in={checked}
          style={{ transitionDelay: checked ? "500ms" : "0ms" }}
        >
          <Fab onClick={submitNote}>
            <AddIcon />

          </Fab>
        </Zoom>


      </form>
    </div>
  );
};

export default CreateNote;
