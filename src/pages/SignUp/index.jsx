import {useState} from "react";
import { Container, Form, BackgroundIimg } from "./styles"

import { api } from "../../services/api";

import { FiUser, FiLock, FiMail } from "react-icons/fi";

import { Input } from "../../components/Input";

import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";

export function SignUp () {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  

  function handleSignUp() {
    if(!name || !email || !password) {
      return alert("Preencha todos os campos");
    }

    api.post("/users", {name, email, password})
    .then(()=> {
      alert("usuário cadastrado com sucesso");
      navigate("/");
    })
    .catch(error => {
      if(error.response){
        alert(error.response.data.message);
      }

      else {
        alert("Não foi possível cadastrar");
      }
    })
  }

  function enterSignUp(e){
    if(e.key === 'Enter') {
      console.log(name, email, password);
    }
  }

  return (
    <Container onKeyDown={enterSignUp}>

      <BackgroundIimg />
      

      <Form>
      <h1>Rocket Notes</h1>
      <p>Aplicação para salvar e gerenciar seus links úteis</p>

      <h2>Crie sua Conta</h2>

        <Input icon={FiUser}
        placeholder="Nome"
        type = "text"
        onChange = {e => setName(e.target.value)}
        /> 
        <Input icon={FiMail}
        placeholder="E-mail"
        type = "email"
        onChange = {e => setEmail(e.target.value)}
        /> 
        <Input icon={FiLock}
        placeholder="Senha"
        type = "password"
        onChange = {e => setPassword(e.target.value)}
        />

        <Button title= "Cadastrar" onClick={handleSignUp}/> 

      <Link to="/">
        Voltar para o login
      </Link>
      </Form>

      

    </Container>
  )
}