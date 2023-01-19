import { Container, Links } from "./style";
import { Content } from "./style";
import { useState, useEffect } from "react";

import { useParams, useNavigate } from "react-router-dom";

import { api } from "../../services/api";

import { Header } from '../../components/Header';
import { Button } from "../../components/Button";
import { Section } from "../../components/Section";
import { Tag } from "../../components/Tag";
import { ButtonText } from "../../components/ButtonText";


export function Details() { //todo componente deve começar com a primeira letra maiúscula
  const params = useParams();
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  function handleBack(){
    navigate("/")
  }

  useEffect(()=> {
    async function fetchNoteDetails(){
      const response = await api.get(`/notes/${params.id}`)
      setData(response.data);
      
    }

    fetchNoteDetails();

  }, [])

  return (
    <Container>
      <Header />

      { data &&

        <main>

        <Content>

          <ButtonText title="Exluir nota" />

          <h1>{data.title}</h1>
          <p>{data.description}</p>

          {
            data.links && 
            
            <Section title="Links Úteis">
            <Links>
              {
                data.links.map(link=> (
                  <li key={link.id}>
                     <a href={link.url}
                     target = "_blank">
                      {link.url}
                     </a>
                     </li>
                ))
              }     
            </Links>
          </Section>
          }

          {
            data.tags &&

            <Section title="Tags">
              {
                data.tags.map(tag => (
                  <Tag key={tag.id}
                  title={tag.name} 
                  />
                ))
              }
            
          </Section>
            
          }

          

          <Button title="Voltar" onClick={handleBack} />

        </Content>
      </main>
      }

      
    </Container >
  )
} 