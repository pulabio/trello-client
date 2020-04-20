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

  const boardMembers = {}
  members.forEach(member => {
    boardMembers[member.idMember]=member.member.fullName
  });
  let stringfiedBoardMembers = JSON.stringify(boardMembers);
  localStorage.setItem("boardMembers", stringfiedBoardMembers);
  return boardMembers;
}

export async function loadLists(){
  const query = "lists?"
  const lists = await fetchTrello(BOARD_ID, query, auth);

  const boardLists = {}
  lists.forEach(list => {
    boardLists[list.id] = list.name  
  });

  const stringfiedBoardLists = JSON.stringify(boardLists);
  localStorage.setItem("boardLists", stringfiedBoardLists);
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