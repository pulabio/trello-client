import React from 'react';
import config from '../config';
import CardRow from './CardRow';
import {loadLists, loadCards} from "../helperFunctions"

const BOARD_ID = config.BOARD_ID;
const auth = config.API;

loadLists()

const headers = ["Item", "Cliente", "Solicitante", "Card", "Responsável", "Situação(Fila)", "SEV3"]


export default class FetchCards extends React.Component{
  state = {
    loading:true,
    card: null,
  }
  
  async componentDidMount(){
    const data = await loadCards();
    
    const F0ErrosId= "595e732a623af5c693244b2c"

    const labelFilter = "SEV3 - URGENTE";
    let filtered_cards = data.filter(card => card.labels.some(label=>label.name === labelFilter))
    filtered_cards = filtered_cards.filter(card => card.idList === F0ErrosId);
    const sorted_cards = filtered_cards.sort((a,b)=>b.idShort-a.idShort)
    this.setState({cards: sorted_cards, loading:false})

    let boardLists = undefined;
    if(localStorage.boardLists){
      boardLists = await JSON.parse(localStorage.boardLists);
    }

    this.setState({boardLists: boardLists})
  }

  render(){
    const boardLists = this.state.boardLists;
    return(
      <div>
        {this.state.loading || !this.state.cards ? (
          <div className="container"><b>loading...</b></div> 
        ) 
        :
        (
          <div className="container">
            <table>
              <thead>
                <tr>
                  {headers.map(header => (
                      <th key={header}>{header}</th>
                    ))}
                </tr>
              </thead>
              <tbody>
            {this.state.cards.map(card => (
              <CardRow key={card.id} card={card} boardLists={boardLists}/>
              )
              )}
              </tbody>
            </table>
        </div> )
        }
      </div>
    );
  }
};