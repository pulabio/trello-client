import config from '../config';

const API_KEY = config.API.KEY;
const API_TOKEN = config.API.TOKEN;
const BOARD_ID = config.BOARD_ID;

async function load_lists(){
  const query = "lists?"
  const base_url = `https://api.trello.com/1/boards/${BOARD_ID}/${query}&`;
  const auth = `key=${API_KEY}&token=${API_TOKEN}`;
  const url = base_url+auth;
  
  const response = await fetch(url);
  const lists = await response.json();

  const board_lists = {}

  lists.forEach(list => {
    board_lists[list.id] = list.name  
  });
  let stringfied_board_lists = JSON.stringify(board_lists);
  localStorage.setItem("board_lists", stringfied_board_lists);
}

export default load_lists;