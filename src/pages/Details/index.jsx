import { Container, Links } from "./style";
import { Content } from "./style";

import { Header } from '../../components/Header';
import { Button } from "../../components/Button";
import { Section } from "../../components/Section";
import { Tag } from "../../components/Tag";
import { ButtonText } from "../../components/ButtonText";


export function Details() { //todo componente deve começar com a primeira letra maiúscula

  return (
    <Container>
      <Header />

      <main>

        <Content>

          <ButtonText title="Exluir nota" />

          <h1>Introdução ao React</h1>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
            Beatae repudiandae eveniet ratione, voluptatibus soluta accusamus 
            odit reprehenderit, velit doloremque tempora inventore aliquam doloribus! 
            Temporibus illum placeat quibusdam, neque adipisci fuga.</p>

          <Section title="Links Úteis">
            <Links>
              <li> <a href="http://rocketseat.com.br" target="_blank">http://rocketseat.com.br</a></li>
              <li> <a href="http://rocketseat.com.br" target="_blank">http://rocketseat.com.br</a></li>
            </Links>
          </Section>

          <Section title="Tags">
            <Tag title="express" />
            <Tag title="nodejs" />
          </Section>

          <Button title="Voltar" />

        </Content>
      </main>
    </Container >
  )
} 