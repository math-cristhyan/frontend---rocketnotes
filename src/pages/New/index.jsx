import { useState } from "react";
import { Input } from "../../components/Input";
import { Header } from "../../components/Header";
import { Section } from "../../components/Section";
import { Textarea } from "../../components/Textarea";
import { NoteItem } from "../../components/NoteItem";
import { Button } from "../..//components/Button";

import { Link } from "react-router-dom";
import { api } from "../../services/api";
import { useNavigate } from "react-router-dom";

import { Container, Form } from "./styles";

export function New() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [links, setLink] = useState([]);
  const [newLink, setNewLink] = useState("");

  const [tags, setTags] = useState([]);
  const [newTags, setNewTags] = useState("");

  const navigation = useNavigate();

  function handleAddLink() {
    setLink(prevState => [... prevState, newLink]);
    setNewLink("");
  }

  function handleRemoveLink(deleted){
    setLink(prevState => prevState.filter(item => item != deleted));
  }

  function handleNewTag(){
    setTags(prevState => [...prevState, newTags]);
    setNewTags("");
  }

  function handleRemoveTag(tag){
    setTags(prevState => prevState.filter(item => item != tag ));
  }

  async function handleNewNote(){
    if(!title) {
      return alert("Digite o título da nota para prosseguir");
    }

    if(newLink) {
      return alert("Você deixou um link para adicionar mas não concluiu a ação. Adicione ou remova-o para prosseguir");
    }

    if(newTags) {
      return alert("Você deixou uma tag para adicionar mas não concluiu a ação. Adicione ou remova-a para prosseguir");
    }

    await api.post("/notes", {
      title,
      description,
      tags,
      links
    });

    alert("nota criada com sucesso!");
    navigation("/");
  }

  console.log(links);


  return (
    <Container>
      <Header />

      <main>
        <Form>
          <header>
            <h1>Criar nota</h1>
            <Link to="/">Voltar</Link>
          </header>

          <Input
            placeholder="Título"
            onChange = {e => setTitle(e.target.value)}
          />

          <Textarea 
          placeholder="Observações" 
          onChange = {e => setDescription(e.target.value)}
          />

          <Section title="Links Úteis">
            {
              links.map((link, index) => 
                 <NoteItem
                  key={index}
                  value={link}
                  onClick = {()=> handleRemoveLink(link)}
                  />
               )
            }

            <NoteItem
             isNew
             placeholder="Novo link" 
             value={newLink}
             onChange = {e => setNewLink(e.target.value)}
             onClick = {handleAddLink}
            
             />
          </Section>

          <Section title="Marcadores">
            <div className="tags">
            {
              tags.map((tag, index) => (
                  <NoteItem 
                    key={index}
                    value ={tag}
                    onClick = {()=> {handleRemoveTag(tag)}}
                  />
              ))
            }
              <NoteItem 
              isNew 
              placeholder="Nova Tag" 
              onChange = {e => setNewTags(e.target.value)}
              value = {newTags}
              onClick = {handleNewTag}
              />
              </div>
          </Section>

          <Button title = "Salvar" onClick={handleNewNote}/>

        </Form>
      </main>
    </Container >
  )
}