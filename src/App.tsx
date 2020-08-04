import React, { useState } from "react";
import Heading from "./components/Heading";
import Footer from "./components/Footer";
import { Column } from 'react-table'
import CreateNote from "./components/CreateNote";
import Note from "./models/Note";
import { v4 as uuidv4 } from "uuid";
import Table from "./components/Table";

import styled from "styled-components";

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`;

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
        quantity: note.quantity,
        weight: note.weight,
        insertion_date: note.insertion_date,
        best_before_date: note.best_before_date
      },
    ]);
  };



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
            console.log(data);
            // ES6 Syntax use the rvalue if your data is an array.
            const dataCopy = [...data];
            // It should not matter what you name tableProps. It made the most sense to me.
            dataCopy.splice(tableProps.row.index, 1);
            console.log(dataCopy);
            setNotes(dataCopy);
          }}
        >
          Delete
        </span>
      ),
    },
  ];

  const data = notes;

  return (
    <div className="App">
      <Heading />
      <CreateNote onAddNote={addNote} />
      {notes.length > 0 && (
        <Styles>
          <Table columns={columns} data={data} />
        </Styles>
      )}
      <Footer />
    </div>
  );
};

export default App;
