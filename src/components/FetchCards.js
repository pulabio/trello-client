import React from 'react';
import config from '../config';
import CardRow from './CardRow';
import load_lists from "../helper_functions/load_lists"

const API_KEY = config.API.KEY;
const API_TOKEN = config.API.TOKEN;
const BOARD_ID = config.BOARD_ID;

load_lists()

const headers = ["# do card", "Nome", "Label", "List"]

let board_lists = undefined;
    if(localStorage.board_lists){
      board_lists = JSON.parse(localStorage.board_lists);
}

export default class FetchCards extends React.Component{
  state = {
    loading:true,
    card: null,
  }
  
  async componentDidMount(){
    const query = `cards?customFieldItems=true`
    const base_url = `https://api.trello.com/1/boards/${BOARD_ID}/${query}&`;
    const auth = `key=${API_KEY}&token=${API_TOKEN}`;
    const url = base_url+auth;

    //const list_dict= await load_lists();
    const response = await fetch(url);
    const data = await response.json();
    this.setState({cards: data, loading:false})

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
          <div>loading...</div> 
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