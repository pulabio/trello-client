import React from 'react';
import { buildListDict} from "../helperFunctions";

// import { Container } from './styles';

const boardMembers = JSON.parse(localStorage.boardMembers);
const customFieldsDef = JSON.parse(localStorage.customFieldsDef);
const SOLICITANTE_ID = "5a9866f7d6afbd6de1bbc539";
const CLIENTE_ID ="5a9866f7d6afbd6de1bbc51f";
const CLIENTE_TEXT_ID ="5e15e83208b94b1ce8264456";

const solicitanteDict = buildListDict(customFieldsDef, SOLICITANTE_ID);
const clienteDict = buildListDict(customFieldsDef, CLIENTE_ID);

export default function CardRow(props) {
  const card = props.card;
  const boardLists = props.boardLists;
  
  const filteredSolicitanteField = card.customFieldItems.filter(field => field.idCustomField === SOLICITANTE_ID)[0]
  const filteredClienteField = card.customFieldItems.filter(field => field.idCustomField === CLIENTE_ID)[0]
  const filteredTextClientField = card.customFieldItems.filter(field => field.idCustomField === CLIENTE_TEXT_ID)[0]
  
  const members = [];
  card.idMembers.forEach(memberId=> members.push(boardMembers[memberId]));

  const board_lists = props.board_lists;

  const solicitanteElement = filteredSolicitanteField ? <td>{solicitanteDict[filteredSolicitanteField.idValue]}</td> : <td></td> 
  const membersElement = members[0] ? <td>{members.join(", ")}</td> : <td>--</td> 

let clientElement;
  if (filteredClienteField){
    clientElement = <td>{clienteDict[filteredClienteField.idValue]}</td>
  } else if (filteredTextClientField){
    clientElement = <td>{filteredTextClientField.value.text}</td>
  } else {
    clientElement = <td></td>
  }

  let labelElement = <td></td>;
  const labelFilter = "SEV3 - URGENTE"
  if(card.labels.some(label=>label.name === labelFilter)){labelElement = <td>{labelFilter}</td>}
  return (
    <tr>
      <td>{card.name}</td>
      {clientElement}
      {solicitanteElement}
      <td>{card.idShort}</td>
      {membersElement}
      <td>{boardLists ? boardLists[card.idList] : "loading ..."}</td>
      {labelElement}
    </ tr>
  );
}
