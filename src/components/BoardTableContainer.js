import React, { useState, useEffect} from 'react';
import {loadLists, loadCards, loadMembers, buildCustomFieldDicts} from "../helperFunctions"

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
  return null;

}