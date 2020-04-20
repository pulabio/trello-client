import React from 'react';
import config from '../config';
import CardRow from './CardRow';
import {loadLists, buildListDict, fetchTrello} from "../helperFunctions"

const BOARD_ID = config.BOARD_ID;
const auth = config.API;

loadLists()

const headers = ["# do card", "Nome", "Label", "List"]


export default class FetchCards extends React.Component{
  state = {
    loading:true,
    card: null,
  }
  
  async componentDidMount(){
    const query = `cards?customFieldItems=true`
    const data = await fetchTrello(BOARD_ID, query, auth);
    
    const labelFilter = "SEV3 - URGENTE"
    const filtered_cards = data.filter(card => card.labels.some(label=>label.name === labelFilter))
    const sorted_cards = filtered_cards.sort((a,b)=>b.idShort-a.idShort)
    this.setState({cards: sorted_cards, loading:false})

    let board_lists = undefined;
    if(localStorage.board_lists){
      board_lists = await JSON.parse(localStorage.board_lists);
    }

    this.setState({board_lists: board_lists})
  }

  render(){
    const board_lists = this.state.board_lists;
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
              <CardRow key={card.id} card={card} board_lists={board_lists}/>
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