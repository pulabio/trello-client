import React from 'react';

export default function TableRow(props) {
  const {rowItems} = props;

  return (
    <tr>
      {rowItems.map(item => <td>{item}</td>)}
    </tr>
  );

}