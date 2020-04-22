import React from 'react';
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";

export default function Table(props) {
  const {headerItems, rows} = props;
  return(
    <table>
      <TableHeader headerItems={headerItems}/>
      <tbody>
        {rows.map(rowItems => <TableRow rowItems={rowItems} />) }
      </tbody>
    </table>
  )
}