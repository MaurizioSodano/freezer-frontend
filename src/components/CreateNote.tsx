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
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
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
          placeholder={!checked ? "Inserisci cibo..." : "Nome"}
          value={note.title}
        />
        {checked && (
          <input
            onChange={handleChange}
            name="quantity"
            placeholder="Quantità"
            value={note.quantity}
          />
        )}
        {checked && (
          <input
            onChange={handleChange}
            name="weight"
            placeholder="Peso..."
            value={note.weight}
          />
        )}
        {checked && (
          <DatePicker
            dateFormat="dd-mm-yyyy"
            selected={startDate ? new Date(startDate!) : null}
            name="insertion_date"
            value={note.insertion_date}
            placeholderText="Data inserimento..."

            onChange={(date) => {
              const parsedDate = dateFormat(date as Date, "dd/mm/yyyy");
              setStartDate(parsedDate);
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
            selected={endDate ? new Date(endDate!) : null}
            name="best_before_date"
            value={note.best_before_date}
            placeholderText="Data di scadenza..."

            onChange={(date) => {
              const parsedDate = dateFormat(date as Date, "dd/mm/yyyy");
              setEndDate(parsedDate);
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
