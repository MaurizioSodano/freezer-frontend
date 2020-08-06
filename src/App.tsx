import React, { useState, useEffect } from "react";
import Heading from "./components/Heading";
import Footer from "./components/Footer";
import { Column } from 'react-table'
import CreateNote from "./components/CreateNote";
import Note from "./models/Note";
import { v4 as uuidv4 } from "uuid";
import Table, { Styles } from "./components/Table";
import axios from "axios";
import qs from 'qs'
const BASE_URL = process.env.REACT_APP_FREEZER_API_BASE_URL as string;

const App: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(BASE_URL);

      setNotes(result.data);
      setLoading(false);
    };

    fetchData();
  }, []);

  async function addNote(note: Note) {
    const id = uuidv4();
    note.id = id;
    console.log(note);


    await axios.post(BASE_URL, qs.stringify(note));
    setNotes((prevNotes) => [
      ...prevNotes,
      {
        id: note.id,
        title: note.title,
        quantity: note.quantity,
        weight: note.weight,
        insertion_date: note.insertion_date,
        best_before_date: note.best_before_date
      },
    ]);
  }

  async function deleteNote(id: string) {


    await axios.delete(BASE_URL + "/" + id);
    setNotes((prevItems) => {
      return prevItems.filter((note) => {
        return note.id !== id;
      });
    });
  }

  const columns: Column<Note>[] = [
    {
      Header: "Nome",
      accessor: "title",
    },
    {
      Header: "Quantità",
      accessor: "quantity",
    },
    {
      Header: "Peso",
      accessor: "weight",
    },
    {
      Header: "Data inserimento",
      accessor: "insertion_date",

    },
    {
      Header: "Data scadenza",
      accessor: "best_before_date",
    },
    {
      Header: "Elimina",
      id: "delete",
      accessor: (str) => "delete",
      Cell: (tableProps: any) => (
        <span
          style={{
            cursor: "pointer",
            color: "blue",
            textDecoration: "underline",
          }}
          onClick={() => {
            deleteNote(tableProps.row.original.id)
          }}
        >
          elimina
        </span>
      ),
    },
  ];


  const data = notes;

  return (
    <div className="App">
      <Heading />
      <CreateNote onAddNote={addNote} />
      {!isLoading ? (notes.length > 0 && (
        <Styles>
          <Table columns={columns} data={data} />
        </Styles>
      )) : (<p>Loading ...</p>)
      }
      <Footer />
    </div>
  );
};

export default App;
