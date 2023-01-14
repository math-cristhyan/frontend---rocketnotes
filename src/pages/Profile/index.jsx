import { Container, Form, Avatar} from "./styles";

import { Input } from "../../components/Input";
import { Button } from "../../components/Button";

import { Link } from "react-router-dom";

import avatarPlaceholder from '../../assets/avatar_placeholder.svg';
import { api } from "../../services/api";

import { FiCamera, FiArrowLeft, FiUser, FiLock, FiMail } from "react-icons/fi";

import { useState } from "react";
import { useAuth } from "../../hooks/auth";

export function Profile() {

  const { user, updateProfile } = useAuth();

  const avatarURL = user.avatar ? `${api.defaults.baseURL}/files${user.avatar}` : avatarPlaceholder;

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState();
  const [newPassword, setNewPassword] = useState();

  const [avatar, setAvatar] = useState(user.avatar);
  const [avatarFile, setAvatarFile] = useState(null);

  async function handleProfile() {
    const user = {
      name,
      email,
      old_password: password ?? "",
      password: newPassword ?? "",
    }

    await updateProfile({user, avatarFile});
  }

  function handleChangeAvatar(event) {
    const file = event.target.files[0];
    setAvatarFile(file);

    const imagePreview = URL.createObjectURL(file);
    setAvatar(imagePreview);
    
  }

  console.log(avatarFile);


  return(
    <Container>
      <header>
        <Link to= "/"> <FiArrowLeft /></Link>
      </header>


    <Form>
      <Avatar>
        <img src= {avatar}
        alt="Foto do usuário" 
        />

        <label htmlFor="avatar">
          <FiCamera />

        <input 
        type="file"
        id="avatar"
        onChange={handleChangeAvatar}
        />

        </label>

      </Avatar>

      <Input 
        icon={FiUser}
        type ="text"
        placeholder = "Nome"
        value = {name}
        onChange ={e => setName(e.target.value)}
        />

      <Input 
        icon={FiMail}
        type ="text"
        placeholder = "E-mail"
        value = {email}
        onChange ={e => setEmail(e.target.value)}
        />

      <Input 
        icon={FiLock}
        type ="password"
        placeholder = "Senha Atual"
        onChange = {e => setPassword(e.target.value)}
        />

      <Input 
        icon={FiLock}
        type ="password"
        placeholder = "Nova Senha"
        onChange = {e => setNewPassword(e.target.value)}
        />

        <Button 
        title= "Salvar"
        onClick={handleProfile}
        />

    </Form>

    </Container>
  )
}