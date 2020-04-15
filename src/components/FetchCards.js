import React from 'react';
import config from '../config';

const API_KEY = config.API.KEY;
const API_TOKEN = config.API.TOKEN;
const BOARD_ID = config.BOARD_ID;

export default class FetchCards extends React.Component{
  state = {
    loading:true,
    card: null,
  }

  async componentDidMount(){
    const query = `cards?`
    const base_url = `https://api.trello.com/1/boards/${BOARD_ID}/${query}&`;
    const auth = `key=${API_KEY}&token=${API_TOKEN}`;
    const url = base_url+auth;
    const response = await fetch(url);
    const data = await response.json();
    this.setState({cards: data, loading:false})
  }

  render(){
    return(
      <div>
        {this.state.loading || !this.state.cards ? (
          <div>loading...</div> 
        ) : (
         <ul>
           {this.state.cards.map(card => ( <>
            <li key={card.id}> {card.name}</li>
            <li> {card.idShort}</li>
           </> )
           )}
         </ul>)
        }
      </div>
    );
  }
};