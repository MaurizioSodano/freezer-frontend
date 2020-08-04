import React from "react";

import { Column, HeaderGroup, useTable } from 'react-table'
import Note from "../models/Note";

interface Table<T extends object> {
    columns: Array<Column<T>>;
    data: T[];
    updateMyData?: any;
    skipPageReset?: boolean;
}

function Table({ columns, data, updateMyData, skipPageReset = false }: Table<Note>) {

    // Use the state and functions returned from useTable to build your UI
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable<Note>({
        columns,
        data
    })
    // Render the UI for your table
    return (

        <table {...getTableProps()}>
            <thead>
                {headerGroups.map((headerGroup: HeaderGroup<Note>) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map((row, i) => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map(cell => {
                                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                            })}
                        </tr>
                    )
                })}
            </tbody>
        </table>

    );
}


export default Table;