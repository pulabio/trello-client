import config from './config';

const BOARD_ID = config.BOARD_ID;
const auth = config.API;

export async function fetchTrello(BOARD_ID, query, auth){
  const base_url = `https://api.trello.com/1/boards/${BOARD_ID}/${query}&`;
  const authParams = `key=${auth.KEY}&token=${auth.TOKEN}`;
  const url = base_url+authParams;
  
  const response = await fetch(url);
  return await response.json();
}

export async function loadMembers(){
  const query = "memberships?member=true";
  const members = await fetchTrello(BOARD_ID, query, auth);

  const board_members = {}
  members.forEach(member => {
    board_members[member.idMember]=member.member.fullName
  });

  let stringfied_board_members = JSON.stringify(board_members);
  localStorage.setItem("board_members", stringfied_board_members);
}

export async function loadLists(){
  const query = "lists?"
  const lists = await fetchTrello(BOARD_ID, query, auth);

  const board_lists = {}
  lists.forEach(list => {
    board_lists[list.id] = list.name  
  });

  let stringfied_board_lists = JSON.stringify(board_lists);
  localStorage.setItem("board_lists", stringfied_board_lists);
}

export async function loadCustomFieldsDef(){
  const query = "customFields?"
  const customFieldsDef = await fetchTrello(BOARD_ID, query, auth);

  const stringfiedCustomFieldDef = JSON.stringify(customFieldsDef);
  localStorage.setItem("customFieldsDef", stringfiedCustomFieldDef);
  return customFieldsDef;
}
//const quemSolicitouID = "5a9866f7d6afbd6de1bbc539"
export function buildListDict(customFieldsDef, fieldID){
  const dict = {}
  const fieldDefinitions = customFieldsDef.find(field => field.id===fieldID);
  fieldDefinitions.options.forEach(option => dict[option.id]=option.value.text);
  return dict;
}