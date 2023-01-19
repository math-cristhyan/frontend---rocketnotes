import { RiShutDownLine } from 'react-icons/ri';
import{ Container, Profile, Logout } from './styles';
import { useAuth } from '../../hooks/auth';
import { api } from "../../services/api";
import avatarPlaceHolder from "../../assets/avatar_placeholder.svg";

export function Header() {

  const { signOut, user } = useAuth();

  const avatarURL = user.avatar ? `${api.defaults.baseURL}/files/${user.avatar}` : avatarPlaceHolder;

  function handleSignOut() {
    signOut();
  }


  return (
    <Container>
      <Profile to ="/profile">
        <img 
          src= {avatarURL}
          alt='Foto do Usuário'
        />

        <div>
          <span>Bem-vindo</span>
          <strong>{user.name}</strong>
        </div>
      </Profile>
      
      <Logout onClick={handleSignOut}>
        <RiShutDownLine />
      </Logout>
      
    </Container>
  )
}