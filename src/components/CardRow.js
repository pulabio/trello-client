import React from 'react';

// import { Container } from './styles';

export default function CardRow(props) {
  const card = props.card;
  return (
    <tr>
      <td>{card.idShort}</td>
      <td>{card.name}</td>
    </ tr>
  );
}
