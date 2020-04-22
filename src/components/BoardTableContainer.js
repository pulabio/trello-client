import React, { useState, useEffect} from 'react';
import {loadLists, loadCards, loadMembers, buildCustomFieldDicts} from "../helperFunctions"
import Table from "../components/Table"

import config from '../config';
const table = config.table

export default function BoardTableContainer() {
  const [cards, setCards] = useState([]);
  const [lists, setLists] = useState([]);
  const [customFieldDef, setCustomFieldDef] = useState([]);
  const [members, setMembers] = useState([]);

  useEffect(() =>{
    async function fetchData(){
      setCards(await loadCards());
      setLists(await loadLists());
      setMembers(await loadMembers());
      setCustomFieldDef(await buildCustomFieldDicts());
    }
    fetchData()


  }, []);
  return (<Table headerItems={table.headerItems} rows={[[1,2,3,4],[2,3,4,5],[3,4,5,6]]} />);

}