import { FiPlus, FiSearch } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../hooks/auth';

import { Container, Brand, Menu, Search, Content, NewNote } from './styles';

import { Header } from '../../components/Header';
import { ButtonText } from '../../components/ButtonText';
import { Input } from '../../components/Input';
import { Section } from '../../components/Section';
import { Note } from '../../components/Notes';

import { api } from '../../services/api';

export function Home() {

  const navigate = useNavigate();

  const [tags, setTags] = useState([]);
  const [tagsSelected, setTagsSelected] = useState([]);
  const [search, setSearch] = useState("");
  const [notes, setNotes] = useState([])

  function handleTagSelected(tagName) {
    const alreadySelected = tagsSelected.includes(tagName);

    if(tagName === "all") {
      return setTagsSelected([]);
    }

    if(alreadySelected) {
      const filteredTags = tagsSelected.filter(tag => tag !== tagName);
      setTagsSelected(filteredTags);
    }

    else {
      setTagsSelected(prevState => [...prevState, tagName]);
    }
  }

  async function searchTags() {
    const response = await api.get("/tags")
    setTags(response.data);
  }

  function handleDetails(id) {
    navigate(`/details/${id}`)
  }

  useEffect(() => {
    searchTags();
  }, []);

  useEffect(() => {
    async function fetchNotes(){
      const response = await api.get(`/notes?title=${search}&tags=${tagsSelected}`);
      console.log(response.data)
      setNotes(response.data)
    }

    fetchNotes();
  }, [tagsSelected, search ])

  return (
    <Container>
      <Brand>
      <h1>RocketNotes</h1>
      </Brand>

      <Header />

      <Menu>
        <li><ButtonText
         title= "Todos" 
         isActive ={tagsSelected.length === 0}
         onClick = {() => handleTagSelected("all")}
          /></li>
        {
          tags && tags.map(tag => (
            <li 
            key={tag.id}>
            <ButtonText 
            title = {tag.name}
            onClick = {() => handleTagSelected(tag.name)}
            isActive = {tagsSelected.includes(tag.name)}
            />
            </li>
          ))
        }
      </Menu>

      <Search>
        <Input  
        type = "text" 
        icon = {FiSearch} 
        placeholder = "Pesquisar pelo título"
        onChange = {e => setSearch(e.target.value)}
        />
      </Search>

      <Content>
        <Section title="Minhas Notas">
          {
            notes.map(note => (
              <Note
                key={note.id}
                data ={note}
                onClick = {() => handleDetails(note.id)}
                />

            ))
          }
        </Section>
      </Content>

      <NewNote to="/new">
        <FiPlus />
        Criar Nota
      </NewNote>

    </Container>

  )
}