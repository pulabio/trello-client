import React from 'react';

// import { Container } from './styles';

export default function CardRow(props) {
  const card = props.card;
  const board_lists = props.board_lists;

  return (
    <tr>
      <td>{card.idShort}</td>
      <td>{card.name}</td>
      <td>{board_lists ? board_lists[card.idList] : "loading ..."}</td>
    </ tr>
  );
}
