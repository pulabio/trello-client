import React from 'react';

// import { Container } from './styles';

export default function CardRow(props) {
  const card = props.card;
  const board_lists = props.board_lists;

  let labelElement = <td></td>;
  const labelFilter = "SEV3 - URGENTE"
  if(card.labels.some(label=>label.name == labelFilter)){labelElement = <td>{labelFilter}</td>}
  return (
    <tr>
      <td>{card.idShort}</td>
      <td>{card.name}</td>
      {labelElement}
      <td>{board_lists ? board_lists[card.idList] : "loading ..."}</td>
    </ tr>
  );
}
