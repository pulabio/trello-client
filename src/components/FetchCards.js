import React from 'react';
import config from '../config';
import CardRow from './CardRow';

const API_KEY = config.API.KEY;
const API_TOKEN = config.API.TOKEN;
const BOARD_ID = config.BOARD_ID;

const headers = ["# do card", "Nome", "Label", "List"]

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

    const response = await fetch(url);
    const data = await response.json();
    this.setState({cards: data, loading:false})
  }

  render(){
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
              <CardRow key={card.id} card={card}/>
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